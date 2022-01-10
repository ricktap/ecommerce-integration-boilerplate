import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product,
  Offer
} from '@vue-storefront/vsfDapPim-api';

const params: UseCartFactoryParams<Cart, CartItem, Offer> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Implemented: useCart.load');
    const cart = await context.$vsfDapPim.api.getCart()
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, params) => {
    console.log('Implemented: useCart.addItem');
    return await context.$vsfDapPim.api.addToCart(params);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, params) => {
    console.log('Implemented: useCart.removeItem');
    return await context.$vsfDapPim.api.removeFromCart(params);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: useCart.updateItemQty');
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: useCart.clear');
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Unused: useCart.applyCoupon');
    return {
      updatedCart: currentCart,
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Unused: useCart.removeCoupon');
    return {
      updatedCart: currentCart
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: useCart.isInCart');
    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, Offer>(params);
