
const fs = require('fs');
const path = process.argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:
`, err.message);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(path);
