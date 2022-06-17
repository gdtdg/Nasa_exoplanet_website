import {createExoplanetCard, mergeExoplanetDocs, showResult} from "./library.js";

import {mappingInputs, mappingSelect} from "./configuration.js";

import {getExoplanetDocs, getExoplanetDocsAdvancedSearch, getRandomExoplanetDocs,} from "./service/exoplanetDocsService.js";


async function randomSearch() {
    const exoplanets = await getRandomExoplanetDocs();
    const exoplanet = mergeExoplanetDocs(exoplanets);
    showResult(exoplanet);
}

async function search() {
    let allCards = [];
    if (this.value.length === 0) {
        document.getElementById('result').innerHTML = "";
        randomSearch();
    } else {
        const exoplanets = await getExoplanetDocs(this.value);
        const exoplanet = mergeExoplanetDocs(exoplanets);
        // Do not work with showResult function, so:
        for (let name of exoplanet.pl_name) {
            let newCard = createExoplanetCard(name)
            allCards += newCard;
        }
    }
    document.getElementById('result').innerHTML = allCards;
}

function toggleAdvancedSearch() {
    let advancedSearch = document.getElementById('menu-box');
    if (advancedSearch.style.display === "block") { // if is advancedSearch displayed, hide it
        advancedSearch.style.display = "none";
    } else { // if is advancedSearch hidden, display it
        advancedSearch.style.display = "block";
    }
}

async function advancedSearch() {
    document.getElementById('result').innerHTML = "";
    let queryObject = {};

    for (let key in mappingInputs) {
        let valuesInput = $(`input[name='${key}']`)
            .map(function () {
                return $(this).val();
            }).get();
        // Single input field is filled or range inputs both fields are filled:
        if (valuesInput[0] !== '' && valuesInput[1] !== '') {
            queryObject[key] = valuesInput;
        }
        // Only the left field in filled:
        if (valuesInput[0] !== '' && valuesInput[1] === '') {
            valuesInput[1] = valuesInput[0];
            queryObject[key] = valuesInput;
        }
        // Only the right field in filled: we also check length to only select 2 fields inputs:
        if (valuesInput[0] === '' && valuesInput[1] !== '' && valuesInput.length > 1) {
            valuesInput[0] = valuesInput[1];
            queryObject[key] = valuesInput;
        }
    }

    for (let key in mappingSelect) {
        let valuesSelect = $(`select[name='${key}']`)
            .map(function () {
                return $(this).val();
            }).get();
        if (valuesSelect.length !== 0) {
            queryObject[key] = valuesSelect;
        }
    }

    const exoplanets = await getExoplanetDocsAdvancedSearch(queryObject);
    const exoplanet = mergeExoplanetDocs(exoplanets);
    showResult(exoplanet);
}


document.addEventListener("DOMContentLoaded", randomSearch);

document.getElementById("search").addEventListener("input", search);

document.getElementById("menu").addEventListener('click', toggleAdvancedSearch);

document.getElementById("advanced_search_button").addEventListener('click', advancedSearch);

$(function () {
    $('[data-toggle="popover"]').popover()
})