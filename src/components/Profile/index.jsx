import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useApp } from '../../lib/app';
import Loading from '../Loading';

const Profile = () => {
  const app = useApp();
  const { uid } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    app.client(`/users/${uid}`)
      .then(setUser)
      .catch(console.error);
  }, []);

  if (typeof user === 'undefined') {
    return <Loading />;
  }

  console.log(user);

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
};

export default Profile;

