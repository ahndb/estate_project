import React from 'react'
import './style.css'


//                    component                    //
export default function QnaWrite() {

  //                    render                  //
  return (
    <div id='qna-write-wrapper'>

      <div className='qna-write-top'>
        <div className='qna-write-title-box'>
          <input type="text" placeholder='제목을 입력해주세요.' required />
        </div>
        <div>올리기</div>
      </div>

      <div>
        <textarea placeholder='내용을 입력해주세요.' required />
      </div>

    </div>
  )
}
