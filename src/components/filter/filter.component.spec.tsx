import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { FilterComponent } from './filter.component';
import { GroupDetails } from '../../types/filter';

configure({ adapter: new Adapter })

const groupDetails: GroupDetails[] = [{
    groupName: 'facility',
    groupDetails: [{
        name: 'Restaurant',
        filteredCount: 23,
        count: 34,
        selected: true
    }]
}]

describe('FilterComponent', () => {
    it('should display the filter component correctly', async () => {
        const filter_component = mount(<FilterComponent filterDetails={groupDetails} resetFilter={() => {}} handleChange={() => {}}  />)
        expect(filter_component.find('h3').text()).toEqual("Filter By...");
    })
})