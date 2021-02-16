import {bind, BindingScope} from '@loopback/core';
import {MessageDto} from '../controllers/dto/message-dto.models';
import {IAppender} from '../interfaces';
import {AppenderFactory} from '../utils';
import {appendersConfig} from '../utils/appenders/appenders-config';
import {compareLogLevel} from '../utils/log-level-comparator';

@bind({scope: BindingScope.SINGLETON})
export class MessageService {

  private _appenders: Array<IAppender>;

  constructor() {
    this._appenders = new Array<IAppender>();

    appendersConfig.appenders.forEach(element => {
      this._appenders.push(AppenderFactory.createAppender(element));
    });
  }

  log(message: MessageDto): void {

    this._appenders.forEach((appender) => {

      if (compareLogLevel(message.level, appender.getThreshold()) <= 0) {
        appender.log(message);
      }
    });
  }
}
