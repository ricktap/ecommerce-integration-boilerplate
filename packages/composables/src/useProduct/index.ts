import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/vsfDapPim-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    if (params.id) {
      const product = await context.$vsfDapPim.api.getProduct({ id: params.id })
      if (product) {
        return product
      }
    }
    return null
  }
}

export const useProduct = useProductFactory<Product, SearchParams>(params);
