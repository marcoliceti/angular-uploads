describe('Directive msl-file-input', function() {
	var path = require('path');

	beforeEach(function() {
    browser.get('http://localhost:8080/demo/msl-file-input/');
  });

	it('should append a hidden file input to the given container', function() {
		var button = element(by.css('button'));
		var hidden_input = button.element(by.css('input'));

		expect(button.getText()).toEqual('Select files');
		expect(hidden_input.isDisplayed()).toEqual(false);
		expect(button.getAttribute('multiple')).toBeNull();
		expect(hidden_input.getAttribute('multiple')).not.toBeNull();
	});

	it('should allow file selection', function() {
		var button = element(by.css('button'));
		var hidden_input = button.element(by.css('input'));
		var files_list = element(by.css('ul'));
		var files = files_list.all(by.css('li'));

		expect(files_list.isPresent()).toEqual(true);
		expect(files.count()).toEqual(0);

		var a_file = path.resolve(__dirname, '../../demo/msl-file-input/index.html');
		browser.driver.executeScript(function () {
			document.getElementsByTagName('input')[0].style.display = 'inline';
		});
		hidden_input.sendKeys(a_file);
		expect(files.count()).toEqual(1);
		expect(files.first().getText()).toEqual('index.html');
	});

});