import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { Holiday } from '../../types/booking';
import { ResultCardComponent } from './result-card.component';
import  { data }  from '../../__mocks__/holiday';
configure({ adapter: new Adapter })

const testData: Holiday =  data[0];

describe('ResultCardComponent', () => {
    it('should display the result card component correctly', async () => {
        const result_card_component = mount(<ResultCardComponent data={testData}  />)

        expect(result_card_component.find('h2').text()).toEqual('Disney\'s Grand Floridian Resort & Spa')
    })
})