import Layout from "../components/Layout";

function AddBook() {
  return (
    <Layout>
      <div className="page-header">
        <div>
          <span className="eyebrow">Share with others</span>
          <h1>List a Book</h1>
          <p>Add your textbook and make it available to another student.</p>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-section">
          <h2>Book information</h2>
          <p>Tell students about the book you're listing.</p>
        </div>

        <form className="professional-form">
          <div className="two-column">
            <label>
              Book title
              <input placeholder="e.g. Database Management Systems" />
            </label>

            <label>
              Author
              <input placeholder="e.g. Raghu Ramakrishnan" />
            </label>
          </div>

          <div className="three-column">
            <label>
              Subject
              <input placeholder="e.g. DBMS" />
            </label>

            <label>
              Edition
              <input placeholder="e.g. 3rd Edition" />
            </label>

            <label>
              Condition
              <select defaultValue="">
                <option value="" disabled>
                  Select condition
                </option>
                <option>Like New</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </label>
          </div>

          <div className="two-column">
            <label>
              Price
              <input type="number" placeholder="₹ 0" />
            </label>

            <label>
              Category
              <select defaultValue="">
                <option value="" disabled>
                  Select category
                </option>
                <option>Computer Science</option>
                <option>Programming</option>
                <option>Networking</option>
                <option>Algorithms</option>
              </select>
            </label>
          </div>

          <label>
            Description
            <textarea
              rows="5"
              placeholder="Describe the condition, notes, highlighting, etc."
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddBook;