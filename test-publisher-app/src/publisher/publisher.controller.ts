import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('mqtt')
export class PublisherController {
  constructor(private readonly mqttService: PublisherService) {}

  @Get(':id/')
  publish(@Param() { id }, @Query() { value }): Promise<void> {
    return this.mqttService.publish(
      `site/123/photovoltaic/skidControlUnits/01A/inverters/${id}/status`,
      `${value}`,
    );
  }
}
