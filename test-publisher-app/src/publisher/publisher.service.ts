import { Injectable } from '@nestjs/common';
import { MqttRepository } from '../mqtt/mqtt.repository';

@Injectable()
export class PublisherService {
  constructor(
    private readonly mqttRepository: MqttRepository,
  ) {}

  async publish(topic: string, message: string): Promise<void> {
    await this.mqttRepository.publish(topic, message);
  }
}
