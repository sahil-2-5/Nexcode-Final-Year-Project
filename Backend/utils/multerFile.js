const multer = require("multer");

const upload = multer({
    storage:multer.memoryStorage()
}).single('image');

module.exports = upload ;