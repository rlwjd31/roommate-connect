import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import GlobalModal from '@/components/templates/GlobalModal';

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
      <GlobalModal />
    </RecoilRoot>
  );
}
export default App;
