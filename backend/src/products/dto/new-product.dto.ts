import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class NewProductDto {
  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Number)
  @IsNumber()
  price: number;

  @Field(() => String)
  @IsString()
  image: string;
}
