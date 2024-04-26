import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import { AUTH_ABSOLUTE_PATH, AUTH_PATH, LOCAL_ABSOLUTE_PATH, LOCAL_PATH, QNA_DEATIL_PATH, QNA_PATH, QNA_UPDATE_PATH, QNA_WRITE_PATH, RATIO_PATH, SERVICE_PATH } from './constant';
import Authentication from './views/Authentication';
import ServiceContainer from './layouts/ServiceContainer/Local';
import Local from './views/NotFound';
import Ratio from './views/service/Ratio';
import QnaWrite from './views/service/qna/QnaWrite';
import QnaList from './views/service/qna/QnaList';
import QnaDetail from './views/service/qna/QnaDetail';
import QnaUpdate from './views/service/qna/QnaUpdate';
import NotFound from './views/service/Local';
import { useCookies } from 'react-cookie';


// component: root 경로 컴포넌트
function Index() {

  //                              state                              //
  const [cookies] = useCookies();

  //                              function                              //
  const navigator = useNavigate();

  //                              effect                              //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) navigator(LOCAL_ABSOLUTE_PATH);
    else navigator(AUTH_ABSOLUTE_PATH);
  }, []);

  //                              render                              //
  return<></>
}


// component: Application 컴포넌트
function App() {

  //                              render                              //
  return (
    <Routes>
      <Route index element={<Index />}/>
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
