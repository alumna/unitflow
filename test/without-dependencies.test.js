import Unitflow from './../src/unitflow';


describe( 'Flows without dependencies', () => {

	test('1. One flow, two units', async ( done ) => {

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

			done();

		});

});