const Tail = require('./tail');

/**
 *  Root component for the creation of a full tail
 *
 *  @class    Root
 *  @extends  {Tail}
 *  @author   Rogier Spieker <rogier+npm@konfirm.io>
 */
class Root extends Tail {
	/**
	 *  Obtain the root value
	 *
	 *  @readonly
	 *  @memberof  Root
	 *  @return    {*} value
	 */
	get value() {
		return this.scope;
	}
}

module.exports = Root;
