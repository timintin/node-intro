
const fs = require('fs');
const axios = require('axios');
const arg = process.argv[2];

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

function webCat(url) {
    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(`Error fetching ${url}:
`, err.message);
            process.exit(1);
        });
}

if (arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(arg);
}
