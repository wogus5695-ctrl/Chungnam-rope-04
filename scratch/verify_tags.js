const http = require('https');

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    http.get(urlStr, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', err => resolve({ error: err }));
  });
}

async function run() {
  const sampleUrl = 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('금산군-샷시실리콘');
  const res = await checkUrl(sampleUrl);
  console.log('Geumsan Page Status:', res.status);
  console.log('Contains link rel image_src:', res.body.includes('link rel="image_src"'));
  console.log('Contains top static img:', res.body.includes('sr-only pointer-events-none'));
}

run();
