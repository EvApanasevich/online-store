//common methods that are used in different components
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
   isSelected(attributeId, attributeItemId, product) {
      return product.selectedAttributes.some(selectedAttribute =>
         selectedAttribute.attributeId === attributeId &&
         selectedAttribute.attributeValue === attributeItemId)
   },
   getAttributeStyle(type, selectorName) {
      if (type === 'text') {
         return `${selectorName}__attribute_text`
      } else if (type === 'swatch') {
         return `${selectorName}__attribute_swatch`
      }
   }
}

export default util
