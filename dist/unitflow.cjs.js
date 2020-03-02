'use strict';

class Unitflow {

	constructor ( state = {} ) {

		this.unit  = {};
		this.flow  = {};
		this.state = state;

	}

	async run ( ...args ) {
		
		const promises = [], run_data = this.prepare( args );

		run_data.flows.reverse();

		for ( let i = run_data.flows.length - 1; i >= 0; i-- ) {
			
			const promise = new Promise( resolve => this.link_and_start( run_data.flows[i], run_data, resolve ) );
			promises.push( promise );
		}

		return Promise.all( promises )
	}

	prepare ( flows ) {

		/* Verify if there are dependencies */
		let dependencies = flows.pop();
		const dependents = {};

		if ( typeof dependencies == 'string' ) {
			flows.push( dependencies );
			dependencies = {};
		}
		else
			this.dependents( dependencies, dependents );


		return { flows, dependencies, dependents, execution: {} }

	}

	dependents ( all_dependencies, dependents ) {

		for ( let [ dependent, local_dependencies ] of Object.entries( all_dependencies ) ) {

			for ( let i = local_dependencies.length - 1; i >= 0; i--) {
				
				if ( !dependents[ local_dependencies[i] ] ) dependents[ local_dependencies[i] ] = [];

				dependents[ local_dependencies[i] ].push( dependent );
			}

		}

	}

	link_and_start ( flow, run_data, resolve ) {

		const	units	 = this.flow[ flow ],
				length   = units.length,
				sequence = {},
				state    = this.state;
		

		for ( let i = length - 1; i >= 0; i-- ) {
			
			const 	unit = this.unit[ units[i] ].bind( this ),
					next = i == ( length - 1 ) ? resolve : sequence[ i + 1 ],
					name = flow + ':' + units[i],
					func = async () => unit( state, next, resolve );

			sequence[ i ] = () => this.wait_or_run( name, func, run_data );
		}

		sequence[0]();

	}

	wait_or_run ( name, func, run_data, ready = false ) {

		/* 
		 * When there are dependencies and they are not finished,
		 * save the unit's function to be automatically executed
		 * when the last dependency finishes
		 */
		if ( !ready && !this.dependencies_completed( name, run_data ) )
			return run_data.execution[ name ] = () => this.wait_or_run( name, func, run_data, true );

		run_data.execution[ name ] = true;

		func();

		this.check_dependents( name, run_data );
	}

	dependencies_completed ( name, run_data ) {

		const dependencies = run_data.dependencies[ name ];

		if ( !dependencies )
			return true;

		return dependencies.every( dep => run_data.execution[ dep ] === true )

	}

	check_dependents ( name, run_data ) {

		const dependents = run_data.dependents[ name ];

		if ( !dependents )
			return;

		for ( let i = dependents.length - 1; i >= 0; i-- ) {
			
			const dependent = dependents[i];

			// If the dependent is not waiting, stop here and
			// do not check the completition of dependencies,
			// because the dependent itself will do this
			if ( typeof run_data.execution[ dependent ] !== 'function' )
				continue;
			
			// Otherwise, if the dependent is waiting, check if
			// this dependency was the last one to complete.
			// When it is the case, lets reactively call the
			// dependent.
			if ( this.dependencies_completed( dependent, run_data ) )
				run_data.execution[ dependent ]();
		}

	}

}

module.exports = Unitflow;
