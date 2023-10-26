import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../services/category.service';
import { Category } from '../graphql-types/category.type';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [Category])
    async getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories();
    }

    @Query(() => Category)
    async getCategoryById(@Args('id', { type: () => String }) id: string): Promise<Category> {
        return this.categoryService.getCategoryById(id);
    }

    @Mutation(() => Category)
    async createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(createCategoryInput);
    }

    @Mutation(() => Category)
    async updateCategory(
        @Args('id', { type: () => String }) id: string,
        @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, updateCategoryInput);
    }

    @Mutation(() => Category)
    async deleteCategory(@Args('id', { type: () => String }) id: string): Promise<Category> {
        return this.categoryService.deleteCategory(id);
    }
}
