import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas-mongoose/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async getCategoryById(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    }

    async deleteCategory(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}
