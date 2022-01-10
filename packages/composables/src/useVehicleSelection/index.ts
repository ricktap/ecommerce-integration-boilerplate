import type { Manufacturer, Series, Model } from "@vue-storefront/vsfDapPim-api"
import { Context } from "@vue-storefront/core";
import { useVehicleSelectionFactory, UseVehicleSelectionFactoryParams } from "./useVehicleSelectionFactory";

const params: UseVehicleSelectionFactoryParams = {
    getManufacturers: function (context: Context<any, any, any>): Promise<Array<Manufacturer>> {
        return context.$vsfDapPim.api.listManufacturers()
    },
    getSeriesByManufacturer: function (context: Context<any, any, any>, manufacturerId: number): Promise<Array<Series>> {
        console.log('manufacturerId', manufacturerId)
        return context.$vsfDapPim.api.listSeriesByManufacturer(manufacturerId)
    },
    getModelsBySeries: function (context: Context<any, any, any>, seriesId: number): Promise<Array<Model>> {
        return context.$vsfDapPim.api.listModelsBySeries(seriesId)
    }
}

export const useVehicleSelection = useVehicleSelectionFactory(params);
