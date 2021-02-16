import {bind, BindingScope} from '@loopback/core';
import {Health} from '../models/enumerations';

@bind({scope: BindingScope.SINGLETON})
export class HealthService {

  async getHealth(): Promise<Health> {
    return Health.UP;
  }
}
