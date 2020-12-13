const axios = require('axios')

async function getAllCurrency() {

    return axios.get('https://economia.awesomeapi.com.br/json/all');

}

module.exports = {
    getAllCurrency
}