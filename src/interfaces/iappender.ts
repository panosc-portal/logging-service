import {MessageDto} from '../controllers/dto/message-dto.models';
import {AppenderType, LogLevel} from '../models/enumerations';

export interface IAppender {

  getType(): AppenderType;
  getThreshold(): LogLevel;

  log(message: MessageDto): Promise<void>;
}
