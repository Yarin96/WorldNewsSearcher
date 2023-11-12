import "./ArticleCard.css";

const ArticleCard = ({
  title,
  date,
  source,
  category,
  author,
}: {
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
}) => {
  return (
    <article className="article-card">
      <h1>{title}</h1>
      <div className="article-details">
        <strong>Date:</strong> {date}
      </div>
      <div className="article-details">
        <strong>Source:</strong> {source}
      </div>
      <div className="article-details">
        <strong>Category:</strong> {category}
      </div>
      <div className="article-details">
        <strong>Author:</strong> {author}
      </div>
    </article>
  );
};

export default ArticleCard;
