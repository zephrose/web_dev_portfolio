// node bubbleSort.js
// Change 'ourRange' for smaller/larger values

var ourRange = 100000;
var ourArray = [];

Array.prototype.generate_numbers = function(amount){

  for (var i = 0; i < amount; i++ ){
    this[i] = Math.floor(Math.random() * amount + 1);
  }

  return this;

}

function swap(arr, first_Index, second_Index){

    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;

}

function bubble_Sort(arr){

    var len = arr.length;
    var i, j;

    for (i=0; i < len; i++){
        for (j=0; j < len-i; j++){
            if (arr[j] > arr[j+1]){
                swap(arr, j, j+1);
            }
        }
    }

    return arr;
}

//console.log(ourArray.generate_numbers(ourRange));
console.log(bubble_Sort(ourArray.generate_numbers(ourRange)));
console.log("Sorted " + ourRange);

