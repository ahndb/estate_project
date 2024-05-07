// description: Q&A 작성 Request Body DTO //
export interface PostBoardRequestDto {
  title : string;
  contents : string;
}

// description: Q&A 코멘트 작성 Request Body DTO //
export interface PostCommentRequestDto {
  comment : string;
}

