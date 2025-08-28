import Home from "@/views/pages/Home";
import ChatLayout from "./views/layouts/ChatLayout";

const allRoutesMapper = [
  {
    path: "/",
    component: (
      <Home />
    ),
  },
  {
    path: '/chat',
    component: (
      <ChatLayout />
    )
  }
];

export default allRoutesMapper;
