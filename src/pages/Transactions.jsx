import { useEffect, useState } from "react";
import {
    getTransactions,
    completeTransaction,
    cancelTransaction,
} from "../services/api";
import "./Transactions.css";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        try {
            setLoading(true);

            const data = await getTransactions();

            console.log("Transactions from backend:", data);

            setTransactions(data || []);

        } catch (error) {
            console.error("Error loading transactions:", error);
            alert("Unable to load transactions");
        } finally {
            setLoading(false);
        }
    }

    async function handleComplete(id) {
        try {
            await completeTransaction(id);

            alert("Transaction completed");

            await loadTransactions();

        } catch (error) {
            console.error(error);
            alert("Unable to complete transaction");
        }
    }

    async function handleCancel(id) {
        try {
            await cancelTransaction(id);

            alert("Transaction cancelled");

            await loadTransactions();

        } catch (error) {
            console.error(error);
            alert("Unable to cancel transaction");
        }
    }

    return (
        <div className="transactions-page">

            <div className="transactions-header">

                <p>BOOK TRANSACTIONS</p>

                <h1>Transactions</h1>

                <span>
                    Track your book transactions and history
                </span>

            </div>

            {loading ? (

                <div className="transaction-empty">
                    <div className="transaction-icon">
                        ⏳
                    </div>

                    <h3>Loading transactions...</h3>
                </div>

            ) : transactions.length === 0 ? (
                <div className="transaction-empty">

                    <div className="transaction-icon">
                        📚
                    </div>

                    <h3>No transactions yet</h3>

                    <p>
                        Your book transactions will appear here.
                    </p>

                </div>

            ) : (

                <div className="transaction-list">

                    {transactions.map((transaction) => {

                        const status =
                            transaction.status?.toUpperCase() || "PENDING";

                        return (

                            <div
                                className="transaction-card"
                                key={transaction.transId}
                            >

                                <div className="transaction-icon">
                                    📖
                                </div>

                                <div className="transaction-info">

                                    <h3>
                                        {transaction.request?.listing?.book?.title ||
                                            "Book"}
                                    </h3>

                                    <p>
                                        Transaction #
                                        {transaction.transId}
                                    </p>

                                    <p>
                                        Amount: ₹
                                        {transaction.amount ?? 0}
                                    </p>

                                    <p>
                                        Type:{" "}
                                        {transaction.type || "-"}
                                    </p>

                                    <p>
                                        Date:{" "}
                                        {transaction.transDate || "-"}
                                    </p>

                                </div>

                                <div className="transaction-right">

                                    <span
                                        className={`transaction-status ${status.toLowerCase()}`}
                                    >
                                        {status}
                                    </span>

                                    {status === "PENDING" && (

                                        <div className="transaction-actions">

                                            <button
                                                className="complete"
                                                onClick={() =>
                                                    handleComplete(
                                                        transaction.transId
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>

                                            <button
                                                className="cancel"
                                                onClick={() =>
                                                    handleCancel(
                                                        transaction.transId
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default Transactions;