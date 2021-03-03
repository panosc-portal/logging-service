# Logging Service

The Logging service is designed to centralise logs from all micro services providing one or more appenders (console, file, syslog, email, database) to output a formatted log message.

Currently only the console and file appenders have been implemented.

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

The following environment variables are used to configure the Account Service and can be placed in a dotenv file:

| Environment variable | Default value | Usage |
| ---- | ---- | ---- |
| LOGGIN_SERVICE_CONSOLE_APPENDER_THRESHOLD | INFO | The threshold of the console appender |
| LOGGIN_SERVICE_FILE_APPENDER_THRESHOLD | INFO | The threshold of the file appender |
| LOGGIN_SERVICE_FILE_APPENDER_PATH | ./logging_service.log | Path to the file to write the log to |
