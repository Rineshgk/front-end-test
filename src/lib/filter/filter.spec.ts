/**
 * Testing core features like
 * - Load data
 * - Adding group
 * - OR operation
 * - AND operation
 * - Filtered result
 * - Reset
 * This tests ListGroup, Filter, doOperation
 */


import {Filter} from './filter';
import ListGroup from './filter-list-group';

const data = [
    { facility: 'Restaurant' },
    { facility: 'Spa' },
]
const mapData = () => {
    return [0, 1]
}

const facilitygroup = new ListGroup();
facilitygroup.setOperation('AND');
facilitygroup.setDataOnKey('Restaurant', 0);
facilitygroup.setDataOnKey('Spa', 1);

const ratingGroup = new ListGroup();
ratingGroup.setOperation('OR');
ratingGroup.setDataOnKey('5+', 0);
ratingGroup.setDataOnKey('5', 1);

const filter = new Filter();
filter.setData(() => mapData())
filter.addGroup('facility', facilitygroup);
filter.addGroup('rating', ratingGroup);

describe('Filter', () => {

    beforeEach(() => {
        filter.reset();
    })

    it('Should display count of 2 for filtered index', async () => {
        const filterDetails = filter.getInitialFilterDetails(); 
        expect(filterDetails.filteredIndex).toHaveLength(2);
        expect(filterDetails.filteredIndexByBit).toEqual([1, 1])
    })

    it('Should display count of 1 for 5+ rating', async () => {
        const filteredDetails = filter.onFilter('rating', {key:'5+', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(1);
        expect(filteredDetails.filteredIndex).toEqual([0])
    })

    it('Should display count of 1 for SPA facility', async () => {
        const filteredDetails = filter.onFilter('facility', {key:'Spa', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(1);
        expect(filteredDetails.filteredIndex).toEqual([1])
    })

    it('Should display count of 1 for SPA facility and 5 star rating', async () => {
        filter.onFilter('rating', {key:'5', checked: true});
        const filteredDetails = filter.onFilter('facility', {key:'Spa', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(1);
        expect(filteredDetails.filteredIndex).toEqual([1])
    })

    it('Should display count of 0 for SPA facility and 5+ star rating', async () => {
        filter.onFilter('rating', {key:'5+', checked: true});
        const filteredDetails = filter.onFilter('facility', {key:'Spa', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(0);
        expect(filteredDetails.filteredIndex).toEqual([])
    })

    it('Should display count of 2 for 5 or 5+ star rating', async () => {
        filter.onFilter('rating', {key:'5+', checked: true});
        const filteredDetails = filter.onFilter('rating', {key:'5', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(2);
        expect(filteredDetails.filteredIndex).toEqual([0,1])
    })

    it('Should display count of 0 for Restaurant and SPA facility', async () => {
        filter.onFilter('facility', {key:'Restaurant', checked: true});
        const filteredDetails = filter.onFilter('facility', {key:'Spa', checked: true});
        expect(filteredDetails.filteredIndex).toHaveLength(0);
        expect(filteredDetails.filteredIndex).toEqual([])
    })

})