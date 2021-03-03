const winston = require('winston');
import {Syslog} from 'winston-syslog';
import {APPLICATION_CONFIG} from '../application-config';
import {AppenderType} from '../models/enumerations';
require('winston-mail');
const SlackHook = require('winston-slack-webhook-transport');

export const buildLogger = function () {

  let _logger = winston.createLogger();

  APPLICATION_CONFIG().appenders.forEach((appender: any) => {

    if (appender.enabled) {

      switch (appender.type) {
        case AppenderType.CONSOLE: {
          _logger.add(new winston.transports.Console({
            level: appender.threshold.toLowerCase(),
            format: appender.format
          }));
          break;
        }
        case AppenderType.FILE: {
          _logger.add(new winston.transports.File({
            level: appender.threshold.toLowerCase(),
            filename: appender.path,
            format: appender.format
          }));
          break;
        }
        case AppenderType.EMAIL: {
          _logger.add(new winston.transports.Mail({
            level: appender.threshold.toLowerCase(),
            to: appender.to,
            from: appender.from,
            subject: appender.subject,
            host: appender.host,
            port: appender.port,
            ssl: appender.ssl,
            tls: appender.tls,
            username: null,
            password: null
            //TODO check how to use the property formatter
          }));
          break;
        }
        case AppenderType.SYSLOG: {
          _logger.add(new Syslog({
            level: appender.threshold.toLowerCase(),
            host: appender.host,
            port: appender.port,
            protocol: appender.protocol,
            path: '/dev/log',
            facility: appender.facility,
            app_name: 'PaNOSC Portal Logging Service'
          }));
          break;
        }
        case AppenderType.SLACK: {
          _logger.add(new SlackHook({
            level: appender.threshold.toLowerCase(),
            webhookUrl: appender.webhookURL
            //TODO check how to use the property formatter
          }));
          break;
        }
        default:
          throw new Error("Appender type not defined: " + appender.type);
      }
    }
  });

  return _logger;
};

export const logger = buildLogger();
