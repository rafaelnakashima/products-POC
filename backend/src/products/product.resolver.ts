import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import GraphQLJSON from 'graphql-type-json';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductEntity])
  public async getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAll();
  }

  @Query(() => ProductEntity)
  public async getProductById(@Args('id') id: number): Promise<ProductEntity> {
    return this.productService.getById(id);
  }

  @Mutation(() => ProductEntity)
  createProduct(@Args('input') input: NewProductDto) {
    return this.productService.createProduct(input);
  }

  @Mutation(() => ProductEntity)
  updateProduct(
    @Args('id') id: number,
    @Args('input') input: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, input);
  }

  @Mutation(() => GraphQLJSON)
  deleteProduct(@Args('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
