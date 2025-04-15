import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { Category } from 'src/category/category.schema';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        const { category, ...productData } = createProductDto;

        // If a category ID is provided, ensure it exists in the Category collection
        if (category) {
            const categoryExists = await this.categoryModel.exists({ _id: category });
            if (!categoryExists) {
                throw new Error('Category not found');
            }
        }

        // Proceed with creating the product
        const product = new this.productModel({
            ...productData,
            category: category || null,  // If no category, set it to null
        });

        return product.save();
    }



    async findAll(query: any = {}) {
        const filter: any = {};
        const sort: any = {};

        // Stock filter
        if (query.stock === 'in') filter.stock = { $gt: 0 };
        if (query.stock === 'out') filter.stock = { $eq: 0 };

        // Name search (case-insensitive, partial)
        if (query.search) {
            filter.name = { $regex: query.search, $options: 'i' };
        }

        // ✅ Category filter (expects category ID)
        if (query.category) {
            filter.category = query.category;
        }

        // Sorting
        if (query.sort === 'low') sort.price = 1;
        else if (query.sort === 'high') sort.price = -1;
        else if (query.sort === 'new') sort.createdAt = -1;

        // Pagination
        const page = parseInt(query.page, 10) || 1; // Default to page 1 if not provided
        const limit = parseInt(query.limit, 10) || 10; // Default to 10 items per page if not provided
        const skip = (page - 1) * limit;

        const products = await this.productModel
            .find(filter)
            .populate('category')
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec();

        const total = await this.productModel.countDocuments(filter);

        return {
            products,
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }


    async findOne(id: string) {
        return this.productModel.findById(id).populate('category');
    }

    async update(id: string, updateData: Partial<Product>) {
        return this.productModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id: string) {
        const result = await this.productModel.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Product not found');
        }
        return { message: 'Product deleted successfully' };
    }

    async findByCategory(category: string) {
        return this.productModel.find({ category }).populate('category');
    }


}
