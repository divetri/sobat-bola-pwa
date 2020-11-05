function resultMatchJSON(data) {
    const dataMatch = data.matches;
    let matchDays = [];
    let DataMatches = "";
    var JadwalHTML = ''
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };
    if (dataMatch.length === 0) {
        muatSini.innerHTML = `<h5>Semua Pertandingan di Musim ini telah selesai</h5>`;
        return
    }
    for (let i = 0; i < dataMatch.length; i++) {
        matchDays.push(dataMatch[i].matchday);
    }
    let idx = 0;
    for (let i = 0; i < dataMatch.length; i++) {
        if (dataMatch[i].matchday === matchDays.filter(unique)[idx]) {
            DataMatches += `
                  <tr>
                      <td> ${dataMatch[i].homeTeam.name} </td>
                      <td> ${dataMatch[i].awayTeam.name} </td>
                      <td> ${convertDateOnly(new Date(dataMatch[i].utcDate))} </td>
                      <td> <a class="btn-detail-match" href="./match.html?id=${dataMatch[i].id}">Detail</a> </td>
                  </tr>
              `;
        } else {
            JadwalHTML += `
                  <div class="card">
                      <div class="card-content">
                          <span class="card-title"><h4>Matchday ${dataMatch[i].matchday-1}</h4></span>
                          <table class="responsive-table centered">
                              <thead>
                                  <tr>
                                      <th>Home</th>
                                      <th>Away</th>
                                      <th>Match</th>
                                      <th>Detail</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  ` + DataMatches + `
                              </tbody>
                          </table>
                      </div>
                  </div>
              `;
            DataMatches = "";
            DataMatches += `
                  <tr>
                      <td> ${dataMatch[i].homeTeam.name} </td>
                      <td> ${dataMatch[i].awayTeam.name} </td>
                      <td> ${convertDateOnly(new Date(dataMatch[i].utcDate))}</td>
                      <td> <a class="btn-detail-match" href="./match.html?id=${dataMatch[i].id}">Detail</a> </td>
                  </tr>
              `;
            idx++;
        }
    }
    document.getElementById("jadwal-content").innerHTML = JadwalHTML;
}

