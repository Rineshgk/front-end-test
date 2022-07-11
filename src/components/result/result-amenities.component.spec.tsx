import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { ResultAmenitiesComponent } from './result-amenities.component';

configure({ adapter: new Adapter })

const data: string[] = ['Restaurant', 'Bar', 'Spa']

describe('ResultAmenitiesComponent', () => {
    it('should display the result amenitites component correctly', async () => {
        const amenities_component = mount(<ResultAmenitiesComponent data={data}  />)

        expect(amenities_component.find('li').length).toEqual(3)
    })



})