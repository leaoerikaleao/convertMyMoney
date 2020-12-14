const axios = require('axios')

async function getAllCurrency() {
    try {
        var currency = await axios.get('https://economia.awesomeapi.com.br/json/all')
        const t = (currency.data)

    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    getAllCurrency
}