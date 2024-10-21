import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; 
import { firstValueFrom } from 'rxjs';
import * as https from 'https'
@Injectable()
export class ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}

  async getDollarValue() {
     const agent = new https.Agent({
      rejectUnauthorized: false, 
    });
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones', {
          httpsAgent: agent,
        })
      );
      return response.data; 
    } catch (error) {
      console.error('Error fetching dollar value:', error);
      throw error; 
    }
  }
}
