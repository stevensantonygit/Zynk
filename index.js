require('./routes/db');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const isAuthenticated = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'zynksecret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/api/auth', authRoutes);

app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.listen(PORT, () => {
  console.log(`Zynk is live at http://localhost:${PORT}`);
});