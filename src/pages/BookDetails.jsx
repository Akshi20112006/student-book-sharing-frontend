import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import {
    getListingById,
    createRequest
} from "../services/api";

function BookDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadListing();
    }, [id]);

    async function loadListing() {

        try {

            setLoading(true);
            setError("");

            const data = await getListingById(id);

            setListing(data);

        } catch (error) {

            console.error(error);
            setError("Unable to load book details.");

        } finally {

            setLoading(false);

        }
    }

    async function handleRequest() {

        try {

            const studentData =
                JSON.parse(localStorage.getItem("student"));

            if (!studentData) {

                alert("Please sign in first.");

                navigate("/login");

                return;
            }

            const requestData = {

                listing: {
                    listId: listing.listId
                },

                student: {
                    stuId: studentData.stuId
                }

            };

            await createRequest(requestData);

            setMessage(
                "Book request sent successfully!"
            );

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to send request."
            );

        }

    }

    if (loading) {

        return (
            <Layout>
                <div className="empty-state">
                    <h2>Loading book...</h2>
                </div>
            </Layout>
        );

    }

    if (error || !listing) {

        return (
            <Layout>

                <div className="empty-state">

                    <h2>
                        Book not found
                    </h2>

                    <Link
                        to="/books"
                        className="btn btn-primary"
                    >
                        Back to books
                    </Link>

                </div>

            </Layout>
        );

    }

    const book = listing.book;

    return (
        <Layout>

            <Link
                to="/books"
                className="back-link"
            >
                ← Back to books
            </Link>

            {message && (
                <div className="message success">
                    {message}
                </div>
            )}

            <section className="details-layout">

                <div className="details-cover">

                    <div className="large-book-cover">

                        <span>
                            {book.subject || "BOOK"}
                        </span>

                        <strong>
                            {book.title}
                        </strong>

                        <small>
                            {book.edition || ""}
                        </small>

                    </div>

                </div>

                <div className="details-content">

                    <StatusBadge
                        status={
                            listing.listingStatus ||
                            "AVAILABLE"
                        }
                    />

                    <h1>
                        {book.title}
                    </h1>

                    <p className="details-author">
                        by{" "}
                        <strong>
                            {book.author || "Unknown author"}
                        </strong>
                    </p>

                    <p className="details-description">

                        {listing.description ||
                            "A student-listed academic textbook available through the BookShare community."}

                    </p>

                    <div className="details-info-grid">

                        <div>
                            <span>Subject</span>
                            <strong>
                                {book.subject || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Edition</span>
                            <strong>
                                {book.edition || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Condition</span>
                            <strong>
                                {listing.bookCondition || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Owner</span>
                            <strong>
                                {listing.student?.name || "-"}
                            </strong>
                        </div>

                    </div>

                    <div className="details-price">

                        <div>

                            <span>
                                Listed price
                            </span>

                            <strong>
                                ₹{listing.price ?? 0}
                            </strong>

                        </div>

                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleRequest}
                        >
                            Request this book
                        </button>

                    </div>

                </div>

            </section>

        </Layout>
    );
}

export default BookDetails;