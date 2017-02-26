import { NodejsAppPage } from './app.po';

describe('nodejs-app App', () => {
  let page: NodejsAppPage;

  beforeEach(() => {
    page = new NodejsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
