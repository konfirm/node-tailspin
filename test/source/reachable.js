/* global describe, it, expect, source */

const tailspin = source('tailspin');

describe('Tailspin checks path reachability', () => {
	const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
	const tests = [
		{ path: 'foo', expect: true },
		{ path: 'num', expect: true },
		{ path: 'foo.bar', expect: true },
		{ path: 'foo.num', expect: true },
		{ path: 'foo.bar.baz', expect: true },
		{ path: 'foo.num.baz', expect: false },
		{ path: 'foo.bar.baz.qux', expect: true },
		{ path: 'foo.num.baz.qux', expect: false },
	];

	tests.forEach((test) => {
		it(`finds reachability of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.reachable).to.equal(test.expect);

			next();
		});
	});
});
