/* global describe, it, expect, source */

const tailspin = source('tailspin');

describe('Tailspin checks path reachability', () => {
	const subject = {
		foo: { num: 1, bar: { baz: { qux: false } } },
		arr: [ {}, { a: 1 }, [ 1, 2, [] ] ],
	};
	const tests = [
		{ path: 'foo', expect: true },
		{ path: 'num', expect: true },
		{ path: 'foo.bar', expect: true },
		{ path: 'foo.num', expect: true },
		{ path: 'foo.bar.baz', expect: true },
		{ path: 'foo.num.baz', expect: false },
		{ path: 'foo.bar.baz.qux', expect: true },
		{ path: 'foo.num.baz.qux', expect: false },

		{ path: 'arr.foo', expect: false },
		{ path: 'arr.0', expect: true },
		{ path: 'arr.0.a', expect: true },
		{ path: 'arr.0.b', expect: true },
		{ path: 'arr.1', expect: true },
		{ path: 'arr.1.a', expect: true },
		{ path: 'arr.1.b', expect: true },
		{ path: 'arr.2', expect: true },
		{ path: 'arr.2.a', expect: false },
		{ path: 'arr.2.0', expect: true },
		{ path: 'arr.2.0.key', expect: false },
		{ path: 'arr.2.1', expect: true },
		{ path: 'arr.2.1.key', expect: false },
		{ path: 'arr.2.2', expect: true },
		{ path: 'arr.2.2.key', expect: false },
		{ path: 'arr.2.2.0', expect: true },
	];

	tests.forEach((test) => {
		it(`finds reachability of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.reachable).to.equal(test.expect);

			next();
		});
	});
});
