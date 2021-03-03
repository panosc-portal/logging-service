import {bind, BindingScope} from '@loopback/core';
import {MessageDto} from '../controllers/dto/message-dto.models';
import {logger} from '../utils/logger';

@bind({scope: BindingScope.SINGLETON})
export class MessageService {

  async log(message: MessageDto): Promise<void> {
    logger.log(message.level.toLowerCase(), message);
  }
}
