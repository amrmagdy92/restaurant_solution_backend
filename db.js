module.exports = process.env.NODE_ENV === 'development' ? 
                'mongodb://localhost:27017/restaurant-database-dev' : 
                'mongodb://localhost:27017/restaurant-database-prod';