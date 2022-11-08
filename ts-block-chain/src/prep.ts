/** 1-1 implicit Types Vs. Explicit Types */

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
