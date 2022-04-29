import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
// yarn add @types/graphql-upload --dev
// 타입 스크립트 부분은 dev dependency에 넣어야함
// dependencies에 있는 것은 실행에 필요한 것들임
// 하지만 개발을 할때 편하게 하기위해 dev dependencies에 따로 넣어줌
// vscode에서 편하게 사용하기 위해
@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}
  //파일을 얻어와서 파일을 받고 서비스로 토스
  @Mutation(() => [String]) // 파일 여러개 배열형태
  uploadFile(
    //graphql-upload 라는 라이브러리를 설치하고 파일을 받아야 그래프 큐엘에서 인식 가능

    // 브라우저에서 파일이 넘어 올때는 GraphQLUpload로 받고
    // 리졸버와 서비스에서 사용하기 위해 FileUpload
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    console.log(files); // 파일 들어오니?
    return this.fileService.upload({ files });
  }
}

// 1 . 파일이 어떻게 들어오는지 확인
