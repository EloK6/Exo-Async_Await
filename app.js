const axios = require("axios");

//1st function - getExchangeRate
// const getExchangeRate = (fromCurrency, toCurrency) => {
// 	const clientId = process.env.clientId;
// 	axios
// 		.get(
// 			"http://data.fixer.io/api/latest?access_key=[yourAccessKey]&format=1"
// 		)
// 		.then(response => {
// 			const rate = response.data.rates;
// 			const euro = 1 / rate[fromCurrency];
// 			const exchangeRate = euro * rate[toCurrency];
// 			console.log(exchangeRate);
// 		});
// };

const getExchangeRate = async (fromCurrency, toCurrency) => {
	const response = await axios.get("process.env.DATA_FIXER");
	const rate = response.data.rates;
	const euro = 1 / rate[fromCurrency];
	const exchangeRate = euro * rate[toCurrency];

	if (isNaN(exchangeRate)) {
		throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
	}

	return exchangeRate;
};

//2dfunction - getCountries
const getCountries = async toCurrency => {
	try {
		const response = await axios.get(
			`https://restcountries.eu/rest/v2/currency/${toCurrency}`
		);
		return response.data.map(country => country.name);
	} catch (error) {
		throw new Error(`Unable to get countries that use ${toCurrency}`);
	}
};

//3rdfunction - convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
	const countries = await getCountries(toCurrency);
	const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
	const convertedAmount = (amount * exchangeRate).toFixed(2);
	return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency} in ${countries}`;
};

//Call convert currency to get data
convertCurrency("USD", "EUR", 30)
	.then(message => {
		console.log(message);
	})
	.catch(error => {
		console.log(erros.message);
	});
