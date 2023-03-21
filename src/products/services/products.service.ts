import { Injectable, NotFoundException } from '@nestjs/common';
import { throwError } from 'rxjs';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Producto 1 descripción',
      price: 200,
      image: '',
      stock: 10,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const productExist = this.products.some((item) => item.id === id);
    if (!productExist) {
      throw new NotFoundException(`Producto ${id} no existe`);
    }
    return this.products.find((item) => item.id === id);
  }

  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const productFound = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productFound !== -1) {
      throwError(() => new Error(`Producto ${id} no existe`));
    }
    this.products[productFound] = {
      id: id,
      ...this.products[productFound],
      ...payload,
    };
    return {
      message: `Producto ${id} actualizado`,
    };
  }

  remove(id: number) {
    const productFound = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productFound !== -1) {
      throw new NotFoundException(`Producto ${id} no existe`);
    }
    this.products.splice(productFound, 1);
    return {
      message: `Producto ${id} eliminado`,
    };
  }
}
