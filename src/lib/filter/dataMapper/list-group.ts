import ListGroup from "../filter-list-group";
import { Filter } from "../filter";

/**
 * Checks whether Filter group is already available
 * If not, create it and returns. else returns the existing group
 * @param filter
 * @param groupName 
 * @returns 
 */
 export const getListGroup = (filter: Filter, groupName: string) => {
    if(!filter.isGroupExists(groupName)){
        filter.addGroup(groupName, new ListGroup());
    } 
    return filter.getGroup(groupName);
}
