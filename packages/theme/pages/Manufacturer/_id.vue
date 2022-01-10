<template>
    <div class="page--manufacturer">
        <h1 v-if="selectedManufacturer">{{ selectedManufacturer.name }} Teile</h1>
        <VehicleSelection />
    
        <div class="series-catalog">
            <h2>Beliebteste Serien</h2>
            <ul>
                <li class="series" v-for="s in series">{{ s.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import VehicleSelection from '~/components/VehicleSelection/index.vue';
import { useVehicleSelection } from '@vue-storefront/vsfDapPim';

const { loading, series, selectedManufacturerId, selectedManufacturer } = useVehicleSelection();


</script>