// style
import "./App.css";
// componentes
import UserPage from "./front/userPage";
import FeedUsers from "./front/feedUsersPage";
import ChatPage from "./front/chatPage";
import LandingPage from "./front/landingpage/landingPage";
// rotas
function App() {
  return (
    <div className="container">
      <LandingPage></LandingPage>
    </div>
  );
}

export default App;
