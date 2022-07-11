import { FilterGroup } from "../../types/filter";

/**
 * 
 * Add all indexes into obj with count like {1: 1(count) }
 * For OR operation - Take all the indices, so that it filtered
 * For AND operation - Check the count of each indices, if indices matches the selected group index, then take those values
 * Integer indices is in sorted order, so it helps to avoid the additional sorting operation
 * @param result 
 * @param parent 
 * @param dataKey 
 * @param operation 
 * @returns 
 */
export const doOperation = (result: Set<string>, parent: Map<string, FilterGroup>, dataKey: string, operation: 'OR' | 'AND') => {
    let finalResult = {};
    let isEmpty = false;
    const size = result.size;

    result.forEach((key) => {

        if(isEmpty) {
            return;
        }

        const dataSet = parent.get(key)[dataKey];
        
        // Check if data set is empty, then avoid further processing
        if(dataSet.length === 0 && operation == 'AND'){
            isEmpty = true;
            finalResult = {}
            return;
        } 

        finalResult = updateFinalResult(dataSet, finalResult);
    })

    return getResult(finalResult, operation, size);
}

/**
 * return data after OR or AND operation
 * @param {*} finalResult 
 * @param {*} operation 
 * @param {*} size 
 * @returns 
 */
const getResult = (finalResult, operation: 'OR' | 'AND', size: number) => {
    if(operation === 'OR') {
        return Object.keys(finalResult).map(Number);
    } else if (operation === 'AND') {
        let newResult = {};
        
        for(const [key, value] of Object.entries(finalResult)){
            if(value === size){
                newResult[key] = value;
            }
        }
        
        return Object.keys(newResult).map(Number);
    }
}

/**
 * dataset creation for validating OR or AND operation
 * @param {*} dataSet 
 * @param {*} finalResult 
 * @returns 
 */
const updateFinalResult = (dataSet, finalResult: {}) => {
    dataSet.forEach((value) => {
        if(finalResult.hasOwnProperty(value)){
            finalResult[value] += 1;
        } else {
            finalResult[value] = 1;
        }
    })
    return finalResult;
}



