var lyrics = require("./lib/lyrics");
var charts = require("./lib/charts");
var analysis = require("./lib/analysis");

function getSong(query, callback) {
	lyrics.getSongLyrics(query, function(lyr) {
		lyr = analysis.format(lyr);
		var songObj = {
			song: query,
			lyrics: lyr,
			frequency: analysis.wordFreq(lyr)
		};		

		return callback(songObj);
	});
}

function getBillboard(url, callback) {
	charts.getSongs(url, function(songs) {
		for (var i = 0; i < songs.length; ++i) {
			var query = songs[i].title;	
		}   
		return callback(songs)
	});
}

module.exports.getSong = getSong;
module.exports.getBillboard = getBillboard;