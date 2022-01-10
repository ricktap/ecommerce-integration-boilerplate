import { 
    FactoryParams, 
    PlatformApi, 
    Context,
    sharedRef,
    configureFactoryParams,
    Composable,
    ComputedProperty
} from "@vue-storefront/core";

import type { Manufacturer, Series, Model } from "@vue-storefront/vsfDapPim-api";

import { computed, Ref, watch } from "@nuxtjs/composition-api";

export interface UseVehicleSelectionFactoryParams<
    API extends PlatformApi = any
> extends FactoryParams<API> {
    getManufacturers: (context: Context) => Promise<Array<Manufacturer>>,
    getSeriesByManufacturer: (context: Context, manufacturerId: number) => Promise<Array<Series>>,
    getModelsBySeries: (context: Context, seriesId: number) => Promise<Array<Model>>
}

export interface UseVehicleSelectionErrors {
    search: Error;
}

export interface UseVehicleSelection<
    API extends PlatformApi = any
> extends Composable<API> {
    manufacturers: ComputedProperty<Array<Manufacturer>>;
    selectedManufacturer: ComputedProperty<Manufacturer>;
    series: ComputedProperty<Array<Series>>;
    selectedSeries: ComputedProperty<Series>;
    models: ComputedProperty<Array<Model>>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseVehicleSelectionErrors>;
    selectedManufacturerId: Ref<number>;
    selectedSeriesId: Ref<number>;
    selectManufacturerById: (id: number) => void;
    [x: string]: any;
}
  
export function useVehicleSelectionFactory<API extends PlatformApi = any>(
    factoryParams: UseVehicleSelectionFactoryParams<API>
) {
    return function useVehicleSelection(): UseVehicleSelection<API> {
      const manufacturers: Ref<Array<Manufacturer>> = sharedRef([], `useVehicleSelection-manufacturer`);
      const series: Ref<Array<Series>> = sharedRef([], `useVehicleSelection-series`);
      const models: Ref<Array<Model>> = sharedRef([], `useVehicleSelection-model`);
      const loading = sharedRef(false, `useVehicleSelection-loading`);
      const error: Ref<UseVehicleSelectionErrors> = sharedRef({
        search: null
      }, `useVehicleSelection-error`);

      const selectedManufacturerId: Ref<number> = sharedRef(null, `useVehicleSelection-selectedManufacturerId`)
      const selectedSeriesId: Ref<number> = sharedRef(null, `useVehicleSelection-selectedSeriesId`)

      const selectedManufacturer: Ref<Manufacturer> = sharedRef(null, 'useVehicleSelection-selectedManufacturer')
      const selectedSeries: Ref<Series> = sharedRef(null, 'useVehicleSelection-selectedSeries')
  
      const _factoryParams = configureFactoryParams(
        factoryParams,
        { mainRef: manufacturers, alias: 'currentManufacturers', loading, error }
      );

      const load = async function() {
        // load initial set of manufacturers
        loading.value = true;
        manufacturers.value = await _factoryParams.getManufacturers()
        loading.value = false
      }

      const selectManufacturerById = function(id: number) {
        selectedManufacturer.value = manufacturers.value.find((m) => m.id == id)
      }

      const selectSeriesById = function(id: number) {
        selectedSeries.value = series.value.find((m) => m.id == id)
      }

      watch(selectedManufacturerId, () => {
        loading.value = true
        console.log('changed selectedManufacturerId', selectedManufacturerId.value, manufacturers.value)
        selectManufacturerById(selectedManufacturerId.value)
        _factoryParams.getSeriesByManufacturer(selectedManufacturerId.value).then((response) => {
          series.value = response
          models.value = []
          selectedSeriesId.value = null
          loading.value = false
        })
      })

      watch(selectedSeriesId, () => {
        loading.value = true
        selectSeriesById(selectedSeriesId.value)
        _factoryParams.getModelsBySeries(selectedSeriesId.value).then((response) => {
          models.value = response
          loading.value = false
        })
      })
  
      return {
        manufacturers: computed(() => manufacturers.value),
        series: computed(() => series.value),
        models: computed(() => models.value),
        selectedManufacturer: computed(() => selectedManufacturer.value),
        selectedSeries: computed(() => selectedSeries.value),
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        selectedManufacturerId,
        selectedSeriesId,
        load,
        selectManufacturerById
      };
    };
  }