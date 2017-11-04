/* global describe, it, expect, source */

const tailspin = source('tailspin');
//  eslint-disable-next-line no-undefined
const und = undefined;

describe('Tailspin modifies values', () => {
	it('modifies (bool) foo.bar.baz.qux', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.bar.baz.qux');

		expect(tail.value).to.equal(false);
		expect(tail.modify(Infinity)).to.equal(true);
		expect(tail.value).to.equal(Infinity);

		next();
	});

	it('modifies (object) foo.bar.baz', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.bar.baz');

		expect(tail.value).to.equal({ qux: false });
		expect(tail.modify('hello world')).to.equal(true);
		expect(tail.value).to.equal('hello world');

		next();
	});

	it('modifies (number) foo.num', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.num');

		expect(tail.value).to.equal(1);
		expect(tail.modify(2)).to.equal(true);
		expect(tail.value).to.equal(2);

		next();
	});

	it('does not modify (unreachable) foo.num.boo without being forced', (next) => {
		const subject = { foo: { num: 1, bar: { baz: { qux: false } } } };
		const tail = tailspin(subject, 'foo.num.boo');

		expect(tail.value).to.equal(und);
		expect(tail.modify('test')).to.equal(false);
		expect(tail.value).to.equal(und);

		next();
	});

	it('does modify (unreachable) foo.num.boo when being forced', (next) => {
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

	it('can change existing array items', (next) => {
		const subject = { foo: { arr: [ { aa: { bb: 1 } } ] } };
		const tail = tailspin(subject, 'foo.arr.0.aa.bb');

		expect(tail.value).to.equal(1);
		expect(tail.modify(2)).to.equal(true);
		expect(tail.value).to.equal(2);

		next();
	});

	it('can add array items', (next) => {
		const subject = { foo: { arr: [ { aa: { bb: 1 } } ] } };
		const tail = tailspin(subject, 'foo.arr.1.cc.dd');

		expect(tail.value).to.equal(und);
		expect(tail.modify(2)).to.equal(true);
		expect(tail.value).to.equal(2);
		expect(subject.foo.arr[1]).to.equal({ cc: { dd: 2 } });
		expect(subject).to.equal({ foo: { arr: [ { aa: { bb: 1 } }, { cc: { dd: 2 } } ] } });

		next();
	});

	it('cannot add non-numerical keys to arrays itself', (next) => {
		const subject = { foo: { arr: [ 1, 2 ] } };
		const tail = tailspin(subject, 'foo.arr.bar');

		expect(tail.value).to.equal(und);
		expect(tail.modify('baz')).to.equal(false);
		expect(tail.value).to.equal(und);

		next();
	});

	it('treats null as object', (next) => {
		const subject = { foo: null };
		const tail = tailspin(subject, 'foo.bar.baz');

		expect(tail.value).to.equal(und);
		expect(tail.modify('qux')).to.equal(true);
		expect(tail.value).to.equal('qux');

		next();
	});
});

