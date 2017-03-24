"use strict";

const Eventable = require('./eventable'),
	$ = require( 'jquery' )
;

class Component extends Eventable {

	constructor( id, opts = {} ) {
		super();
		this.id = id;
		this.form = null;
		this.errors = [];
		this.setup();

		(
			{
				v8nRequired : this.v8nRequired = false,
				label : this.label = false,
			}
			= opts
		);
	}

	postValidate() {

		if( this.errors.length ) {
			let error = ( this.form.errorMessages[this.errors[0]] ? this.form.errorMessages[this.errors[0]] : this.errors[0] );
			this.setError(error);
		} else {
			this.removeError();
		}
	}

	setError( msg ) {
		if( ! this.$error ) {
			this.$error = $( '<span>' )
				.appendTo( this.getContainer() )
			;
		}

		this.getContainer().addClass( 'has-errors' );
		this.$error.text( msg );
	}

	removeError() {
		this.getContainer().removeClass( 'has-errors' );

		if( this.$error ) {
			this.$error.remove();
			delete this.$error;
		}
	}

	setForm( form ) {
		this.form = form;
	}

	setup() {}

	getValue() {
		return null;
	}

	validate() {

		this.errors = [];

		if( this.v8nRequired && !this.getValue() ) {
			this.errors.push( 'required' );
		}
	}

	save( data ) {
		data[ this.id ] = this.getValue();
	}

	getContainer() {
		if( ! this.$el ) {
			throw new Error( 'Built the component first' );
		}
		return this.$el;
	}

	build() {

		this.$el = $( '<fieldset>' );

		if( this.label ) {

			let $label = $( '<label>' )
				.text( this.label )
				.appendTo( this.$el )
			;
		}

		return this.$el;
	}
}

module.exports = Component;