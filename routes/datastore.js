const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const dataStoreService = require('../service/datastoreService');


router.get('/random-search', async (req, res, next) => {
    // First, build elasticsearch query
    const randomQuery = JSON.stringify(randomSearchQuery());
    console.log("random query:", randomQuery);

    // Then, send the query to elasticsearch
    const exoplanets = await dataStoreService.queryData(randomQuery)
    console.log("answer from es service", exoplanets);

    res.json({data: exoplanets});
});

/* GET an exoplanet data. */
router.get('/:planetName', async (req, res, next) => {
    // First, build elasticsearch query
    const query = JSON.stringify(buildQueryWithPlanetName(req.params.planetName));

    // Then, send the query to elasticsearch
    const host = "localhost";
    const port = "9200";
    const index = "exoplanet_csv";
    const url = `https://${host}:${port}/${index}/_search`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZWxhc3RpYzo1anpSUUpwN05lbEV2d2VjdGtIbQ=='
    };
    const httpsAgent = new https.Agent({rejectUnauthorized: false});
    const options = {
        method: 'POST',
        body: query,
        headers: headers,
        agent: httpsAgent
    };

    const answerFromElasticsearch = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));
    const exoplanets = answerFromElasticsearch['hits']['hits'].map((obj) => obj._source);

    res.json({data: exoplanets});
});

/* POST advanced search. */
// https://localhost:3000/data/exoplanet/advanced-search
router.post('/advanced-search', async (req, res, next) => {
    // on recupere le body => criteria
    const criteria = req.body;
    console.log("criteria", JSON.stringify(criteria));

    // Ensuite, avec ces criteres, on costruit la requete
    const advancedQuery = JSON.stringify(buildAdvancedQuery(criteria));

    // executer la requete
    const host = "localhost";
    const port = "9200";
    const index = "exoplanet_csv";
    const url = `https://${host}:${port}/${index}/_search`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZWxhc3RpYzo1anpSUUpwN05lbEV2d2VjdGtIbQ=='
    };
    const httpsAgent = new https.Agent({rejectUnauthorized: false});
    const options = {
        method: 'POST',
        body: advancedQuery,
        headers: headers,
        agent: httpsAgent
    };

    console.log("body", advancedQuery);
    console.log("body", JSON.stringify(advancedQuery));

    const answerFromElasticsearch = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.log("Unable to fetch", err));

    // traiter les résultats.
    console.log("answer", answerFromElasticsearch);
    const exoplanets = answerFromElasticsearch['hits']['hits'].map((obj) => obj._source);

    // Retourner les resultats
    res.json({data: exoplanets});
});


function buildQueryWithPlanetName(id) {
    const decodedId = decodeURI(id);
    console.log(decodedId);
    return {
        "size": 50,
        "query": {
            "match": {
                "pl_name": {
                    "query": id,
                    "minimum_should_match": "100%"
                }
            }
        }
    };
}

function buildAdvancedQuery(criteria) {
    const keys = Object.keys(criteria);
    const conditions = keys.map((key) => {
                if (criteria[key].length > 1) {
                    return {
                        "range": {
                            [key]: {
                                "gte": criteria[key][0],
                                "lte": criteria[key][1]
                            }
                        }
                    }
                } else {
                    return {
                        "match": {
                            [key]: {
                                "query": criteria[key].toString(),
                                "operator": "and"
                            }
                        }
                    }
                }
            }
        )
    ;
    console.log("conditions", conditions);

    return {
        "size": 50,
        "query": {
            "bool": {
                "must":
                conditions
            }
        }
    };
}


function randomSearchQuery() {
    return {
        "size": 4,
        "query": {
            "function_score": {
                "random_score": {}
            }
        }
    };
}

console.log(JSON.stringify(randomSearchQuery()));


module.exports = router;

