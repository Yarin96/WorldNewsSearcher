import "./App.css";
import Header from "./components/Header/Header";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import NewsFilters from "./components/NewsFilters/NewsFilters";

function App() {
  return (
    <>
      <Header title="World News Searcher 🌎" />
      <NewsFilters />
      <NewsFeed />
    </>
  );
}

export default App;
