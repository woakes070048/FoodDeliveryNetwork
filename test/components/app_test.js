import {
  renderComponent,
  expect
} from '../testHelper';
import App from '../../src/app/components/app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component)
      .to.exist;
  });
});
