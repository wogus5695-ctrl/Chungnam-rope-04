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
  const sampleUrl = 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('논산시-창틀코킹');
  const imgUrl = 'https://www.cnrainguard.co.kr/images/seo/rainguard-chungnam-search-thumbnail-v2.jpg';
  
  const imgRes = await checkUrl(imgUrl);
  console.log('V2 Image HTTP Status:', imgRes.status, 'Type:', imgRes.headers['content-type'], 'Length:', imgRes.headers['content-length']);

  const htmlRes = await checkUrl(sampleUrl);
  console.log('Sample Page Status:', htmlRes.status);
  const ogMatch = htmlRes.body.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
  console.log('OG Image in HTML:', ogMatch ? ogMatch[1] : 'Not found');
  const hasBodyImg = htmlRes.body.includes('rainguard-chungnam-search-thumbnail-v2.jpg');
  console.log('Body HTML contains V2 image:', hasBodyImg);
}

run();
