import { client } from './client';

(async () => {
  const newUser = await client.user.create.mutate({
    firstName: 'John',
    lastName: 'Snow',
    phone: '888-123-1234',
  });
  console.log('newUser', newUser);

  const user = await client.user.getById.query(newUser.id);
  console.log('user', user);

  const users = await client.user.list.query();
  console.log('users', users);
})();
