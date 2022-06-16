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
    mergeExoplanetDocs,
    showResult,
    createExoplanetCard
}
