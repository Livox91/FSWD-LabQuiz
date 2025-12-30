import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category_id: string;

    @Column()
    name: string;

    @Column()
    product_image: string;

    @Column({ nullable: true })
    description: string;
}
