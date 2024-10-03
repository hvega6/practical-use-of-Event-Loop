let counter = 0;

function recursiveFunction() {
    counter++;
    recursiveFunction(); // Call itself recursively
}

try {
    recursiveFunction();
} catch (e) {
    console.log('Stack overflow occurred after', counter, 'recursive calls');
}

// Step 1: Write the recursive function
const flattenArray = (arr) => {
    if (!Array.isArray(arr)) return [arr];
    return arr.reduce((acc, val) => acc.concat(flattenArray(val)), []);
};

// Step 2: Modify the recursive function for trampolining
const flatten = (arr, result = []) => {
    if (arr.length === 0) return result;
    const [head, ...tail] = arr;
    if (Array.isArray(head)) {
        return () => flatten(head.concat(tail), result);
    }
    result.push(head);
    return () => flatten(tail, result);
};

// Step 3: Trampoline function
const trampoline = (fn) => {
    let result = fn();
    while (typeof result === 'function') {
        result = result();
    }
    return result;
};

// Usage
const nestedArray = [[1], [2, [3, [4]]], 5];
const flattenedArray = trampoline(() => flatten(nestedArray));
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5]

