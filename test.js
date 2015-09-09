var x = in$('1', [1, 2, 3, 4, 5, 6, 7, 8]);

function in$(x, xs) {
	var i = -1,
		l = xs.length >>> 0;
	while (++i < l)
		if (x === xs[i]) return true;
	return false;
}

console.log(x);
