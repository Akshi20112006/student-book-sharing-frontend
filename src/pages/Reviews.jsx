import { useEffect, useState } from "react";
import {
    getReviews,
    createReview,
    getTransactions,
} from "../services/api";
import "./Reviews.css";

function Reviews() {

    const [reviews, setReviews] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        transactionId: "",
        studentId: "",
        reviewerId: "",
        rating: 5,
        comment: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);

            const [reviewData, transactionData] = await Promise.all([
                getReviews(),
                getTransactions(),
            ]);

            setReviews(reviewData || []);
            setTransactions(transactionData || []);

        } catch (error) {
            console.error("LOAD ERROR:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleTransactionChange(e) {

        const transactionId = e.target.value;

        const transaction = transactions.find(
            (item) =>
                Number(item.transId) === Number(transactionId)
        );

        let reviewedStudentId = "";

        /*
         * The owner of the listing is the student
         * being reviewed.
         */
        if (
            transaction &&
            transaction.request &&
            transaction.request.listing &&
            transaction.request.listing.student
        ) {
            reviewedStudentId =
                transaction.request.listing.student.stuId;
        }

        setFormData({
            ...formData,
            transactionId: transactionId,
            studentId: reviewedStudentId,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const loggedInStudent = JSON.parse(
                localStorage.getItem("student")
            );

            if (!loggedInStudent) {
                alert("Please login first.");
                return;
            }

            if (!formData.transactionId) {
                alert("Please select a transaction.");
                return;
            }

            if (!formData.studentId) {
                alert(
                    "Unable to determine the student to review."
                );
                return;
            }

            const reviewData = {

                rating: Number(formData.rating),

                comment: formData.comment,

                reviewer: {
                    stuId: Number(loggedInStudent.stuId),
                },

                reviewed: {
                    stuId: Number(formData.studentId),
                },

                transaction: {
                    transId: Number(formData.transactionId),
                },
            };

            console.log(
                "SENDING REVIEW:",
                reviewData
            );

            await createReview(reviewData);

            alert("Review submitted successfully!");

            setFormData({
                transactionId: "",
                studentId: "",
                reviewerId: "",
                rating: 5,
                comment: "",
            });

            setShowForm(false);

            await loadData();

        } catch (error) {

            console.error(
                "REVIEW ERROR:",
                error
            );

            alert(
                error.message ||
                "Unable to create review"
            );
        }
    }

    return (
        <div className="reviews-page">

            {/* HEADER */}

            <div className="reviews-header">

                <div>

                    <p className="reviews-eyebrow">
                        COMMUNITY FEEDBACK
                    </p>

                    <h1>Reviews</h1>

                    <span>
                        See what students are saying about
                        their BookShare experience.
                    </span>

                </div>

                <button
                    className="review-add-btn"
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    + Write Review
                </button>

            </div>


            {/* REVIEW FORM */}

            {showForm && (

                <div className="review-form-card">

                    <div className="form-title">

                        <h2>Write a Review</h2>

                        <p>
                            Share your experience with
                            another student.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* TRANSACTION */}

                        <label>

                            Completed Transaction

                            <select
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={
                                    handleTransactionChange
                                }
                                required
                            >

                                <option value="">
                                    Select a transaction
                                </option>

                                {transactions
                                    .filter(
                                        (transaction) =>
                                            transaction.status
                                                ?.toUpperCase() ===
                                            "COMPLETED"
                                    )
                                    .map(
                                        (transaction) => (

                                            <option
                                                key={
                                                    transaction.transId
                                                }
                                                value={
                                                    transaction.transId
                                                }
                                            >
                                                Transaction #
                                                {
                                                    transaction.transId
                                                }

                                                {" — "}

                                                {
                                                    transaction
                                                        .request
                                                        ?.listing
                                                        ?.book
                                                        ?.title ||
                                                    "Book"
                                                }

                                            </option>

                                        )
                                    )}

                            </select>

                        </label>


                        {/* STUDENTS */}

                        <div className="review-form-grid">

                            <label>

                                Student Being Reviewed

                                <input
                                    type="number"
                                    value={
                                        formData.studentId
                                    }
                                    readOnly
                                    placeholder="Automatically selected"
                                />

                            </label>


                            <label>

                                Reviewer

                                <input
                                    type="text"
                                    value={
                                        loggedInStudentName()
                                    }
                                    readOnly
                                />

                            </label>

                        </div>


                        {/* RATING */}

                        <label>

                            Rating

                            <select
                                name="rating"
                                value={
                                    formData.rating
                                }
                                onChange={handleChange}
                            >

                                <option value="5">
                                    ★★★★★ — Excellent
                                </option>

                                <option value="4">
                                    ★★★★☆ — Very Good
                                </option>

                                <option value="3">
                                    ★★★☆☆ — Good
                                </option>

                                <option value="2">
                                    ★★☆☆☆ — Fair
                                </option>

                                <option value="1">
                                    ★☆☆☆☆ — Poor
                                </option>

                            </select>

                        </label>


                        {/* COMMENT */}

                        <label>

                            Comment

                            <textarea
                                name="comment"
                                value={
                                    formData.comment
                                }
                                onChange={handleChange}
                                placeholder="Write something about your experience..."
                                rows="4"
                                required
                            />

                        </label>


                        {/* BUTTONS */}

                        <div className="review-form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-review-btn"
                            >
                                Submit Review
                            </button>

                        </div>

                    </form>

                </div>
            )}


            {/* LOADING */}

            {loading && (

                <div className="review-empty">

                    <div className="review-icon">
                        ⏳
                    </div>

                    <h3>
                        Loading reviews...
                    </h3>

                    <p>
                        Please wait while we fetch
                        the latest reviews.
                    </p>

                </div>

            )}


            {/* EMPTY */}

            {!loading &&
                reviews.length === 0 && (

                    <div className="review-empty">

                        <div className="review-icon">
                            💬
                        </div>

                        <h3>
                            No reviews yet
                        </h3>

                        <p>
                            Be the first to share your
                            BookShare experience.
                        </p>

                        <button
                            className="review-empty-btn"
                            onClick={() =>
                                setShowForm(true)
                            }
                        >
                            Write the First Review
                        </button>

                    </div>

                )}


            {/* REVIEWS */}

            {!loading &&
                reviews.length > 0 && (

                    <div className="reviews-grid">

                        {reviews.map((review) => (

                            <div
                                className="review-card"
                                key={
                                    review.reviewId
                                }
                            >

                                <div className="review-card-top">

                                    <div className="review-avatar">

                                        {review.reviewer?.name
                                            ? review.reviewer.name
                                                .charAt(0)
                                                .toUpperCase()
                                            : "S"}

                                    </div>


                                    <div className="review-user">

                                        <h3>
                                            {
                                                review
                                                    .reviewer
                                                    ?.name ||
                                                "Student"
                                            }
                                        </h3>

                                        <span>
                                            Student #
                                            {
                                                review
                                                    .reviewer
                                                    ?.stuId ||
                                                "-"
                                            }
                                        </span>

                                    </div>


                                    <div className="rating">

                                        {"★".repeat(
                                            review.rating || 0
                                        )}

                                        {"☆".repeat(
                                            5 -
                                            (
                                                review.rating ||
                                                0
                                            )
                                        )}

                                    </div>

                                </div>


                                <div className="review-content">

                                    <p>
                                        {
                                            review.comment ||
                                            "No comment provided."
                                        }
                                    </p>

                                </div>


                                <div className="review-footer">

                                    <span>

                                        Reviewed student:{" "}

                                        <strong>
                                            {
                                                review
                                                    .reviewed
                                                    ?.name ||
                                                "Student"
                                            }
                                        </strong>

                                    </span>

                                    <span>
                                        {
                                            review.reviewDate ||
                                            ""
                                        }
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </div>
    );
}


/*
 * Get logged-in student's name.
 */
function loggedInStudentName() {

    try {

        const student = JSON.parse(
            localStorage.getItem("student") ||
            "{}"
        );

        return student.name || "Student";

    } catch (error) {

        return "Student";

    }
}

export default Reviews;