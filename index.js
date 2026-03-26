const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

app.get('/userlanguages', async (req, res) => {
  try {
    const users = await prisma.userLanguage.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/userlanguages/:language', async (req, res) => {
  const { language } = req.params;
  try {
    const users = await prisma.userLanguage.findMany({
      where: { languages: { contains: language } },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users by language' });
  }
});

app.post('/userlanguages', async (req, res) => {
  const { name, email, languages, age } = req.body;
  if (!name || !email || !languages || age === undefined) {
    return res.status(400).json({ error: 'Missing required fields: name, email, languages, age' });
  }
  try {
    const newUser = await prisma.userLanguage.create({
      data: { name, email, languages, age },
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

app.put('/userlanguages', async (req, res) => {
  const { email, languages } = req.body;
  if (!email || !languages) {
    return res.status(400).json({ error: 'Missing required fields: email, languages' });
  }
  try {
    const updatedUser = await prisma.userLanguage.update({
      where: { email },
      data: { languages },
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/userlanguages/delete-under-18', async (req, res) => {
  try {
    const deleted = await prisma.userLanguage.deleteMany({
      where: { age: { lt: 18 } },
    });
    res.json({ deletedCount: deleted.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});