import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { CarouselComponent } from './carousel.component';
import { HotelImage } from '../types/booking';

configure({ adapter: new Adapter })

const image: HotelImage[] = [{
    RESULTS_CAROUSEL: {
        url: ''
    } 
},{
    RESULTS_CAROUSEL: {
        url: ''
    } 
}]

describe('CarouselComponent', () => {
    it('should display the carousel correctly', async () => {
        const carousel_component = mount(<CarouselComponent images={image}  />)

        expect(carousel_component.find('img')).toHaveLength(2)
        expect(carousel_component.text('1 of 2')).toBeTruthy()
        
    })



})