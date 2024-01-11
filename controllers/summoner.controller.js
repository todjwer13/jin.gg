const SummonerService = require('../services/summoner.service');
const MatchService = require('../services/match.service');

class SummonerController {
  summonerService = new SummonerService();
  matchService = new MatchService();

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

      // 소환사의 전적 id 조회
      const matchDate = await this.matchService.getMatchData(summonerAccount.puuid);

      const summonerInfo = {
        summoner_id: summoner.id,
        summoner_name: summonerAccount.gameName,
        summoner_tag_line: summonerAccount.tagLine,
        summoner_level: summoner.summonerLevel,
        profile_icon_id: summoner.profileIconId,
        puuid: summoner.puuid,
        s_tier: soloLeague ? soloLeague.tier : null,
        s_rank: soloLeague ? soloLeague.rank : null,
        s_league_points: soloLeague ? soloLeague.leaguePoints : null,
        s_wins: soloLeague ? soloLeague.wins : null,
        s_losses: soloLeague ? soloLeague.losses : null,
        f_tier: flexLeague ? flexLeague.tier : null,
        f_rank: flexLeague ? flexLeague.rank : null,
        f_league_points: flexLeague ? flexLeague.leaguePoints : null,
        f_wins: flexLeague ? flexLeague.wins : null,
        f_losses: flexLeague ? flexLeague.losses : null,
      };

      // 이미 소환사 정보가 DB에 저장되어 있는지 확인
      const isSummonerExist = await this.summonerService.isSummonerDataExist(summonerInfo);
      const getMatchDetailData = await this.matchService.getMatchDetailData(matchDate);

      return res.status(200).send({ message: 'summoner date:', data: { isSummonerExist, matchDate, getMatchDetailData } });
    } catch (error) {
      console.error('error message:', error.message);
      return res.status(500).send({ message: error.message });
    }
  };
}

module.exports = SummonerController;
