// Exercise 1
let arr = [0, 1, 2, 3, 4];

let fn = (el) => {
    let revArr = arr.reverse();
    return revArr;
};

fn(arr);

//Exercise 2
let arrOne = [0, 1, 2, 3, 4, 5];
let arrTwo = [6, 7, 8, 9, 10];

let fn = (arg1, arg2) => {
    let result = [...arg1, ...arg2];
    return result;
};

fn(arrOne, arrTwo);

//Exercise 3
const myCity = {
    name: "Berlin",
    country: "Germany",
    population: 4000000,
};

const fn = (city) => {
    const { name, country, population: numPeople } = city;
    console.log(`${name} is in ${country} and has ${numPeople} in it.`);
};

fn(myCity);

// // Exercise 4
let myCity1 = {
    name: "Berlin",
    country: "Spain",
    population: 4000000,
};

let myCity2 = {
    name: "Paris",
    country: "France",
    population: 12000000,
};

// let getNameAndCountry = ({ name, country }) => [name, country];

var getNameAndCountry = function (city) {
    return [city.name, city.country];
};

// let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
//     let [, country] = getNameAndCountry(city2);
//     return {
//         ...city1,
//         country,
//     };
// };

// getRelocatedCity(myCity1);

var getRelocatedCity = function (city1, city2) {
    if (city2) {
        city1.country = getNameAndCountry(city2)[1];
        return city1;
    } else {
        city1.country = "Germany";
        return city1;
    }
};

getRelocatedCity(myCity1, myCity2);
