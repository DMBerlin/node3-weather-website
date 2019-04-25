const request = require('request');

const forecast = (lat, long, callback) => {
	const url =
		'https://api.darksky.net/forecast/85d87710f3865f7ab71f8743547324e4/' + long + ',' + lat + '?units=si&lang=pt';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Low level error.', undefined);
		} else if (body.error) {
			callback('User level error.', undefined);
		} else {
			callback(undefined, {
				forecast :
					'A temperatura atual é de ' +
					body.currently.temperature +
					' com sensação térmica de ' +
					body.currently.apparentTemperature +
					' e a chance de chuva é de ' +
					body.currently.precipProbability +
					'%. '
			});
		}
	});
};

module.exports = forecast;
