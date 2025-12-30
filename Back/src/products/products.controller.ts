import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    private readonly logger = new Logger(ProductsController.name);

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        this.logger.log('Creating product with data:', createProductDto);
        try {
            const result = await this.productsService.create(createProductDto);
            this.logger.log('Product created successfully:', result);
            return result;
        } catch (error) {
            this.logger.error('Error creating product:', error.message);
            throw error;
        }
    }

    @Get()
    async findAll() {
        this.logger.log('Fetching all products');
        try {
            const products = await this.productsService.findAll();
            this.logger.log(`Found ${products.length} products`);
            return products.map(prod => ({
                _id: prod.id,
                name: prod.name,
                category_name: 'Unknown',
                description: prod.description,
                product_image: prod.product_image
            }));
        } catch (error) {
            this.logger.error('Error fetching products:', error.message);
            throw error;
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        this.logger.log('Fetching product with id:', id);
        try {
            const product = await this.productsService.findById(id);
            if (!product) {
                this.logger.warn('Product not found with id:', id);
            }
            return {
                product: product
            };
        } catch (error) {
            this.logger.error('Error fetching product:', error.message);
            throw error;
        }
    }
}
