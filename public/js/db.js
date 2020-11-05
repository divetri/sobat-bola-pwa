function databasePromise(idb) {
    var dbPromise = idb.open("db_sobol", 1, function (upgradeDb) {
        var indexFavMatch = upgradeDb.createObjectStore("match_favorit", {
            keyPath: "id"
        });
        indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
            unique: false
        });
        indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
            unique: false
        });
    });

    return dbPromise;
}
function checkData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("Data favorit")
                } else {
                    reject("Bukan data favorit")
                }
            });
    });
}

function createDataFav(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    storeName = "match_favorit"
    dataToCreate = {
        id: data.match.id,
        head2head: {
            numberOfMatches: data.head2head.numberOfMatches,
            totalGoals: data.head2head.totalGoals,
            homeTeam: {
                wins: data.head2head.homeTeam.wins,
                draws: data.head2head.homeTeam.draws,
                losses: data.head2head.homeTeam.losses
            },
            awayTeam: {
                wins: data.head2head.awayTeam.wins,
                draws: data.head2head.awayTeam.draws,
                losses: data.head2head.awayTeam.losses
            }
        },
        match: {
            utcDate: data.match.utcDate,
            venue: data.match.venue,
            matchday: data.match.matchday,
            homeTeam: {
                name: data.match.homeTeam.name
            },
            awayTeam: {
                name: data.match.awayTeam.name
            }
        }
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        console.log('Match tersimpan');
        document.getElementById("iconFav").innerHTML = "Saved";
        M.toast({
            html: 'Match berhasil tersimpan'
        });
    }).catch(function () {
        M.toast({
            html: 'Error'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("iconFav").innerHTML = "Save";
        M.toast({
            html: 'Match berhasil dihapus'
        });
    }).catch(function () {
        M.toast({
            html: 'Error'
        });
    });
}

function getSavedDataById(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));
    getDataById("match_favorit", idParam).then(function (match) {
        resultDetailMatchJSON(match);
    });
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function readDataFavHtml(dataType) {
    getAllData("match_favorit").then(function (data) {
        resultMatchFav(data);
    });

}