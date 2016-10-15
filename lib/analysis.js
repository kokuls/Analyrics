var wf = require('word-freq');
var speak = require('speakeasy-nlp');

function strip(str) {
    var stripped = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/ *\[[^\]]*]/g, "")
        .replace(/\n/g, " ")
        .toLowerCase();
    return stripped;
}

function sortObject(obj) {
    var arr = [];

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'w': prop,
                'c': obj[prop]
            });
        }
    }

    arr.sort(function(b, a) {
        return a.c - b.c;
    });
    return arr;
}

function wordFreq(str) {
    return sortObject(wf.freq(strip(str), true, false));
}

function format(str) {
    var lyrics = str.split('\n');
    var re = new RegExp(/^\[.*\]$/);
    var formatted = "";

    for (line in lyrics) {
        if (lyrics[line].includes('googletag') || re.test(lyrics[line])) {

        } else {
            formatted += lyrics[line] + '\n';
        }
    }
    return formatted;
}

function sentiment(str) {
    return speak.sentiment.analyze(str);
}


module.exports.wordFreq = wordFreq;
module.exports.format = format;
module.exports.sentiment = sentiment;