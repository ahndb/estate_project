package com.estate.back.dto.response;

// 200 성공 : SU / Success.
// 400 필수 데이터 미입력 : VF / Varidation Failed.
// 400 중복된 아이디 : DI / Duplicated Id.
// 400 중복된 이메일 : DE / Duplicated Email.
// 401 로그인 정보 불일치 : SF / Sign in Failed.
// 401 인증 실패 : AF / Authentication Failed.
// 500 토큰 생성 실패 : TF / Token creation Failed.
// 500 이메일 전송 실패 : MF / Mail send Failed.
// 500 데이터베이스 오류 : DBE / Database Error.
// Response의 공통된 message 값

public interface ResponseMessage {
  String SUCCESS = "Success.";
  String VALIDATION_FAILED = "Validation failed.";
  String DUPLICATED_ID = "Duplicated id.";  
  String DUPLICATED_EMAIL = "Duplicated email.";
  String SIGN_IN_FAILED = "Sign in Failed.";
  String AUTHORIZATION_FAILED = "Authorization Failed.";
  String TOKEN_CREATION_FAILED = "Token creation Failed.";
  String MAIL_SEND_FAILED = "Mail send Failed.";
  String DATABASE_ERROR = "Database error.";
}