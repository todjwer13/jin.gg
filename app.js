require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const summonerRouter = require('./routes/summoner.router');

app.use(express.json());
app.use(cookieParser());

app.use(express.static('assets'));
app.use('/', [summonerRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
