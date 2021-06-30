import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/BuildControls/BuildControls";
import configureStore from "redux-mock-store";
import * as redux from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  let store;

  beforeEach(() => {

    store = configureStore()({
      ings: {
        ingredients: { salad: 1 },
        totalPrice: 4,
        error: null,
        building: false,
        authRedirectPath: '/'
      },
      orders: {
        error: null,
        orders: [],
        loading: false,
        purchasing: false
      },
      auth: {
        authenticating: false,
        token: '123123213',
        userId: null,
        error: null
      }
    });

    jest
      .spyOn(redux, "useSelector")
      .mockImplementation(f => f(store.getState()));

    jest
      .spyOn(redux, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = Enzyme.shallow(<BurgerBuilder store={store} />)
  });

  it('should render a <BuildControls /> if we have ingredients', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});