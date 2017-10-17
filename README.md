# Tailspin

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7ec829e8719e4e529c231c04662b3d9d)](https://www.codacy.com/app/konfirm/node-tailspin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=konfirm/node-tailspin&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/konfirm/node-tailspin.svg?branch=master)](https://travis-ci.org/konfirm/node-tailspin)

Object path accessor. Tests, provides and sets values within objects and arrays.


## Installation
```
$ npm install --save @konfirm/tailspin
```


## Usage
Provide an object and a path (as string) to the tailspin module and a new [`Tail`](#tail--api) object is returned.

```
const tailspin = require('@konfirm/tailspin');
const subject = { foo: { bar: { baz: 1 } } };
const tail = tailspin(subject, 'foo.bar.baz');

console.log(tail.value);  //  1
```

### `tailspin(scope, path)`
Create a `Tail`-instance to interact with the provided path within the scope.

### `Tail`-API
A `Tail` object is what is returned by the `tailspin`-function, it provides several members to interact with the provided target/path.
_All of the examples in the API outline below use the `tail` created in the example in [usage](#usage)._

#### `value`
Obtain the value of the `Tail`-object.

```
console.log(tail.value);  //  1
```

#### `(bool) modify(value [, force=false])`
Modify the value of the `Tail`-object, can be forced in case the path in itself is not reachable.

```
tail.modify(2);  //  returns true, success
console.log(tail.value);  //  2
```

#### `type`
Obtain the type of the `Tail`-object. Returns one of the regular javascript `typeof` types (`'boolean'`, `'number'`, `'string'`, `'object'`, `'null'` or `'undefined'`), or `'array'` in case the value is an array.

```
console.log(tail.type);  //  number
```

#### `types`
Obtain all types encountered during traversal of the path leading up to the `Tail`-object. Uses the same values for types as provided by [`type`](#type).

```
console.log(tail.types);  //  [ 'object', 'object', 'number' ]
                          //     ^ foo     ^ bar     ^ baz
```

#### `reachable`
Determine whetehr the path of the `Tail`-object is actually reachable. Reachable in this context means whether of not the path exists or can be created without changing any type other than `array`, `object` or `undefined`.


```
console.log(tail.reachable);  //  true
```

If any value of the path is not capable (or desirable) to have a property, it is considered to be _unreachable_. For example, one cannot set a property to a number value.

```
const subject = { num: 1 };
const tail = tailspin(subject, 'num.property');

console.log(tail.reachable);  //  false
```

#### `scope`
Obtain the scope of the `Tail`-object. This will be the "parent" `Tail`-object, if any.

```
console.log(tail.scope);
```


## License
MIT License
Copyright (c) 2017 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
