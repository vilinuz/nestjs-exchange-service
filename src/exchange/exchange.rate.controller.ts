import {Controller, Get, Query} from '@nestjs/common';
import {ExchangeRateService} from './exchange.rate.service';
import {ExchangedCurrencyDto} from './dto/exchanged.currency.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Observable} from 'rxjs';

@ApiTags('api')
@Controller('api')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @ApiOperation({
    summary: 'Get exchange rate for given amount and pair of currencies',
    parameters: [
      {
        name: 'sourceCurrency',
        in: 'query',
      },
      {
        name: 'targetCurrency',
        in: 'query',
      },
      {
        name: 'amount',
        in: 'query',
      },
    ],
  })
  @Get('exchange')
  getExchangeRate(
    @Query('amount') amount: number,
    @Query('sourceCurrency') sourceCurrency: string,
    @Query('targetCurrency') targetCurrency: string,
  ): Observable<ExchangedCurrencyDto> {
    return this.exchangeRateService.exchange(amount, sourceCurrency, targetCurrency);
  }
}
