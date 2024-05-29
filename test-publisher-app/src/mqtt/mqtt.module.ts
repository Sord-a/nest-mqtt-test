import { Module } from '@nestjs/common';
import { MqttRepository } from './mqtt.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MqttRepository],
  exports: [MqttRepository],
})
export class MqttModule {}
