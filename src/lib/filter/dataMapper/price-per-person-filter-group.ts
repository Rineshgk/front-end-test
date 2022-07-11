import { Filter } from "../filter";
import { getListGroup } from "./list-group";
import { GroupType } from "../../../types/filter";

/**
 * Create Pricing per person group
 * @param filter 
 * @returns ListGroup
 */
export const createPPEGroup = (filter: Filter): GroupType => {
    const pricingGroup = getListGroup(filter,'pricePerPerson');
    pricingGroup.setOperation('OR'); // set operation
    return pricingGroup;
}

/**
 * map price to ranged values
 * - Create range from unique values
 * - Divide by 4 to get four ranges 
 * @param pricingGroup - List Group
 * @param pricingList 
 * @param uniquePricingKeys 
 */
export const mapPricePerPerson = (pricingGroup: GroupType, pricingList: {price: number, index: number}[], uniquePricingKeys: string[]) => {
    let pricing = {};

    if(uniquePricingKeys.length < 4){
        const priceList = pricingList.map((priceVal) => priceVal.index)
        const key = `upto $${uniquePricingKeys[uniquePricingKeys.length - 1]}`;
        pricing[key] = [...priceList];
        pricingGroup.setDataOnKey(key, pricing[key]);
        return;
    }

    const rangeDivider = Math.floor(uniquePricingKeys.length / 4);
    const firstQuarter = +uniquePricingKeys[rangeDivider];
    const secondQuarter =  +uniquePricingKeys[rangeDivider * 2];
    const thirdQuarter = +uniquePricingKeys[rangeDivider * 3];

    pricing = {
        first: [], second: [], third: [], fourth: []
    }

    mapPrice(pricingList, firstQuarter, pricing, secondQuarter, thirdQuarter);

    pricingGroup.setDataOnKey(`upto £${firstQuarter}`, pricing['first']);
    pricingGroup.setDataOnKey(`£${firstQuarter} to £${secondQuarter}`, pricing['second']);
    pricingGroup.setDataOnKey(`£${secondQuarter} to £${thirdQuarter}`, pricing['third']);
    pricingGroup.setDataOnKey(`Above £${thirdQuarter}`, pricing['fourth']);

}

/**
 * Drop data index into range buckets
 * @param pricingList 
 * @param firstQuarter 
 * @param pricing 
 * @param secondQuarter 
 * @param thirdQuarter 
 */
function mapPrice(pricingList: { price: number; index: number; }[], firstQuarter: number, pricing: {}, secondQuarter: number, thirdQuarter: number) {
    pricingList.forEach((priceVal, index) => {
        if (priceVal.price < firstQuarter) {
            pricing['first'].push(priceVal.index);
        } else if (priceVal.price >= firstQuarter && priceVal.price < secondQuarter) {
            pricing['second'].push(priceVal.index);
        } else if (priceVal.price >= secondQuarter && priceVal.price < thirdQuarter) {
            pricing['third'].push(priceVal.index);
        } else if (priceVal.price >= thirdQuarter) {
            pricing['fourth'].push(priceVal.index);
        }
    });
}
