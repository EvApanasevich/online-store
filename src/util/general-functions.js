const util = {
   getPrice(product, currentCurrency) {
      const price = product.prices.find(price => price.currency.symbol === currentCurrency)
      return `${price.currency.symbol}${price.amount}`
   },

   getTotal(productsInCart, currentCurrency) {
      const total = productsInCart.reduce((sum, product) => {
         const price = product.prices.find(price =>
            price.currency.symbol === currentCurrency
         )
         return sum + price.amount * product.count
      }, 0)
      return `${currentCurrency}${total.toFixed(2)}`
   },
}

export default util
