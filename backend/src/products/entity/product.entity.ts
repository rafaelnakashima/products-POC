import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: 'products',
})
export class ProductEntity {
  @Field()
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Field()
  @Column({
    length: 126,
  })
  description: string;

  @Field()
  @Column('decimal', {
    precision: 6,
    scale: 2,
  })
  price: number;

  @Field()
  @Column()
  image: string;
}
