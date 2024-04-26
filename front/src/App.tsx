import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { AUTH_PATH, LOCAL_PATH, QNA_DEATIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, RATIO_PATH, SERVICE_PATH } from './constant';

function App() {
  return (
    <Routes>
      <Route path={AUTH_PATH} element={<></>} />
      <Route path={SERVICE_PATH} element={<></>} >
        <Route path={LOCAL_PATH} element={<></>} />
        <Route path={RATIO_PATH} element={<></>} />
        <Route path={QNA_PATH} >
          <Route index element={<></>} />
          <Route path={QNA_WRITE_PATH} element={<></>} /> 
          <Route path={QNA_DEATIL_PATH} element={<></>} />
          <Route path={QNA_UPDATE_PATH} element={<></>} />
        </Route>
      </Route>
      <Route path='*' element={<></>} />
    </Routes>
  );
}

export default App;

// - authentication (로그인, 회원가입)  
// - service  
//   - local (지역 평균)  
//   - ratio (비율 계산)  
//   - qna (Q&A 리스트)  
//     - :boardNumber (Q&A 상세보기)  
//     - write (Q&A 작성)  
//     - update/:boardNumber (Q&A 수정) 
