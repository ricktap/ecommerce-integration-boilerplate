export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Manufacturer = {
    id: number,
    name: string
}

export type Series = {
    id: number,
    name: string,
    manufacturerId: number,
}

export type Model = {
    id: number,
    name: string,
    seriesId: number,
}

export declare type Offer = {
    id: number,
    product?: Product,
    price: number,
    vendorId: 1
}

export declare type Cart = {
    items: Array<CartItem>
};

export type CartItem = {
    id: number,
    offer: Offer,
    count: number
};

export type Category = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = {
    id: number,
    manufacturer: string,
    category: string,
    images: Array<string>,
    vehicles: Array<number>,
    cheapest: Offer,
    offers: Array<Offer>
};

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;

export type Store = TODO;

export type Wishlist = TODO;

export type WishlistItem = TODO;
