import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../lib/db/connect'
import User from '../lib/db/models/User'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    await connectDB()

    // 1. Authenticate user
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const segment = user.segment || 'urban'
    const pincode = user.pincode || '110001'

    let feedData: any = { segment }

    // 2. Fetch News based on Segment
    let news: any[] = []
    try {
      const query = segment === 'rural' 
        ? '"agriculture" OR "farming" OR "crops prices" India' 
        : '"NSE India" OR "Stock Market" OR "BSE finance"';
      
      const GNEWS_KEY = process.env.GNEWS_KEY;

      const fetchRSS = async () => {
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
        const rssRes = await axios.get(rssUrl);
        const xml = rssRes.data;

        const items: any[] = []
        const matches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
        for (const match of matches) {
          const itemXml = match[1]
          const title = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]
          const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1]
          const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
          const source = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]
          const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1]

          const decodedDesc = descMatch?.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
          const imageSrc = decodedDesc?.match(/<img[^>]+src="([^">]+)"/)?.[1]
          const snippet = decodedDesc?.replace(/<[^>]*>?/gm, '').replace(/<!\[CDATA\[|\]\]>/g, '').trim()

          if (title && link) {
            items.push({
              title: title.replace('<![CDATA[', '').replace(']]>', ''),
              link,
              pubDate: pubDate ? new Date(pubDate).toLocaleDateString() : 'Today',
              source: source || 'News',
              image: imageSrc || '',
              snippet: snippet || 'Click to view full updates.'
            })
          }
        }
        return items;
      };

      if (GNEWS_KEY) {
        try {
          // 🚀 Fetch from GNews (Provides real Images)
          const gUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=10&apikey=${GNEWS_KEY}`;
          const gRes = await axios.get(gUrl);
          news = gRes.data.articles.map((a: any) => ({
            title: a.title,
            link: a.url,
            pubDate: new Date(a.publishedAt).toLocaleDateString(),
            source: a.source?.name || 'News',
            image: a.image || '',
            snippet: a.description || 'Click to read full article.'
          }));
        } catch (gnewsErr) {
          console.warn('⚠️ GNews API key failed, falling back to Google News RSS:', gnewsErr);
          news = await fetchRSS();
        }
      } else {
        // 🛡️ Fallback to Google News RSS (If key is missing)
        news = await fetchRSS();
      } // Top headlines
      feedData.news = news.slice(0, 15); // Expand to 15 headlines for full feed view
    } catch (e) {
      feedData.news = []
    }

    // 3. Rural Weather Section
    if (segment === 'rural') {
      try {
        // Fallback Delhi coordinates (28.6139, 77.2090) or Pincode Mapping could go here
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true`
        const weatherRes = await axios.get(weatherUrl)
        feedData.weather = {
          temp: weatherRes.data.current_weather?.temperature || 24,
          wind: weatherRes.data.current_weather?.windspeed || 12,
          code: weatherRes.data.current_weather?.weathercode || 0
        }
      } catch (e) {
         feedData.weather = { temp: 25, wind: 10, code: 0 } // Fallback
      }
    }

    // 4. Urban Stock Indices Mock Tickers (As NSE real rates are scraper heavy)
    if (segment === 'urban') {
      feedData.metrics = {
        nifty50: { value: "22,040.75", change: "+1.2%", positive: true },
        sensex: { value: "72,426.64", change: "+1.15%", positive: true },
        gold: { value: "65,340", change: "-0.4%", positive: false }
      }
    } else {
        feedData.metrics = {
          mustard: { value: "₹5,400/q", change: "+2%", positive: true },
          wheat: { value: "₹2,275/q", change: "0%", positive: true },
          msp: { value: "₹2,275", note: "Cabinet Approved" }
        }
    }

    return res.status(200).json(feedData)

  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}
