# 回答用紙

## 1. What's the output?

```javascript
function a(x) {
  x++;
  return function () {
    console.log(++x);
  };
}

a(1)();
a(1)();
a(1)();

let x = a(1);
x();
x();
x();
```

- A: `1, 2, 3` and `1, 2, 3`
- B: `3, 3, 3` and `3, 4, 5`
- C: `3, 3, 3` and `1, 2, 3`
- D: `1, 2, 3` and `3, 3, 3`

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: B

This question reminds us about Closure in JS. Closure allows us to create a `stateful function` and such function can access to variable outside of its scope. In a nutshell, a closure can have access to `global` variable (scope), `father function` scope and `its` own scope.

We have here 3, 3, 3 and 3, 4, 5 because first we simply call the function `a()`. It works like a normal function and we do not see something `stateful` here. In later case, we declare a variable `x` and it stores the value of function `a(1)`, that is why we get 3. 4. 5 rather than 3, 3, 3.

This kind of gotcha gives me the feeling of `static` variable in PHP world.

</p>
</details>

---

## 2. What's the output?

```javascript
function Name(a, b) {
  this.a = a;
  this.b = b;
}

const me = Name("4s", "service");

console.log(!(a.length - window.a.length));
```

- A: `undefined`
- B: `NaN`
- C: `true`
- D: `false`

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: C

We get true in the console. The tricky part is when we create an object from the constructor function Name but we DO NOT USE `new` keywork. That makes the variable `a` global one and get the value "Vuong". Remember that it is actually a property of the global object `window` (in the browser) or `global` in the nodejs.

We then get `a.length` ~ 5 and `window.a.length` ~ 5 which return 0. !0 returns true.

Imagine what would happen when we create the instance `me` with the `new` keywork. That is an interesting inquire!

</p>
</details>

---

## 3. What's the output?

```javascript
const x = function (...x) {
  let k = (typeof x).length;
  let y = () => "freetut".length;
  let z = { y: y };

  return k - z.y();
};

console.log(Boolean(x()));
```

- A: `true`
- B: 1
- C: -1
- D: `false`

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: A

The spread operator `...x` might help us obtain the parameter in the function in the form of array. Yet, in Javascript the typeof array return "object" rather than "array". It is totally odd if you are coming from PHP.

That is said, we now have the length of the string `object` which returns 6. z.y() simply returns the length of the string 'freetut' (7).

Be aware that the function x() (in the form of `function express` or `anonymous function` (if you are coming from PHP) return -1 when being called and when converted to bool with `Boolean(-1)` return true instead of false. Noted that `Boolean(0)` return false.

</p>
</details>

---

## 4. What's the output?

```javascript
(function js(x) {
  const y = (j) => j * x;

  console.log(y(s()));

  function s() {
    return j();
  }

  function j() {
    return x ** x;
  }
})(3);
```

- A: `undefined`
- B: 18
- C: 81
- D: 12

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: C

The function `js()` can be automatically executed without calling it and known as IIFE (Immediately Invoked Function Expression). Noted the parameter `x` of the function `js` is actuallly passed with the value 3.

The value return of the function is y(s())), meaning calling three other functions `y()`, `s()` and `j()` because the function `s()` returns `j()`.

j() returns 3^3 = 27 so that s() returns 27.

y(s()) means y(27) which returns 27\*3 = 81.

Note that we can call `declare function` BEFORE the function is actually declared but not with `expression function`.

</p>
</details>

---

## 5. What's the output?

```javascript
var tip = 100;

(function () {
  console.log("I have $" + husband());

  function wife() {
    return tip * 2;
  }

  function husband() {
    return wife() / 2;
  }

  var tip = 10;
})();
```

- A: "I have \$10";
- B: "I have \$100";
- C: "I have \$50";
- D: "I have \$NaN";

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: D

We have here an IIFE (Immediately Invoked Function Expression). It means we do not have to call it but it will be excuted automatically when declared. The flow is as: husband() returns wife()/2 and wife() returns tip\*2.

We might think that tip = 100 because it is a global variable when declaring with `var` keyword. However, it is actually `undefined` because we also have `var tip = 10` INSIDE the function. As the variable `tip` is hoisted with default value `undefined`, the final result would be D. We know that `undefined` returns NaN when we try to divide to 2 or multiple with 2.

If we do not re-declare `var tip = 10;` at the end of the function, we will definately get B.

JS is fun, right?

</p>
</details>

---

## 6. What's the output?

```javascript
const js = { language: "loosely type", label: "difficult" };

const edu = { ...js, level: "PhD" };

const newbie = edu;

delete edu.language;

console.log(Object.keys(newbie).length);
```

