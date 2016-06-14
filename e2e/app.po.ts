export class DocAndIWebClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('doc-and-i-web-client-app h1')).getText();
  }
}
