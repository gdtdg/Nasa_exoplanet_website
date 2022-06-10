const SERVER_HOST = "localhost";
const SERVER_PORT = "3000";
const PROTOCOL = "http";

let mapping = {
    "pl_name": "Planet Name",
    "hostname": "Host Name",
    "default_flag": "Default Parameter Set",
    "sy_snum": "Number of Stars",
    "sy_pnum": "Number of Planets",
    "discoverymethod": "Discovery Method",
    "disc_year": "Discovery Year",
    "disc_facility": "Discovery Facility",
    "soltype": "Solution Type",
    "pl_controv_flag": "Controversial Flag",
    "pl_refname": "Planetary Parameter Reference",
    "pl_orbper": "Orbital Period [days]",
    "pl_orbsmax": "Orbit Semi-Major Axis [au])",
    "pl_rade": "Planet Radius [Earth Radius]",
    "pl_radj": "Planet Radius [Jupiter Radius]",
    "pl_msinie": "Planet Mass*sin(i) [Earth Mass]",
    "pl_msinij": "Planet Mass*sin(i) [Jupiter Mass]",
    "pl_bmassprov": "Planet Mass or Mass*sin(i) Provenance",
    "pl_orbeccen": "Eccentricity",
    "pl_insol": "Insolation Flux [Earth Flux]",
    "pl_eqt": "Equilibrium Temperature [K]",
    "ttv_flag": "Data show Transit Timing Variations",
    "st_refname": "Stellar Parameter Reference",
    "st_spectype": "Spectral Type",
    "st_teff": "Stellar Effective Temperature [K]",
    "st_rad": "Stellar Radius [Solar Radius]",
    "st_mass": "Stellar Mass [Solar mass]",
    "st_met": "Stellar Metallicity [dex]",
    "st_metratio": "Stellar Metallicity Ratio",
    "st_logg": "Stellar Surface Gravity [log10(cm/s**2)]",
    "sy_refname": "System Parameter Reference",
    "rastr": "RA [sexagesimal]",
    "decstr": "Dec [sexagesimal]",
    "sy_dist": "Distance [pc]",
    "sy_vmag": "V (Johnson) Magnitude",
    "sy_kmag": "Ks (2MASS) Magnitude",
    "sy_gaiamag": "Gaia Magnitude",
    "rowupdate": "Date of Last Update",
    "pl_pubdate": "Planetary Parameter Reference Publication Date",
    "releasedate": "Release Date"
};


let mappingInputs = {
    "pl_name": "Planet Name",
    "hostname": "Host Name",
    "sy_snum": "Number of Stars",
    "sy_pnum": "Number of Planets",
    "disc_year": "Discovery Year",
    "disc_facility": "Discovery Facility",
    "pl_refname": "Planetary Parameter Reference",
    "pl_orbper": "Orbital Period [days]",
    "pl_orbsmax": "Orbit Semi-Major Axis [au])",
    "pl_rade": "Planet Radius [Earth Radius]",
    "pl_radj": "Planet Radius [Jupiter Radius]",
    "pl_msinie": "Planet Mass*sin(i) [Earth Mass]",
    "pl_msinij": "Planet Mass*sin(i) [Jupiter Mass]",
    "pl_orbeccen": "Eccentricity",
    "pl_insol": "Insolation Flux [Earth Flux]",
    "pl_eqt": "Equilibrium Temperature [K]",
    "st_refname": "Stellar Parameter Reference",
    "st_spectype": "Spectral Type",
    "st_teff": "Stellar Effective Temperature [K]",
    "st_rad": "Stellar Radius [Solar Radius]",
    "st_mass": "Stellar Mass [Solar mass]",
    "st_met": "Stellar Metallicity [dex]",
    "st_logg": "Stellar Surface Gravity [log10(cm/s**2)]",
    "sy_refname": "System Parameter Reference",
    "rastr": "RA [sexagesimal]",
    "decstr": "Dec [sexagesimal]",
    "sy_dist": "Distance [pc]",
    "sy_vmag": "V (Johnson) Magnitude",
    "sy_kmag": "Ks (2MASS) Magnitude",
    "sy_gaiamag": "Gaia Magnitude",
    "rowupdate": "Date of Last Update",
    "pl_pubdate": "Planetary Parameter Reference Publication Date",
    "releasedate": "Release Date"
};


let mappingSelect = {
    "default_flag": "Default Parameter Set",
    "discoverymethod": "Discovery Method",
    "soltype": "Solution Type",
    "pl_controv_flag": "Controversial Flag",
    "pl_bmassprov": "Planet Mass or Mass*sin(i) Provenance",
    "ttv_flag": "Data show Transit Timing Variations",
    "st_metratio": "Stellar Metallicity Ratio",
};

export {SERVER_HOST, SERVER_PORT, PROTOCOL, mapping, mappingInputs, mappingSelect}