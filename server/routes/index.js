const express = require('express');
const bingoCards = require('./bingoCards');
const bingoLists = require('./bingoLists');
const users = users('./users');

//api routes
router.use('/api', users)
router.use('/api', bingoLists)
router.use('/api', bingoCards)


module.exports = router;