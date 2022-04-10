import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateuser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    fetchUsers() {
        return this.userService.findAll();
    }

    @Query(() => User)
    fetchUser(@Args('userId') userId: string) {
        return this.userService.findOne({ userId });
    }

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create({ createUserInput });
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('userId') userId: string) {
        return this.userService.delete({ userId });
    }

    @Mutation(() => User)
    async updateUser(
        @Args('userId') userId: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return await this.userService.update({
            userId,
            updateUserInput,
        });
    }
}
