<div align="center">
	<img src="https://github.com/alumna/unitflow/raw/master/unitflow.svg?sanitize=true" alt="unitflow" width="640" height="360" />
</div>

<div align="center">
	<a href="https://npmjs.org/package/@alumna/unitflow">
		<img src="https://badgen.now.sh/npm/v/@alumna/unitflow" alt="version" />
	</a>
	<a href="https://npmjs.org/package/@alumna/unitflow">
		<img src="https://badgen.net/bundlephobia/min/@alumna/unitflow" alt="size" />
	</a>
	<a href="https://travis-ci.org/alumna/unitflow">
		<img src="https://travis-ci.org/alumna/unitflow.svg?branch=master" alt="travis" />
	</a>
	<a href="https://codecov.io/gh/alumna/unitflow">
		<img src="https://codecov.io/gh/alumna/unitflow/branch/master/graph/badge.svg" />
	</a>
	<a href="https://npmjs.org/package/@alumna/unitflow">
		<img src="https://badgen.now.sh/npm/dm/@alumna/unitflow" alt="downloads" />
	</a>
</div>

<div align="center">Organize your library or project, defining flows composable by a sequence of units</div>

<br/>

## Now you can easily orgnize your complex library in Javascript

UnitFlow can be used on any type of project, but it is mainly aimed to be used when building libraries.

It's common to find yourself racking your brain to translate into code a complex sequence of different activities. Also, it is even more difficult to maintain and grow a code like that.

UnitFlow is a response to this problem. It gives a tangible approach to organize all the workflow of your library or project by making the sequence of activities more visual on your code.

## How UnitFlow works

* A **flow** is a sequence of **units**
* Units are functions with isolated pieces of the logic your library must execute
* After defining a unit, you can use it in as many flows as you want, one or many
* You can define multiple flows with no limits of units in each one
* Each unit is always called with two arguments: `state` and `next`
* `state` is a writable object available to all units and can *(optionally)* be initialized with upfront data
* `next` is the function to be called *(without arguments)* inside the unit when its work is done
* A unit can create new flows or call existing ones, allowing the organization of really complex scenarios
* Units that create or call flows can retrieve their instance with the keyword `this` to do so
* Each unit can specify execution dependencies on other units
* Units with dependencies will be called only after their dependencies have completed
* You can run **multiple flows** in parallel and define dependencies between **different units on different flows**

## Extra beneficts

* Flow's execution is completely asynchronous and non-blocking
* Each flow's run returns a promise that resolves after all its units have completed
* Units that depend on other units for its execution remain non-active and do not consume memory or processing


## Install

```
$ npm install @alumna/unitflow
```

Additionally, this module is delivered as:

* **ES Module**: [`dist/unitflow.es.js`](https://unpkg.com/@alumna/unitflow/dist/unitflow.es.js)
* **CommonJS**: [`dist/unitflow.cjs.js`](https://unpkg.com/@alumna/unitflow/dist/unitflow.cjs.js)


## Usage: single flow

```js
import Unitflow from '@alumna/unitflow';

// create an instance
const mylib = new Unitflow({ /* optional data for initial state */ });

// defining units
mylib.unit[ 'unit_1' ] = function ( state, next ) { /* ... */ }
mylib.unit[ 'unit_2' ] = function ( state, next ) { /* ... */ }

// defining a flow
mylib.flow[ 'flow_1' ] = [ 'unit_1', 'unit_2' ]

// running a single flow
mylib.run( 'flow_1' )

```

## Special third argument `end`

In any unit you can optionally end a flow using the third argument `end`. When calling it, flow will not continue:

```js
import Unitflow from '@alumna/unitflow';

// create an instance
const mylib = new Unitflow();

// defining units
mylib.unit[ 'unit_1' ] = function ( state, next, end ) {
	
	// If true, the flow will stop and unit_2 will not be called
	if ( something_bad_happens == true )
		return end();
}

mylib.unit[ 'unit_2' ] = function ( state, next ) { /* ... */ }

// defining a flow
mylib.flow[ 'flow_1' ] = [ 'unit_1', 'unit_2' ]

// running a single flow
mylib.run( 'flow_1' )

```



## Usage: multiple flows

```js
import Unitflow from '@alumna/unitflow';

// create an instance
const mylib = new Unitflow({ /* optional data for initial state */ });

// defining units
mylib.unit[ 'unit_1' ] = function ( state, next ) { /* ... */ }
mylib.unit[ 'unit_2' ] = function ( state, next ) { /* ... */ }
mylib.unit[ 'unit_3' ] = function ( state, next ) { /* ... */ }
mylib.unit[ 'unit_4' ] = function ( state, next ) { /* ... */ }

// defining the flows
mylib.flow[ 'flow_1' ] = [ 'unit_1', 'unit_2' ]
mylib.flow[ 'flow_2' ] = [ 'unit_3', 'unit_4' ]

// running multiple flows in parallel
mylib.run( 'flow_1', 'flow_2' )

```

## Defining execution dependencies

Even though everything runs asynchronously on Unitflow, optionally you can define dependencies between specific units to ensure that a unit with one or more dependencies will only start after all of them have completed

```js
// considering the last example, but changing the "run" call, where
// the second argument is defining the execution dependencies

mylib.run( 'flow_1', 'flow_2', {

	// The "unit_4" on "flow_2" must be executed only after the "unit_2" on "flow_1"
	'flow_2:unit_4': [ 'flow_1:unit_2' ]

})

```
