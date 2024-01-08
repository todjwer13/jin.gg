const SummonerService = require('../services/summoner.service');

class SummonerController {
  summonerService = new SummonerService();

  getSummoner = async (req, res) => {
    const { summoner_name, summoner_tag_line } = req.params;
    try {
      if (!summoner_name || !summoner_tag_line) {
        return res.status(400).json({ Message: error.message });
      }
      // 소환사의 puuid 조회
      const summonerAccount = await this.summonerService.getSummonerPuuid(summoner_name, summoner_tag_line);

      // 조회한 puuid로 소환사 정보 조회
      const summoner = await this.summonerService.getSummonerId(summonerAccount.puuid);
      // 소환사 id로 리그 정보 조회
      const summonerLeague = await this.summonerService.getSummonerLeague(summoner.id);

      // 리그 정보 레코드를 솔로랭크와 자유랭크로 분리
      const flexLeague = summonerLeague.find((record) => record.queueType === 'RANKED_FLEX_SR');
      const soloLeague = summonerLeague.find((record) => record.queueType === 'RANKED_SOLO_5x5');

      // 이미 소환사 정보가 DB에 저장되어 있는지 확인
      const isSummonerExist = await this.summonerService.isSummonerDataExist(summoner.id);
      if (isSummonerExist) {
        return res.status(200).send({ message: 'summoner date:', data: isSummonerExist });
      }
      // 없다면 소환사 정보 DB 저장
      const summonerInfo =
        (summoner.id,
        summonerAccount.gameName,
        summonerAccount.tagLine,
        summoner.summonerLevel,
        summoner.profileIconId,
        summoner.puuid,
        soloLeague.tier,
        soloLeague.rank,
        soloLeague.leaguePoints,
        soloLeague.wins,
        soloLeague.losses,
        flexLeague.tier,
        flexLeague.rank,
        flexLeague.leaguePoints,
        flexLeague.wins,
        flexLeague.losses);

      const summonerDate = await this.summonerService.createSummonerData(summonerInfo);

      return res.status(200).send({ message: 'summoner data:', data: summonerDate });
    } catch (error) {
      console.error('error message:', error.message);
      return res.status(500).send({ message: error.message });
    }
  };
}

module.exports = SummonerController;
