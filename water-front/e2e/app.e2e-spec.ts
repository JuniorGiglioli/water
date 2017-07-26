import { WaterFrontPage } from './app.po';

describe('water-front App', () => {
  let page: WaterFrontPage;

  beforeEach(() => {
    page = new WaterFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
