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

async function inspectHtml(title, url) {
  const res = await checkUrl(url);
  console.log('\n========================================');
  console.log('=== ' + title + ' (' + url + ') ===');
  console.log('Status:', res.status);
  
  const ogImg = (res.body.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/) || [])[1];
  const ogSec = (res.body.match(/<meta[^>]*property="og:image:secure_url"[^>]*content="([^"]+)"/) || [])[1];
  const ogType = (res.body.match(/<meta[^>]*property="og:image:type"[^>]*content="([^"]+)"/) || [])[1];
  const ogW = (res.body.match(/<meta[^>]*property="og:image:width"[^>]*content="([^"]+)"/) || [])[1];
  const ogH = (res.body.match(/<meta[^>]*property="og:image:height"[^>]*content="([^"]+)"/) || [])[1];
  const twImg = (res.body.match(/<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/) || [])[1];
  
  console.log('og:image:', ogImg);
  console.log('og:image:secure_url:', ogSec);
  console.log('og:image:type:', ogType);
  console.log('og:image:width:', ogW);
  console.log('og:image:height:', ogH);
  console.log('twitter:image:', twImg);

  const jsonLdMatches = res.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  console.log('JSON-LD scripts count:', jsonLdMatches.length);
  jsonLdMatches.forEach((m, idx) => {
    const rawJson = m.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const parsed = JSON.parse(rawJson);
      console.log(`JSON-LD [${idx}]:`, JSON.stringify(parsed, null, 2));
    } catch(e) {
      console.log(`JSON-LD [${idx}] raw:`, rawJson.substring(0, 300));
    }
  });

  const imgSrcs = [];
  const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
  let match;
  while ((match = imgRegex.exec(res.body)) !== null) {
    imgSrcs.push(match[1]);
  }
  console.log('Body img srcs (first 5):', imgSrcs.slice(0, 5));
}

async function run() {
  const urls = [
    ['Main', 'https://www.cnrainguard.co.kr/'],
    ['Nonsan Coking', 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('논산시-창틀코킹')],
    ['Cheonan Roof', 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('천안시-옥상방수')],
    ['Asan Outer', 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('아산시-외벽방수')],
    ['Dangjin Roof', 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('당진시-지붕방수')],
    ['Seosan Urethane', 'https://www.cnrainguard.co.kr/?k=' + encodeURIComponent('서산시-우레탄방수')]
  ];

  for (const [title, url] of urls) {
    await inspectHtml(title, url);
  }
}

run();
