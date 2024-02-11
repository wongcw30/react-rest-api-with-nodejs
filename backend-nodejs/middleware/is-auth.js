const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		const error = new Error('Unable to authenticate');
		error.statusCode = 401;
		throw error;
	}

	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, '398c2088-3d6c-465b-8048-ade8b5def0a2');
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}

	if (!decodedToken) {
		const error = new Error('Unable to authenticate');
		error.statusCode = 401;
		throw error;
	}

	req.userId = decodedToken.userId;
	next();
};
