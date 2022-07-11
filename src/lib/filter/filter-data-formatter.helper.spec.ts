/**
 * 
 * Map data to Filter
 * 
 * 
 */


 import {Filter} from './filter';
 import {data} from '../../__mocks__/holiday';
 import {mapDataToFilter} from './filter-data-formatter.helper';
 
 const filter = new Filter();
 const mappedData = mapDataToFilter(filter, data);
 
 describe('FilterDataFormatter', () => {
 
     beforeEach(() => {
         filter.reset();
     })
 
     it('Should display count of 2 ', async () => {
         expect(mappedData).toHaveLength(2);
     })

     it('Should list 3 groups ', async () => {
        const filterResult = filter.getFilterResult();
        expect(filterResult.filterDetails).toHaveLength(3);
     })

     it('Should list one pricing range ', async () => {
        const filterResult = filter.getFilterResult();
        expect(filterResult.filterDetails[1].groupDetails).toHaveLength(1);
     })

 
 })