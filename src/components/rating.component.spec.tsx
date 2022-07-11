import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { RatingComponent } from './rating.component';

configure({ adapter: new Adapter })


describe('RatingComponent', () => {
    it('should display the plus when 5+ rating', async () => {
        const rating_component = mount(<RatingComponent rating="5+" />)
        expect(rating_component.find('label').text()).toEqual('plus')
    })

    it('should not display plus when 5 rating', async () => {
        const rating_component = mount(<RatingComponent rating="5" />)
        expect(rating_component.find('label')).toEqual({})
    })

})