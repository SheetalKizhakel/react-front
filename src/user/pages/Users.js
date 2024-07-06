import React, { useEffect, useState } from 'react';
import Chat from '../components/chat';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import Three from './Three';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users');
        if (isMounted) {
          setLoadedUsers(responseData.users);
        }
      } catch (err) {}
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      <div className="flex flex-row h-screen">
       
       
          <Chat />
        
      </div>
    </>
  );
};

export default Users;
