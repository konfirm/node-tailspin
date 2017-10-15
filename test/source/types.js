/* global describe, it, expect, source */

const tailspin = source('tailspin');

describe('Tailspin provides a list of types', () => {
	const subject = { foo: { num: 1, bar: { baz: { qux: false } }, arr: [ 1 ] } };
	const tests = [
		{ path: 'foo', expect: [ 'object' ] },
		{ path: 'num', expect: [ 'undefined' ] },
		{ path: 'foo.bar', expect: [
			'object',
			'object',
		] },
		{ path: 'foo.num', expect: [
			'object',
			'number',
		] },
		{ path: 'num.foo', expect: [
			'undefined',
			'undefined',
		] },
		{ path: 'foo.bar.baz', expect: [
			'object',
			'object',
			'object',
		] },
		{ path: 'foo.num.baz', expect: [
			'object',
			'number',
			'undefined',
		] },
		{ path: 'foo.bar.baz.qux', expect: [
			'object',
			'object',
			'object',
			'boolean',
		] },
		{ path: 'foo.num.baz.qux', expect: [
			'object',
			'number',
			'undefined',
			'undefined',
		] },
		{ path: 'foo.arr.0', expect: [
			'object',
			'array',
			'number',
		] },
		{ path: 'foo.arr.0.boo', expect: [
			'object',
			'array',
			'number',
			'undefined',
		] },
		{ path: 'foo.arr.1', expect: [
			'object',
			'array',
			'undefined',
		] },
		{ path: 'foo.arr.1.boo', expect: [
			'object',
			'array',
			'undefined',
			'undefined',
		] },

	];

	tests.forEach((test) => {
		it(`finds types of ${ test.path }`, (next) => {
			const tail = tailspin(subject, test.path);

			expect(tail.types).to.equal(test.expect);

			next();
		});
	});
});
