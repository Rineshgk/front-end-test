import { Holiday } from "../../types/booking";
import { createHotelFacility, mapHotelFacilities } from "./dataMapper/facility-filter-group";
import { createPPEGroup, mapPricePerPerson } from "./dataMapper/price-per-person-filter-group";
import { createRatingGroup, mapDataToRating } from "./dataMapper/rating-filter-group";
import { Filter } from './filter';

/**
 * Loop through each holiday response object and map data to the filter class
 * @param filter - Filter object
 * @param data - Holiday list
 * @returns 
 */
export const mapDataToFilter = (filter: Filter, data: Holiday[]): string[] => {
    const dataSet = [];
    const pricing = [];
    const uniquePricing = {};

    const ratingGroup = createRatingGroup(filter);
    const createPriceGroup = createPPEGroup(filter);
    const facilityGroup = createHotelFacility(filter);

    for(let i =0; i < data.length; i++){
        dataSet.push(i);

        mapUniquePricing(data, i, pricing, uniquePricing);
        mapDataToRating(ratingGroup, data[i], i)
        mapHotelFacilities(facilityGroup, data[i], i);
    }

    mapPricePerPerson(createPriceGroup, pricing, Object.keys(uniquePricing));
    return dataSet;
}

/**
 * Map unique pricing
 * @param data 
 * @param i 
 * @param pricing 
 * @param uniquePricing 
 */
const mapUniquePricing = (data: any, i: number, pricing: any[], uniquePricing: {}): void => {
    if (data[i].hasOwnProperty('pricePerPerson')) {
        const ppe = data[i].pricePerPerson ;
        pricing.push({ index: i, price: ppe});
        uniquePricing[Math.floor(ppe)] = 1;
    }
}

