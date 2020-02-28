const Unitflow = require( '../dist/unitflow.cjs.js' );

const lib = new Unitflow();

lib.unit[ 'café' ] = function ( state, next ) {
	console.log( '1. preparei o café' )
	next();
}

lib.unit[ 'pão' ] = function ( state, next ) {
	console.log( '2. preparei o pão' )
	next();
}

lib.unit[ 'leite' ] = function ( state, next ) {
	console.log( '3. preparei o leite' )
	next();
}

lib.unit[ 'misturar' ] = function ( state, next ) {
	console.log( '4. misturei os três' )
	next();
}

lib.flow[ 'café com leite' ] = [ 'café', 'pão', 'leite', 'misturar' ]

lib.unit[ 'café 2' ] = function ( state, next ) {
	console.log( '5. preparei o café 2' )
	next();
}

lib.unit[ 'pão 2' ] = function ( state, next ) {
	console.log( '6. preparei o pão 2' )
	next();
}

lib.unit[ 'leite 2' ] = function ( state, next ) {
	console.log( '7. preparei o leite 2' )
	next();
}

lib.unit[ 'misturar 2' ] = function ( state, next ) {
	console.log( '8. misturei os três 2' )
	next();
}

lib.flow[ 'café com leite 2' ] = [ 'café 2', 'pão 2', 'leite 2', 'misturar 2' ]

lib.run( 'café com leite', 'café com leite 2' )