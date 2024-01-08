const axios = require('axios');
const { Summoner } = require('../models');
const apiKey = process.env.RIOT_API_KEY;

class SummonerService {
  // 소환사의 puuid 조회
  getSummonerPuuid = async (summoner_name, summoner_tag_line) => {
    try {
      const response = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summoner_name}/${summoner_tag_line}`, {
        headers: {
          'X-Riot-Token': apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('error message:', error.response.data);
      throw error;
    }
  };

  // 소환사 정보 조회
  getSummonerId = async (puuid) => {
    try {
      const response = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
        headers: {
          'X-Riot-Token': apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('error message:', error.response.data);
      throw error;
    }
  };

  // 소환사 id로 리그 정보 조회
  getSummonerLeague = async (summoner_id) => {
    try {
      const response = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}`, {
        headers: {
          'X-Riot-Token': apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('error message:', error.response.data);
      throw error;
    }
  };
  // DB에서 puuid를 기준으로 소환사 정보 조회
  isSummonerDataExist = async (summoner_id) => {
    console.log(summoner_id);
    const existingSummoner = await Summoner.findOne({ where: { summoner_id: summoner_id } });
    return existingSummoner;
  };

  // 소환사 정보 DB저장
  createSummonerData = async (summonerInfo) => {
    const createSummonerData = await Summoner.create({
      summonerInfo,
    });
    return createSummonerData;
  };
}

module.exports = SummonerService;
