import util from 'util';
import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
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

export default createLogger({
  defaultMeta: {
    meta: {}
  },
  transports: [...consoleTransport()]
});
