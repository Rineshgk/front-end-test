import { FilterGroup, GroupDetails, GroupType } from '../../types/filter';
import ListGroup from './filter-list-group';
import {doOperation} from './filter.helper';


export class Filter {

    groupList: Map<string, GroupType>;
    selectedGroupList: Set<string>; 
    private initialData: number[];
    private initialFilterDetails: [] | GroupDetails[];


    constructor(){
        this.groupList = new Map();
        this.selectedGroupList = new Set(); 
        this.initialData = [];
        this.initialFilterDetails = [];
    }

    /**
     * set initial data
     * store initial data set
     * store initial filter data set
     * @param {*} fn 
     */
    setData(fn) {
        this.clear();
        const data = fn();
        this.initialData = data;
        this.initialFilterDetails = this.getFilterDetails(this.initialData);
    }

    /**
     * Clear all Filter values
     * Calls before loading a new dataset by setData
     */
    private clear(){
        this.groupList.clear();
        this.selectedGroupList.clear();
        this.initialData = [];
        this.initialFilterDetails = [];
    }
    
    /**
     * Check whether filter group is already there or not
     * @param {*} key 
     * @returns 
     */
     isGroupExists(key) {
        if(!key)
            return false;
        return this.groupList.has(key);
    }

    /**
     * Add a new Filter Group
     * @param {*} key 
     */
    addGroup(key: string, group: ListGroup) {
        const index = this.groupList.size;
        this.groupList.set(key, group);
        group.setIndex(index);
    }

    /**
     * Get Group
     * @param {*} groupName 
     */
    getGroup(groupName: string) {
        return this.groupList.get(groupName);
    }

    /**
     * on selection of a filter group option
     * @param {*} groupName 
     * @param {*} key 
     * @param {*} checked 
     * @returns 
     */
    onFilter(groupName, options): {filteredIndex: number[], filteredIndexByBit: number[],filterDetails: GroupDetails[] }{
        const group = this.getGroup(groupName);
        if(!group) {
            return;
        }
        group.onFilter(options, (status) => {
            status ? this.selectedGroupList.add(groupName) : this.selectedGroupList.delete(groupName)
        });

        if(this.selectedGroupList.size === 0){
            return this.getInitialFilterDetails();
        }
        
        return this.getFilterResult();  
    }
    
    /**
     * Returns filter details
     * @returns 
     */
    getInitialFilterDetails(): {filteredIndex: number[], filteredIndexByBit: number[],filterDetails: GroupDetails[] }{
        return {
            filteredIndex: this.initialData,
            filteredIndexByBit: this.getFilteredIndexByBit(this.initialData),
            filterDetails: this.initialFilterDetails
        }
    }

    /**
     * Returns index in bit o ir 1
     * @param data 
     * @returns 
     */
    getFilteredIndexByBit(data: number[]): number[]{
        if(!data && !Array.isArray(data)){
            return;
        }
        const dataArray = [...Array(data.length).fill(0)];

        data.forEach((index) => {
            dataArray[index] = 1;
        })

        return dataArray;
    }

    /**
     * Do And operation at group level and return both result set and count obj
     * @returns 
     */
    getFilterResult(): {filteredIndex: number[], filteredIndexByBit: number[],filterDetails: GroupDetails[] }{
        const filteredResult = doOperation(
            this.selectedGroupList,
            this.groupList,
            'filteredResult',
            'AND'
        );

        return {
            filteredIndex: filteredResult,
            filteredIndexByBit: this.getFilteredIndexByBit(filteredResult),
            filterDetails: this.getFilterDetails(filteredResult)
        }
    }

    /**
     * Reset
     */
    reset(){
        this.groupList.forEach((group) => {
            group.reset();
        });
        this.selectedGroupList.clear();
    }

    /**
     * return each keys with count
     * @param {*} filteredResult 
     * @returns 
     */
     getFilterDetails(filteredResult: number[]): GroupDetails[]{
        let filterDetails = [];
        this.groupList.forEach((group: FilterGroup, groupName: string) => {
            filterDetails.push({
                groupName: groupName,
                groupDetails: group.getFilterDetails(filteredResult)
            })
        })
        return filterDetails;
    }

}