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

function computeValueForExoplanetDisplay(value) {
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

function convertParsecsToLightYears(distance) {
    return (distance * 3.2615637769).toFixed(2)
}

export {mergeExoplanetDocs, computeValueForExoplanetDisplay, convertParsecsToLightYears};