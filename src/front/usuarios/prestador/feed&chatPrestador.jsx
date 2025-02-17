import style from "./feedPrestadorPage.module.css";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPageProvider from "./chatPageProvider";
function FeedChatPrestador() {
  return (
    <>
      <FeedPrestadorPage></FeedPrestadorPage>
      <ChatPageProvider></ChatPageProvider>
    </>
  );
}
export default FeedChatPrestador;
