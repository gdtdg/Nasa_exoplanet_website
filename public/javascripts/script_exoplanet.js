import {mergeExoplanetDocs} from "./helper.js";
import {createExoplanetDisplay, createExoplanetTable} from "./library.js";
import {getExoplanetDocs} from "./service/exoplanetDocsService.js"
import {mapping} from "./configuration.js";


const planetNameToFormat = window.location.pathname.split('/');
const planetName = decodeURI(planetNameToFormat.at(-1));


async function loadExoplanetData() {
    const exoplanets = await getExoplanetDocs(planetName);
    const exoplanet = mergeExoplanetDocs(exoplanets);
    document.getElementById("show_exoplanet_display").innerHTML = createExoplanetDisplay(exoplanet)
    document.getElementById("show_exoplanet_data").innerHTML = createExoplanetTable(mapping, exoplanet);
}

document.addEventListener("DOMContentLoaded", loadExoplanetData);