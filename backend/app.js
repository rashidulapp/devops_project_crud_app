// Import necessary modules
const express = require("express")
const path = require("path")
const blogRoute = require("./routes/blogRoutes")
const mongoose = require("mongoose")

// Create an Express application
const app = express()

// Define the URI for MongoDB, using the environment variable if available, else default to a local database
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/BlogDB"

// Define the port for the server, using the environment variable if available, else default to port 1000
const PORT = process.env.PORT || 500

// Middleware: Enable parsing of JSON data in requests
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
// Middleware: Enable Route 
app.use("/api/blogs", blogRoute)

// Connect to the MongoDB database
mongoose.connect(URI, {
    useNewUrlParser: true,          // Use the new URL parser (recommended for performance and consistency)
    useUnifiedTopology: true       // Use the official Node.js MongoDB driver for robust connections
}).then(() => {
    console.log("Connected to MongoDB")
}).catch(error => {
    console.log("Error connecting to MongoDB:", error.message)
})

// Start the server and listen on the specified port
const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

// Event handler for server errors
server.on("error", (error) => {
    console.log(`Server error: ${error.message}`)
})

// Export the Express app for external use (e.g., testing or integration with other modules)
module.exports = app
