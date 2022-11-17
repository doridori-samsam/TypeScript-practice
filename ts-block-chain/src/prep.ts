/** 1-1 implicit Types Vs. Explicit Types */

import { StringMappingType } from "typescript";

let a = "hello";
//a = 1 ; not assignable because a is already delcared as string...
let b: boolean = false; //it's better let typescript infer the type.

let c: number[] = [];
c.push(1);
//c.push("1") error.

/** 1-2 Optional Types */
const playerTest = {
  name: "sammy",
};

//what if all the players have name but some have age property(when age is optional).

const playerSam: {
  name: string;
  age?: number;
} = {
  name: "sammy",
};

//restrict player.age is not undefined...
if (playerSam.age && playerSam.age < 10) {
  document.write(playerSam.name);
}

const playerJohn: {
  name: string;
  age?: number;
} = {
  name: "John",
  age: 24,
};

// in Typescript, one can make the code above better with Alias

type Age = number;
type Name = string;

type Player = {
  name: string;
  age?: Age;
};

const jack: Player = {
  name: "jack",
};

const kate: Player = {
  name: "kate",
  age: 30,
};

//how to specify the type of values a function returns...

function playerMaker(name: string): Player {
  return {
    name,
  };
}

const rosy = playerMaker("rosy");
rosy.age = 12;

//how to use type with arrow function

const playerMaker2 = (name: string): Player => ({ name });

/** 1-3 Other Types */

//read-only properties to types.

type Student = {
  readonly name: Name;
  age?: Age;
};

const studentMaker = (name: string): Student => ({ name });
const peter = studentMaker("peter");
// peter.name = "ellen"   ...error

const numbers: readonly number[] = [1, 2, 3, 4];
//numbers.push(1)  ...error

//when certain elements have certian type, use Tuple.
const team: readonly [string, number, boolean] = ["ronald", 12, true];
//team[0] = 1  ...error

let e: null = null;
let f: undefined = undefined;
let g: any = true; //any could be any types. try to refrain from using this.
g = 12;

/** 1-4 void/never/unknown  */

let w: unknown;
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

function hi(): never {
  //return "x" ... error
  throw new Error("error");
}

function hello(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name; // this code will never run...
  }
}

/** 2-0 call signatures */
const add = (a: number, b: number) => a + b; //what if you don't want to specify types of parameters?

type Add = (a: number, b: number) => number;

const add2: Add = (a, b) => a + b;

/**2-1 overloading */

//overloading has multiple call signatures...
type Plus = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

const plus: Plus = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void; //returns nothing
  (config: Config): void;
  //parameters
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path);
  }
};

//when call signatures have different numbers of parameters
type Adding = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add3: Adding = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

add3(1, 2, 3);

/** 2-2 polymorphism(many different forms) */

type SuperPrint = {
  (arr: number[]): void; //concrete type
  (arr: boolean[]): void;
  (arr: string[]): void;
};
const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, false, false]);
superPrint([1, 2, true, "3"]); //...error

//generic is like a placeholder for typescript

type MegaPrint = {
  <T>(arr: T[]): T;
};

const onePrint: MegaPrint = (arr) => arr[0];

const print_result = onePrint([1, 2, "3", false, null]);
//typescript is replacing <TypePlaceholder> with the a type it finds.

/** 2-3 Generics Recap */
type AwesomePrint = {
  <T, M>(arr: T[], b: M): T;
};

const twoPrint: AwesomePrint = (arr) => arr[0];

const print_result2 = twoPrint([1, 2, "3", false, null], "나는 M");
//'제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법이다.'

/**2-4 conclusion */
function heroPrint<T>(a: T[]) {
  return a[0];
}

const printHero = heroPrint([2, 3, 5, "안녕"]);

type Customer<E> = {
  name: string;
  extraInfo: E;
};

const janet: Customer<{ favFood: string }> = {
  name: "janet",
  extraInfo: {
    favFood: "donut",
  },
};

type ShawnExtra = {
  favFood: string;
};

type ShawnCustomer = Customer<ShawnExtra>;

const shawn: ShawnCustomer = {
  name: "shawn",
  extraInfo: {
    favFood: "sushi",
  },
};

function printAllNum(arr: Array<number>) {
  arr.forEach((i) => console.log(i));
}

