import { AnimeListerPage } from './app.po';

describe('anime-lister App', () => {
  let page: AnimeListerPage;

  beforeEach(() => {
    page = new AnimeListerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
