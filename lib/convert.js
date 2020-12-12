const convert = (quote, amount) => {
    return quote * amount
}

const toMoney = value => {
    return parseFloat(value).toFixed(2)
}

module.exports = {
    convert, toMoney
}