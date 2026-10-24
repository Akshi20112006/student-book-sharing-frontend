import { useEffect, useState } from "react";
import { getStudentById, updateStudent } from "../services/api";
import "./Profile.css";

function Profile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Change this later when login stores the logged-in student's ID
    const studentId = localStorage.getItem("studentId") || 1;

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const data = await getStudentById(studentId);
            setStudent(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSave(e) {
        e.preventDefault();

        try {
            setSaving(true);

            const updated = await updateStudent(studentId, student);

            setStudent(updated);
            setEditing(false);

            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Unable to update profile");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="profile-page">
                <div className="profile-empty">
                    <h2>Profile not found</h2>
                    <p>Unable to load your profile.</p>
                </div>
            </div>
        );
    }

    const initial =
        student.name?.charAt(0)?.toUpperCase() || "S";

    return (
        <div className="profile-page">

            {/* Header */}
            <div className="profile-header">
                <div>
                    <span className="profile-eyebrow">
                        ACCOUNT
                    </span>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal information and account details.
                    </p>
                </div>

                {!editing && (
                    <button
                        className="profile-edit-btn"
                        onClick={() => setEditing(true)}
                    >
                        ✎ Edit Profile
                    </button>
                )}
            </div>


            {/* Profile Hero */}
            <div className="profile-hero">

                <div className="profile-avatar">
                    {initial}
                </div>

                <div className="profile-hero-info">

                    <h2>{student.name}</h2>

                    <p>{student.email}</p>

                    <div className="profile-tags">

                        {student.department && (
                            <span>
                                {student.department}
                            </span>
                        )}

                        {student.semester && (
                            <span>
                                Semester {student.semester}
                            </span>
                        )}

                    </div>

                </div>

            </div>


            {/* Main Content */}
            <div className="profile-grid">

                {/* Personal Information */}
                <div className="profile-card">

                    <div className="profile-card-header">
                        <div>
                            <span className="card-icon">👤</span>
                            <div>
                                <h3>Personal Information</h3>
                                <p>Your basic account information</p>
                            </div>
                        </div>
                    </div>


                    {editing ? (

                        <form
                            className="profile-form"
                            onSubmit={handleSave}
                        >

                            <div className="profile-two-column">

                                <label>
                                    Full Name
                                    <input
                                        name="name"
                                        value={student.name || ""}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label>
                                    Phone Number
                                    <input
                                        name="phoneNo"
                                        value={student.phoneNo || ""}
                                        onChange={handleChange}
                                    />
                                </label>

                            </div>


                            <label>
                                College Email
                                <input
                                    type="email"
                                    value={student.email || ""}
                                    disabled
                                />
                            </label>


                            <div className="profile-two-column">

                                <label>
                                    Department
                                    <input
                                        name="department"
                                        value={student.department || ""}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label>
                                    Semester
                                    <input
                                        type="number"
                                        name="semester"
                                        value={student.semester || ""}
                                        onChange={handleChange}
                                    />
                                </label>

                            </div>


                            <label>
                                Address
                                <textarea
                                    name="address"
                                    value={student.address || ""}
                                    onChange={handleChange}
                                />
                            </label>


                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setEditing(false);
                                        loadProfile();
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    ) : (

                        <div className="profile-details">

                            <div className="detail-item">
                                <span>Full Name</span>
                                <strong>
                                    {student.name || "-"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>College Email</span>
                                <strong>
                                    {student.email || "-"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Phone Number</span>
                                <strong>
                                    {student.phoneNo || "-"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Department</span>
                                <strong>
                                    {student.department || "-"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Semester</span>
                                <strong>
                                    {student.semester || "-"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Address</span>
                                <strong>
                                    {student.address || "-"}
                                </strong>
                            </div>

                        </div>

                    )}

                </div>


                {/* Account Card */}
                <div className="profile-card account-card">

                    <div className="profile-card-header">
                        <div>
                            <span className="card-icon">🔐</span>

                            <div>
                                <h3>Account</h3>
                                <p>Your BookShare account</p>
                            </div>
                        </div>
                    </div>


                    <div className="account-info">

                        <div className="account-row">
                            <span>Student ID</span>
                            <strong>
                                #{student.stuId}
                            </strong>
                        </div>

                        <div className="account-row">
                            <span>Email Status</span>

                            <span className="verified">
                                ● Active
                            </span>
                        </div>

                        <div className="account-row">
                            <span>Member</span>
                            <strong>
                                Student
                            </strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;