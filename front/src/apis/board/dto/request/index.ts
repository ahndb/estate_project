// description: Q&A 작성 Request Body DTO //
export interface PostBoardRequestDto {
  title : string;
  contents : string;
}

// description: Q&A 코멘트 작성 Request Body DTO //
export interface PostCommentRequestDto {
  comment : string;
}

// description: Q&A 게시물 수정 Request Body DTO //
export interface PutBoardRequestDto {
  title : string;
  contents : string;
}

