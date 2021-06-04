import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

Enzyme.configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => wrapper = Enzyme.shallow(<NavigationItems />));

  it('should render only 2 <NavigationItem /> if not authenticated', () => {  
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render only 3 <NavigationItem /> if authenticated', () => {
    // wrapper = Enzyme.shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('Log out <NavigationItem /> was render if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(
      <NavigationItem exact link='/logout'>Log out</NavigationItem>
    )).toEqual(true);
  });

});



/* describe('<NavigationItems /> Authenticated', () => {
  
}); */