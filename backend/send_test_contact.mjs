import http from 'http';
import querystring from 'querystring';

const params = {
  firstName: 'Krishan',
  lastName: 'Malinda',
  email: 'gkmalinda@std.foc.sab.ac.lk',
  phone: '0703904450',
  message: 'Test this content via send_test_contact'
};

const query = querystring.stringify(params);
const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/send-contact?' + query,
  method: 'GET'
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', error => {
  console.error('Request error:', error);
  process.exit(1);
});

req.end();
