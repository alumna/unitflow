'use strict';

class Unitflow {

	constructor ( state = {} ) {

		this.unit  = {};
		this.flow  = {};
		this.state = state;

	}

	link ( flow_units, resolve ) {

		const 	sequence = {},
				length   = flow_units.length,
				state    = this.state;

		for ( let i = length - 1; i >= 0; i-- ) {
			
			const unit = this.unit[ flow_units[i] ];
			const next = i == ( length - 1 ) ? resolve : sequence[ i + 1 ];
			const func = async () => unit( state, next );

			sequence[ i ] = func;
		}

		sequence[0]();

	}

	async run ( ...args ) {
		
		args.reverse();

		const promises = [];

		for ( let i = args.length - 1; i >= 0; i-- ) {

			const promise = new Promise( resolve => this.link( this.flow[ args[i] ], resolve ) );

			promises.push( promise );
		}

		return Promise.all( promises )
	}

}

module.exports = Unitflow;
