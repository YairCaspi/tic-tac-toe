import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell from './Cell';

Enzyme.configure({ adapter: new Adapter() });

describe('<Cell />', () => {
  test('renders', () => {
    const wrapper = shallow(<Cell />);
    expect(wrapper).toMatchSnapshot();
  });
});
