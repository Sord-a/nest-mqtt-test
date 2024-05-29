import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttClientRepository } from './mqttClient.repository';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MqttClientRepository],
  exports: [MqttClientRepository],
})
export class MqttClientModule {}
