import { Test, TestingModule } from '@nestjs/testing';
import { AlarmAggregatorService } from './alarmAggregator.service';
import { MqttClientRepository } from '../mqttClient/mqttClient.repository';
import { ValidationError } from '../errors/ValidationError';
import { MqttEvent } from '../constants/MqttEvent';
import {
  childTopics,
  parentTopic,
  childTopicsStatus,
} from '../topics/topics_dev';

jest.mock('../mqttClient/mqttClient.repository');

describe('AlarmAggregatorService', () => {
  let service: AlarmAggregatorService;
  let mqttClientRepository: MqttClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlarmAggregatorService,
        {
          provide: MqttClientRepository,
          useValue: {
            addEventHandler: jest.fn(),
            publish: jest.fn(),
            subscribe: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlarmAggregatorService>(AlarmAggregatorService);
    mqttClientRepository =
      module.get<MqttClientRepository>(MqttClientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should initialize and subscribe to topics', async () => {
      const spySubscribeToTopics = jest.spyOn(service, 'subscribeToTopics');
      await service.onModuleInit();
      expect(mqttClientRepository.addEventHandler).toHaveBeenCalledWith(
        MqttEvent.message,
        expect.any(Function),
      );
      expect(spySubscribeToTopics).toHaveBeenCalledWith(childTopics);
      expect(mqttClientRepository.publish).toHaveBeenCalledWith(
        parentTopic,
        '1',
      );
    });
  });

  describe('handleMessage', () => {
    beforeEach(() => {
      Object.keys(childTopicsStatus).forEach((topic) => {
        childTopicsStatus[topic] = '0';
      });
    });

    it('should handle message and update childTopicsStatus with 0 also publishing 0 to parent topic', async () => {
      childTopicsStatus[Object.keys(childTopicsStatus)[0]] = 1;
      await service.handleMessage(Object.keys(childTopicsStatus)[0], '0');
      expect(childTopicsStatus[Object.keys(childTopicsStatus)[0]]).toBe('0');
      expect(mqttClientRepository.publish).toHaveBeenCalledWith(
        parentTopic,
        '0',
      );
    });

    it('should publish 1 if all child topics state 1', () => {
      Object.keys(childTopicsStatus).forEach(async (topic, i) => {
        await service.handleMessage(Object.keys(childTopicsStatus)[i], '1');
      });

      Object.keys(childTopicsStatus).forEach((topic, i) => {
        expect(childTopicsStatus[Object.keys(childTopicsStatus)[i]]).toBe('1');
      });

      expect(mqttClientRepository.publish).toHaveBeenCalledWith(
        parentTopic,
        '1',
      );
    });

    it('should not publish 1 if all child topics state were not 1', () => {
      Object.keys(childTopicsStatus).forEach(async (topic, i) => {
        await service.handleMessage(
          Object.keys(childTopicsStatus)[i],
          i === 2 ? '0' : '1',
        );
      });

      Object.keys(childTopicsStatus).forEach((topic, i) => {
        expect(childTopicsStatus[Object.keys(childTopicsStatus)[i]]).toBe(
          i === 2 ? '0' : '1',
        );
      });

      expect(mqttClientRepository.publish).not.toHaveBeenCalledWith(
        parentTopic,
        '1',
      );
    });
  });

  describe('validatePayload', () => {
    it('should throw ValidationError for invalid value', () => {
      expect(() => service.validatePayload('3')).toThrow(ValidationError);
    });

    it('should not throw error for valid value', () => {
      expect(() => service.validatePayload('0')).not.toThrow();
      expect(() => service.validatePayload('1')).not.toThrow();
    });
  });

  describe('subscribeToTopics', () => {
    it('should subscribe to topics and use allSettledWithRetry', async () => {
      await service.subscribeToTopics(childTopics);
      expect(mqttClientRepository.subscribe).toHaveBeenCalledTimes(
        childTopics.length,
      );
    });
  });
});
