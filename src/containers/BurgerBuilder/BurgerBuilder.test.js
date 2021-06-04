import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/BuildControls/BuildControls";

Enzyme.configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => wrapper = Enzyme.shallow(<BurgerBuilder setupIngredients={() => {}} />));
  
    it('should render a <BuildControls /> if we have ingredients', () => {  
      wrapper.setProps({ingrs: {salad: 1}, total: 4.00});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});