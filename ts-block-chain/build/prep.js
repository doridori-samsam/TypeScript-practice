"use strict";
/** 1-1 implicit Types Vs. Explicit Types */
Object.defineProperty(exports, "__esModule", { value: true });
let a = "hello";
//a = 1 ; not assignable because a is already delcared as string...
let b = false; //it's better let typescript infer the type.
let c = [];
c.push(1);
//c.push("1") error.
/** 1-2 Optional Types */
const playerTest = {
    name: "sammy",
};
//what if all the players have name but some have age property(when age is optional).
const playerSam = {
    name: "sammy",
};
//restrict player.age is not undefined...
if (playerSam.age && playerSam.age < 10) {
    document.write(playerSam.name);
}
const playerJohn = {
    name: "John",
    age: 24,
};
const jack = {
    name: "jack",
};
const kate = {
    name: "kate",
    age: 30,
};
//how to specify the type of values a function returns...
function playerMaker(name) {
    return {
        name,
    };
}
const rosy = playerMaker("rosy");
rosy.age = 12;
//how to use type with arrow function
const playerMaker2 = (name) => ({ name });
const studentMaker = (name) => ({ name });
const peter = studentMaker("peter");
// peter.name = "ellen"   ...error
const numbers = [1, 2, 3, 4];
//numbers.push(1)  ...error
//when certain elements have certian type, use Tuple.
const team = ["ronald", 12, true];
//team[0] = 1  ...error
let e = null;
let f = undefined;
let g = true; //any could be any types. try to refrain from using this.
g = 12;
/** 1-4 void/never/unknown  */
let w;
let q = w + 1; // error.
if (typeof w === "number") {
    let s = w + 1;
}
if (typeof w === "string") {
    let t = w.toUpperCase();
}
//void is for a function that doesn't return anything...
function sagen() {
    console.log("x");
}
const p = sagen();
p.toUpperCase();
//never is for a function taht never returns.
function hi() {
    //return "x" ... error
    throw new Error("error");
}
function hello(name) {
    if (typeof name === "string") {
        name;
    }
    else if (typeof name === "number") {
        name;
    }
    else {
        name; // this code will never run...
    }
}
/** 2-0 call signatures */
const add = (a, b) => a + b; //what if you don't want to specify types of parameters?
const add2 = (a, b) => a + b;
const plus = (a, b) => {
    if (typeof b === "string")
        return a;
    return a + b;
};
const push = (config) => {
    if (typeof config === "string") {
        console.log(config);
    }
    else {
        console.log(config.path);
    }
};
const add3 = (a, b, c) => {
    if (c)
        return a + b + c;
    return a + b;
};
add3(1, 2, 3);
const superPrint = (arr) => {
    arr.forEach((i) => console.log(i));
};
superPrint([1, 2, 3, 4]);
superPrint([true, false, false]);
superPrint([1, 2, true, "3"]); //...error
const onePrint = (arr) => arr[0];
const print_result = onePrint([1, 2, "3", false, null]);
const twoPrint = (arr) => arr[0];
const print_result2 = twoPrint([1, 2, "3", false, null], "나는 M");
//'제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.'
/**2-4 conclusion */
function heroPrint(a) {
    return a[0];
}
const printHero = heroPrint([2, 3, 5, "안녕"]);
const janet = {
    name: "janet",
    extraInfo: {
        favFood: "donut",
    },
};
const shawn = {
    name: "shawn",
    extraInfo: {
        favFood: "sushi",
    },
};
function printAllNum(arr) {
    arr.forEach((i) => console.log(i));
}
/** 3-0 classes */
class Employee {
    constructor(firstName, lastName, nickname) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
}
const brian = new Employee("brian", "smith", "브로");
brian.firstname; // error.... because it's private
brian.nickname; // works fine
//abstract class is a class that other classes can inherit from. can't be used solely
class Developer {
    constructor(firstName, //private properties can't be accessed
    lastName, nickname //prtected properties can't be accessed from outside the class
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class member extends Developer {
    getNickName() {
        console.log(this.nickname); //abstract method is specified here
    }
}
const jacob = new member("jacob", "braket", "제이키");
jacob.getFullName(); //...error
let dict = {
    "lasagna": "food",
    false: "what?" //doesn't meet the condition.
};
class Dict {
    constructor() {
        this.words = {};
    }
    add(word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.definition;
        }
    }
    def(term) {
        return this.words[term];
    }
    //add methods that can delete or modify a word.
    static hello() {
        //static doesn't belong to typescript. it belongs to javascript.
    }
}
class Word {
    constructor(term, definition) {
        this.term = term;
        this.definition = definition;
    }
}
const kimchi = new Word("kimchi", "한국의 음식");
const dic = new Dict();
dic.add(kimchi);
dic.def("kimchi"); //print "한국의 음식"
kimchi.def = "미국음식"; //readonly property can't be modified.
const timo = {
    nickname: "timochung",
    team: "Bandle city",
    health: 1
};
const garren = {
    nickname: "dogren",
    team: "Demacia",
    health: 10
};
const sam = {
    name: "sam",
    age: 29
};
/** 3-3 interface2 */
class Dev {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
new User(); //error. can't create instances from abstract class...
class Worker extends Dev {
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hello ${name}. My name is ${this.fullName()}`;
    }
}
class Geek {
    constructor(firstName, lastName, health) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.health = health;
    }
}
function makeUser(user) {
    return "hi";
}
const playerA = {
    name: "nico",
    health: 4
};
const playerB = {
    name: "nico",
    health: 10
};
class MVP {
    constructor(firstName) {
        this.firstName = firstName;
    }
}
class LocalStorage {
    constructor() {
        this.storage = {};
    }
    set(key, value) {
        this.storage[key] = value;
    }
    remove(key) {
        delete this.storage[key];
    }
    get(key) {
        return this.storage[key];
    }
    clear() {
        this.storage = {};
    }
}
const stringsStorage = new LocalStorage();
stringsStorage.get("key"); //returns string type
stringsStorage.set("hi", "there");
const booleansStorage = new LocalStorage();
booleansStorage.get("xx"); //returns boolean type
booleansStorage.set("ciao", false);
