import React, { ChangeEvent, useState } from 'react';
import './style.css';

import SignInBackground from 'src/assets/image/sign-in-background.png';
import SignUpBackground from 'src/assets/image/sing-up-background-image.png';
import InputBox from 'src/components/Inputbox';
import { EmailAuthRequsetDto, IdCheckRequsetDto } from 'src/apis/auth/dto/request';
import { emailAuthRequest, idCheckRequest } from 'src/apis/auth';
import ResponseDto from 'src/apis/response.dto';


type AuthPage = 'sign-in' | 'sign-up';

interface SnsContainerProps{
  title: string;
}

function SnsContainer({title}: SnsContainerProps) {
  
  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    alert(type);
  };

  return (
    <div className="authentication-sns-container">
      <div className="sns-container-title label">{title}</div>
      <div className="sns-button-container">
        <div className="sns-button kakao-button" onClick={() =>onSnsButtonClickHandler('kakao')}></div>
        <div className="sns-button naver-button" onClick={() =>onSnsButtonClickHandler('naver')}></div>
      </div>
    </div>
  );
  // onClick={() =>onSnsButtonClickHandler('naver')} 익명의 1회성 함수를 만들어서 함수를 호출하게 만듬(매개변수 적기)
};

interface Props {
  onLinkClickHandler : () => void;
}
//          component          //
function SignIn ({onLinkClickHandler}: Props) {
  //          state          //
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState<string>('');
  //          event handler          //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setMessage('');
  };
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessage('');
  };
  
  const onSignInButtonClickHandler = () => {
    const ID = 'service123';
    const PASSWORD = 'qwer1234';

    const isSuccess = id === ID && password === PASSWORD;
    
    if(isSuccess) {
      setId('');
      setPassword('');
      alert('로그인 성공!')
    } else {
      setMessage('로그인 정보가 일치하지 않습니다.')
    } 
  };

  //          render          //
  return (
    <div className='authentication-contents'>
      <div className='authentication-input-container'>
        <InputBox label={'아이디'} type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler}  />
        <InputBox label={'패스워드'} type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={message} error />
      </div>
      <div className='authentication-button-container'>
        <div className="primary-button full-width" onClick={onSignInButtonClickHandler}> 로그인</div>
        <div  className="text-link" onClick={onLinkClickHandler}>회원가입</div>
      </div>
      <div className='short-divider'></div>
      <div className='authentication-sns-container'></div>
      <SnsContainer title={'SNS 로그인'} />
    </div>
  )
};

