var api_base_url = "https://api.football-data.org/v2/";
var id_liga = 2021;
var endpoint_klasemen = `${api_base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
var endpoint_jadwal = `${api_base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
var endpoint_match = `${api_base_url}matches/`;
var endpoint_team = `${api_base_url}teams/`;
var endpoint_player = `${api_base_url}players/`

var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '0b2338c791c342ce8ec5239806fbc31f'
        }
    });
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


function getKlasemen() {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    resultKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(function (data) {
            resultKlasemenJSON(data)
        })
        .catch(error);
}

function getMatchLeague() {
    return new Promise(function (resolve, reject) {

        if ('caches' in window) {
            caches.match(endpoint_jadwal).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_jadwal)
            .then(status)
            .then(json)
            .then(function (data) {
                resultMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}


function getDetailTeamById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_team + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailTeamJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailTeamJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getDetailMatchById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_match + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resultDetailMatchJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_match + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                resultDetailMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}