package com.estate.back.service.implimentation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.AuthService;

import lombok.RequiredArgsConstructor;

// Auth 모듈의 비즈니스 로직 구현체

@Service
@RequiredArgsConstructor
public class AuthServiceImplimentation implements AuthService {
  
  private final UserRepository userRepository;

  @Override
  public ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto) {
    
    try {

      String userId = dto.getUserId();
      boolean existedUser = userRepository.existsById(userId);
      if(existedUser) return ResponseDto.duplicateId(); 
      
    } catch (Exception exception) {
        exception.printStackTrace();
        return ResponseDto.databaseError();
    }
  
    return ResponseDto.success();

  }

  
}