//          component          //
function SignUp ({onLinkClickHandler}: Props) {

  //          state          //
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  const [idButtonStatus, setIdButtonStatus] = useState<boolean>(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setauthNumberButtonStatus] = useState<boolean>(false);
  
  const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
  const [isPasswordPattern,setIsPasswordPattern] = useState<boolean>(false);
  const [isEqaulPassword,setIsEqaulPassword] = useState<boolean>(false);
  const [isEmailCheck,setIsEmailCheck] = useState<boolean>(false);
  const [isAuthNumberCheck,setIsAuthNumberCheck] = useState<boolean>(false);

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [isIdError, setIsIdError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isAuthNumberError, setIsAuthNumberError] = useState<boolean>(false);

  const isSignUpActive = isIdCheck && isEmailCheck && isAuthNumberCheck && isPasswordPattern && isEqaulPassword;
  // primary-button full-width / disable-button full-width
  const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`
  // isSignUpActive ? 'primary-button full-width' : 'disable-button full-width' 
  // (isSignUpActive ? 'primary' :  'disable') + -'button full-width'

  //                    function                    //
  const idCheckResponse = (result: ResponseDto | null) => {

    const idMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '아이디는 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
      result.code === 'DI' ? '이미 사용중인 아이디 입니다.' :
      result.code === 'DBE' ? '서버에 접근할 수 없습니다.' :
      result.code === 'SU' ? '사용 가능한 아이디입니다.' : '';
    const idError = !(result && result.code === 'SU');
    const idCheck = !idError;

    setIdMessage(idMessage);
    setIsIdError(idError);
    setIsIdCheck(idCheck);

};

const emailAuthResponse = (result: ResponseDto | null) => {

  const emailMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '이메일 형식이 아닙니다.' :
      result.code === 'DE' ? '이미 사용중인 이메일 입니다.' :
      result.code === 'MF' ? '인증번호 전송에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 전송되었습니다.' : '';
    const emailCheck = result !== null && result.code === 'SU';
    const emailError = !emailCheck;

    setEmailMessage(emailMessage);
    setIsEmailCheck(emailCheck);
    setIsEmailError(emailError);
};

  //          event handler          //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setId(value);
    setIdButtonStatus(value !=='');
    setIsIdCheck(false);
    setIdMessage('');
  }
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value)
    const passwordPattern = /^(?=.*[a-zA-Z0-9])(?=.*[0-9]).{8,13}$/
    const isPassworPattern = passwordPattern.test(value);
    setIsPasswordPattern(isPassworPattern);
    const passwordMessage =
      isPassworPattern ? '':
      value ? '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqulPassword = passwordCheck === value
    const passwordCheckMessage = isEqulPassword ? '': 
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);


  }
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswordCheck(value);
    const isEqulPassword = password === value
    const passwordCheckMessage = isEqulPassword ? '': 
    passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setIsEqaulPassword(isEqaulPassword);
    setPasswordCheckMessage(passwordCheckMessage);
  }
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
    setEmailButtonStatus(value !=='');
    setIsEmailCheck(false);
    setIsAuthNumberCheck(false);
    setEmailMessage('');
  }
  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setAuthNumber(value);
    setauthNumberButtonStatus(value !=='');
    setIsAuthNumberCheck(false);  
    setAuthNumberMessage('');
  };

  const onIdButtonClickHandler = () => {
    if(!idButtonStatus) return;
    // if(!id || !id.trim()) return;

    const requsetBody: IdCheckRequsetDto = { userId: id };
    idCheckRequest(requsetBody).then(idCheckResponse);
  };  

  const onEmailButtonClickHandler = () => {
    if(!emailButtonStatus) return;

    const emailPattern = /^([-.]?[a-zA-Z0-9])*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailPattern = emailPattern.test(email);
    if(!isEmailPattern) {
      setEmailMessage('이메일 형식이 아닙니다.');
      setIsEmailError(true);
      setIsEmailCheck(false);  
      return;
    }
    
    const requestBody: EmailAuthRequsetDto = { userEmail : email};
    emailAuthRequest(requestBody).then(emailAuthResponse);

  };

  const onAuthNumberButtonClickHandler = () => {
    if(!authNumberButtonStatus) return;
    
    const authNumberCheck = authNumber === '1234';
    setIsAuthNumberCheck(authNumberCheck);
    setIsAuthNumberError(!authNumberCheck);

    const authNumberMessage = authNumberCheck ? '인증번호가 확인되었습니다' : '인증번호가 일치하지 않습니다.'
    setAuthNumberMessage(authNumberMessage)
  };  

  const onSignUpButtonClickHandler = () => {
    if(!isSignUpActive) return;
    alert(`아이디 : ${id} / 비밀번호 : ${password} / 비밀번호 확인 : ${passwordCheck} / 이메일 : ${email} / 인증번호: ${authNumber} ` );
    setId('');
    setPassword('');
    setPasswordCheck('');
    setEmail('');
    setAuthNumber('');
    alert(`아이디 : ${id} / 비밀번호 : ${password} / 비밀번호 확인 : ${passwordCheck} / 이메일 : ${email} / 인증번호: ${authNumber} ` );
  };

  //          render          //
  return (
    <div className='authentication-contents'>
    <SnsContainer title='SNS 회원가입' />
    <div className='short-divider'></div>
    <div className='authentication-input-container'>

    <InputBox label={'아이디'} type={'text'} value={id} placeholder={'아이디를 입력해주세요'} onChangeHandler={onIdChangeHandler} buttonTitle='중복 확인' buttonStatus={idButtonStatus} onButtonClickHandler={onIdButtonClickHandler} message={idMessage} error={isIdError} />

    <InputBox label={'비밀번호'} type={'password'} value={password} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

    <InputBox label={'비밀번호 확인'} type={'password'} value={passwordCheck} placeholder={'비밀번호를 입력해주세요'} onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

    <InputBox label={'이메일'} type={'text'} value={email} placeholder={'이메일 주소를 입력해주세요'} onChangeHandler={onEmailChangeHandler} buttonTitle='이메일 인증' buttonStatus={emailButtonStatus} onButtonClickHandler={onEmailButtonClickHandler} message={emailMessage} error={isEmailError}  /> 

    { 
    isEmailCheck &&
    <InputBox label={'인증번호'} type={'text'} value={authNumber} placeholder={'인증번호 4자리를 입력해주세요'} onChangeHandler={onAuthNumberChangeHandler} buttonTitle='인증 확인' buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />
    }

    </div>
    <div className='authentication-button-container'>
      <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}> 회원가입</div>
      <div  className="text-link" onClick={onLinkClickHandler}>로그인</div>
    </div>
  </div>
  )
};

//           component           //
export default function Authentication() {

  const [page, setPage] = useState<AuthPage>('sign-up'); //useState는 컴포넌트 내부에 선언되어야 함

  const onLinkClickHandler = () => {
    if  (page === 'sign-in') setPage('sign-up');
    else setPage('sign-in');
  };

  const AuthenticationContents = 
  page === 'sign-in' ? 
  <SignIn onLinkClickHandler={onLinkClickHandler} /> : 
  <SignUp onLinkClickHandler={onLinkClickHandler} />

  const imageBoxStyle = { backgroundImage: `url(${page === 'sign-in' ? SignInBackground : SignUpBackground})`}

  //              render             //
  return (
    <div id="authentication-wrapper">
      <div 
        className='authentication-image-box' 
        style={imageBoxStyle}></div>
      <div className='authentication-box'>
        <div className='authentication-container'>
          <div className='authentication-title h1'>{'임대 주택 가격 서비스'}</div>
          { AuthenticationContents }
        </div>
      </div>
    </div>
  )
}
