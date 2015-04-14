var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async');

var urlPrefix = 'http://www.wunderground.com/history/airport/EHRD/',
	urlSuffix = '/DailyHistory.html?req_city=The%20Hague&req_state=ZH&req_statename=Netherlands&reqdb.zip=00000&reqdb.magic=4&reqdb.wmo=06200',
	urlTemplate = urlPrefix + '#######' + urlSuffix;


var getData = function(date, callback) {
	var url = urlTemplate.replace('#######', date);
	request(url, function (error, response, html) {
		if (!error && response.statusCode == 200) {
			//console.log('processing ' + url);
			var $ = cheerio.load(html);
			var wind = $('#historyTable > tbody > tr');
			var result = {};
			result.date = date;
			wind.each(function(i, row) {
				var text = $(row).text().trim();
				if (text.indexOf('Max Wind Speed') > -1) {
					var max = parseInt(text.replace('Max Wind Speed\n\t\t\n  ', '').replace(' km/h', ''));
					result.max = max;
				}
				else if (text.indexOf('Wind Speed') > -1) {
					var avg = parseInt(text.replace('Wind Speed\n\t\t\n  ', '').replace(' km/h\n ()', ''));
					result.avg = avg;
				}
			});
			callback(result);
		}
		else {
			//console.log(error);
		}
	});
};

//var range = '####/7/6 ####/7/7 ####/7/8 ####/7/9 ####/7/10';
//var range = '####/7/20 ####/7/21 ####/7/22 ####/7/23 ####/7/24';
var range = '####/8/3 ####/8/4 ####/8/5 ####/8/6 ####/8/7';

var dates = [];

for (var i = 2000; i < 2015; i++) {
	var tmp = range.replace(/####/g, i);
	dates = dates.concat(tmp.split(' '));
};

//console.log(dates);

var winds = [];

async.eachSeries(
	dates,
	function(date, callback) {
		getData(date, function(data) {
			winds.push(data);
			callback();
		});
	},
	function(err){
		console.log(winds);
	}
);
