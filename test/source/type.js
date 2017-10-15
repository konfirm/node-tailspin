/* global describe, it, expect, source */

const tailspin = source('tailspin');

describe('Tailspin provides a list of types', () => {
	const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
	const tests = [
		{ path: 'foo', expect: 'object' },
		{ path: 'num', expect: 'undefined' },
		{ path: 'foo.bar', expect: 'object' },
		{ path: 'foo.num', expect: 'number' },
		{ path: 'num.foo', expect: 'undefined' },
		{ path: 'foo.bar.baz', expect: 'object' },
		{ path: 'foo.num.baz', expect: 'undefined' },
		{ path: 'foo.bar.baz.qux', expect: 'boolean' },
		{ path: 'foo.num.baz.qux', expect: 'undefined' },
	];

	tests.forEach((test) => {
		it(`finds type of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.type).to.equal(test.expect);

			next();
		});
	});
});
