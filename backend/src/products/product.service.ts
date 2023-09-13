import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async updateProduct(id: number, data: UpdateProductDto) {
    if (
      await this.productsRepository.exist({
        where: {
          id,
        },
      })
    ) {
      await this.productsRepository.update(id, data);
      return this.productsRepository.findOne({ where: { id } });
    }
    throw new NotFoundException('Produto não encontrado');
  }

  async deleteProduct(id: number) {
    if (
      await this.productsRepository.exist({
        where: {
          id,
        },
      })
    ) {
      const { affected } = await this.productsRepository.delete(id);
      return { status: affected > 0 ? 'success' : 'fail' };
    }
    throw new NotFoundException('Produto não encontrado');
  }
}
