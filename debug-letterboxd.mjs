
import https from 'https';

const url = "https://www.goodreads.com/review/list_rss/9832371?key=NiGdczsTdllwXApQtXWgtYcYJQm2zi-PUMmv8iz7FwI-OpbO&shelf=read";

console.log(`Fetching ${url}...`);

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
  }
}, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Body length:', data.length);
    console.log('Preview:', data.substring(0, 500));
  });
}).on('error', (e) => {
  console.error('Error:', e);
});

