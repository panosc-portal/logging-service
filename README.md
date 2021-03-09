# Logging Service

The Logging service is designed to centralise logs from all micro services providing one or more appenders (console, file, syslog, email, database) to output a formatted log message.

The microservices call a logging endpoint to store the log messages: a common client lib should be provided for each microservice to simplify the http (POST) request (eg in typsecript). This should also take into account that if the logging service call fails then it should fallback to console (for example).

Further documentation and the design details can be found at [PaNOSC Portal Logging Service Design](https://confluence.panosc.eu/x/-gDAAQ) page.

## Installation

```sh
npm install
```

## Run

```sh
npm start
```

## Environment variables

The following environment variables are used to configure the Logging Service and can be placed in a dotenv file:

| Environment variable | Default value | Usage |
| ---- | ---- | ---- |
| LOGGING_SERVICE_CONSOLE_APPENDER_ENABLED | true | Enables the console appender |
| LOGGING_SERVICE_CONSOLE_APPENDER_THRESHOLD | INFO | The threshold of the console appender |
| LOGGING_SERVICE_CONSOLE_APPENDER_FORMAT | %createdAt% %level% [%source%] - %msg%n | The format of the console appender |
| LOGGING_SERVICE_FILE_APPENDER_ENABLED | false | Enables the file appender |
| LOGGING_SERVICE_FILE_APPENDER_THRESHOLD | INFO | The threshold of the file appender |
| LOGGING_SERVICE_FILE_APPENDER_PATH | ./logging_service.log | Path to the file to write the log to |
| LOGGING_SERVICE_FILE_APPENDER_FORMAT | %createdAt% %level% [%source%] - %msg%n | The format of the file appender |
| LOGGING_SERVICE_EMAIL_APPENDER_ENABLED | false | Enables the email appender |
| LOGGING_SERVICE_EMAIL_APPENDER_THRESHOLD | ERROR | The threshold of the email appender |
| LOGGING_SERVICE_EMAIL_APPENDER_HOST | NULL | |
| LOGGING_SERVICE_EMAIL_APPENDER_PORT | 25 | |
| LOGGING_SERVICE_EMAIL_APPENDER_SSL | true | |
| LOGGING_SERVICE_EMAIL_APPENDER_TLS | false | |
| LOGGING_SERVICE_EMAIL_APPENDER_USERNAME | NULL | |
| LOGGING_SERVICE_EMAIL_APPENDER_PASSWORD | NULL | |
| LOGGING_SERVICE_EMAIL_APPENDER_TO | [] | A comma separated list of email addresses |
| LOGGING_SERVICE_EMAIL_APPENDER_FROM | wp4 email address | |
| LOGGING_SERVICE_EMAIL_APPENDER_SUBJECT | Error from portal app | |
| LOGGING_SERVICE_EMAIL_APPENDER_FORMAT | %createdAt% %level% [%source%] - %msg%n | The format of the email appender |
| LOGGING_SERVICE_SYSLOG_APPENDER_ENABLED | false | Enables the syslog appender |
| LOGGING_SERVICE_SYSLOG_APPENDER_THRESHOLD | INFO | The threshold of the syslog appender |
| LOGGING_SERVICE_SYSLOG_APPENDER_HOST | NULL | |
| LOGGING_SERVICE_SYSLOG_APPENDER_PORT | 514 | |
| LOGGING_SERVICE_SYSLOG_APPENDER_PROTOCOL | udp4 | |
| LOGGING_SERVICE_SYSLOG_APPENDER_FACILITY | local0 | |
| LOGGING_SERVICE_SYSLOG_APPENDER_FORMAT | %createdAt% %level% [%source%] - %msg%n | The format of the syslog appender |
| LOGGING_SERVICE_SLACK_APPENDER_ENABLED | false | Enables the slack appender |
| LOGGING_SERVICE_SLACK_APPENDER_THRESHOLD | ERROR | The threshold of the slack appender |
| LOGGING_SERVICE_SLACK_APPENDER_WEBHOOK_URL | NULL | The webhook URL to send the log to |
| LOGGING_SERVICE_SLACK_APPENDER_FORMAT | %createdAt% %level% [%source%] - %msg%n | The format of the slack appender |
