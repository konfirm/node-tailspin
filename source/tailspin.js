const Tail = require('./tail');
const Root = require('./root');

/**
 *  Tailspin creator
 *
 *  @param  {any}     target
 *  @param  {String}  path
 *  @param  {Tail}    instance
 */
module.exports = function tailspin(target, path) {
	return path.split('.')
		.reduce((carry, key) => new Tail(carry, key), new Root(target));
};
