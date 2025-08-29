import { useCallback } from 'react';
import { clearAll } from '@/helpers/local-storage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions, chatActions } from '../redux/combineAction';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetApplications = useCallback(async () => {
    //add here all reset context state func

    dispatch(userActions.resetUserProfileAction());
    dispatch(chatActions.resetChatsAction());
    clearAll();
    navigate('/');
  }, []);

  return resetApplications;
};

export default useLogout;
