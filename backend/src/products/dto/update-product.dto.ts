import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @Field(() => String)
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Number)
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field(() => String)
  @IsString()
  @IsOptional()
  image?: string;
}
