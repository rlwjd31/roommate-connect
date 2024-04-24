import './App.css';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Router from './Router';
import GlobalModal from '@/components/templates/GlobalModal';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        stacked
        pauseOnFocusLoss={false}
      />
      {/* <Modal.Alert title="알림" message="이메일로 인증번호가 전송되었습니다." /> */}
      {/* <GlobalModal
        modalType="Confirm"
        modalProps={{
          title: '친구 차단',
          message: '선택한 유저를 차단하시겠습니까?',
          onClickCancel: () => alert('canceled'),
          onClickConfirm: () => alert('confirm'),
          cancelButtonContent: '취소',
          confirmButtonContent: '차단',
        }}
      /> */}
      <GlobalModal
        modalType="Alert"
        modalProps={{
          title: '알림',
          message: '이메일로 인증번호가 전송되었습니다',
          buttonContent: '확인',
          onClick: () => alert('alert modal alert'),
        }}
      />
    </RecoilRoot>
  );
}
// title="친구 차단"
//         message="선택한 유저를 차단하시겠습니까?"
export default App;

// {
//   title: '알림',
//   message: '이메일로 인증번호가 전송되었습니다',
//   buttonContent: '확인',
//   onClick={() => alert('alerted!!')}}
