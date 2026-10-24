import { useState } from "react";
import { createListing } from "../services/api";
import "./ListBook.css";

function ListBook() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        category: "",
        condition: "",
        description: "",
        price: "",
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            /*
             * Keep these fields consistent with the Listing
             * object expected by your backend.
             */
            const listing = {
                ...form,
                price: form.price ? Number(form.price) : 0,
            };

            await createListing(listing);

            alert("Book listed successfully!");

            setForm({
                title: "",
                author: "",
                category: "",
                condition: "",
                description: "",
                price: "",
            });

        } catch (error) {
            console.error(error);
            alert("Unable to list the book.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="list-book-page">

            {/* HEADER */}

            <div className="list-book-header">

                <div>
                    <span className="list-book-eyebrow">
                        SHARE A BOOK
                    </span>

                    <h1>List a Book</h1>

                    <p>
                        Give your books a new home by sharing them
                        with fellow students.
                    </p>
                </div>

            </div>


            {/* CONTENT */}

            <div className="list-book-layout">

                {/* FORM */}

                <div className="list-book-card">

                    <div className="list-card-heading">

                        <div className="list-icon">
                            📚
                        </div>

                        <div>
                            <h2>Book Details</h2>
                            <p>
                                Tell students a little about the book
                                you're sharing.
                            </p>
                        </div>

                    </div>


                    <form
                        className="list-book-form"
                        onSubmit={handleSubmit}
                    >

                        {/* TITLE */}

                        <label>
                            Book Title
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Database Management Systems"
                                required
                            />
                        </label>


                        {/* AUTHOR */}

                        <label>
                            Author
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="e.g. Korth"
                                required
                            />
                        </label>


                        <div className="list-two-column">

                            <label>
                                Category
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select category
                                    </option>
                                    <option value="Computer Science">
                                        Computer Science
                                    </option>
                                    <option value="Engineering">
                                        Engineering
                                    </option>
                                    <option value="Mathematics">
                                        Mathematics
                                    </option>
                                    <option value="Science">
                                        Science
                                    </option>
                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </label>


                            <label>
                                Condition
                                <select
                                    name="condition"
                                    value={form.condition}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select condition
                                    </option>
                                    <option value="NEW">
                                        New
                                    </option>
                                    <option value="LIKE_NEW">
                                        Like New
                                    </option>
                                    <option value="GOOD">
                                        Good
                                    </option>
                                    <option value="FAIR">
                                        Fair
                                    </option>
                                </select>
                            </label>

                        </div>


                        {/* PRICE */}

                        <label>
                            Price
                            <div className="price-input">
                                <span>₹</span>

                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>

                            <small>
                                Enter 0 if you are giving the book away
                                for free.
                            </small>
                        </label>


                        {/* DESCRIPTION */}

                        <label>
                            Description

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Mention the book's condition, edition, notes, highlights, etc."
                                rows="5"
                            />

                        </label>


                        {/* BUTTONS */}

                        <div className="list-form-actions">

                            <button
                                type="button"
                                className="list-cancel"
                                onClick={() =>
                                    setForm({
                                        title: "",
                                        author: "",
                                        category: "",
                                        condition: "",
                                        description: "",
                                        price: "",
                                    })
                                }
                            >
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="list-submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Listing..."
                                    : "List Book"}
                            </button>

                        </div>

                    </form>

                </div>


                {/* SIDE INFORMATION */}

                <div className="list-book-side">

                    <div className="sharing-card">

                        <div className="sharing-icon">
                            ✦
                        </div>

                        <h3>Share with your community</h3>

                        <p>
                            Your unused books can help another student
                            save money and find the right study material.
                        </p>

                    </div>


                    <div className="tips-card">

                        <h3>Tips for a good listing</h3>

                        <div className="tip">
                            <span>✓</span>
                            <p>Use the correct book title and author.</p>
                        </div>

                        <div className="tip">
                            <span>✓</span>
                            <p>Be honest about the book's condition.</p>
                        </div>

                        <div className="tip">
                            <span>✓</span>
                            <p>Add useful details in the description.</p>
                        </div>

                        <div className="tip">
                            <span>✓</span>
                            <p>Set the price to ₹0 for a free book.</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ListBook;