export default function AddMotorcycle() {
    return (
        <div className="page-container">
            <div className="form-container">
                <h2>Motorcycle Details Form</h2>
                <form action="#" method="POST">
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" name="model" required />

                    <label htmlFor="year">Year:</label>
                    <input type="number" id="year" name="year" required />

                    <label htmlFor="buyYear">Year on Buying:</label>
                    <input type="number" id="buyYear" name="buyYear" required />

                    <label htmlFor="soldYear">Year on Sold:</label>
                    <input type="number" id="soldYear" name="soldYear" required />

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="url" id="imageUrl" name="imageUrl" required />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}