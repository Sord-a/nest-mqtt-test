import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {
  MqttClient,
  OnConnectCallback,
  OnErrorCallback,
  OnMessageCallback,
  connectAsync,
} from 'mqtt';
import { ConfigService } from '@nestjs/config';
import { MqttEvent } from '../constants/MqttEvent';
import { ConnectError } from '../errors/ConnectError';

@Injectable()
export class MqttClientRepository implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(MqttClientRepository.name);

  public client: MqttClient;

  async onModuleInit() {
    this.client = await connectAsync(this.configService.get('MQTT_BROKER_URL'));
    this.logger.log(`Connected to MQTT broker`);

    this.client.on(MqttEvent.error, () => {
      throw new ConnectError({ message: 'Error connecting to MQTT broker' });
    });
  }

  get mqttClient(): MqttClient {
    return this.client;
  }

  async subscribe(topic: string) {
    this.logger.log(`SUBSCRIBING to ${topic}`);
    return this.client.subscribeAsync(topic);
  }

  async publish(topic: string, value: string) {
    this.logger.log(`PUBLISHING to ${topic} value ${value}`);
    return this.client.publishAsync(topic, value);
  }

  addEventHandler(
    mqttEvent: MqttEvent,
    callback: OnErrorCallback | OnConnectCallback | OnMessageCallback,
  ) {
    this.client.on(mqttEvent, callback);
  }
}
