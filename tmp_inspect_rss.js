import axios from 'axios';

async function test() {
  try {
    const res = await axios.get('https://news.google.com/rss/search?q=NSE+India+stocks&hl=en-IN&gl=IN&ceid=IN:en');
    const item = res.data.match(/<item>([\s\S]*?)<\/item>/)?.[1];
    console.log("ITEM CONTENT:\n", item);
  } catch (err) {
    console.error(err);
  }
}

test();
