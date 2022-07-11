import { Holiday } from "../../../types/booking";
import { Filter } from "../filter";
import { getListGroup } from "./list-group";
import { GroupType } from "../../../types/filter";


export const createRatingGroup = (filter: Filter): GroupType => {
    const ratingGroup = getListGroup(filter, 'rating');
    ratingGroup.setOperation('OR'); // set operation for a group
    
    // set initial key set for rating
    ratingGroup.setDataOnKey('5+', null)
    ratingGroup.setDataOnKey('5', null)
    ratingGroup.setDataOnKey('4+', null)
    ratingGroup.setDataOnKey('4', null)
    ratingGroup.setDataOnKey('3+', null)
    ratingGroup.setDataOnKey('3', null)
    ratingGroup.setDataOnKey('Villas', null);

    return ratingGroup;
}

export const mapDataToRating = (ratingGroup: GroupType, data: Holiday, index: number): void => {
    // Get rating from holiday object
    const rating = data.hotel.content?.vRating;

    // if Villa
    const villas = data.hotel.content?.starRating;
    if(villas && villas === 'Villas'){
        ratingGroup.setDataOnKey('Villas', index);
    }

    // set data on rating group key
    if(rating){
        ratingGroup.setDataOnKey(rating, index);
    }
}