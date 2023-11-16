import "./ArticleCard.css";

const ArticleCard = ({
  title,
  date,
  source,
  category,
  author,
  image,
}: {
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
  image?: string;
}) => {
  return (
    <article className="article-card">
      <div className="article-content">
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
      </div>
      <div className="article-image">
        {image && <img src={image} alt="Article" />}
      </div>
    </article>
  );
};

export default ArticleCard;
