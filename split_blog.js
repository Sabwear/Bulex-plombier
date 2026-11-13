const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'blog-posts.json');
const outDir = path.join(__dirname, 'data', 'blog');

let raw;
try {
  raw = fs.readFileSync(dataPath, 'utf-8');
} catch (err) {
  console.error('No blog-posts.json found, skipping.');
  process.exit(0);
}

const posts = JSON.parse(raw);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

posts.forEach(post => {
  const postPath = path.join(outDir, `${post.slug}.json`);
  fs.writeFileSync(postPath, JSON.stringify(post, null, 2));
  console.log(`Created ${postPath}`);
});

fs.unlinkSync(dataPath);
console.log('Removed original blog-posts.json');
