import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MqttClient, connectAsync } from 'mqtt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MqttRepository implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  private client: MqttClient;
  private readonly logger = new Logger(MqttRepository.name);

  async onModuleInit() {
    this.client = await connectAsync(this.configService.get('MQTT_BROKER_URL'));
    this.logger.log(
      `Connected to MQTT broker from ${this.configService.get('APP_NAME')}`,
    );
  }

  async publish(topic: string, message: string): Promise<void> {
    await this.client.publishAsync(topic, message);
  }
}
