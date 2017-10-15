/* global describe, it, expect, source */

const tailspin = source('tailspin');
//  eslint-disable-next-line no-undefined
const und = undefined;

describe('Tailspin modifies values', () => {
	it('modifies foo.bar.baz.qux', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.bar.baz.qux');

		expect(tail.value).to.equal(false);
		expect(tail.modify(Infinity)).to.equal(true);
		expect(tail.value).to.equal(Infinity);

		next();
	});

	it('modifies foo.bar.baz', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.bar.baz');

		expect(tail.value).to.equal({ qux: false });
		expect(tail.modify('hello world')).to.equal(true);
		expect(tail.value).to.equal('hello world');

		next();
	});

	it('modifies foo.num', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.num');

		expect(tail.value).to.equal(1);
		expect(tail.modify(2)).to.equal(true);
		expect(tail.value).to.equal(2);

		next();
	});

	it('does not modify foo.num.boo without being forced', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.num.boo');

		expect(tail.value).to.equal(und);
		expect(tail.modify('test')).to.equal(false);
		expect(tail.value).to.equal(und);

		next();
	});

	it('does modify foo.num.boo when being forced', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.num.boo');

		expect(tail.value).to.equal(und);
		expect(tail.modify('test', true)).to.equal(true);
		expect(tail.value).to.equal('test');

		next();
	});

	it('creates a deep nested path if needed', (next) => {
		const subject = {};
		const tail = tailspin(subject, 'aa.bb.cc');

		expect(tail.value).to.equal(und);
		expect(subject).to.equal({});
		expect(tail.modify('hello world')).to.equal(true);
		expect(subject).to.equal({ aa: { bb: { cc: 'hello world' } } });
		expect(tail.value).to.equal('hello world');

		next();
	});
});

