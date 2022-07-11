import { h } from 'preact';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import { CheckboxComponent } from './checkbox.component';

configure({ adapter: new Adapter })


describe('CheckboxComponent', () => {
    it('should display the checkbox correctly', async () => {
        const answer_component = mount(<CheckboxComponent id="answer" name="answer" checked={true}  />)

        expect(answer_component.find('input[type="checkbox"]').is('[name="answer"]')).toBe(true)
        expect(answer_component.find('input[type="checkbox"]').is('[id="answer"]')).toBe(true)
        expect(answer_component.find('input[type="checkbox"]').prop("checked")).toBe(true)
        
    })



})