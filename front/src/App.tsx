import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { AUTH_PATH, LOCAL_PATH, QNA_DEATIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, RATIO_PATH, SERVICE_PATH } from './constant';
import Authentication from './views/Authentication';
import ServiceContainer from './layouts/ServiceContainer/Local';
import Local from './views/NotFound';
import Ratio from './views/service/Ratio';
import QnaWrite from './views/service/qna/QnaWrite';
import QnaList from './views/service/qna/QnaList';
import QnaDetail from './views/service/qna/QnaDetail';
import QnaUpdate from './views/service/qna/QnaUpdate';
import NotFound from './views/service/Local';

function App() {
  return (
    <Routes>
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
        <Route path={LOCAL_PATH} element={<Local />} />
        <Route path={RATIO_PATH} element={<Ratio />} />
        <Route path={QNA_PATH} >
          <Route index element={<QnaList />} />
          <Route path={QNA_WRITE_PATH} element={<QnaWrite />} /> 
          <Route path={QNA_DEATIL_PATH} element={<QnaDetail />} />
          <Route path={QNA_UPDATE_PATH} element={<QnaUpdate />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
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
