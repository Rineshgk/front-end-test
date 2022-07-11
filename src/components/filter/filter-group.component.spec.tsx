import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import type { GroupDetails } from '../../types/filter';
import { FilterGroupComponent } from './filter-group.component';

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


describe('FilterGroupComponent', () => {
    it('should display the filter group component correctly', async () => {
        const filter_group_component = mount(<FilterGroupComponent filterDetails={groupDetails} handleChange={() => {}}  />)

        expect(filter_group_component.find('h4').text()).toBe('Facility')
        expect(filter_group_component.text()).toContain('Restaurant(23)')
        expect(filter_group_component.find('input[type="checkbox"]').prop("checked")).toBe(true)
    
    })



})