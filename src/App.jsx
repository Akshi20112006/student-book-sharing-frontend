import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import MyListings from "./pages/MyListings";
import Requests from "./pages/Requests";
import Transactions from "./pages/Transactions";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import ListBook from "./pages/ListBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/add-book" element={<AddBook />} />

        <Route path="/list-book" element={<ListBook />} />
        <Route path="/listings" element={<MyListings />} />
        <Route path="/my-listings" element={<MyListings />} />

        <Route path="/requests" element={<Requests />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/reviews" element={<Reviews />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;