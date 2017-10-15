function patch(target) {
	return (key) => {
		global[key] = target[key];

		return () => (global[key] === target[key]) && delete global[key];
	};
}

function storage(data) {
	return (key, value) => {
		if (typeof value !== 'undefined') {
			data[key] = value;
		}

		return key in data ? data[key] : null;
	};
}

function source(file) {
	//  eslint-disable-next-line global-require
	return require(`${ __dirname }/../source/${ file }`);
}

const code = require('code');
const lab = require('lab').script();
const monkey = []
	.concat([ 'it', 'describe', 'before', 'beforeEach', 'after', 'afterEach' ].map(patch(lab)))
	.concat([ 'expect' ].map(patch(code)))
	.concat([ 'storage', 'source' ].map(patch({ storage: storage({}), source })));

lab.after((done) => {
	monkey.forEach((clean) => clean());

	done();
});

module.exports = Object.assign({ lab });
