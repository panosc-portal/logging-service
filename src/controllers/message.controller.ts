import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {MessageService} from '../services';
import {BaseController} from './base.controller';
import {MessageDto} from './dto/message-dto.models';


export class MessageController extends BaseController {

  constructor(@inject('services.MessageService') private _messageService: MessageService) {
    super();
  }

  @post('/messages', {
    summary: 'Create a log message',
    responses: {
      '201': {
        description: 'Created'
      }
    }
  })
  message(@requestBody() message: MessageDto): void {
    this._messageService.log(message);
  }
}
