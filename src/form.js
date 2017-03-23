"use strict";

const ComponentList = require( './component-list' ),
	$ = require( 'jquery' ),
	Eventable = require('./eventable')
;

class Form extends Eventable {

	constructor( id, opts = {} ) {
		super();
		this.id = id;
		this.components = new ComponentList( this );

		(
			{
				submitButtonText: this.submitButtonText = 'Send'
			}
			= opts
		);
	}

	addField( component ) {
		this.components.add( component );
	}

	build() {

		let $container = $( '<form>' );

		let $saveButton = $( '<button>' )
			.attr( 'type', 'submit' )
			.text( this.submitButtonText )
		;

		$container.append( this.components.build() );
		$container.append( $saveButton );

		$container.on( 'submit', e => {
			if( this.validate() ) {
				this.save();
			}
			e.preventDefault();
		} );

		return $container;
	}

	validate( data ) {

		return this.components.validate( data );
	}

	save() {

		let data = {};
		this.components.save( data );
		this.trigger( 'submit', { data: data } );
	}
}

module.exports = Form;