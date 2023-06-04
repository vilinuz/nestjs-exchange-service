import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ExchangedCurrencyDto} from './dto/exchanged.currency.dto';
import {ExchangeApiUrl} from './constants';
import {HttpService} from '@nestjs/axios';
import {catchError, map, Observable} from 'rxjs';

@Injectable()
export class ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}

  exchange(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Observable<ExchangedCurrencyDto> {
      if (!amount || !fromCurrency || !toCurrency) {
          throw new BadRequestException('Invalid request');
      }
    return this.httpService
      .get(
        `${ExchangeApiUrl}?base=${fromCurrency}&symbols=${toCurrency}&amount=${amount}`,
      )
      .pipe(
        map((rates) => {
          const rate = rates.data.rates[toCurrency];
          if (!rate) {
              new BadRequestException(`Currency ${fromCurrency} is invalid`);
          }

          return { amount: rate, currency: toCurrency };
        }),
      )
    .pipe(catchError((error) => {
        throw new InternalServerErrorException(error);
    }))
  };
}
