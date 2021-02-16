import {MessageDto} from '../../controllers/dto/message-dto.models';
import {IAppender} from '../../interfaces';
import {AppenderType, LogLevel} from '../../models/enumerations';


export class SlackAppender implements IAppender {

  _threshold: LogLevel;
  _format: string;

  constructor(props: any) {
    this._threshold = props.threshold;
    this._format = props.format;
  }

  getType(): AppenderType {
    return AppenderType.SLACK;
  }

  getThreshold(): LogLevel {
    return this._threshold;
  }

  async log(message: MessageDto): Promise<void> {
    console.log(message.message);
  }
}
