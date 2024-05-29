import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ValidationError } from '../errors/ValidationError';
import { MqttEvent } from '../constants/MqttEvent';
import {
  childTopics,
  parentTopic,
  childTopicsStatus,
} from '../topics/topics_dev';
import { MqttClientRepository } from '../mqttClient/mqttClient.repository';

@Injectable()
export class AlarmAggregatorService implements OnModuleInit {
  constructor(private readonly mqttClientRepository: MqttClientRepository) {}
  private readonly logger = new Logger(AlarmAggregatorService.name);

  async onModuleInit() {
    this.mqttClientRepository.addEventHandler(
      MqttEvent.message,
      async (topic, message) => {
        await this.handleMessage(topic, message.toString());
      },
    );

    await this.subscribeToTopics(childTopics);
    await this.mqttClientRepository.publish(parentTopic, '1');
  }

  async handleMessage(topic: string, message: string) {
    try {
      this.validatePayload(message);
    } catch (e) {
      this.logger.error(e);
    }

    if (childTopics.includes(topic)) {
      childTopicsStatus[topic] = message;
      if (message === '0') {
        await this.mqttClientRepository.publish(parentTopic, '0');
      } else if (
        message === '1' &&
        Object.values(childTopicsStatus).every((status) => status === '1')
      ) {
        await this.mqttClientRepository.publish(parentTopic, '1');
      }
    }
  }

  validatePayload(value: string): ValidationError | void {
    const validValues = ['0', '1'];

    if (!validValues.includes(value)) {
      throw new ValidationError({ message: 'value is not valid', value });
    }
  }

  async subscribeToTopics(topics: string[]) {
    const promises = topics.map((topic) => {
      this.mqttClientRepository.subscribe(topic);
    });

    return await Promise.allSettled(promises);
  }
}
