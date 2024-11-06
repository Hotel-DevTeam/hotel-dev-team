import { Controller, Get } from '@nestjs/common';
import { ExchangeRateService } from './dollar.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('exchange-rate')
@ApiTags('Dollar')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get('/dollar')
  async getDollarRate() {
    return await this.exchangeRateService.getDollarValue();
  }
}
