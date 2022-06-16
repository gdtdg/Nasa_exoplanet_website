import {mergeExoplanetDocs} from "./library.js";
import {getExoplanetDocs} from "./exoplanetDocsService.js"
import {mapping} from "./configuration.js";


let planetNameToFormat = window.location.pathname.split('/');
let planetName = decodeURI(planetNameToFormat.at(-1));

function createRow(mapping, exoplanetData) {
    return `<tr><th>${mapping}</th><td>${exoplanetData}</td></tr>`
}

function valueToDisplay(value) {
    let res;
    if (value.length > 1) {
        // Value can be '' or 0.0
        res = value.map(Number).filter(Number);
        if (res.length !== 0) {
            res = res.reduce((a, b) => a + b) / res.length
            res = res.toFixed(2)
        } else {
            res = "Unknown"
        }
    }
    if (value.length === 1) {
        res = parseFloat(value).toFixed(2);
    }
    if (value === '') {
        res = "Unknown"
    }
    return res;
}

function ifValueDifferentThanUnknown(value, unit) {
    if (value !== "Unknown") {
        value = value + unit + "<span style='color:red; font-size: 1.5em'> *</span>";
    }
    return value
}

function showPlControvFlag(exoplanet) {
    if (exoplanet.pl_controv_flag == 0) {
        return '<span style="color: lime">Confirmed ✔</span>'
    }
    if (exoplanet.pl_controv_flag == 1) {
        return '<span style="color: orange">Controversial !</span>'
    }
}

function showSpectralType(exoplanet) {
    if (exoplanet.st_spectype == '') {
        return "Unknown"
    } else {
        return exoplanet.st_spectype;
    }
}

function convertParsecsToLightYears(distance) {
    return (distance * 3.2615637769).toFixed(2)
}

function showDistanceLightYear(exoplanet) {
    if (exoplanet.sy_dist == 0) {
        return 'Unknown <span style="color: lightgrey">distance from Earth</span>'
    } else {
        let distanceLightYear = convertParsecsToLightYears(exoplanet.sy_dist)
        return '<span style="color: lightgrey">You are </span>' + distanceLightYear + '<span style="color: lightgrey"> light-years from Earth</span>';
    }
}

function createExoplanetDisplay(exoplanet) {
    let planetStatusDisplay = showPlControvFlag(exoplanet);

    let exoplanetMassValue = valueToDisplay(exoplanet.pl_msinie)
    exoplanetMassValue = ifValueDifferentThanUnknown(exoplanetMassValue, " Earths")

    let exoplanetEccentricity = valueToDisplay(exoplanet.pl_orbeccen)
    exoplanetEccentricity = ifValueDifferentThanUnknown(exoplanetEccentricity, '')

    let exoplanetSpectralType = showSpectralType(exoplanet);

    let distanceLightYear = showDistanceLightYear(exoplanet);

    let exoplanetRadius = valueToDisplay(exoplanet.pl_rade)
    exoplanetRadius = ifValueDifferentThanUnknown(exoplanetRadius, " Earths")

    let exoplanetOrbitalPeriod = valueToDisplay(exoplanet.pl_orbper)
    exoplanetOrbitalPeriod = ifValueDifferentThanUnknown(exoplanetOrbitalPeriod, " days")

    return `<div class="exoplanet_display">
                    <div class="planet_display">
                        <div class="wrap_display">
                            <div class="background_display"></div>
                         </div>
                        <div class="mask_display"></div>
                    </div>
                    <div class="line_planet_status"></div>
                    <div class="planet_status_display">Planet status: ${planetStatusDisplay}</div>
                    <div class="line_mass"></div>
                    <div class="mass_display">Mass: ${exoplanetMassValue}</div>
                    <div class="line_planet_type"></div>
                    <div class="planet_type_display">Planet type <a href="https://en.wikipedia.org/wiki/Stellar_classification" title="Learn more about stellar classification" target="_blank">(?)</a>: ${exoplanetSpectralType}</div>
                    <div class="line_eccentricity"></div>
                    <div class="eccentricity_display">Eccentricity: ${exoplanetEccentricity}</div>
                    
                    <div class="line_discovery_date"></div>
                    <div class="discovery_date_display">Discovery date: ${exoplanet.disc_year}</div>
                    <div class="line_planet_radius"></div>
                    <div class="planet_radius_display">Planet radius: ${exoplanetRadius}</div>
                    <div class="line_orbital_period"></div>
                    <div class="orbital_period_display">Orbital period: ${exoplanetOrbitalPeriod}</div>
                    <div class="line_discovery_method"></div>
                    <div class="discovery_method_display"><div>Discovery method:</div><div>${exoplanet.discoverymethod}</div></div>
                    
                    <div class="light_year_display">${distanceLightYear}</div>
                    
                <div class="exoplanet_name">${exoplanet.pl_name}</div>
            </div>`
}


function showExoplanetData(mapping, exoplanetData) {
    console.log(exoplanetData);
    let table = "<table>";
    for (let key in mapping) {
        if (exoplanetData[key].length > 1) {
            let allTd = '';
            for (let element of exoplanetData[key]) {
                let td = `<td>${element}</td>`;
                allTd += td;
            }
            let newRowWithTds = `<tr><th>${mapping[key]}</th>${allTd}</tr>`
            table += newRowWithTds;

        } else {
            let newRow = createRow(mapping[key], exoplanetData[key]);
            table += newRow;
        }
    }
    table = table + "</table>";
    document.getElementById("show_exoplanet_data").innerHTML = table;
}


async function loadExoplanetData() {
    const exoplanets = await getExoplanetDocs(planetName);
    const exoplanet = mergeExoplanetDocs(exoplanets);
    showExoplanetData(mapping, exoplanet);
}

async function loadExoplanetDisplay() {
    const exoplanets = await getExoplanetDocs(planetName);
    const exoplanet = mergeExoplanetDocs(exoplanets);
    document.getElementById("show_exoplanet_display").innerHTML += createExoplanetDisplay(exoplanet)
}

document.addEventListener("DOMContentLoaded", loadExoplanetDisplay);

document.addEventListener("DOMContentLoaded", loadExoplanetData);