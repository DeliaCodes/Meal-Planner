exports.DATABASE_URL = process.env.DATABASE_URL || `mongodb://${process.env.SECRET_DB_USER}:${process.env.SECRET_DB_PS}@ds113849.mlab.com:13849/mplannerdb`;
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-meal-planner';
