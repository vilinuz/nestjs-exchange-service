import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExchangedCurrencyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly currency: string;
}
