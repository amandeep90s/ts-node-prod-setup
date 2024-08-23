import path from 'path';
import util from 'util';
import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

const consoleLogFormat = format.printf((info) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = level.toUpperCase();
  const customTimestamp = timestamp as string;
  const customMessage = message as string;
  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null
  });
  const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\nMETA ${customMeta}\n`;

  return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat)
      })
    ];
  }
  return [];
};

const fileLogFormat = format.printf((info) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack ?? ''
      };
    } else {
      logMeta[key] = value;
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message: (message as string) ?? '',
    timestamp: (timestamp as string) ?? '',
    meta: logMeta
  };

  return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
      level: 'info',
      format: format.combine(format.timestamp(), fileLogFormat)
    })
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {}
  },
  transports: [...fileTransport(), ...consoleTransport()]
});