- A: 2;
- B: 3;
- C: 4;
- D: 5;

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: A

This challenge revises the ES6's feature regarding `spread operator ...` Spread operator is quite useful for retrieving parameter in function, to `unite` or `combine` object and array in JavaScript. PHP also has this feature.

In the variable `edu`, we use `...js` (spread operator here) to combine both objects into one. It works in the same way with array.

Then we declare another variable named `newbie`. IMPORTANT note: By declaring the variable like that, both variables point to the SAME POSITION in the memory. We may have known something like `$a = &$b` in PHP, which let both varibles work in the same way. We might have known about `pass by reference` in the case.

Then we have 2 as `edu.language` is deleted. Both objects now have only two elements.

Now is time to think about coping an object in JS either shallow or deep one.

</p>
</details>

---

## 7. What's the output?

```javascript
console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi");
```

- A: "hello" -> "world" -> "hi"
- B: "hello" -> "hi" -> "world"
- C: "hi" -> "world" -> "hello"
- D: "hi" -> "hello" -> "world"

<details><summary><b>Answer</b></summary>
<p>

### Answer: B

Given that the function setTimeout() will be kept in the `task queue` before jumping back to `stack,` "hello" and "hi" will be printed first, then A is incorrect. That is also the case of the answers C and D.

No matter how many seconds you set to the `setTimeout()` function, it will run after synchronous code. So we will get "hello" first as it is put into the call stack first. Though the `setTimeout()` is then being put into the call stack, it will subsequently offload to web API (or Node API) and then being called when other synchronous codes are cleared. It means we then get "hi" and finally "world".

So B is the correct answer.

Credit: @kaitoubg (voz) for your suggestion regarding the ` timeout throttled` by which I have decided to alter the question slightly. It will ensure that readers will not get confused as the previous code might bring out different results when tested on other browsers or environments. The main point of the question is about the discrepancy between the synchronous code and asynchronous code when using `setTimeout.`.

</p>
</details>

---

## 8. What's the output?

```javascript
var x = 1;

(() => {
  x += 1;
  ++x;
})();
((y) => {
  x += y;
  x = x % y;
})(2);
(() => (x += x))();
(() => (x *= x))();

console.log(x);
```

- A: 4;
- B: 50;
- C: 2;
- D: 10;

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: A

Initially `x` is declared with the value 1. In the first IIFE function, there are two operations. First `x` becomes 2 and then 3.

In the second IIFE function, `x = x + y` then the current value is 5. In the second operation, it returns only 1 as it undergoes `5%2`.

In the third and fouth IIFE functions, we get 2 `x = x + x` and then 4 `x = x * x`. It is more than simple.

</p>
</details>

---

## 9. What's the output?

```php
$var = 10;

$f = function($let) use ($var) {
    return ++$let + $var;
};

$var = 15;
echo $f(10);
```

```javascript
var x = 10;

const f = (l) => ++l + x;

x = 15;
console.log(f(10));
```

- A: 26 and 26;
- B: 21 and 21;
- C: 21 and 26;
- D: 26 and 21;

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: C

This question illustrates the diffences between PHP and JavaScript when handling closure. In the first snippet, we declare a closure with the keyword `use`. Closure in PHP is simply an anonymous function and the data is passed to the function using the keyword `use`. Otherwise, it is called as `lambda` when we do not use the keyword `use`. You can check the result of the snippet here https://3v4l.org/PSeMY. PHP `closure` only accepts the value of the variable BEFORE the closure is defined, no matter where it is called. As such, `$var` is 10 rather than 15.

On the contrary, JavaScript treats the variable a bit different when it is passed to anonymous function. We do not have to use the keyword `use` here to pass variable to the closure. The variable `x` in the second snippet is updated before the closure is called, then we get 26.

Note that in PHP 7.4, we have arrow function and we then do not have to use the keyword `use` to pass the variable to function. Another way to call a `global` ariable inside a function in PHP is to use the keyword `global` or employ the built-in GLOBAL variable \$GLOBALS.

</p>
</details>

---

## 10. What's the output?

```javascript
let x = {};
let y = {};
let z = x;

console.log(x == y);
console.log(x === y);
console.log(x == z);
console.log(x === z);
```

- A: true true true true;
- B: false false false false;
- C: true true false false;
- D: false false true true;

<details class="answer" ><summary><b>Answer</b></summary>
<p>

### Answer: D

Technically, `x` and `y` have the same value. Both are empty objects. However, we do not use the value to compare objects.

`z` is `x` are two objects referring to the same memory position. In JavaScript, array and object are passed by `reference`. `x` and `z` therefore return true when being compared.

</p>
</details>

---
