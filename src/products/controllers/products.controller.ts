import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Body,
  Delete,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductsFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   message: `product ${productId}`,
    // };
    return {
      message: `Producto ${productId}`,
      body: this.productService.findOne(productId),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listado de todos los productos' })
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ) {
    // return {
    //   message: `products limit => ${limit} offset => ${offset} brand => ${brand}`,
    // };
    return this.productService.findAll();
  }

  @Post()
  postProduct(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'producto',
    //   payload,
    // };
    return {
      message: `Producto creado`,
      body: this.productService.create(payload),
    };
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    // return {
    //   id,
    //   payload,
    // };
    return {
      message: `Producto ${id} actualizado`,
      body: this.productService.update(id, payload),
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return {
      message: `Producto ${id} eliminado`,
      id,
    };
  }
}
