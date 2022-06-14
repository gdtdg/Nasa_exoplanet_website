import {PROTOCOL, SERVER_HOST, SERVER_PORT} from "./configuration.js";


async function getExoplanetDocs(planetName) {
    const url = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/data/exoplanet/${planetName}`; // TODO : Export the logic in a service (Same as datastore and datastoreService)
    const headers = {'Content-Type': 'application/json'};
    const options = {
        method: 'GET',
        headers: headers,
    };

    const exoplanetDocs = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));

    return exoplanetDocs['data'];
}


async function getExoplanetDocsAdvancedSearch(criteria) {
    const url = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/data/exoplanet/advanced-search/`; // TODO : Export the logic in a service (Same as datastore and datastoreService)
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(criteria)
    };
    console.log(criteria);
    const exoplanetDocs = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));
    console.log(exoplanetDocs['data']);
    return exoplanetDocs['data'];
}

async function getRandomExoplanetDocs() {
    const url = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/data/exoplanet/random-search/`; // TODO : Export the logic in a service (Same as datastore and datastoreService)
    const headers = {
        'Content-Type': 'application/json'
    };
    const options = {
        method: 'GET',
        headers: headers,
    };
    const exoplanetDocs = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));
    console.log(exoplanetDocs['data']);
    return exoplanetDocs['data'];
}


function mergeExoplanetDocs(exoplanetDocs) {
    const keys = Object.keys(exoplanetDocs[0]);

    const res = {};
    keys.forEach((key) => {
        res[key] = [];
        exoplanetDocs.forEach((exoplanetDoc) => {
            if (!res[key].includes(exoplanetDoc[key])) {
                res[key].push(exoplanetDoc[key]);
            }
        })
    });
    return res;
}

function createExoplanetCard(exoplanetName) {
    return `<a href="http://localhost:3000/exoplanet/${decodeURI(exoplanetName)}">
                <div class="frame">
                    <div class="planet_index">
                        <div class="wrap_index">
                            <div class="background_index"></div>
                            </div>
                        <div class="mask_index"></div>
                    </div>
                <div class="exoplanet_name">${exoplanetName}</div>
            </div>
            </a>`
}

function showResult(exoplanet) {
    for (let name of exoplanet.pl_name) {
        document.getElementById("result").innerHTML += createExoplanetCard(name);
    }
}

export {
    getExoplanetDocs,
    mergeExoplanetDocs,
    getRandomExoplanetDocs,
    getExoplanetDocsAdvancedSearch,
    showResult,
    createExoplanetCard
}
