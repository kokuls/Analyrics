var request = require("request");
var cheerio = require("cheerio");
var config = require("./config");
var analysis = require("./analysis");
var token = config.genius;


function getSongUrl(query, callback) {
    var encodedQuery = encodeURIComponent(query);
    var url = "http://api.genius.com/search?access_token=" + token + "&q=" + encodedQuery;

    request(url, function(err, resp, body) {
        if (!err && resp.statusCode === 200) {
            var hits = JSON.parse(body).response.hits;

            if (hits.length > 0) {
                return callback(hits[0].result.url);
            } else {
                console.log("Warning: No songs were found for '" + query + "'");
            }
        } else {
            console.error("Error: Could not find song URL");
        }
    });
}

function getSongLyrics(query, callback) {
    getSongUrl(query, function(url) {
        request(url, function(err, resp, body) {
            if (!err && resp.statusCode === 200) {
                var $ = cheerio.load(body);
                var lyrics = $('p', '.lyrics').text().trim();
                return callback(lyrics);
            } else {
                console.error("Error: Could not fetch song lyrics")
            }
        });
    });
}

module.exports.getSongLyrics = getSongLyrics;
