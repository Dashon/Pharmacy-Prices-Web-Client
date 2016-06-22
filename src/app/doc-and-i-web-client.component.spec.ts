import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DocAndIWebClientAppComponent } from '../app/doc-and-i-web-client.component';

beforeEachProviders(() => [DocAndIWebClientAppComponent]);

describe('App: DocAndIWebClient', () => {
  it('should create the app',
      inject([DocAndIWebClientAppComponent], (app: DocAndIWebClientAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'doc-and-i-web-client works!\'',
      inject([DocAndIWebClientAppComponent], (app: DocAndIWebClientAppComponent) => {
    expect(app.title).toEqual('doc-and-i-web-client works!');
  }));
});
