//  mapped storage, providing internal (private) members
const storage = new WeakMap();

/**
 *  Accessor object to refer to specific path within an object
 *  Testing reachability, determine its value, scope and type
 *
 *  @class   Tail
 *  @author  Rogier Spieker <rogier+npm@konfirm.io>
 */
class Tail {
	/**
	 *  Creates an instance of Tail.
	 *
	 *  @param     {any}  scope
	 *  @param     {any}  [key=null]
	 *  @memberof  Tail
	 */
	constructor(scope, key = null) {
		storage.set(this, { scope, key });
	}

	/**
	 *  Obtain the scope Tail
	 *
	 *  @readonly
	 *  @memberof  Tail
	 *  @return    {Tail}  scope
	 */
	get scope() {
		return storage.get(this).scope;
	}

	/**
	 *  Obtain the current value of the Tail
	 *
	 *  @readonly
	 *  @memberof  Tail
	 *  @return    {*}  value
	 */
	get value() {
		const { scope, key } = storage.get(this);
		const target = scope.value;

		//  eslint-disable-next-line no-undefined
		return typeof target === 'object' && key in target ? target[key] : undefined;
	}

	/**
	 *  Modify the value of the tail
	 *
	 * @param    {any}      value
	 * @param    {Boolean}  [force=false]
	 * @return   {Boolean}  success
	 * @memberof Tail
	 */
	modify(value, force = false) {
		const { scope, key } = storage.get(this);

		if (this.reachable || force) {
			if (scope.type === 'array' && /^-?[0-9]*\.?[0-9]+$/.test(key)) {
				scope.value[key] = {};
			}
			else if (scope.type !== 'object') {
				scope.modify({});
			}

			scope.value[key] = value;

			return true;
		}

		return false;
	}

	/**
	 *  Obtain the type of the tail value
	 *
	 *  @readonly
	 *  @memberof Tail
	 *  @return   {String}  type
	 */
	get type() {
		const type = typeof this.value;

		if (type === 'object' && Array.isArray(this.value)) {
			return 'array';
		}

		return type;
	}

	/**
	 *  Obtain the list of types for the constructed tail
	 *
	 *  @readonly
	 *  @memberof  Tail
	 *  @return    {Array}  types
	 */
	get types() {
		const { scope, key } = storage.get(this);

		return key ? scope.types.concat(this.type) : [];
	}

	/**
	 *  Determine whether or not the variable is reachable to update
	 *  or create
	 *
	 *  @readonly
	 *  @memberof  Tail
	 *  @return    {Boolean}  reachable
	 */
	get reachable() {
		const types = /object|array|undefined/;

		return this.types.reduce((prev, type, index, all) => prev && (types.test(type) || index + 1 === all.length), true);
	}
}

module.exports = Tail;
