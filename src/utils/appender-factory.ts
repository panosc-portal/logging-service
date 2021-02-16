import {IAppender} from '../interfaces';
import {AppenderType} from '../models/enumerations';
import {ConsoleAppender, EmailAppender, FileAppender, SlackAppender, SyslogAppender} from './appenders';

export class AppenderFactory {

  static createAppender(props: any): IAppender {

    let appender: IAppender;

    switch (props.type) {
      case AppenderType.CONSOLE: {
        appender = new ConsoleAppender(props);
        break;
      }
      case AppenderType.FILE: {
        appender = new FileAppender(props);
        break;
      }
      case AppenderType.EMAIL: {
        appender = new EmailAppender(props);
        break;
      }
      case AppenderType.SYSLOG: {
        appender = new SyslogAppender(props);
        break;
      }
      case AppenderType.SLACK: {
        appender = new SlackAppender(props);
        break;
      }
      default:
        throw new Error("Appender type not defined: " + props.type);
    }

    return appender;
  }
}
