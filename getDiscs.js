const rp = require('request-promise');
const cheerio = require('cheerio');
const open = require("opn"); 

let min = parseInt(process.argv[2]), max = parseInt(process.argv[3]); 

exports.default = async function(urls) {
    console.log("FETCHING: ", urls)
    let htmls = await Promise.allSettled(urls.map(discUrl => rp(discUrl))); 
    let foundDiscs = getDiscs(htmls);
    console.log("FOUND", foundDiscs);
    console.log("Opening urls...")
    foundDiscs.forEach(foundUrl => {
        console.log("Opened " + foundUrl)
        open(foundUrl); 
    }); 
}

function getDiscs(htmlList) {
    let offers = htmlList.map((html, i) => {
        return cheerio("script" , html.value).map((i, script) => {
            if(script.attribs.type && script.attribs.type === "application/ld+json") {
                let json = JSON.parse(script.children[0].data);
                if(json.hasOwnProperty("offers")) {
                    return json.offers;  
                }
            }
        }).get();
    }); 

    let found = offers.map(discOffers => {
        for(let off of discOffers) {
            let weight = off.sku.split("-")[1]; 

            if(min <= weight && max >= weight && off.availability === "http://schema.org/InStock") {
                console.log(off.sku, weight, min, max);
                return off.url
            }
        }

        return null;
    }).filter(el => el !== null); 
    
    console.log("disc URLs:", found, "Amount:", found.length)
    return found; 
}