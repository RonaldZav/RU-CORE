const fs = require('fs');
const path = require('path');

module.exports = class Storage {
    static write(guild, module, data = "") {
        try {
            let db = this.read(guild, module);
            if (!db.success) {
                db = {};
            } else {
                db = db.data;
            }

            db[guild] = data;

            fs.writeFileSync(path.resolve(__dirname, `../../storage/${module}.json`), JSON.stringify(db, null, 2));
            return { success: true, data: data };

        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static read(guild, module) {
        try {
            const filePath = path.resolve(__dirname, `../../storage/${module}.json`);
            if (!fs.existsSync(filePath)) {
                return { success: true, data: {} };
            }

            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            return jsonData[guild];

        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};
