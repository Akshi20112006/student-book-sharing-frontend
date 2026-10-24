import { useEffect, useState } from "react";
import { getBooks , getListings } from "../services/api";
import "./Books.css";

function Books() {
    
    const [books, setBooks] = useState([]);
const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadBooks();
    }, []);
async function loadBooks() {
    try {
        setLoading(true);
        setError("");

        const [bookData, listingData] = await Promise.all([
            getBooks(),
            getListings()
        ]);

        setBooks(bookData || []);
        setListings(listingData || []);

    } catch (error) {
        console.error(error);
        setError("Unable to load books.");
    } finally {
        setLoading(false);
    }
}
    

    function handleListBook() {
        window.location.href = "/list-book";
    }
function handleViewDetails(book) {

    const listing = listings.find(
        (item) =>
            item.book &&
            item.book.bookId === book.bookId
    );

    if (!listing) {
        setMessage(
            `"${book.title}" does not have an active listing.`
        );

        setTimeout(() => {
            setMessage("");
        }, 3000);

        return;
    }

    window.location.href = `/books/${listing.listId}`;
}
    

    const filteredBooks = books.filter((book) =>
        `${book.title || ""} ${book.author || ""} ${book.subject || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="books-page">

            {/* HEADER */}
            <div className="books-header">

                <div>
                    <p className="eyebrow">
                        BOOK MARKETPLACE
                    </p>

                    <h1>Browse Books</h1>

                    <p>
                        Discover textbooks and study materials
                        shared by students.
                    </p>
                </div>

                <button
                    className="add-book-btn"
                    onClick={handleListBook}
                >
                    + List a Book
                </button>

            </div>


            {/* SUCCESS / INFO MESSAGE */}
            {message && (
                <div className="message success">
                    {message}
                </div>
            )}


            {/* SEARCH */}
            <div className="books-toolbar">

                <input
                    type="text"
                    placeholder="Search by title, author or subject..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <span className="book-count">
                    {filteredBooks.length}{" "}
                    {filteredBooks.length === 1
                        ? "book"
                        : "books"}
                </span>

            </div>


            {/* LOADING */}
            {loading && (
                <div className="message">
                    Loading books...
                </div>
            )}


            {/* ERROR */}
            {error && (
                <div className="message error">
                    {error}
                </div>
            )}


            {/* EMPTY */}
            {!loading &&
                !error &&
                filteredBooks.length === 0 && (

                    <div className="empty-books">

                        <div>📚</div>

                        <h2>
                            No books found
                        </h2>

                        <p>
                            Try another search or add
                            the first book.
                        </p>

                        <button
                            className="add-book-btn"
                            onClick={handleListBook}
                        >
                            + List a Book
                        </button>

                    </div>
                )}


            {/* BOOK GRID */}
            {!loading &&
                !error &&
                filteredBooks.length > 0 && (

                    <div className="books-grid">

                        {filteredBooks.map(
                            (book, index) => (

                                <div
                                    className="book-card"
                                    key={
                                        book.bookId ||
                                        book.id ||
                                        index
                                    }
                                >

                                    {/* COVER */}
                                    <div className="book-cover">
                                        <span>
                                            BOOK
                                        </span>
                                    </div>


                                    {/* CONTENT */}
                                    <div className="book-card-content">

                                        <h2>
                                            {book.title}
                                        </h2>


                                        {book.author && (
                                            <p className="author">
                                                by{" "}
                                                {book.author}
                                            </p>
                                        )}


                                        {book.subject && (
                                            <span className="subject">
                                                {book.subject}
                                            </span>
                                        )}


                                        {book.edition && (
                                            <p className="edition">
                                                Edition:{" "}
                                                {book.edition}
                                            </p>
                                        )}


                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                handleViewDetails(
                                                    book
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>
                )}

        </div>
    );
}

export default Books;