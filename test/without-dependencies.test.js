import { Unitflow } from './../src/unitflow';


describe( 'Flows without dependencies', () => {

	test('1. One flow and two units', async () => {

		const lib = new Unitflow();
		
		expect( lib.state ).toEqual( {} );

		lib.unit[ 'task 1' ] = function ( state, next ) {
			state[ 'task 1' ] = 'done'
			next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state[ 'task 2' ] = 'done'
			next();
		}

		lib.flow[ 'tasks' ] = [ 'task 1', 'task 2' ]

		await lib.run( 'tasks' )

		expect( lib.state ).toEqual({
			'task 1': 'done',
			'task 2': 'done'
		});

	});

	test('2. Two flows and two units each', async () => {

		const lib = new Unitflow();
		
		expect( lib.state ).toEqual( {} );

		/* Flow 1 */
		lib.unit[ 'task 1' ] = function ( state, next ) {
			state[ 'task 1' ] = 'done'
			next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state[ 'task 2' ] = 'done'
			next();
		}

		lib.flow[ 'flow 1' ] = [ 'task 1', 'task 2' ]

		/* Flow 2 */
		lib.unit[ 'task 3' ] = function ( state, next ) {
			state[ 'task 3' ] = 'done'
			next();
		}

		lib.unit[ 'task 4' ] = function ( state, next ) {
			state[ 'task 4' ] = 'done'
			next();
		}

		lib.flow[ 'flow 2' ] = [ 'task 3', 'task 4' ]

		await lib.run( 'flow 1', 'flow 2' )

		expect( lib.state ).toEqual({
			'task 1': 'done',
			'task 2': 'done',
			'task 3': 'done',
			'task 4': 'done'
		});

	});

});