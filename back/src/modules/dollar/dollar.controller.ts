import { Controller, Get } from '@nestjs/common';
import { ExchangeRateService } from './dollar.service';



@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get('/dollar')
  async getDollarRate() {
    return await this.exchangeRateService.getDollarValue();
  }
}
