import { getCurrentInstance } from '@vue/composition-api'

const getContext = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy;
};


const useUiHelpers = () => {
  const context = getContext()

  const getVehicleFromUrl = () => {
    const currentRoute = context.$router.currentRoute
    let manufacturerId: string | string[]
    if (currentRoute.path.startsWith('/manufacturer')) {
      manufacturerId = currentRoute.path.split('/').pop()
    } else {
      manufacturerId = currentRoute.query.manufacturer
    }
    
    return {
      manufacturerId
    }
  }

  const getFacetsFromURL = () => {
    console.warn('[VSF] please implement useUiHelpers.getFacets.');
    return {
      categorySlug: null,
      page: 1,
      sortBy: getSortTermFromUrl()
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    console.warn('[VSF] please implement useUiHelpers.getCatLink.');

    return '/';
  };

  // eslint-disable-next-line
  const changeSorting = (sort) => {
    console.warn('[VSF] please implement useUiHelpers.changeSorting.');
    const term = (sort == 2) ? 'desc' : 'asc';
    
    context.$router.push({
      query: {
        term: term || undefined
      }
    });
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.changeFilters.');
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSortTermFromUrl = () => {
    const term = context.$router.currentRoute.query['term']

    return (term == 'desc') ? 2 : 1;
  }

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  return {
    getVehicleFromUrl,
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
