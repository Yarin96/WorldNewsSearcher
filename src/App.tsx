import "./App.css";
import Header from "./components/Header/Header";
import NewsFeed from "./components/NewsFeed/NewsFeed";

function App() {
  return (
    <>
      <Header title="World News Searcher 🌎" />
      <NewsFeed />
    </>
  );
}

export default App;
