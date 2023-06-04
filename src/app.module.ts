import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange/exchange.rate.controller';
import { ExchangeRateService } from './exchange/exchange.rate.service';
import { HttpModule } from '@nestjs/axios';
import { ExchangeMaxRedirects, ExchangeTimeout } from './exchange/constants';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        maxRedirects: ExchangeMaxRedirects,
        timeout: ExchangeTimeout,
      }),
    }),
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
})
export class AppModule {}
