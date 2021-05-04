import {model, property} from '@loopback/repository';
import {LogLevel} from '../../models/enumerations';

class Metadata {

  @property({type: 'number'})
  correlationId?: number;
}

@model()
export class MessageDto {

  @property({type: 'Date', required: true})
  createdAt: Date;

  @property({type: 'string', required: true})
  message: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(LogLevel)
    }
  })
  level: LogLevel;

  @property({type: 'string', required: true})
  application: string;

  @property({type: 'string', required: true})
  hostname: string;

  @property({type: 'string'})
  exception?: string;

  @property({type: 'Object'})
  metadata?: Metadata;

  constructor(data?: Partial<MessageDto>) {
    Object.assign(this, data);
  }
}
