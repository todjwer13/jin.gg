const axios = require('axios');
const { Summoner } = require('../models');
const apiKey = process.env.RIOT_API_KEY;

const RIOT_API_ENDPOINT = 'https://asia.api.riotgames.com';

class SummonerService {
  getSummonerData = async (summoner_name, summoner_tag_line) => {
    const gameName = summoner_name;
    const tagLine = summoner_tag_line;
    try {
      const response = await axios.get(`${RIOT_API_ENDPOINT}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
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
}

module.exports = SummonerService;
