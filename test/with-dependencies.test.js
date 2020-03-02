import Unitflow from './../src/unitflow';


describe( 'Flows with dependencies', () => {

	test('1. Two flows and two units each, with dependencies', async ( done ) => {

		const lib = new Unitflow({ id: 0 });
		
		expect( lib.state ).toEqual( { id: 0 } );

		/* Flow 1 */
		lib.unit[ 'task 1' ] = function ( state, next ) {
			state.id++
			state[ 'task 1' ] = state.id;
			next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state.id++
			state[ 'task 2' ] = state.id;
			next();
		}

		lib.flow[ 'flow 1' ] = [ 'task 1', 'task 2' ]

		/* Flow 2 */
		lib.unit[ 'task 3' ] = function ( state, next ) {
			state.id++
			state[ 'task 3' ] = state.id;
			next();
		}

		lib.unit[ 'task 4' ] = function ( state, next ) {
			state.id++
			state[ 'task 4' ] = state.id;
			next();
		}

		lib.flow[ 'flow 2' ] = [ 'task 3', 'task 4' ]

		await lib.run( 'flow 1', 'flow 2', {
			'flow 1:task 1': [ 'flow 2:task 4' ]
		})

		expect( lib.state ).toEqual({
			id: 4,
			'task 1': 3,
			'task 2': 4,
			'task 3': 1,
			'task 4': 2
		});

		done();

	});

	test('2. Three flows and two units each, with dependencies', async ( done ) => {

		const lib = new Unitflow();
		
		expect( lib.state ).toEqual( {} );

		/* Flow 1 */
		lib.unit[ 'task 1' ] = function ( state, next ) {
			state[ 'task 1' ] = 'done'; next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state[ 'task 2' ] = 'done'; next();
		}

		lib.flow[ 'flow 1' ] = [ 'task 1', 'task 2' ]

		/* Flow 2 */
		lib.unit[ 'task 3' ] = function ( state, next ) {
			state[ 'task 3' ] = 'done'; next();
		}

		lib.unit[ 'task 4' ] = function ( state, next ) {
			state[ 'task 4' ] = 'done'; next();
		}

		lib.flow[ 'flow 2' ] = [ 'task 3', 'task 4' ]

		/* Flow 3 */
		lib.unit[ 'task 5' ] = function ( state, next ) {
			state[ 'task 5' ] = 'done'; next();
		}

		lib.unit[ 'task 6' ] = function ( state, next ) {
			state[ 'task 6' ] = 'done'; next();
		}

		lib.flow[ 'flow 3' ] = [ 'task 5', 'task 6' ]

		await lib.run( 'flow 1', 'flow 2', 'flow 3', {
			'flow 1:task 1': [ 'flow 2:task 4' ],
			'flow 3:task 5': [ 'flow 2:task 4' ]
		})

		expect( lib.state ).toEqual({
			'task 1': 'done',
			'task 2': 'done',
			'task 3': 'done',
			'task 4': 'done',
			'task 5': 'done',
			'task 6': 'done'
		});

		done();

	});

	test('3. (Inverted) Two flows and two units each, with dependencies', async ( done ) => {

		const lib = new Unitflow({ id: 0 });
		
		expect( lib.state ).toEqual( { id: 0 } );

		/* Flow 1 */
		lib.unit[ 'task 1' ] = function ( state, next ) {
			state.id++
			state[ 'task 1' ] = state.id;
			next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state.id++
			state[ 'task 2' ] = state.id;
			next();
		}

		lib.flow[ 'flow 1' ] = [ 'task 1', 'task 2' ]

		/* Flow 2 */
		lib.unit[ 'task 3' ] = function ( state, next ) {
			state.id++
			state[ 'task 3' ] = state.id;
			next();
		}

		lib.unit[ 'task 4' ] = function ( state, next ) {
			state.id++
			state[ 'task 4' ] = state.id;
			next();
		}

		lib.flow[ 'flow 2' ] = [ 'task 3', 'task 4' ]

		await lib.run( 'flow 1', 'flow 2', {
			'flow 2:task 3': [ 'flow 1:task 2' ]
		})

		expect( lib.state ).toEqual({
			id: 4,
			'task 1': 1,
			'task 2': 2,
			'task 3': 3,
			'task 4': 4
		});

		done();

	});

	test('4. Three flows and four units each, with multiple dependencies', async ( done ) => {

		const lib = new Unitflow({ id: 0 });
		
		expect( lib.state ).toEqual( { id: 0 } );

		/* Flow 1 */
		lib.unit[ 'task 1' ] = function ( state, next ) {
			state.id++; state[ 'task 1' ] = state.id; next();
		}

		lib.unit[ 'task 2' ] = function ( state, next ) {
			state.id++; state[ 'task 2' ] = state.id; next();
		}

		lib.unit[ 'task 3' ] = function ( state, next ) {
			state.id++; state[ 'task 3' ] = state.id; next();
		}

		lib.unit[ 'task 4' ] = function ( state, next ) {
			state.id++; state[ 'task 4' ] = state.id; next();
		}

		lib.flow[ 'flow 1' ] = [ 'task 1', 'task 2', 'task 3', 'task 4' ]


		/* Flow 2 */
		lib.unit[ 'task 5' ] = function ( state, next ) {
			state.id++; state[ 'task 5' ] = state.id; next();
		}

		lib.unit[ 'task 6' ] = function ( state, next ) {
			state.id++; state[ 'task 6' ] = state.id; next();
		}

		lib.unit[ 'task 7' ] = function ( state, next ) {
			state.id++; state[ 'task 7' ] = state.id; next();
		}

		lib.unit[ 'task 8' ] = function ( state, next ) {
			state.id++; state[ 'task 8' ] = state.id; next();
		}

		lib.flow[ 'flow 2' ] = [ 'task 5', 'task 6', 'task 7', 'task 8' ]


		/* Flow 3 */
		lib.unit[ 'task 9' ] = function ( state, next ) {
			state.id++; state[ 'task 9' ] = state.id; next();
		}

		lib.unit[ 'task 10' ] = function ( state, next ) {
			state.id++; state[ 'task 10' ] = state.id; next();
		}

		lib.unit[ 'task 11' ] = function ( state, next ) {
			state.id++; state[ 'task 11' ] = state.id; next();
		}

		lib.unit[ 'task 12' ] = function ( state, next ) {
			state.id++; state[ 'task 12' ] = state.id; next();
		}

		lib.flow[ 'flow 3' ] = [ 'task 9', 'task 10', 'task 11', 'task 12' ]



		await lib.run( 'flow 1', 'flow 2', 'flow 3', {
			'flow 1:task 1': [ 'flow 2:task 8', 'flow 3:task 12' ],
			'flow 3:task 9': [ 'flow 2:task 8' ]
		})

		expect( lib.state ).toEqual({
			id: 12,
			'task 1': 9,
			'task 2': 10,
			'task 3': 11,
			'task 4': 12,
			'task 5': 1,
			'task 6': 2,
			'task 7': 3,
			'task 8': 4,
			'task 9': 5,
			'task 10': 6,
			'task 11': 7,
			'task 12': 8
		});

		done();

	});

});