function resultKlasemenJSON(data) {
    var tabelKlasemenHTML = ''
    data.standings.forEach(function (klasemen) {
        var dataKlasemen = ''
        klasemen.table.forEach(function (dataKlub) {
            dataKlub = JSON.parse(JSON.stringify(dataKlub).replace(/http:/g, 'https:'));
            dataKlasemen += `
                <tr class="tabel-stand">
                    <td class="center-align">${dataKlub.position}</td>
                    <td class="center-align">
                        <a href="./team.html?id=${dataKlub.team.id}">
                            <div class="hide-on-small-only">
                                ${dataKlub.team.name}
                            </div>
                            <div class="hide-on-med-and-up">
                                <img src=${dataKlub.team.crestUrl}  alt="logo" class="img-klasemen">
                            </div>
                        </a>
                    </td>
                    <td class="center-align">${dataKlub.playedGames}</td>
                    <td class="center-align">${dataKlub.won}</td>
                    <td class="center-align">${dataKlub.draw}</td>
                    <td class="center-align">${dataKlub.lost}</td>
                    <td class="center-align">${dataKlub.goalsFor}</td>
                    <td class="center-align">${dataKlub.goalsAgainst}</td>
                    <td class="center-align">${dataKlub.goalDifference}</td>
                    <td class="center-align">${dataKlub.points}</td>
                </tr>`
        })
        tabelKlasemenHTML += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table">
                        <thead>
                        <tr>
                            <th class="center-align"></th>
                            <th class="center-align">Team</th>
                            <th class="center-align">PG</th>
                            <th class="center-align">W</th>
                            <th class="center-align">D</th>
                            <th class="center-align">L</th>
                            <th class="center-align">GF</th>
                            <th class="center-align">GA</th>
                            <th class="center-align">GD</th>
                            <th class="center-align">Pts</th>
                        </tr>
                        </thead>
                        <tbody>` + dataKlasemen + `</tbody>
                    </table>
                </div>
            </div>`
        });
    document.getElementById("klasemen-content").innerHTML = tabelKlasemenHTML;
}

function resultDetailTeamJSON(data) {
    var dataTeamHtml;
    document.getElementById("title-team").innerHTML = 'Detail ' + data.name;
    dataTeamHtml =
        `
        <img src="${data.crestUrl}" alt="logo team" width="100" height="100" vspace="25">
        <h5>${data.name}</h5>
        <table class="centered">
            <tr>
                <td>Name</td>
                <td>:</td>
                <td>${data.name}</td>
            </tr>
            <tr>
                <td>Short Name</td>
                <td>:</td>
                <td>${data.shortName}</td>
            </tr>
            <tr>
                <td>TLA</td>
                <td>:</td>
                <td>${data.tla}</td>
            </tr>
            <tr>
                <td>Website</td>
                <td>:</td>
                <td><a href="${data.website}">Link</a></td>
            </tr>
            <tr>
                <td>Tahun Berdiri</td>
                <td>:</td>
                <td>${data.founded}</td>
            </tr>
            <tr>
                <td>Stadion</td>
                <td>:</td>
                <td>${data.venue}</td>
            </tr>
            <tr>
                <td>Warna Club</td>
                <td>:</td>
                <td>${data.clubColors}</td>
            </tr>
        </table>        
    `;

    var dataSquadHtml = '';
    var tableSquadHtml = '';
    data.squad.forEach(function (squad) {
        dataSquadJSON = squad;
        tableSquadHtml += `
            <tr>
                <td>${squad.name}</a></td>
                <td>${squad.position}</td>
                <td>${squad.nationality}</td>
                <td>${convertDateOnly(new Date(squad.dateOfBirth))}</td>
            </tr>`
    });
    dataSquadHtml = `
        <h5>Squad</h5>
        <table class="centered responsive-table">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th>Negara</th>
                    <th>TTL</th>
            <tbody>${tableSquadHtml}</tbody>
        </table>`
    document.getElementById("detail-team-content").innerHTML = dataTeamHtml + '<hr>' + dataSquadHtml;
}

function resultDetailMatchJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    document.getElementById("detail-match-content").innerHTML = `
    <div class="row">
        <h5>${convertDate(new Date(data.match.utcDate))}</h5>
        <h5 class="d-team"><a href="./team.html?id=${data.match.homeTeam.id}">${data.match.homeTeam.name}</a>
        <br>VS<br>
        <a href="./team.html?id=${data.match.awayTeam.id}">${data.match.awayTeam.name}</a></h5> 
    </div>
    <h5>${data.match.venue}</h5>
    <div class="row">
    <hr size="5px">
        <h6>Matches: ${data.head2head.numberOfMatches}</h6>
        <div class="col s5 right-align truncate">
            ${data.match.homeTeam.name}
        </div>
        <div class="col s2 center-align">
        VS
        </div>
        <div class="col s5 left-align truncate">
            ${data.match.awayTeam.name}
        </div>
        <div class="col s4 right-align">
            <span>${data.head2head.homeTeam.wins}</span>
        </div>
        <div class="col s4">WINS</div>
        <div class="col s4 left-align">
            <span">${data.head2head.awayTeam.wins}</span>
        </div>
        <div class="col s4 right-align">
            <span>${data.head2head.homeTeam.draws}</span>
        </div>
        <div class="col s4">DRAWS</div>
        <div class="col s4 left-align">
            <span>${data.head2head.awayTeam.draws}</span>
        </div>
        <div class="col s4 right-align">
            <span>${data.head2head.homeTeam.losses}</span>
        </div>
        <div class="col s4">LOSSES</div>
        <div class="col s4 left-align">
            <span>${data.head2head.awayTeam.losses}</span>
        </div>
    `;
}

function resultMatchFav(data) {
    var dataMatchFavHtml = ''
    data.forEach(function (match) {
        dataMatchFavHtml += `
        <div class="col s12 m6 l6 center-align">
            <div class="card">
                <div class="card-content">
                    <h5>${convertDate(new Date(match.match.utcDate))}</h5>
                    <h5 class="d-team"><a href="./team.html?id=${match.match.homeTeam.id}">${match.match.homeTeam.name}</a>
                    <br>VS<br>
                    <a href="./team.html?id=${match.match.awayTeam.id}">${match.match.awayTeam.name}</a></h5>
                    <a class="btn green" href="./match.html?id=${match.id}">Lihat Detail</a>
                </div>
            </div>
        </div>`
    });
    document.getElementById("saved-content").innerHTML = dataMatchFavHtml;
  }