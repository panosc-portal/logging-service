import {format} from 'winston';
import {AppenderType, LogLevel} from './models/enumerations';

export class ApplicationConfig {
  appenders: any

  constructor(data?: Partial<ApplicationConfig>) {
    Object.assign(this, data);
  }
}

let applicationConfig: ApplicationConfig;

export function APPLICATION_CONFIG(): ApplicationConfig {

  let buildFormat = function (formatTemplate: string) {

    return format.printf(function ({createdAt, level, application, message}) {

      return formatTemplate
        .replace("%createdAt%", createdAt)
        .replace("%level%", level.toUpperCase())
        .replace("%source%", application)
        .replace("%msg%", message);
    });
  }

  if (applicationConfig == null) {

    applicationConfig = {
      appenders: [
        {
          type: AppenderType.CONSOLE,
          enabled:
            process.env.LOGGING_SERVICE_CONSOLE_APPENDER_ENABLED != null
              ? process.env.LOGGING_SERVICE_CONSOLE_APPENDER_ENABLED === 'true'
              : true,
          threshold: process.env.LOGGING_SERVICE_CONSOLE_APPENDER_THRESHOLD || LogLevel.INFO,
          format: buildFormat(process.env.LOGGING_SERVICE_CONSOLE_APPENDER_FORMAT || '%createdAt% %level% [%source%] - %msg%n')
        },
        {
          type: AppenderType.EMAIL,
          enabled:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_ENABLED != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_EMAIL_APPENDER_THRESHOLD || LogLevel.ERROR,
          host: process.env.LOGGING_SERVICE_EMAIL_APPENDER_HOST || 'smtp.gmail.com',
          port: process.env.LOGGING_SERVICE_EMAIL_APPENDER_PORT || 465,
          ssl:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_SSL != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_SSL === 'true'
              : true,
          tls:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_TLS != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_TLS === 'true'
              : false,
          to:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_TO != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_TO.split(',')
              : ['person1@domain.com', 'person2@domain.com'],
          from: process.env.LOGGING_SERVICE_EMAIL_APPENDER_FROM || 'portal-app@domain.com',
          subject: process.env.LOGGING_SERVICE_EMAIL_APPENDER_SUBJECT || 'Error from portal app',
          format: buildFormat(process.env.LOGGING_SERVICE_EMAIL_APPENDER_FORMAT || '%createdAt% %level% [%source%] - %msg%n')
        },
        {
          type: AppenderType.FILE,
          enabled:
            process.env.LOGGING_SERVICE_FILE_APPENDER_ENABLED != null
              ? process.env.LOGGING_SERVICE_FILE_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_FILE_APPENDER_THRESHOLD || LogLevel.INFO,
          path: process.env.LOGGING_SERVICE_FILE_APPENDER_PATH || './loggin_service.log',
          format: buildFormat(process.env.LOGGING_SERVICE_FILE_APPENDER_FORMAT || '%createdAt% %level% [%source%] - %msg%n')
        },
        {
          type: AppenderType.SYSLOG,
          enabled:
            process.env.LOGGING_SERVICE_SYSLOG_APPENDER_ENABLED
              ? process.env.LOGGING_SERVICE_SYSLOG_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_THRESHOLD || LogLevel.INFO,
          host: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_HOST || 'syslog.domain.com',
          port: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_PORT || 1234,
          facility: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_FACILITY || 'local0',
          format: buildFormat(process.env.LOGGING_SERVICE_SYSLOG_APPENDER_FORMAT || '%createdAt% %level% [%source%] - %msg%n'),
          timeZone: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_TIMEZONE || 'CET'
        },
        {
          type: AppenderType.SLACK,
          enabled:
            process.env.LOGGING_SERVICE_SLACK_APPENDER_ENABLED
              ? process.env.LOGGING_SERVICE_SLACK_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_SLACK_APPENDER_THRESHOLD || LogLevel.ERROR,
          webhookURL: process.env.LOGGING_SERVICE_SLACK_APPENDER_WEBHOOK_URL,
          format: buildFormat(process.env.LOGGING_SERVICE_SLACK_APPENDER_FORMAT || '%createdAt% %level% [%source%] - %msg%n')
        }
      ]
    };
  }

  return applicationConfig;
}
