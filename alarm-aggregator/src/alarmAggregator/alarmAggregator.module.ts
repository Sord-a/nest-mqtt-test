import { Module } from '@nestjs/common';
import { AlarmAggregatorService } from './alarmAggregator.service';
import { ConfigModule } from '@nestjs/config';
import { MqttClientModule } from '../mqttClient/mqttClient.module';

@Module({
  imports: [ConfigModule, MqttClientModule],
  controllers: [],
  providers: [AlarmAggregatorService],
})
export class AlarmAggregatorModule {}
