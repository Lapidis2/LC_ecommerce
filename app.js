const express = require('express');
const router = require('./routes/userRouter');
const app = express();

// Setting up view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route to render the dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Use userRouter for user-related routes
app.use('/', router);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
