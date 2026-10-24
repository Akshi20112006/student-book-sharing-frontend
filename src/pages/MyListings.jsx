import { useEffect, useState } from "react";
import {
    getListingsByStudent,
    updateListing,
} from "../services/api";
import "./MyListings.css";

function MyListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const studentId = localStorage.getItem("studentId") || 1;

    useEffect(() => {
        loadListings();
    }, []);

    async function loadListings() {
        try {
            setLoading(true);
            setError("");

            const data = await getListingsByStudent(studentId);
            setListings(data || []);
        } catch (err) {
            console.error(err);
            setError("Unable to load your listings.");
        } finally {
            setLoading(false);
        }
    }

    async function changeStatus(listing, status) {
        try {
            await updateListing(listing.listingId, {
                ...listing,
                status,
            });

            await loadListings();

        } catch (err) {
            console.error(err);
            alert("Unable to update listing.");
        }
    }

    function getBookTitle(listing) {
        return (
            listing.book?.title ||
            listing.title ||
            "Untitled Book"
        );
    }

    function getAuthor(listing) {
        return (
            listing.book?.author ||
            listing.author ||
            "Unknown Author"
        );
    }

    function getCondition(listing) {
        return listing.condition || "Not specified";
    }

    function getPrice(listing) {
        return listing.price ?? 0;
    }

    function getStatus(listing) {
        return listing.status || "AVAILABLE";
    }

    if (loading) {
        return (
            <div className="my-listings-page">
                <div className="listing-loading">
                    Loading your listings...
                </div>
            </div>
        );
    }

    return (
        <div className="my-listings-page">

            {/* HEADER */}

            <div className="my-listings-header">

                <div>
                    <span className="my-listings-eyebrow">
                        YOUR BOOKS
                    </span>

                    <h1>My Listings</h1>

                    <p>
                        Manage the books you have shared with the
                        BookShare community.
                    </p>
                </div>

                <div className="listing-count">
                    <strong>{listings.length}</strong>
                    <span>Listings</span>
                </div>

            </div>


            {/* ERROR */}

            {error && (
                <div className="listing-error">
                    {error}
                </div>
            )}


            {/* EMPTY */}

            {!error && listings.length === 0 && (
                <div className="listing-empty">

                    <div className="empty-icon">
                        📚
                    </div>

                    <h2>No listings yet</h2>

                    <p>
                        You haven't listed any books yet.
                        Start sharing a book with another student.
                    </p>

                    <a
                        href="/list-book"
                        className="empty-button"
                    >
                        + List a Book
                    </a>

                </div>
            )}


            {/* LISTINGS */}

            {listings.length > 0 && (

                <div className="listing-grid">

                    {listings.map((listing) => {

                        const status = getStatus(listing)
                            .toUpperCase();

                        return (
                            <div
                                className="listing-card"
                                key={listing.listingId}
                            >

                                {/* BOOK VISUAL */}

                                <div className="listing-book">

                                    <div className="book-symbol">
                                        📖
                                    </div>

                                    <span>
                                        {getCondition(listing)}
                                    </span>

                                </div>


                                {/* CONTENT */}

                                <div className="listing-content">

                                    <div className="listing-top">

                                        <div>
                                            <h2>
                                                {getBookTitle(listing)}
                                            </h2>

                                            <p className="listing-author">
                                                by {getAuthor(listing)}
                                            </p>
                                        </div>

                                        <span
                                            className={`listing-status ${status.toLowerCase()}`}
                                        >
                                            {status}
                                        </span>

                                    </div>


                                    {/* INFO */}

                                    <div className="listing-info">

                                        <div>
                                            <span>Condition</span>
                                            <strong>
                                                {getCondition(listing)}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Price</span>
                                            <strong>
                                                ₹{getPrice(listing)}
                                            </strong>
                                        </div>

                                    </div>


                                    {/* DESCRIPTION */}

                                    {listing.description && (
                                        <p className="listing-description">
                                            {listing.description}
                                        </p>
                                    )}


                                    {/* ACTIONS */}

                                    <div className="listing-actions">

                                        {status === "AVAILABLE" && (
                                            <button
                                                className="listing-disable"
                                                onClick={() =>
                                                    changeStatus(
                                                        listing,
                                                        "INACTIVE"
                                                    )
                                                }
                                            >
                                                Hide Listing
                                            </button>
                                        )}

                                        {status === "INACTIVE" && (
                                            <button
                                                className="listing-activate"
                                                onClick={() =>
                                                    changeStatus(
                                                        listing,
                                                        "AVAILABLE"
                                                    )
                                                }
                                            >
                                                Make Available
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            )}

        </div>
    );
}   

export default MyListings;