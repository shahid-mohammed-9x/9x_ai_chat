import Home from '@/views/pages/Home';
import ChatLayout from './views/layouts/ChatLayout';
import Login from './views/pages/login';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/chat',
    component: <ChatLayout />,
  },
];

export default allRoutesMapper;
