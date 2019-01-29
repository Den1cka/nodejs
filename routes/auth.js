const express = require('express');
const passport = require('../passport');

const router = express.Router();

router.post('/local/login', passport.authenticate('local', { session: false }), (req, res) => { res.send({ token: req.user }); });
router.get('/facebook/login', passport.authenticate('facebook', { session: false, scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false, scope: ['email'] }), (req, res) => { res.send({ token: req.user }); });

module.exports = router;
