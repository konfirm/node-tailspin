/* global describe, it, expect, source */

const tailspin = source('tailspin');
//  eslint-disable-next-line no-undefined
const und = undefined;

describe('Tailspin gets values', () => {
	const subject = {
		foo: {
			num: 1,
			bar: { baz: { qux: false } },
			arr: [ { aa: { bb: 1 } } ],
			not: null,
		},
	};
	const tests = [
		{ path: 'foo', expect: subject.foo },
		{ path: 'num', expect: und },
		{ path: 'foo.bar', expect: subject.foo.bar },
		{ path: 'foo.num', expect: subject.foo.num },
		{ path: 'foo.bar.baz', expect: subject.foo.bar.baz },
		{ path: 'foo.num.baz', expect: und },
		{ path: 'foo.bar.baz.qux', expect: subject.foo.bar.baz.qux },
		{ path: 'foo.num.baz.qux', expect: und },
		{ path: 'foo.arr.0.aa', expect: subject.foo.arr[0].aa },
		{ path: 'foo.arr.1.aa', expect: und },
		{ path: 'foo.not', expect: null },
	];

	tests.forEach((test) => {
		it(`finds value of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.value).to.equal(test.expect);

			next();
		});
	});
});

