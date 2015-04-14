var range1 = require('./range1'),
	range2 = require('./range2'),
	range3 = require('./range3');

var reducedData = {};
reducedData.range1 = [];
reducedData.range2 = [];
reducedData.range3 = [];

for (var i = 0; i < 75; i = i+5) {
	var avg1 = 0;
	var date1;
	var max1 = 0;
	var avg2 = 0;
	var date2;
	var max2 = 0;
	var avg3 = 0;
	var date3;
	var max3 = 0;
	for (var j = i; j < i + 5; j++) {
		avg1 += range1[j].avg;
		date1 = range1[j].date;
		if (range1[j].max > max1) max1 = range1[j].max;
		avg2 += range2[j].avg;
		date2 = range2[j].date;
		if (range2[j].max > max2) max2 = range2[j].max;
		avg3 += range3[j].avg;
		date3 = range3[j].date;
		if (range3[j].max > max3) max3 = range3[j].max;
	};
	var obj1 = {
		year: date1.substring(0, 4),
		avg: avg1/5,
		max: max1
	};
	reducedData.range1.push(obj1);

	var obj2 = {
		year: date2.substring(0, 4),
		avg: avg2/5,
		max: max2
	};
	reducedData.range2.push(obj2);

	var obj3 = {
		year: date3.substring(0, 4),
		avg: avg3/5,
		max: max3
	};
	reducedData.range3.push(obj3);

	// console.log(avg1/5);
	// console.log(max1);
	// console.log(date2.substring(0, 4));
	// console.log(avg2/5);
	// console.log(max2);
	// console.log(date3.substring(0, 4));
	// console.log(avg3/5);
	// console.log(max3);
};
console.log(reducedData);
console.log(reducedData.range3.map(function(element) { return element.max }))


