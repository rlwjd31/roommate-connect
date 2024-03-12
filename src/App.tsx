import './App.css';
import Badge from '@/components/atoms/Badge.tsx';

function App() {
  return (
    <div className="bg-red-400 flex items-center justify-center p-2 ">
      test linting
      <Badge.Button text="test" />
    </div>
  );
}

export default App;
