import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StarbucksService } from './starbucks.service';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Starbucks } from './entities/starbucks.entity';
@Resolver()
export class StarbucksResolver {
    constructor(private readonly starbucksService: StarbucksService) {}

    @Query(() => [Starbucks])
    fetchBoards(): Starbucks[] {
        return this.starbucksService.findAll();
    }
    @Mutation(() => String)
    //wirter을 받아옴 wirter라는 변수에 string으로 받음 아규먼트
    createBoard(
        @Args('createstarbucksInput')
        createstarbucksInput: CreateStarbucksInput,
    ) {
        console.log(createstarbucksInput);
        return this.starbucksService.create(createstarbucksInput);
    }
}
