import {getExoplanetDocs, getExoplanetDocsAdvancedSearch, getRandomExoplanetDocs} from "./service/exoplanetDocsService.js";
import {mergeExoplanetDocs} from "./helper.js";
import {createExoplanetCard, showSearchResult} from "./library.js";
import {mappingInputs, mappingSelect} from "./configuration.js";

async function randomSearch() {
    const exoplanets = await getRandomExoplanetDocs();
    const exoplanet = mergeExoplanetDocs(exoplanets);
    showSearchResult(exoplanet);
}

async function inputSearch() {
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

async function advancedSearch() {
    document.getElementById('result').innerHTML = "";
    let queryObject = {};

    for (let key in mappingInputs) {
        const valuesInput = $(`input[name='${key}']`)
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
        const valuesSelect = $(`select[name='${key}']`)
            .map(function () {
                return $(this).val();
            }).get();
        if (valuesSelect.length !== 0) {
            queryObject[key] = valuesSelect;
        }
    }

    const exoplanets = await getExoplanetDocsAdvancedSearch(queryObject);
    const exoplanet = mergeExoplanetDocs(exoplanets);
    showSearchResult(exoplanet);
}

export {randomSearch, inputSearch, advancedSearch}