import { Holiday } from "../../../types/booking";
import { Filter } from "../filter";
import { getListGroup } from "./list-group";
import { GroupType } from "../../../types/filter";

/**
 * Create Hotel facility group
 * @param filter 
 * @returns 
 */
export const createHotelFacility = (filter: Filter): GroupType => {
    const facilityGroup = getListGroup(filter,'facility');
    facilityGroup.setOperation('AND');
    return facilityGroup;
}

/**
 * Map hotel facilities to filter group
 * @param facilityGroup 
 * @param data 
 * @param index 
 */
export const mapHotelFacilities = (facilityGroup: GroupType, data: Holiday, index: number) => {
    const facility = data.hotel.content?.hotelFacilities;

    if(facility && Array.isArray(facility)){
        facility.forEach((fac) => {
            facilityGroup.setDataOnKey(fac, index);
        })
    }
}