import { HttpResponse, http } from 'msw';
import { userEndpoints } from '@constants/apiEndpoints';
import data from '@db/userDB.json';

type UserParams = {
  userId: string;
};

const userHandler = [
  http.get<UserParams>(userEndpoints.user, async ({ params }) => {
    const { userId } = params;
    const foundUser = data.user.find(user => user.id === userId);

    if (!foundUser)
      return new HttpResponse(null, {
        status: 404, // 4xx, 5xx에 대해서는 client에서 자동으로 ok=false가 된다.
        statusText: `Couldn't found user`,
      });

    return new HttpResponse(JSON.stringify(foundUser), {
      status: 200,
      statusText: 'found user!',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];

export const handlers = [...userHandler];
