import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MqttClientModule } from './mqttClient/mqttClient.module';
import { AlarmAggregatorModule } from './alarmAggregator/alarmAggregator.module';

@Module({
  imports: [ConfigModule.forRoot(), MqttClientModule, AlarmAggregatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
