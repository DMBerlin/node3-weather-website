const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

/*
 * Build up Express
*/
const app = express();

/*
* Defined Paths for Express Config
*/
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/*
* Setup handlebars engine and views
*/
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/*
* Setup static directory to serve
*/
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
	res.render('index', {
		title : 'Weather app',
		name  : 'Daniel M'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title : 'About',
		name  : 'Daniel M'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title : 'Help',
		name  : 'Daniel M',
		text  : 'Some help text goes here.'
	});
});

/*
* Weather API router
 */
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error : 'You must provice a address to search.'
		});
	} else {
		geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(latitude, longitude, (error, { forecast }) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					location,
					forecast,
					address  : req.query.address
				});
			});
		});
	}
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error : 'You must provide a search term.'
		});
	}

	console.log(req.query.search);
	res.send({
		products : []
	});
});

/*
* Not found pages
*/
app.get('/help/*', (req, res) => {
	res.render('404', {
		title        : 'Help not found.',
		name         : 'Daniel M',
		errorMessage : 'Nothing to see here, pal!'
	});
});

// My Switch Default Case
app.get('*', (req, res) => {
	res.render('404', {
		title        : 'Page not found.',
		name         : 'Daniel M',
		errorMessage : "Are you sure where you're stepping in?"
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
