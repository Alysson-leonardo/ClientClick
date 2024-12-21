// style
import "./App.css";
// componentes
import UserPage from "./front/userPage";
import FeedUsers from "./front/feedUsersPage";
import ChatPage from "./front/chatPage";
import LadingPage from "./front/ladingpage/ladingPage";
// rotas
function App() {
  return (
    <div className="container">
      <LadingPage></LadingPage>
    </div>
  );
}

export default App;
