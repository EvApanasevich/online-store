import { client } from '@tilework/opus';
import { categoriesNamesQuery, currenciesQuery, categoryQuery, productQuery } from './queries'

client.setEndpoint("http://localhost:4000/graphql")

export const fetchApi = {
   fetchCategoriesNames() {
      return client.post(categoriesNamesQuery)
   },
   fetchCurrencies() {
      return client.post(currenciesQuery)
   },
   fetchCategory(categoryName) {
      return client.post(categoryQuery(categoryName))
   },
   fetchProduct(productId) {
      return client.post(productQuery(productId))
   }
}
