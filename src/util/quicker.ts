import os from 'os';
import config from '../config/config';

const convertToMB = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

export default {
  getSystemHealth: () => {
    return {
      cpuUsage: os.loadavg(),
      totalMemory: `${convertToMB(os.totalmem())} MB`,
      freeMemory: `${convertToMB(os.freemem())} MB`
    };
  },
  getApplicationHealth: () => {
    return {
      environment: config.ENV,
      uptime: `${process.uptime().toFixed(2)} Seconds`,
      memoryUsage: {
        heapTotal: `${convertToMB(process.memoryUsage().heapTotal)} MB`,
        heapUsed: `${convertToMB(process.memoryUsage().heapUsed)} MB`
      }
    };
  }
};
