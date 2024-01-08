const SummonerService = require('../services/summoner.service');

class SummonerController {
  summonerService = new SummonerService();

  getSummoner = async (req, res) => {
    const { summoner_name, summoner_tag_line } = req.params;
    try {
      if (!summoner_name || !summoner_tag_line) {
        return res.status(400).json({ Message: error.message });
      }
      const summoner = await this.summonerService.getSummonerData(summoner_name, summoner_tag_line);
      return res.status(200).send({ message: 'summoner data:', data: summoner });
    } catch (error) {
      console.error('error message:', error.message);
      return res.status(500).send({ message: error.message });
    }
  };
}

module.exports = SummonerController;
