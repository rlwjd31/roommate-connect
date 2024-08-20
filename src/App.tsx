import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import GlobalModal from '@/components/templates/GlobalModal';

const queryClient = new QueryClient();
const isDev =
  import.meta.env.MODE === 'development' &&
  process.env.NODE_ENV === 'development';

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router />
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        <GlobalModal />
      </QueryClientProvider>
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
