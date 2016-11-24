import { DocAndIPage } from './app.po';

describe('doc-and-i App', function() {
  let page: DocAndIPage;

  beforeEach(() => {
    page = new DocAndIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
