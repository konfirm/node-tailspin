/* global describe, it, expect, source */

const tailspin = source('tailspin');

describe('Tailspin provides the key name within the last scope', () => {
	const subject = { foo: { num: 1, bar: { baz: { qux: false } }, arr: [ 1 ] } };
	const tests = [
		{ path: 'foo', expect: 'foo' },
		{ path: 'num', expect: 'num' },
		{ path: 'foo.bar', expect: 'bar' },
		{ path: 'foo.num', expect: 'num' },
		{ path: 'num.foo', expect: 'foo' },
		{ path: 'foo.bar.baz', expect: 'baz' },
		{ path: 'foo.num.baz', expect: 'baz' },
		{ path: 'foo.bar.baz.qux', expect: 'qux' },
		{ path: 'foo.num.baz.qux', expect: 'qux' },
		{ path: 'foo.arr.0', expect: '0' },
		{ path: 'foo.arr.0.boo', expect: 'boo' },
		{ path: 'foo.arr.1', expect: '1' },
		{ path: 'foo.arr.1.boo', expect: 'boo' },
	];

	tests.forEach((test) => {
		it(`finds key of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.key).to.equal(test.expect);

			next();
		});
	});
});
