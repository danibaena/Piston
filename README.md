# Piston

### Proudly developed with love at h4ckademy for the community, as proposed by Traity.

## Description

Engine to consume different APIs. With Piston you can write your own specification for an API of your like and Piston takes care of handling the requests, the errors and do some proccessing on the response expected. It is intended to work with json format responses. We have for now investigated a few APIs and some more will come in the future.

## Environment

* *node v5.2.0*

* *jasmine v2.4.1*

* Dependencies:
	
	* *request v2.67.0*

	* *bluebird v3.0.5*

	* *xml2js v0.4.15*

## Usage

In the folder *examples* you can see how it can be used. In *pistonSpecs* folder you can add your own API spec files. We are providing a template in .json format that can be filled with different data (your own headers, query strings, params to be passed to Piston on execution, the fields of the response you want to grab, etc.)

## Tests

More tests to come in the near future for you test addicts.

## Authors

* Daniel Baena Hermosa
	* [github](https://github.com/danibaena)

	* d.baena.hermosa@gmail.com

* Jesús García Martínez
	* [github](https://github.com/jesgarciamartinez)
	* jes.garcia.martinez@gmail.com

*Autumn 2015 Google Campus Madrid*