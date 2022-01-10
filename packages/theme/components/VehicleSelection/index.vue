<template>
    <div
        data-cy="component-vehicle-selection-container"
        data-ab="vehicle-selection-section"
        class="vehicle-selection-container isDE"
    >
        <section
            data-cy="component-vehicle-selection-de"
            class="vehicle-selection vehicle-selection__header section--highlight"
        >
            <header class="section__header--highlight">Fahrzeugauswahl</header>
            <div class="vehicle-selection__inner section__main">
                <div data-cy="component-catalog" class="catalog__container">
                    <p class="catalog__legend">Auswahl über den Fahrzeugkatalog</p>
                    <div data-cy="vehicle-selection" class="catalog">
                        <SelectBox :dataset="manufacturers" v-model="selectedManufacturerId" defaultOption="Hersteller wählen" />
                        <SelectBox :dataset="series" v-model="selectedSeriesId" defaultOption="Baureihe wählen" />
                        <SelectBox :dataset="models" defaultOption="Modell wählen" />
                    </div>
                </div>
                <div data-cy="component-kba" class="kba__container">
                    <p class="kba__legend">Fahrzeugauswahl nach KBA-Nr.</p>
                    <form method="post" action class="kba">
                        <div class="kba__input">
                            <input
                                name="vehicle_kba[hsn]"
                                type="text"
                                placeholder="HSN (2.1)"
                                required="required"
                                maxlength="4"
                                pattern="[a-zA-Z0-9]{4}"
                                data-cy="input-hsn"
                                class
                            />
                        </div>
                        <div class="kba__input kba__input--tsn">
                            <input
                                name="vehicle_kba[tsn]"
                                type="text"
                                placeholder="TSN (2.2)"
                                required="required"
                                maxlength="3"
                                pattern="[a-zA-Z0-9]{3}"
                                data-cy="input-tsn"
                                class
                            />
                        </div>
                        <!---->
                        <details class="tooltip kba__info">
                            <summary>Wo finde ich diese Angaben?</summary>
                            <div>
                                <img
                                    data-src="/_nuxt/img/hsn-tsn.71071ee.jpg"
                                    src="/_nuxt/img/hsn-tsn.71071ee.jpg"
                                    alt="Fahrzeug-Auswahl über Fahrzeugpapiere / Schlüsselnummern (HSN/TSN)"
                                    loading="lazy"
                                />
                            </div>
                        </details>
                        <div class="kba__input--submit">
                            <button
                                data-cy="submit-vehicle"
                                disabled="disabled"
                                type="submit"
                                name="vehicle_kba[submit]"
                                class="button primary"
                            >
                                <span class="desktop">Fahrzeug auswählen</span>
                                <span class="mobile">Auswählen</span>
                            </button>
                        </div>
                        <!---->
                        <input type="hidden" name="vehicle_kba[ref]" value="hsntsn" />
                    </form>
                </div>
                <!---->
            </div>
        </section>
        <!---->
        <!---->
    </div>
</template>

<script setup>
    import { useVehicleSelection } from '@vue-storefront/vsfDapPim';
    import { useUiHelpers } from '~/composables';
    import SelectBox from './Atoms/SelectBox.vue';

    const th = useUiHelpers();
    const { load, manufacturers, loading, series, selectedManufacturer, selectManufacturerById, selectedSeriesId, models, selectedManufacturerId } = useVehicleSelection();

    load().then(() => {
        const { manufacturerId } = th.getVehicleFromUrl();
        selectedManufacturerId.value = manufacturerId
        selectManufacturerById(manufacturerId)
    })

</script>

<style scoped>
/*! CSS Used from: https://www.daparto.de/_nuxt/css/cc8a992.css */
.button {
    border: 1px solid #77a516;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(15, 39, 87, 0.12),
        0 1px 2px rgba(15, 39, 87, 0.24);
    cursor: pointer;
    display: inline-block;
    line-height: 2.5rem;
    font-size: 1.1em;
    font-weight: 400;
    outline: none;
    padding: 0 1rem;
    text-align: center;
    transition: all 0.2s;
}
.button:hover {
    background: #96c11e;
    border-color: #96c11e;
    color: #fff;
    text-decoration: none;
}
.button:disabled {
    background: #fff;
    border-color: #a7bbcb;
    color: #a7bbcb;
}
.primary {
    background: #77a516;
    color: #fff;
    font-size: 1.2rem;
}
*,
:after,
:before {
    box-sizing: border-box;
    margin: 0;
}
p {
    margin: 0.8rem 0;
}
img {
    max-width: 100%;
}
.section__main {
    padding: 1rem;
}
.section--highlight {
    border: 1px solid #2e86ba;
    border-radius: 2px;
}
.section__header--highlight {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background: #2e86ba;
    color: #fff;
}
button,
input {
    color: #004874;
    font: normal 13px Arial, Helvetica Neue, Helvetica, sans-serif;
    line-height: 1.5;
}
input[type="text"] {
    border-radius: 2px;
    font-size: 1.2em;
    height: 2em;
    margin-left: 0;
    padding: 0 0.4em;
    width: 22em;
    background: #fff;
    border: 1px solid #c7d4de;
}
select {
    background: #fff;
    border: 1px solid #c7d4de;
    border-radius: 0;
    font-size: 1.2em;
    height: 2em;
    padding: 0 0.2em;
}
select:disabled {
    color: #a7bbcb;
}
.catalog {
    display: block;
    margin-top: 0;
}
.catalog__container {
    flex: 1;
    order: 2;
}
.catalog__legend {
    color: #999;
    margin-top: 0;
}


