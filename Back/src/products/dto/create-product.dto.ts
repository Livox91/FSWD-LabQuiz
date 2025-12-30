import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsOptional()
    category_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    product_image: string;

    @IsString()
    @IsOptional()
    description?: string;
}
