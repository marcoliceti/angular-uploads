exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		'test/e2e/msl-file-input.js'
	],
	multiCapabilities: [
		{ browserName: 'firefox' },
		{ browserName: 'chrome' }
	]
}