import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        <span>BOOK</span>
        <strong>{book.subject}</strong>
      </div>

      <div className="book-card-content">
        <div className="book-card-top">
          <StatusBadge status={book.status} />
          <span className="book-price">₹{book.price}</span>
        </div>

        <h3>{book.title}</h3>

        <p className="book-author">{book.author}</p>

        <div className="book-meta">
          <span>{book.edition}</span>
          <span>•</span>
          <span>{book.condition}</span>
        </div>

        <div className="book-card-footer">
          <span className="owner">By {book.owner}</span>

          <Link to={`/books/${book.id}`} className="view-link">
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BookCard;