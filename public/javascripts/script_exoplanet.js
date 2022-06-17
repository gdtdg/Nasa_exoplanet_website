import {mergeExoplanetDocs} from "./library.js";
import {getExoplanetDocs} from "./service/exoplanetDocsService.js"
import {mapping} from "./configuration.js";


let planetNameToFormat = window.location.pathname.split('/');
let planetName = decodeURI(planetNameToFormat.at(-1));

function createRow(mapping, exoplanetData) {
    return `<tr><th>${mapping}</th><td>${exoplanetData}</td></tr>`
}

function computeValueToDisplay(value) {
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

function formatValue(value, unit) {
    if (value !== "Unknown") {
        value = value + unit + "<span style='color:red; font-size: 1.5em'> *</span>";
    }
    return value
}

function formatPlanetStatus(planetStatusArray) {
    const planetStatusString = planetStatusArray.toString();
    if (planetStatusString === "0") {
        return '<span style="color: lime">Confirmed ✔</span>'
    }
    if (planetStatusString === "1") {
        return '<span style="color: orange">Controversial !</span>'
    }
}

function formatSpectralType(spectralTypeArray) {
    const spectralTypeString = spectralTypeArray.toString();
    if (spectralTypeString.length === 0) {
        return "Unknown"
    } else {
        return spectralTypeArray;
    }
}

function convertParsecsToLightYears(distance) {
    return (distance * 3.2615637769).toFixed(2)
}

function formatDistanceLightYear(distanceArray) {
    const distanceString = distanceArray.toString();
    if (distanceString.length === 0) {
        return 'Unknown <span style="color: lightgrey">distance from Earth</span>'
    } else {
        const distanceLightYear = convertParsecsToLightYears(distanceArray)
        return '<span style="color: lightgrey">You are </span>' + distanceLightYear + '<span style="color: lightgrey"> light-years from Earth</span>';
    }
}

function createExoplanetDisplay(exoplanet) {
    let planetStatusDisplay = formatPlanetStatus(exoplanet.pl_controv_flag);

    let exoplanetMassValue = computeValueToDisplay(exoplanet.pl_msinie)
    exoplanetMassValue = formatValue(exoplanetMassValue, " Earths")

    let exoplanetEccentricity = computeValueToDisplay(exoplanet.pl_orbeccen)
    exoplanetEccentricity = formatValue(exoplanetEccentricity, '')

    let exoplanetSpectralType = formatSpectralType(exoplanet.st_spectype);

    let distanceLightYear = formatDistanceLightYear(exoplanet.sy_dist);

    let exoplanetRadius = computeValueToDisplay(exoplanet.pl_rade)
    exoplanetRadius = formatValue(exoplanetRadius, " Earths")

    let exoplanetOrbitalPeriod = computeValueToDisplay(exoplanet.pl_orbper)
    exoplanetOrbitalPeriod = formatValue(exoplanetOrbitalPeriod, " days")

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