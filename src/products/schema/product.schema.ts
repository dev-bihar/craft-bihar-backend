import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, UpdateQuery } from 'mongoose';
import { Category } from 'src/category/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ default: true })
  inStock: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Pre-save hook to set inStock based on stock value
ProductSchema.pre('save', function (next) {
  if (this.stock > 0) {
    this.inStock = true;
  } else {
    this.inStock = false;
  }
  next();
});

// Pre-update hook to set inStock when stock is updated
ProductSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as UpdateQuery<ProductDocument>; // Explicitly cast the update query
  if (update.stock !== undefined) {
    update.inStock = update.stock > 0;
  }
  next();
});
