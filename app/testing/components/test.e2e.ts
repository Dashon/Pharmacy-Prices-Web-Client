describe('Test', function() {

  beforeEach(function() {
    browser.get('test');
  });

  it('should have correct feature heading', function() {
      expect(element(by.css('app test h2')).getText())
      .toEqual('Features');
  });
});
