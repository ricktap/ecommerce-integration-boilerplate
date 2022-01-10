import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints, Cart, Product, Manufacturer, Series, Model } from './types';
import axios from 'axios';

function onCreate(settings: Setttings) {
  return {
    config: settings,
    client: axios.create({
      baseURL: "http://127.0.0.1:8080"
    })
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    getProduct: async (context, params): Promise<Product> => {
      console.log('params: ', params)
      const { data } = await context.client.get('/products/' + params.id)
      return data
    },
    getProducts: async (context): Promise<Array<Product>> => {
      const { data } = await context.client.get('/products')
      return data
    },
    addToCart: async (context, params) => {
      const { product, quantity } = params
      const { data } =  await context.client.post('/cart', {
        offerId: product.id,
        count: quantity
      })
      return data
    },
    getCart: async (context): Promise<Cart> => {
      const { data } = await context.client.get('/cart')
      return data
    },
    removeFromCart: async (context, params) => {
      const { product: offer } = params
      const { data } =  await context.client.delete('/cart/' + offer.id)
      return data
    },
    listManufacturers: async (context): Promise<Array<Manufacturer>> => {
      const { data } = await context.client.get('/manufacturers')
      return data
    },
    listSeriesByManufacturer: async (context, manufacturerId: number): Promise<Array<Series>> => {
      const { data } = await context.client.get('/manufacturers/' + manufacturerId + '/series')
      return data
    },
    listModelsBySeries: async (context, seriesId: number): Promise<Array<Model>> => {
      const { data } = await context.client.get('/series/' + seriesId + '/models')
      return data
    },
  }
});

export {
  createApiClient
};
