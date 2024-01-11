const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('searchBtn');

document.getElementById('searchBtn').addEventListener('click', async () => {
  const searchInput = document.getElementById('searchinput').value;
  const parts = searchInput.split('#');
  const summoner_name = parts[0];
  const summoner_tag_line = parts[1];

  try {
    const response = await fetch(`/summoners/${summoner_name}/${summoner_tag_line}`, {
      method: 'GET',
      headers: {},
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.data);

      // 새로운 main HTML 코드
      const newMainHTML = `
        <main>
          <section class="summonerInfo">
            <h2>소환사 정보</h2>
            <div class="profile-icon-image">
              <img src="./image/profileicon/${data.data.isSummonerExist.profile_icon_id}.png" style="width: 100px; height: 100px; border-radius: 50px" />
            </div>
            <div>
              <text>${data.data.isSummonerExist.summoner_name}#${data.data.isSummonerExist.summoner_tag_line}</text>
              <text>Lv.${data.data.isSummonerExist.summoner_level}</text>
            </div>
            <!-- 랭크 정보 -->
            <div class="gatherTier">
              <div class="soloRank">
                <img src="./image/${data.data.isSummonerExist.s_tier || 'UNRANKED'}.png" style="width: 100px; height: 100px; border-radius: 50px" />
                <text>${data.data.isSummonerExist.s_tier || 'UNRANKED'} ${data.data.isSummonerExist.s_rank || ''} ${data.data.isSummonerExist.s_league_points || ''}</text>
                <text>승:${data.data.isSummonerExist.s_wins || ''} 패:${data.data.isSummonerExist.s_losses || ''}</text>
              </div>
              <div class="flexRank">
                <img src="./image/${data.data.isSummonerExist.f_tier || 'UNRANKED'}.png" style="width: 100px; height: 100px; border-radius: 50px" />
                <text>${data.data.isSummonerExist.f_tier || 'UNRANKED'} ${data.data.isSummonerExist.f_rank || ''} ${data.data.isSummonerExist.f_league_points || ''}</text>
                <text>승:${data.data.isSummonerExist.f_wins || ''} 패:${data.data.isSummonerExist.f_losses || ''}</text>
              </div>
            </div> 
            </section>
            <section class="gatherMatchData">
              <div class="detailMatch">
                <h2>최근 게임</h2>
                ${data.data.getMatchDetailData
                  .map(
                    (match) => `
                  <div>${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).win ? '승리' : '패배'}   ${getGameModeName(match.queues)}
                    <img src="./image/champion/${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).champion}.png" style="width: 60px; height: 60px;" />
                  
                    <text>${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).kills} / ${
                      match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).deaths
                    } / ${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).assists}</text>
                    <text>평점: ${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).kda || 'perfect'}</text>
                    <text>cs: ${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).cs}</text>
                    <text>골드획득량: ${match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid).gold}</text>
                    <button type="button" class="btn btn-secondary" id="detailMatchBtn" data-index="${match}">상세 정보</button>
                  </div>
                  <div class="item-image">
                    ${['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6']
                      .map(
                        (item, index) =>
                          `<img src="./image/item/${
                            match.players.find((player) => player.puuid === data.data.isSummonerExist.puuid)[item]
                          }.png" style="width: 40px; height: 40px;" id="${item}${index}" />`
                      )
                      .join('')}
                  </div>
                  
                  
                  <div id="detailMatchModal" style="display: none;">
                    <div class="modal-body">
                    ${match.players
                      .map(
                        (player, index) => `
                        <div class="playerInfo">
                          <h0>${player.name}</h0>
                          <div>${player.win ? '승리' : '패배'}
                          ${getGameModeName(match.queues)}
                            <img src="./image/champion/${player.champion}.png" style="width: 25px; height: 25px;" />
                            <text>${player.kills} / ${player.deaths} / ${player.assists}</text>
                            <text>${player.kda}</text>
                            <text>cs:${player.cs}</text>
                            <text>골드획득량:${player.gold}</text>
                          </div>
                          <div class="item-image">
                            ${['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6']
                              .map((item, index) => `<img src="./image/item/${player[item]}.png" style="width: 20px; height: 20px;" id="${item}${index}" />`)
                              .join('')}
                          </div>
                        </div>
                      `
                      )
                      .join('')}
                    </div>
                    
                  </div>
                `
                  )
                  .join('')}
              </div>
            </section>


        </main>
      `;

      // 'detailMatchBtn' 버튼 클릭 시 모달 열기
      document.addEventListener('click', (event) => {
        const target = event.target;
        if (target.id === 'detailMatchBtn') {
          // 'detailMatchModal' 모달을 찾아서 토글
          const modal = document.getElementById('detailMatchModal');
          modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
        }
      });

      function getGameModeName(queues) {
        switch (queues) {
          case 420:
            return '솔로랭크';
          case 440:
            return '자유랭크';
          case 430:
            return '일반';
          case 450:
            return '칼바람나락';
          case 490:
            return '일반';
          case 1700:
            return '아레나';
          default:
            return '알 수 없는 모드';
        }
      }

      // 기존 main의 부모 요소
      const existingMain = document.getElementById('mainBoard');

      // 기존 main을 지우고 새로운 main 추가
      existingMain.innerHTML = newMainHTML;
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
