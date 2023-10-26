import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../graphql-types/user.type';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Query(() => User)
    async getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('id', { type: () => String }) id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => User)
    async deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }
}

