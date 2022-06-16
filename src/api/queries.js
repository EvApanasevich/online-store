import { Query, Field } from '@tilework/opus';

export const currenciesQuery = new Query('currencies', true)
   .addField('label')
   .addField('symbol')

export const categoriesNamesQuery = new Query('categories', true)
   .addField('name')

export const categoryQuery = (categoryName) => {
   return new Query('category', true)
      .addArgument('input', 'CategoryInput', { title: `${categoryName}` })
      .addField('name')
      .addField(new Field('products', true)
         .addFieldList(['id', 'name', 'brand', 'inStock', 'gallery'])
         .addField(new Field('attributes', true)
            .addFieldList(['id', 'name', 'type'])
            .addField(new Field('items', true)
               .addFieldList(['id', 'displayValue', 'value'])
            )
         )
         .addField(new Field('prices', true)
            .addField('amount')
            .addField(new Field('currency', true)
               .addField('label')
               .addField('symbol')
            )
         )
      )
}

export const productQuery = (productId) => {
   return new Query('product', false)
      .addArgument('id', 'String!', `${productId}`)
      .addFieldList(['id', 'name', 'brand', 'inStock', 'gallery', 'description', 'category'])
      .addField(new Field('attributes', true)
         .addFieldList(['id', 'name', 'type'])
         .addField(new Field('items', true)
            .addFieldList(['id', 'displayValue', 'value'])
         )
      )
      .addField(new Field('prices', true)
         .addField('amount')
         .addField(new Field('currency', true)
            .addField('label')
            .addField('symbol')
         )
      )
}