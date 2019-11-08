module.exports = {
    DB: process.env.DB_URL || "mongodb://127.0.0.1:27017/todo",
    PORT: process.env.PORT || 3000
};
