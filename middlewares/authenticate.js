const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica o token e decodifica
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adiciona o ID do usuário no objeto req
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
