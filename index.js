const express = require('express')
const app = express()

const axios = require('axios')
const cors = require('cors')
app.use(cors())

const path = require('path')
const convert = require('./lib/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {

    try {
        var currency = await axios.get('https://economia.awesomeapi.com.br/json/all')
        const allCurrency = (currency.data)
        res.render('home', { allCurrency })

    } catch (err) {
        console.log(err)
    }
})

app.get('/cotacao', async (req, res) => {
    try {
        const { currencys, amount } = req.query

        const getCurrency = await axios.get('https://economia.awesomeapi.com.br/' + currencys)
        const currency = getCurrency.data

        Object.keys(currency).map((item) => {
            quote = (currency[item].ask)
            currencyName = (currency[item].name)
        })

        if (quote && amount) {
            const conversion = convert.convert(quote, amount)
            res.render('quote', {
                error: false,
                quote: convert.toMoney(quote),
                amount: convert.toMoney(amount),
                conversion: convert.toMoney(conversion)
            })
        } else {
            res.render('quote', {
                error: 'Valor Inválido'
            })
        }

    } catch (err) {
        console.log(err)
    }
})


app.listen(3000, err => {
    if (err) {
        console.log('Não foi possivel iniciar...')
    } else {
        console.log('ConvertMyMoney está online...')
    }
})