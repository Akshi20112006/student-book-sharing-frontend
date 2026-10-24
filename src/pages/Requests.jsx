import { useEffect, useState } from "react";
import {
    getRequests,
    approveRequest,
    rejectRequest,
} from "../services/api";
import "./Requests.css";

function Requests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        try {
            setLoading(true);

            const data = await getRequests();

            console.log("Requests from backend:", data);

            setRequests(data || []);

        } catch (error) {
            console.error("Error loading requests:", error);
            alert("Unable to load requests");
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove(id) {

        try {

            await approveRequest(id);

            alert("Request approved");

            await loadRequests();

        } catch (error) {

            console.error("Approve error:", error);

            alert("Unable to approve request");
        }
    }

    async function handleReject(id) {

        try {

            await rejectRequest(id);

            alert("Request rejected");

            await loadRequests();

        } catch (error) {

            console.error("Reject error:", error);

            alert("Unable to reject request");
        }
    }

    return (
        <div className="requests-page">

            <div className="requests-header">

                <p>BOOK REQUESTS</p>

                <h1>Requests</h1>

                <span>
                    Manage requests for your listed books
                </span>

            </div>

            {loading ? (

                <div className="request-empty">
                    <div className="request-icon">⏳</div>
                    <h3>Loading requests...</h3>
                </div>

            ) : requests.length === 0 ? (

                <div className="request-empty">

                    <div className="request-icon">
                        📚
                    </div>

                    <h3>No requests yet</h3>

                    <p>
                        Requests for your books will appear here.
                    </p>

                </div>

            ) : (

                <div className="request-list">

                    {requests.map((req) => {

                        const status =
                            req.status?.toUpperCase() || "PENDING";

                        return (

                            <div
                                className="request-card"
                                key={req.reqId}
                            >

                                <div className="request-info">

                                    <div className="request-book">
                                        📖
                                    </div>

                                    <div>

                                        <h3>
                                            {req.listing?.book?.title ||
                                                req.book?.title ||
                                                "Book"}
                                        </h3>

                                        <p>
                                            Requested by{" "}
                                            {req.student?.name ||
                                                "Student"}
                                        </p>

                                        <p>
                                            Date:{" "}
                                            {req.reqDate || "-"}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={
                                        status === "PENDING"
                                            ? "pending"
                                            : status === "APPROVED"
                                            ? "pending"
                                            : "reject"
                                    }
                                >
                                    {status}
                                </span>

                                {status === "PENDING" && (

                                    <div className="request-actions">

                                        <button
                                            className="accept"
                                            onClick={() =>
                                                handleApprove(
                                                    req.reqId
                                                )
                                            }
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="reject"
                                            onClick={() =>
                                                handleReject(
                                                    req.reqId
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default Requests;