import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [ConfigModule, MqttModule],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
