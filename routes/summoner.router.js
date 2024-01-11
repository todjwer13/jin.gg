const express = require('express');

const router = express.Router();

const SummonerController = require('../controllers/summoner.controller');
const summonerController = new SummonerController();

// 소환사 조회
router.get('/summoners/:summoner_name/:summoner_tag_line', summonerController.getSummoner);

module.exports = router;
