import axios from "axios";
import { PostBoardRequestDto } from "./dto/request";
import { POST_BOARD_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";

// function:: Q&A 작성 API 함수
export const PostBoardRequest = async (requstBody: PostBoardRequestDto, accessToken: string) => { 
  const result = await axios.post(POST_BOARD_REQUEST_URL, requstBody, bearerAuthorization(accessToken))
    .then(requestHandler<ResponseDto>)
    .catch(requestErrorHandler);
};