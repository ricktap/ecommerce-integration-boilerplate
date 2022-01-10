import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type { Facet, FacetSearchCriteria } from '@vue-storefront/vsfDapPim-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return [
    {
      type: 'select',
      value: 'Bosch',
      id: '1'
    }
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  return [
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
  console.log(params)
  return {
    options: [
      {
        type: 'name_asc',
        id: '1',
        value: 'Name (asc)'
      },
      {
        type: 'name_desc',
        id: '2',
        value: 'Name (desc)'
      }
    ],
    selected: '' + params.input.sortBy
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(params: FacetSearchResult<Facet>): AgnosticCategoryTree {
  return {
    label: '',
    slug: '',
    items: null,
    isCurrent: false,
    count: 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(params: FacetSearchResult<Facet> | any): any {  
  return params.data.products.sort((a, b) => {
    return ((params.input.sortBy == 2) ? -1 : 1) * (`${a.manufacturer} ${a.category}`).localeCompare(`${b.manufacturer} ${b.category}`)
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params: FacetSearchResult<Facet>): AgnosticPagination {
  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    itemsPerPage: 10,
    pageOptions: []
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
