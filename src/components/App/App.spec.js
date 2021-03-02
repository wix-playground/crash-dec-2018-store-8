import React from 'react';
import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from '../../../test/helpers/i18n.mock';
import translation from '../../locales/messages_en';
import i18next from 'i18next';
import { ExperimentsProvider } from '@wix/wix-experiments-react';


// jest.mock('../../apiServices');

// const appDriver = () => {
//   let wrapper;
//   return {
//     render: () => {
//       wrapper = mount(
//         <I18nextProvider i18n={i18n}>
//           <App />
//         </I18nextProvider>,
//       );
//     },
//     unmount: () => wrapper.unmount(),
//   };
// };

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
  };
};

const i18nData = {
  lng: 'en',
  keySeparator: '$',
  resources: {
    en: {translation}
  }
};

describe('App', () => {
  let driver;

  beforeEach(() => {
    driver = appDriver();
  });
  afterEach(() => driver.teardown());

  it('renders a product list', () => {
    driver.render(
      <I18nextProvider i18n={i18next.init(i18nData)}>
        <ExperimentsProvider options={{experiments: experiment}}>
          <App/>
        </ExperimentsProvider>
      </I18nextProvider>
    );

    expect(driver.getMountedComponent()).toBe(true);
  });
});
