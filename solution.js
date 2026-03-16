
function checkVariable(input) {
    switch (typeof input) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'bigint':
        case 'undefined':
            return typeof input;
        default:
            return 'object';
    }
}


function generateIDs(count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        if (i === 5) continue; 
        ids.push(`ID-${i}`);
    }
    return ids;
}


function calculateTotal(...numbers) {
    if (!numbers.every(n => typeof n === 'number')) {
        throw new TypeError("Invalid input: All arguments must be numbers");
    }
    return numbers.reduce((sum, n) => sum + n, 0);
}


function getTopScorers(playerList) {
    return playerList
        .filter(player => player.score > 8)
        .map(player => player.name)
        .join(', ');
}


class Item {
    #discount = 0.1; // 10%
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get finalPrice() {
        return this.price * (1 - this.#discount);
    }
}


function safeDivide(a, b) {
    try {
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
    } catch (err) {
        return err.message;
    } finally {
        console.log("Operation attempted");
    }
}


console.log(checkVariable(123));           
console.log(checkVariable("hello"));       
console.log(checkVariable(null));          

console.log(generateIDs(7));              

console.log(calculateTotal(1, 2, 3, 4));  
const players = [
    {name: "Alice", score: 10},
    {name: "Bob", score: 5},
    {name: "Charlie", score: 9},
    {name: "Dave", score: 7}
];
console.log(getTopScorers(players));     

const item = new Item("Laptop", 1000);
console.log(item.finalPrice);             
console.log(safeDivide(10, 2));           
console.log(safeDivide(10, 0));           