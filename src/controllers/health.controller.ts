import {inject} from '@loopback/core';
import {get} from '@loopback/rest';
import {Health} from '../models/enumerations';
import {HealthService} from '../services';
import {BaseController} from './base.controller';


export class HealthController extends BaseController {

  constructor(@inject('services.HealthService') private _healthService: HealthService) {
    super();
  }

  @get('/health', {
    summary: 'Check the service is up and running',
    responses: {
      '200': {
        description: 'OK'
      }
    }
  })
  health(): Promise<Health> {
    return Promise.resolve(Health.UP);
  }
}
