import {AppenderType, LogLevel} from './models/enumerations';

export class ApplicationConfig {
  appenders: any

  constructor(data?: Partial<ApplicationConfig>) {
    Object.assign(this, data);
  }
}

let applicationConfig: ApplicationConfig;

const DEFAULT_FORMAT: string = '%createdAt% %level% [%source%] - %msg%';

export function APPLICATION_CONFIG(): ApplicationConfig {

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
          format: process.env.LOGGING_SERVICE_CONSOLE_APPENDER_FORMAT || DEFAULT_FORMAT
        },
        {
          type: AppenderType.EMAIL,
          enabled:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_ENABLED != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_EMAIL_APPENDER_THRESHOLD || LogLevel.ERROR,
          host: process.env.LOGGING_SERVICE_EMAIL_APPENDER_HOST,
          port: process.env.LOGGING_SERVICE_EMAIL_APPENDER_PORT || 25,
          ssl:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_SSL != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_SSL === 'true'
              : true,
          tls:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_TLS != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_TLS === 'true'
              : false,
          username: process.env.LOGGING_SERVICE_EMAIL_APPENDER_USERNAME,
          password: process.env.LOGGING_SERVICE_EMAIL_APPENDER_PASSWORD,
          to:
            process.env.LOGGING_SERVICE_EMAIL_APPENDER_TO != null
              ? process.env.LOGGING_SERVICE_EMAIL_APPENDER_TO.split(',')
              : [],
          from: process.env.LOGGING_SERVICE_EMAIL_APPENDER_FROM || 'wp4@panosc.eu',
          subject: process.env.LOGGING_SERVICE_EMAIL_APPENDER_SUBJECT || 'Error from portal app',
          format: process.env.LOGGING_SERVICE_EMAIL_APPENDER_FORMAT || DEFAULT_FORMAT
        },
        {
          type: AppenderType.FILE,
          enabled:
            process.env.LOGGING_SERVICE_FILE_APPENDER_ENABLED != null
              ? process.env.LOGGING_SERVICE_FILE_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_FILE_APPENDER_THRESHOLD || LogLevel.INFO,
          path: process.env.LOGGING_SERVICE_FILE_APPENDER_PATH || './logging_service.log',
          format: process.env.LOGGING_SERVICE_FILE_APPENDER_FORMAT || DEFAULT_FORMAT
        },
        {
          type: AppenderType.SYSLOG,
          enabled:
            process.env.LOGGING_SERVICE_SYSLOG_APPENDER_ENABLED
              ? process.env.LOGGING_SERVICE_SYSLOG_APPENDER_ENABLED === 'true'
              : false,
          threshold: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_THRESHOLD || LogLevel.INFO,
          host: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_HOST,
          port: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_PORT || 514,
          protocol: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_PROTOCOL || 'udp4',
          facility: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_FACILITY || 'local0',
          format: process.env.LOGGING_SERVICE_SYSLOG_APPENDER_FORMAT || DEFAULT_FORMAT,
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
          format: process.env.LOGGING_SERVICE_SLACK_APPENDER_FORMAT || DEFAULT_FORMAT
        }
      ]
    };
  }

  return applicationConfig;
}
