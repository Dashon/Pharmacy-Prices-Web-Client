import { DocAndIWebClientPage } from './app.po';

describe('doc-and-i-web-client App', function() {
  let page: DocAndIWebClientPage;

  beforeEach(() => {
    page = new DocAndIWebClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('doc-and-i-web-client works!');
  });
});