.catalog__select {
    position: relative;
}
.catalog__select:after {
    content: "";
    display: block;
    position: absolute;
    top: 40%;
    right: 1.5em;
    transform: translateY(-75%) rotate(45deg);
    border-color: currentcolor;
    border-style: solid;
    border-width: 0 1px 1px 0;
    width: 0.75em;
    height: 0.75em;
    pointer-events: none;
}
@media (-ms-high-contrast: none), screen and (-ms-high-contrast: active) {
    .catalog__select:after {
        display: none;
    }
}
.catalog__select select {
    -webkit-appearance: none;
    -moz-appearance: none;
    border-color: #004874;
    border-radius: 2px;
    cursor: pointer;
    height: 35px;
    margin: 0 0 1rem;
    outline: none;
    padding-left: 1rem;
    padding-right: 3rem;
    width: 100%;
}
.catalog__select select {
    padding-right: 0;
}
.catalog__select select:disabled,
.catalog__select select:disabled:focus,
.catalog__select select:disabled:hover {
    border-color: #a7bbcb;
}
.catalog__select select.isHighlighted {
    box-shadow: 0 0 5px #77a516;
    border: 3px solid #77a516;
    color: #a7bbcb;
}
.catalog__select select.isHighlighted:focus {
    color: inherit;
}
.tooltip {
    color: #2e86ba;
    cursor: pointer;
    position: relative;
}
.tooltip summary {
    display: inline-block;
    outline: none;
}
.tooltip > div {
    background: #fff;
    box-shadow: 0 1px 3px rgba(15, 39, 87, 0.12),
        0 1px 2px rgba(15, 39, 87, 0.24);
    padding: 1rem;
    position: absolute;
    top: 2em;
    left: 0;
    z-index: 32;
}
.tooltip > div img {
    max-width: none;
}
details > div {
    position: absolute;
    visibility: hidden;
}
.kba {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
    position: relative;
}
.kba__container {
    border-left: 1px solid #c7d4de;
    flex: 0.7;
    order: 2;
    margin-left: 1rem;
    padding-left: 1rem;
}
@media (max-width: 640px) {
    .kba__container {
        border-left: 0;
        border-bottom: 1px solid #c7d4de;
        margin-left: 0;
        margin-bottom: 1rem;
        order: 1;
        padding-left: 0;
    }
}
.kba__legend {
    color: #999;
    margin-top: 0;
}
.kba__input {
    flex: 1;
}
.kba__input input {
    border: 1px solid #004874;
    border-radius: 2px;
    height: 35px;
    margin-bottom: 0;
    padding: calc(0.4em + 1px) 1rem 0.4em;
    width: 100%;
}
.kba__input input:focus,
.kba__input input:hover {
    border: 1px solid #678aa5;
    border-radius: 2px;
    outline: none;
}
.kba__input--tsn {
    margin-left: 1rem;
    margin-right: 0;
}
.kba__input--submit {
    display: block;
    margin-top: 1rem;
    text-align: right;
    width: 100%;
}
.kba__input--submit button .mobile {
    display: none;
}
@media (max-width: 640px) {
    .kba__input--submit button {
        width: 100%;
    }
    .kba__input--submit button .mobile {
        display: block;
    }
    .kba__input--submit button .desktop {
        display: none;
    }
}
.kba__input ::-webkit-input-placeholder {
    color: #a7bbcb;
}
.kba__input ::-moz-placeholder {
    color: #a7bbcb;
}
.kba__input :-ms-input-placeholder {
    color: #a7bbcb;
}
.kba__info {
    flex: 1 100%;
    margin: 1rem 0;
}
@media (max-width: 640px) {
    .kba__info {
        order: 2;
    }
}
.vehicle-selection {
    margin-bottom: 0;
}
.vehicle-selection__header {
    margin-bottom: 1rem;
}
@media (max-width: 640px) {
    .vehicle-selection__header {
        margin-bottom: 0.5rem;
    }
}
.vehicle-selection__header header {
    font-size: 1.4em;
}
.vehicle-selection__inner {
    display: flex;
    flex-direction: row;
}
@media (max-width: 640px) {
    .vehicle-selection__inner {
        flex-direction: column;
    }
}
/*! CSS Used from: https://www.daparto.de/_nuxt/css/a996314.css */
.home__hero .vehicle-selection {
    clear: both;
}
/*! CSS Used from: https://www.daparto.de/_nuxt/css/817f787.css */
.vehicle-selection-container {
    display: flex;
}
.vehicle-selection-container > {
    flex: 1;
}
.vehicle-selection-container > :first-child {
    align-self: self-start;
}
.isDE > :first-child {
    flex: 2;
}
/*! CSS Used from: https://www.daparto.de/_nuxt/css/817f787.css */
.vehicle-selection-container {
    display: flex;
}
.vehicle-selection-container > {
    flex: 1;
}
.vehicle-selection-container > :first-child {
    align-self: self-start;
}
.isDE > :first-child {
    flex: 2;
}
/*! CSS Used from: https://www.daparto.de/_nuxt/css/a996314.css */
.home__hero .vehicle-selection {
    clear: both;
}
</style>