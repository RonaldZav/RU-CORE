const fs = require('fs');
const yaml = require('js-yaml');
const { log } = require("../utils/logger");

module.exports = class ymlToJson {
	static readYML (path) {
        try {  
            const contenidoYAML = fs.readFileSync(path, 'utf8');
            const datosJSON = yaml.load(contenidoYAML);
            return datosJSON;

        } catch (error) { 
            log(`Error reading data from ${path}:`, "error"); console.log(error); }

	}
};