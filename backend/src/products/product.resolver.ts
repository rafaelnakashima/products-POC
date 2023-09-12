import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { NewProductDto } from './dto/new-product.dto';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductEntity])
  public async getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAll();
  }

  @Mutation(() => ProductEntity)
  createProduct(@Args('input') input: NewProductDto) {
    return this.productService.createProduct(input);
  }
}
