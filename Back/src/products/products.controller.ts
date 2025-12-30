import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    async findAll() {
        const products = await this.productsService.findAll();
        return products.map(prod => ({
            _id: prod.id,
            name: prod.name,
            category_name: 'Unknown',
            description: prod.description,
            product_image: prod.product_image
        }));
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.productsService.findById(id);
        return {
            product: product
        };
    }
}
