import {AppenderType, LogLevel} from '../../models/enumerations';

export let appendersConfig = {
  appenders: [
    {
      type: AppenderType.CONSOLE,
      threshold: LogLevel.INFO,
      format: "%createdAt% %level% [%-40.40logger{10}] - %msg%n"
    },
    {
      type: AppenderType.FILE,
      threshold: LogLevel.INFO,
      path: "./loggin_service.log",
      format: "%createdAt% %level% [%-40.40logger{10}] - %msg%n"
    }
  ]
};
