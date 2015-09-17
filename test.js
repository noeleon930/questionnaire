var promiseCount = 0;

function testPromise() {

	var thisPromiseCount = ++promiseCount;

	console.log(thisPromiseCount, 'started, Sync code started!');

	var p1 = new Promise(
		// The resolver function is called with the ability to resolve or
		// reject the promise
		(resolve, reject) => {

			console.log(thisPromiseCount, 'started, Async code started!');

			// This only is an example to create asynchronism
			setTimeout(
				() => {
					// We fulfill the promise !
					resolve(thisPromiseCount);
				}, 3000);
		});

	p1
		.then(
			// Just log the message and a value
			(val) => {
				console.log(val + ' Promise fulfilled, Async code terminated');
				return val;
			})
		.then((val) => {
			console.log(val, val * 10);
		})
		.catch(
			// Rejected promises are passed on by Promise.prototype.then(onFulfilled)
			(reason) => {
				console.error('Handle rejected promise (' + reason + ') here.');
			});

	console.log(thisPromiseCount, 'Promise made, Sync code terminated!');
}

function* nextPromise() {
	var i = 0;
	while (i < 100000)
		yield testPromise();
}


var gen = nextPromise();

for (var i = 0; i < 100000; i++) {
	gen.next();
}
