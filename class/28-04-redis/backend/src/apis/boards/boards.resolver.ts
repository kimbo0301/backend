import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // 캐시 저장
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 10, // 세번째 인자로 ttl 객체가 들어감 ttl:0은 무제한(이라고 해봤자 메모리 기반이라 껐다키면 증발)
    }); // key,value 형태로 저장 여기에 저장하는 데이터들은 my-redis에 저장 (컴퓨터 껐다키면 증발)
    // 객체는 객체 자체로 저장이 가능함 (createBoardInput)
    // 데이터 꺼내오기
    const mycache = await this.cacheManager.get('aaa'); // key에 해당하는 값 꺼내옴

    console.log(mycache); // 조회 되는 얘들 콘솔찍어보기

    return '캐시 테스트 중!!';
    // 레디스 연습을 위해서 주석 걸기!!!
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // return this.boardService.create();
  }
}
