import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Articles from "./pages/Articles.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import Assistant from "./pages/Assistant.jsx";
import Landing from "./pages/Landing.jsx";
import NotFound from "./pages/NotFound.jsx";
import Conversation from "./pages/Conversation.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Conversation />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/assistant" element={<Assistant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
