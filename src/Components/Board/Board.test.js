import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Board from './Board';
 
Enzyme.configure({ adapter: new Adapter() });

describe('<Board />', () => {
  test('renders', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper).toMatchSnapshot();
  });
});
