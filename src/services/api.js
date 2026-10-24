const API_BASE = "http://localhost:8080/api";

async function request(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!response.ok) {
        const text = await response.text();
        let message = text;

        try {
            const details = JSON.parse(text);
            message = details.message || details.error || text;
        } catch {
            // Keep non-JSON response bodies visible to the user.
        }

        throw new Error(message || `Request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// ==================== BOOKS ====================

export const getBooks = () => request("/books");

export const getBookById = (id) =>
    request(`/books/${id}`);

export const createBook = (book) =>
    request("/books", {
        method: "POST",
        body: JSON.stringify(book),
    });

export const updateBook = (id, book) =>
    request(`/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(book),
    });

// ==================== LISTINGS ====================

export const getListings = () =>
    request("/listings");

export const getAvailableListings = () =>
    request("/listings/available");

export const getListingsByStudent = (studentId) =>
    request(`/listings/student/${studentId}`);

export const getListingById = (id) =>
    request(`/listings/${id}`);

export const createListing = (listing) =>
    request("/listings", {
        method: "POST",
        body: JSON.stringify(listing),
    });

export const updateListing = (id, listing) =>
    request(`/listings/${id}`, {
        method: "PUT",
        body: JSON.stringify(listing),
    });

// ==================== REQUESTS ====================

export const getRequests = () =>
    request("/requests");

export const getRequestById = (id) =>
    request(`/requests/${id}`);

export const getRequestsByStudent = (studentId) =>
    request(`/requests/student/${studentId}`);

export const getPendingRequests = () =>
    request("/requests/pending");

export const getRequestsForOwner = (studentId) =>
    request(`/requests/owner/${studentId}`);

export const createRequest = (requestData) =>
    request("/requests", {
        method: "POST",
        body: JSON.stringify(requestData),
    });

export const updateRequest = (id, requestData) =>
    request(`/requests/${id}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
    });

export const approveRequest = (id) =>
    request(`/requests/${id}/approve`, {
        method: "PUT",
    });

export const rejectRequest = (id) =>
    request(`/requests/${id}/reject`, {
        method: "PUT",
    });

// ==================== TRANSACTIONS ====================

export const getTransactions = () =>
    request("/transactions");

export const getTransactionById = (id) =>
    request(`/transactions/${id}`);

export const createTransaction = (transaction) =>
    request("/transactions", {
        method: "POST",
        body: JSON.stringify(transaction),
    });

export const updateTransaction = (id, transaction) =>
    request(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(transaction),
    });

export const completeTransaction = (id) =>
    request(`/transactions/${id}/complete`, {
        method: "PUT",
    });

export const cancelTransaction = (id) =>
    request(`/transactions/${id}/cancel`, {
        method: "PUT",
    });

// ==================== REVIEWS ====================

export const getReviews = () =>
    request("/reviews");

export const getReviewById = (id) =>
    request(`/reviews/${id}`);

export const getReviewsByStudent = (studentId) =>
    request(`/reviews/student/${studentId}`);

export const getReviewsByReviewer = (studentId) =>
    request(`/reviews/reviewer/${studentId}`);

export const createReview = (review) =>
    request("/reviews", {
        method: "POST",
        body: JSON.stringify(review),
    });

export const updateReview = (id, review) =>
    request(`/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(review),
    });

// ==================== STUDENTS ====================

export const getStudents = () =>
    request("/students");

export const getStudentById = (id) =>
    request(`/students/${id}`);

export const createStudent = (student) =>
    request("/students", {
        method: "POST",
        body: JSON.stringify(student),
    });
    
export const updateStudent = (id, student) =>
    request(`/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(student),
    });
    export const loginStudent = (email, password) =>
    request("/students/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });