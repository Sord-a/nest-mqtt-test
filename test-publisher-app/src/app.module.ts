import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [ConfigModule.forRoot(), MqttModule, PublisherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
