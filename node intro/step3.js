
const fs = require('fs');
const axios = require('axios');
const args = process.argv.slice(2);

function cat(path, outPath = null) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:
`, err.message);
            process.exit(1);
        } else {
            output(data, outPath);
        }
    });
}

function webCat(url, outPath = null) {
    axios.get(url)
        .then(response => {
            output(response.data, outPath);
        })
        .catch(err => {
            console.error(`Error fetching ${url}:
`, err.message);
            process.exit(1);
        });
}

function output(data, outPath) {
    if (outPath) {
        fs.writeFile(outPath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outPath}:
`, err.message);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

let outIndex = args.indexOf('--out');
let outPath = null;
if (outIndex !== -1) {
    outPath = args[outIndex + 1];
    args.splice(outIndex, 2);
}

let inputPath = args[0];
if (inputPath.startsWith('http')) {
    webCat(inputPath, outPath);
} else {
    cat(inputPath, outPath);
}
