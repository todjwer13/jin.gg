const axios = require('axios');
const { Summoner, Match } = require('../models');
const apiKey = process.env.RIOT_API_KEY;

class MatchService {
  getMatchData = async (puuid) => {
    try {
      const response = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
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

  getMatchDetailData = async (match_ids) => {
    const responses = await Promise.all(
      match_ids.map(async (matchId) => {
        try {
          const response = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
            headers: {
              'X-Riot-Token': apiKey,
            },
          });
          const queues = response.data.info.queueId;
          console.log(queues);
          if (response.data.info.participants) {
            const players = [];

            for (let i = 0; i < response.data.info.participants.length; i++) {
              const part = response.data.info.participants[i];
              const player = {
                puuid: part.puuid,
                name: part.riotIdGameName,
                champion: part.championName,
                kills: part.kills,
                deaths: part.deaths,
                assists: part.assists,
                kda: parseFloat(((part.kills + part.assists) / part.deaths).toFixed(2)),
                item0: part.item0,
                item1: part.item1,
                item2: part.item2,
                item3: part.item3,
                item4: part.item4,
                item5: part.item5,
                item6: part.item6,
                visionscore: part.visionScore,
                gold: part.goldEarned,
                cs: part.totalMinionsKilled,
                win: part.win,
              };

              players.push(player);
            }
            console.log(players);
            return { players, queues };
          } else {
            console.error('매치 데이터가 부족합니다:', response.data);
          }
        } catch (error) {
          console.error('매치 상세 정보를 가져오는 중 오류 발생:', error.response.data);
          throw error;
        }
      })
    );

    return responses;
  };
}

module.exports = MatchService;
