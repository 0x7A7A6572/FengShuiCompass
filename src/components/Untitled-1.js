
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];

    for (let num of arr) {
        if (num < pivot) {
            left.push(num);
        } else if (num > pivot) {
            right.push(num);
        } else {
            equal.push(num);
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)];
}

console.log(quickSort([3, 6, 8, 10, 1, 2, 1])); // 输出: [1, 1, 2, 3, 6, 8, 10]
