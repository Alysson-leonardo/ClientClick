// style
import "./App.css";
// componentes
import UserPage from "./front/userPage";
import FeedUsers from "./front/feedUsersPage";
import ChatPage from "./front/chatPage";
// rotas

function App() {
  return (
    <div className="container">
      <UserPage />
      <FeedUsers />
      <ChatPage />
    </div>
  );
}

export default App;
