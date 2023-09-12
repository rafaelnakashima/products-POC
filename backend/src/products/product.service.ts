import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { NewProductDto } from './dto/new-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async getAll() {
    return this.productsRepository.find();
  }

  async getById(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createProduct(data: NewProductDto) {
    if (
      await this.productsRepository.exist({
        where: {
          description: data.description,
        },
      })
    ) {
      throw new BadRequestException('produto já existente');
    }

    const product = this.productsRepository.create(data);
    return this.productsRepository.save(product);
  }
}
