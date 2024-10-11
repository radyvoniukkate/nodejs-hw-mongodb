
const fs = require('node:fs');
const path = require('path');


const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH));


module.exports = swaggerDoc