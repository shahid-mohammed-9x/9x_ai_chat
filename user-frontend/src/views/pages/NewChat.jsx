import React, { memo, useCallback, useState } from 'react';
import ChatFooter from '../features/chat/ChatFooter';
import ChatLayout from '../layouts/ChatLayout';
import { useSelector, useDispatch } from 'react-redux';
import { chatActions } from '@/redux/combineAction';
import _ from 'lodash';
import { updatePaginationData } from '@/helpers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewChat = () => {
  const dispatch = useDispatch();
  const { createNewChatAction, updateChatStateAction } = chatActions;
  const { profileDetails } = useSelector((state) => state.userProfileState);
  const { chatsList } = useSelector((state) => state.chatsState);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    loading: false,
    clearInput: true,
  });

  const submitNewChatHandlerFunction = useCallback(
    async (e) => {
      if (info?.loading) return;

      const { selectedModels, inputMessage } = e;

      setInfo((prev) => ({ ...prev, loading: true, clearInput: true }));
      const json = {
        question: inputMessage,
        models: selectedModels,
      };
      const response = await createNewChatAction(json);
      if (response[0] === true) {
        let newUpdatedData = _.cloneDeep(chatsList);
        const appendData = {
          _id: response?.[1]?.data?._id,
          title: response?.[1]?.data?.title,
          createdAt: response?.[1]?.data?.createdAt,
        };
        newUpdatedData = updatePaginationData(newUpdatedData, appendData);
        dispatch(updateChatStateAction({ chatsList: newUpdatedData }));
        navigate(`/chat/${response?.data?._id}`);
      } else {
        toast.error(response?.[1]?.message || 'something went wrong');
      }

      setInfo((prev) => ({ ...prev, loading: false, clearInput: false }));
    },
    [info?.loading, info?.clearInput, chatsList]
  );

  return (
    <ChatLayout>
      <div className="m-auto w-full">
        <div>
          <p className="text-center text-4xl font-bold mb-6">
            Welcome {profileDetails?.fullName ?? profileDetails?.email}, how can I help?
          </p>
          <ChatFooter
            onClickFunction={submitNewChatHandlerFunction}
            loading={info?.loading}
            clearInput={info?.clearInput}
          />
        </div>
      </div>
    </ChatLayout>
  );
};

export default memo(NewChat);
