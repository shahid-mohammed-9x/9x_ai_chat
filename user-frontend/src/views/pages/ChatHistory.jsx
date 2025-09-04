import React, { memo, useMemo, useCallback, useEffect, useState } from 'react';
import ChatLayout from '../layouts/ChatLayout';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { chatActions } from '@/redux/combineAction';

const TitleComponent = memo(({ singleChat, index }) => {
  return (
    <Card
      className="cursor-pointer transition border-0 border-b-2 rounded-none p-0"
      onClick={() => navigate(`/chat/${singleChat?._id}`)}
    >
      <CardContent className="text-md truncate flex">
        <div>
          {' '}
          {index + 1}. {singleChat?.title || 'Untitled Chat'}
        </div>
      </CardContent>
      <CardFooter className={' flex justify-end text-sm'}>
        <div>{moment(singleChat?.createdAt).format('LLL')}</div>
      </CardFooter>
    </Card>
  );
});

const ChatHistory = () => {
  const { getChatHistoryAction } = chatActions;
  const { chatHistory, chatHistoryLoading } = useSelector((state) => state.chatsState);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    limit: 20,
    currentPage: 1,
  });

  useEffect(() => {
    if (!chatHistory && chatHistory?.currentPage !== 1) {
      fetchChatHistoryFunctions();
    }
  }, []);

  const groupDocumentsByDate = useMemo(() => {
    const grouped = {
      today: [],
      yesterday: [],
      last7Days: [],
      months: {}, // { "August 2025": [...] }
    };

    chatHistory?.docs?.forEach((doc) => {
      const date = moment(doc.createdAt);
      const now = moment();

      if (date.isSame(now, 'day')) {
        grouped.today.push(doc);
      } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        grouped.yesterday.push(doc);
      } else if (date.isAfter(moment().subtract(7, 'days'))) {
        grouped.last7Days.push(doc);
      } else {
        const monthKey = date.format('MMMM YYYY');
        if (!grouped.months[monthKey]) {
          grouped.months[monthKey] = [];
        }
        grouped.months[monthKey].push(doc);
      }
    });

    return grouped;
  }, [chatHistory]);

  const fetchChatHistoryFunctions = useCallback(
    (query, append = false) => {
      const payload = {
        limit: query?.limit ?? info?.limit,
        page: query?.currentPage ?? info?.currentPage,
      };
      console.log(append, 'shahid');
      dispatch(getChatHistoryAction(payload, append));
    },
    [chatHistory, info?.limit, info?.currentPage]
  );

  // pagination purpose
  const fetchPaginationFunction = useCallback(() => {
    let updateQuery = {
      currentPage: info?.currentPage + 1,
    };
    setInfo((prev) => ({ ...prev, ...updateQuery }));
    fetchChatHistoryFunctions(updateQuery, true);
  }, [info?.currentPage]);

  return (
    <ChatLayout>
      {/* <div id="chat_history_scrollable" className="h-full overscroll-auto"> */}
      <InfiniteScroll
        dataLength={chatHistory?.docs || 0}
        hasMore={chatHistory?.hasNext || false}
        next={fetchPaginationFunction}
        // scrollableTarget="chat_history_scrollable"
      >
        {_.keys(groupDocumentsByDate || {})?.map((singleGroup) => {
          if (singleGroup === 'months') {
            return null;
          }
          return (
            <Card key={singleGroup} className="">
              <h2 className="text-3xl font-bold capitalize px-3">{singleGroup}</h2>
              <Separator />

              <div className="space-y-2 px-2">
                {groupDocumentsByDate?.[singleGroup]?.map((singleChat, index) => (
                  <TitleComponent singleChat={singleChat} key={singleChat?._id} index={index} />
                ))}
              </div>
            </Card>
          );
        })}
      </InfiniteScroll>
      {/* </div> */}
    </ChatLayout>
  );
};

export default memo(ChatHistory);
