import fs from 'fs';
import {MessageDto} from '../../controllers/dto/message-dto.models';
import {IAppender} from '../../interfaces';
import {AppenderType, LogLevel} from '../../models/enumerations';

export class FileAppender implements IAppender {

  _threshold: LogLevel;
  _stream: any;
  _format: string;

  constructor(props: any) {

    this._threshold = process.env.LOGGIN_SERVICE_FILE_APPENDER_THRESHOLD || props.threshold;
    this._stream = fs.createWriteStream(process.env.LOGGIN_SERVICE_FILE_APPENDER_PATH || props.path, {flags: 'a'});
    this._format = process.env.LOGGIN_SERVICE_FILE_APPENDER_FORMAT || props.format;
  }

  getType(): AppenderType {
    return AppenderType.FILE;
  }

  getThreshold(): LogLevel {
    return this._threshold;
  }

  async log(message: MessageDto): Promise<void> {

    let logMessage: string;

    logMessage = message.createdAt + ' ' + message.level + ' [' + message.hostname + ' ' + message.application + ']';
    logMessage += ' - ' + message.message + '\n' + (message.exception ? message.exception + '\n' : '') + '\n';

    this._stream.write(logMessage);
  }
}
