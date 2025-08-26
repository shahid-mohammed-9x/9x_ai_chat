import Home from "@/views/pages/Home";
import ChatLayout from "./views/layouts/ChatLayout";

const allRoutesMapper = [
  {
    path: "/",
    component: (
      <ChatLayout>
        <Home />
      </ChatLayout>
    ),
  },
];

export default allRoutesMapper;
