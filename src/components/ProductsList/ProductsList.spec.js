import React from 'react';
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import ProductsList from './ProductsList';
import i18n from '../../../test/helpers/i18n.mock';
import translation from '../../locales/messages_en';
import i18next from 'i18next';
import { ExperimentsProvider } from 'wix-experiments-react';

jest.mock('../../apiServices', () => require('../../mock.apiServices'));
const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

const experiment = {"specs.crash-course.IsAddButtonEnabled":"true"}

const appDriver = () => {
  let wrapper;

  return {
    render: node => {
      wrapper = mount(node,
        {attachTo: document.createElement('div')}
      );
      return wrapper;
    },
    teardown: () => wrapper.detach(),
    getMountedComponent: () => wrapper.exists(),
    getProductsListEl: () => wrapper.find('[data-hook="products-list"]'),
    getProductName: () => wrapper.find('[data-hook="products-list"] td').at(0).text(),

  };
};

describe('ProductsList', () => {
  let driver;

  beforeEach(() => {
    driver = appDriver();
    driver.render(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <ExperimentsProvider options={{experiments: experiment}}>
          <ProductsList />
        </ExperimentsProvider>
      </I18nextProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    driver.teardown();
  });

  it('renders a ProductsList', () => {
    expect(driver.getMountedComponent()).toBe(true);
  });

  it('renders all products list table with specific data', async () => {
    await new Promise(res => setTimeout(res, 1000));
    expect(driver.getProductsListEl()).toHaveLength(1);
    expect(driver.getProductName()).toEqual('ProductTest');
  });
});
