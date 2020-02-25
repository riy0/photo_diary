const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  console.log('😇😇😇');
  try {
    const entries =  await LogEntry.find();
    res.json(entries);
  } catch(error) {
    console.log('😇😇😇😇😇');
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch(erorr) {
    if(error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});


module.exports = router;
