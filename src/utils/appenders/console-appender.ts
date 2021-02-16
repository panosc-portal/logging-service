import {MessageDto} from '../../controllers/dto/message-dto.models';
import {IAppender} from '../../interfaces';
import {AppenderType, LogLevel} from '../../models/enumerations';


export class ConsoleAppender implements IAppender {

  _threshold: LogLevel;
  _format: string;

  constructor(props: any) {
    this._threshold = process.env.LOGGIN_SERVICE_CONSOLE_APPENDER_THRESHOLD || props.threshold;
    this._format = process.env.LOGGIN_SERVICE_CONSOLE_APPENDER_FORMAT || props.format;
  }

  getType(): AppenderType {
    return AppenderType.CONSOLE;
  }

  getThreshold(): LogLevel {
    return this._threshold;
  }

  async log(message: MessageDto): Promise<void> {

    let logMessage: string;

    logMessage = message.createdAt + ' ' + message.level + ' [' + message.hostname + ' ' + message.application + ']';
    logMessage += ' - ' + message.message + '\n' + (message.exception ? message.exception + '\n' : '');

    console.log(logMessage);
  }
}
