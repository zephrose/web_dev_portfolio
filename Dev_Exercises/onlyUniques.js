'use strict';

const randArr = ["Y_col1","X_row1",
				 "Y_col1","X_row2",
				 "Y_col2","X_row2",
				 "Y_col2","X_row3",
				 "Y_col3","X_row3",
				 "Y_col3","X_row4",
				 "Y_col4","X_row4",
				 "Y_col4","X_row5",
				 "Y_col5","X_row5",
				 "Y_col5","X_row6",
				 "Y_col6","X_row6",
				 "Y_col6","X_row7"
				 ];

console.log(" Original Array : " + randArr);

var filteredArr = randArr.filter(function(item, pos) {
	return randArr.indexOf(item) == pos;
});

console.log("\n Using Filter : " + filteredArr);

var uniqArr = [...new Set(randArr)];

console.log("\n Using Set : " + uniqArr)
