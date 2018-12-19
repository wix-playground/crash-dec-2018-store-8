import React from 'react';
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from '../../../test/helpers/i18n.mock';

// jest.mock('../../apiServices');

const appDriver = () => {
  let wrapper;
  return {
    render: () => {
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>,
      );
    },
    unmount: () => wrapper.unmount(),
  };
};

describe('App', () => {
  let driver;
  beforeEach(() => {
    driver = appDriver();
  });
  afterEach(() => driver.unmount());

  it('renders a title correctly', () => {
    driver.render();

    // expect(wrapper.find('h2')).toHaveLength(1);
  });
});
