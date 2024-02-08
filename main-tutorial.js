const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  // add more users as needed
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key');
    res.json({ accessToken });
  } else {
    res.send('Username or password incorrect');
  }
});

app.get('/secure', authenticateToken, (req, res) => {
  res.send('Secure data');
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});