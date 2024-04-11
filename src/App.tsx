import './App.css';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import Router from './Router';

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
    </RecoilRoot>
  );
}

export default App;
