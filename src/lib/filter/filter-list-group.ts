/**
 * ListGroup
 * {
 *    data: Record<string, filterType>
 *    cache: Record<string, number[]> // TODO
 *    selected: number[]
 *    selectedCache: string // TODO
 *    operation: 'OR' | 'AND'
 * }
 * 
 * filterType
 * {
 *    value: number[]
 * }
 */

import { FilterGroup, GroupDetails } from '../../types/filter';
import {doOperation} from './filter.helper';


export default class ListGroup implements FilterGroup {
    private data: Map<any, any>;
    private selectedByIndex: number[];
    private selected: Set<string>
    private operation: 'OR' | 'AND'
    index: number
    filteredResult: number[]

    constructor(){
        this.data = new Map(); // {key: {values:[], index: 0}}
        this.selectedByIndex = [];
        this.selected = new Set();
        this.filteredResult = [];
        this.operation = 'AND';
        this.index = 0;
    }

    /**
     * Return filtered count at group level
     * This methods called by parent to get the filter details
     * @param {*} filterResult 
     * @returns GroupDetails with group name and array of group details
     */
    getFilterDetails(filterResult: number[]) : GroupDetails[] {
        const groupItem = [];
        let index = 0;
        this.data.forEach((item, key) => {
            const filteredValues = [];
            item.values.forEach((val) => {
                if( filterResult.indexOf(val) != -1 ) {
                    filteredValues.push(val);
                }
            })

            groupItem.push({
                name: key,
                count: item.values.length,
                filteredCount: filteredValues.length,
                selected: this.selectedByIndex[index] == 1 ? true : false
            })
            ++index;
        })
        return groupItem;
    }

    /**
     * Reset group
     */
    reset(){
        this.selected.clear();
        const count = this.data.size;
        this.selectedByIndex = [...Array(count).fill(0)]
        this.filteredResult = [];
    }
    
    /**
     * set data on each group level filter keys
     * @param {*} key 
     * @param {*} value 
     */
    setDataOnKey(key, value){
        const record = this.data.get(key);
        if(!record) {
            const index = this.getNextIndex();
            const values = value !== null? Array.isArray(value)? value : [value] : [];
            this.data.set(key, {values: values, index });
            this.initializeSelected();
        } else {
            const index = this.data.get(key).index;
            const values = record.values;
            if(value !== null){
                if(Array.isArray(value)) {
                    values.push(...value);
                } else {
                    values.push(value);
                }
                
            }
            this.data.set(key, { values: values, index });
        }
    }

    /**
     * Set initial selected index
     * Loop and set the Array
     * Set each index with 0 bit
     */
    initializeSelected() {
        const size = this.data.size;
        const selectedSize = this.selectedByIndex.length == 0? 0 : this.selectedByIndex.length - 1;
        for(let i = selectedSize; i < size; i++){
            this.selectedByIndex[i] = 0;
        }
    }

    /**
     * set operation 'OR', 'AND' for a group
     * @param {*} condition 
     */
    setOperation(condition) {
        this.operation = condition;
    }

    /**
     * Get the next index
     * @returns 
     */
    getNextIndex(): number {
        const size = this.data.size;
        return size;
    }

    /**
     * Get an index for a key
     * @param {*} key 
     * @returns 
     */
    getIndex(key: string): number {
        // if data doesn't have key
        if(!key || !this.data.has(key)){
            return -1;
        }
        const record = this.data.get(key);
        return (record && record.hasOwnProperty('index')) ? record['index']: -1;
    }

    /**
     * Set index
     * @param index 
     */
    setIndex(index: number) {
        this.index = index;
    }

    /**
     * onFilter calls on Selected method
     * Calls doOperation for AND or OR operation
     * @param {*} key 
     * @param {*} checked 
     * @param {*} callback 
     */
    private onSelected (key: string, checked: boolean, callback: (key: boolean) => void) {
        const index = this.getIndex(key);
        if(index !== -1){
            checked ? this.selected.add(key) : this.selected.delete(key);
            callback(this.selected.size > 0);
            this.selectedByIndex[index] = checked? 1 : 0;
            const result = doOperation(
                this.selected, 
                this.data, 
                'values',
                this.operation
            );
            this.filteredResult = [...result];
        }
    }


    /**
     * Calls when user selected a list item
     * @param options 
     * @param callback 
     */
    onFilter(options: {key?: string, checked?: boolean}, callback:(key?: boolean) => void){
        this.onSelected(options.key, options.checked, callback)
    }


}