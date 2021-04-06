const winston = require('winston');
import {Syslog} from 'winston-syslog';
import {APPLICATION_CONFIG} from '../application-config';
import {MessageDto} from '../controllers/dto/message-dto.models';
import {AppenderType} from '../models/enumerations';
require('winston-mail');
const SlackHook = require('winston-slack-webhook-transport');

export const buildLogger = function () {

  let _logger = winston.createLogger();
  let _errors: Array<string> = [];

  APPLICATION_CONFIG().appenders.forEach((appender: any) => {

    if (appender.enabled) {

      switch (appender.type) {
        case AppenderType.CONSOLE: {
          //TODO add colors
          _logger.add(new winston.transports.Console({
            level: appender.threshold.toLowerCase(),
            format: winston.format.printf(function (info: MessageDto) {

              return appender.format
                .replace("%createdAt%", info.createdAt)
                .replace("%level%", info.level.toUpperCase())
                .replace("%source%", info.application)
                .replace("%msg%", info.message);
            })/*
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.printf((info: {createdAt: any; level: any; message: any;}) => {
                return `${info.level} ${info.message}`;
              }))*/
          }));

          break;
        }
        //https://www.loggly.com/ultimate-guide/centralizing-node-logs/
        case AppenderType.FILE: {
          _logger.add(new winston.transports.File({
            level: appender.threshold.toLowerCase(),
            filename: appender.path,
            format: winston.format.printf(function (info: MessageDto) {

              return appender.format
                .replace("%createdAt%", info.createdAt)
                .replace("%level%", info.level.toUpperCase())
                .replace("%source%", info.application)
                .replace("%msg%", info.message);
            })
          }));
          break;
        }
        case AppenderType.EMAIL: {

          let _isValid: boolean = true;

          if (!appender.to || appender.to.length == 0) {
            _errors.push('Email appender requires a list of receivers, ' +
              'please set a value for the environment variable LOGGING_SERVICE_EMAIL_APPENDER_TO');
            _isValid = false;
          }

          if (!appender.host || appender.host.trim().length == 0) {
            _errors.push('Email appender requires a host, ' +
              'please set a value for the environment variable LOGGING_SERVICE_EMAIL_APPENDER_HOST');
            _isValid = false;
          }

          if ((appender.ssl || appender.tls) && (!appender.username || appender.username.trim().length == 0)) {
            _errors.push('Email appender requires a username when using ' + (appender.ssl ? 'ssl' : 'tls') + ', ' +
              'please set a value for the environment variable LOGGING_SERVICE_EMAIL_APPENDER_USERNAME');
            _isValid = false;
          }

          if ((appender.ssl || appender.tls) && (!appender.password || appender.password.trim().length == 0)) {
            _errors.push('Email appender requires a password when using ' + (appender.ssl ? 'ssl' : 'tls') + ', ' +
              'please set a value for the environment variable LOGGING_SERVICE_EMAIL_APPENDER_PASSWORD');
            _isValid = false;
          }

          if (_isValid) {
            _logger.add(new winston.transports.Mail({
              level: appender.threshold.toLowerCase(),
              to: appender.to,
              from: appender.from,
              subject: appender.subject,
              host: appender.host,
              port: appender.port,
              ssl: appender.ssl,
              tls: appender.tls,
              username: appender.username,
              password: appender.password,
              formatter: (info: MessageDto) => {

                return appender.format
                  .replace("%createdAt%", info.createdAt)
                  .replace("%level%", info.level.toUpperCase())
                  .replace("%source%", info.application)
                  .replace("%msg%", info.message);
              }
            }));
          }

          break;
        }
        case AppenderType.SYSLOG: {

          if (!appender.host || appender.host.trim().length == 0) {
            _errors.push('Syslog appender requires a host, ' +
              'please set a value for the environment variable LOGGING_SERVICE_SYSLOG_APPENDER_HOST');
          } else {

            //TODO check how to use the property formatter and the time zone
            _logger.add(new Syslog({
              level: appender.threshold.toLowerCase(),
              host: appender.host,
              port: appender.port,
              protocol: appender.protocol,
              facility: appender.facility,
              app_name: 'PaNOSCPortal.logging-service'
            }));
          }

          break;
        }
        case AppenderType.SLACK: {
          //https://www.npmjs.com/package/winston-slack-webhook-transport
          if (!appender.webhookURL || appender.webhookURL.trim().length == 0) {
            _errors.push('Slack appender requires a webhook URL, ' +
              'please set a value for the environment variable LOGGING_SERVICE_SLACK_APPENDER_WEBHOOK_URL');
          } else {

            _logger.add(new SlackHook({
              level: appender.threshold.toLowerCase(),
              webhookUrl: appender.webhookURL,
              formatter: (info: MessageDto) => {

                return {
                  text: appender.format
                    .replace("%createdAt%", info.createdAt)
                    .replace("%level%", info.level.toUpperCase())
                    .replace("%source%", info.application)
                    .replace("%msg%", info.message)
                };
              }
            }));
          }

          break;
        }
        default:
          throw new Error('Appender type not defined: ' + appender.type);
      }
    }
  });

  if (_errors.length > 0) {
    throw new Error('\n' + _errors.join('\n'));
  }

  return _logger;
};

export const logger = buildLogger();