/** 3-0 classes */
class Employee {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

const brian = new Employee("brian", "smith", "브로");
brian.firstname; // error.... because it's private
brian.nickname; // works fine

//abstract class is a class that other classes can inherit from. can't be used solely
abstract class Developer {
  constructor(
    private firstName: string, //private properties can't be accessed
    private lastName: string,
    protected nickname: string //prtected properties can't be accessed from outside the class
  ) {}
  abstract getNickName(): void; //abstract method
  private getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class member extends Developer {
  getNickName() {
    console.log(this.nickname) //abstract method is specified here
  }
}
const jacob = new member("jacob", "braket", "제이키");
jacob.getFullName(); //...error


/** 3-1 recap */

//hashmap dictionary

type Words = {
  [key:string]: string //key can be anything as long as it's a string type and a have string type property
}

let dict: Words = {
  "lasagna": "food"
  false : "what?" //doesn't meet the condition.
}


class Dict {
  private words:Words
  constructor() {
    this.words = {}
  }
  add(word: Word) { //class also can be used as a type(when you want the parameter to be an instance)
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.definition;
    }
  }
  def(term:string) {
    return this.words[term]
  }
  //add methods that can delete or modify a word.

  static hello() {
    //static doesn't belong to typescript. it belongs to javascript.
  }
}

class Word{
  constructor(
    public term: string,
    public readonly definition: string 
  ) { }
  //add methods that add or modify a definition of a word
}

const kimchi = new Word("kimchi", "한국의 음식");
const dic = new Dict();
dic.add(kimchi)
dic.def("kimchi") //print "한국의 음식"
kimchi.def = "미국음식" //readonly property can't be modified.


/** 3-2 interface */

type Team = "Bandle city" | "Demacia" | "NOXUS"; //can also limit the value 
type Health = 1 | 5 | 10;

type Champion = {
  nickname: string,
  team: Team
  health: Health
}

const timo: Champion = {
  nickname: "timochung",
  team: "Bandle city",
  health: 1
}

//use Interface

interface Champ {
  nickname: string,
  team: Team
  health: Health
}

const garren: Champ = {
  nickname: "dogren",
  team: "Demacia",
  health:10
}

//interface only can be used when specifying the shape of an object.
//interface whatever = string;  => wrong...


interface User {
  name : string
}

interface me extends User {
  readonly age: number
}

const sam: me = {
  name: "sam",
  age: 29
}


/** 3-3 interface2 */
abstract class Dev {
  constructor(
    protected firstName: string,
    protected lastName: string
  ) { }
  abstract sayHi(name: string): string
  abstract fullName():string
}

new User() //error. can't create instances from abstract class...

class Worker extends Dev {
  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name: string): string {
    return `Hello ${name}. My name is ${this.fullName()}`
  }
}

//when compiling, interface doesn't appear on JS code.

//change abstract class to interface

interface User {
  firstName: string,
  lastName: string,
  sayHi(name: string): string,
  fullName():string
}

interface Human {
  health:number
}
class Geek implements User, Human{
  constructor(
    public firstName: string,
    public lastName: string,
    public health:number
  ) {}
    sayHi:(name:string)=>console.log(name)
}

function makeUser(user: User) {
  return "hi"
}


/** 3-4 interface recap */
//interface can be duplicated. type can't

type PlayerA = {
  name: string
}

type PlayerAA = PlayerA & {
  health: number
}

const playerA: PlayerAA = {
  name: "nico",
  health: 4
}

interface PlayerB {
  name : string
}
interface PlayerB {
  health: number
}

const playerB: PlayerB = {
  name: "nico",
  health: 10
}


type PlayerC = {
  firstName : string
}

interface PlayerD  {
  firstName: string
  test?:number
}

class MVP implements PlayerD {
  constructor(
    public firstName: string
  ) { }
}

//if you want to define shape of classes or objects, you're encouraged to use interface..


/** 3-5 polymorphism */
interface SStorage<T>{
  [key:string] : T
}

class LocalStorage<T>{
  private storage: SStorage<T> = {}
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key]
   }
  get(key: string): T { 
    return this.storage[key]
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>()
stringsStorage.get("key") //returns string type
stringsStorage.set("hi", "there")

const booleansStorage = new LocalStorage<boolean>();
booleansStorage.get("xx") //returns boolean type
booleansStorage.set("ciao", false)


import { init, exit } from "./myPackage";

init(false, "hi")
exit(1)