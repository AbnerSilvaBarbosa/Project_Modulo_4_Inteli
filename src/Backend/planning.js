//Create an array with all fibonacci numbers under 34
const fibonacci = [0, 1];
for (let i = 2; i < 11; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}

const random = Math.floor(Math.random() * fibonacci.length);
console.log(fibonacci[random]);