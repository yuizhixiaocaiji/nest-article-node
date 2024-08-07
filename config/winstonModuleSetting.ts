import * as winston from 'winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonModuleSetting: winston.LoggerOptions = {
  // 生成文件
  // winston 文档中使用的方法为 new transports.File()
  // 因为加入日志归档等相关功能，所以使用transports.DailyRotateFile()方法来实现
  format: format.combine(
    format.timestamp(),
    format.ms(),
    format.splat(),
    format.simple(),
    nestWinstonModuleUtilities.format.nestLike('cardloan-nest-server', {
      colors: true,
      prettyPrint: true,
    }),
  ),
  transports: [
    // 打印到控制台，生产可注释关闭该功能
    new transports.Console(),
    new transports.DailyRotateFile({
      // 日志文件文件夹，建议使用path.join()方式来处理，或者process.cwd()来设置，此处仅作示范
      dirname: 'log/',
      // 日志文件名 %DATE% 会自动设置为当前日期
      filename: 'cardloan-nest-server.log.%DATE%',
      // 日期格式
      datePattern: 'YYYYMMDD',
      // 文件最大大小，可以是bytes、kb、mb、gb
      maxSize: '2g',
      // 最大文件数，可以是文件数也可以是天数，天数加单位"d"，
      maxFiles: '7d',
      // 格式定义，同winston
      format: format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        format.splat(),
        format.simple(),
        nestWinstonModuleUtilities.format.nestLike('cardloan-nest-server', {
          colors: true,
          prettyPrint: true,
        }),
      ),
      // 日志等级，不设置所有日志将在同一个文件
      level: 'info',
    }),
    // 同上述方法，区分error日志和info日志，保存在不同文件，方便问题排查
    new transports.DailyRotateFile({
      dirname: 'log/',
      filename: 'cardloan-nest-server.error.%DATE%',
      datePattern: 'YYYYMMDD',
      maxSize: '2g',
      maxFiles: '14d',
      format: format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        format.splat(),
        format.simple(),
        nestWinstonModuleUtilities.format.nestLike('cardloan-nest-server', {
          colors: true,
          prettyPrint: true,
        }),
      ),
      level: 'error',
    }),
  ],
};
