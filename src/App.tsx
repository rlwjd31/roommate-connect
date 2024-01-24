import { useQuery } from '@tanstack/react-query';

import './App.css';

function App() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', 'user'],
    queryFn: async () => {
      try {
        const response = await fetch(
          '/user/d0deb877-39dd-415e-93e3-2048ec1676c5',
        );

        if (!response.ok) throw new Error(`Couldn't find user`);

        return await response.json();
      } catch (err) {
        console.error((err as Error).message);
        throw new Error(`Couldn't find user`);
      }
    },
  });

  if (isLoading) return <h1>isLoading...</h1>;
  if (error) return <h1>Error occured!</h1>;

  return (
    <div className="flex items-center justify-center bg-red-400 p-2 ">
      test linting
      <img src={user.avatar} alt="user avatar" />
    </div>
  );
}

export default App;
