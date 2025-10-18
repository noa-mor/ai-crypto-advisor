# AI Crypto Advisor

A full-stack web application with user authentication, personalized onboarding, and real-time crypto data from multiple APIs. The backend filters content based on your voting history to show fresh recommendations each time.

**Live Demo:** https://ai-crypto-advisor-wine.vercel.app

## Technologies

**Frontend**: React 18 with React Router for navigation, Axios for API requests, Context API for authentication state

**Backend**: Node.js with Express, MongoDB with Mongoose(autopopulate for relations), JWT authentication, Clean architecture: controllers, services, repositories, providers

**External APIs**: CryptoPanic for crypto news, CoinGecko for real-time price data, HuggingFace Inference API for AI-generated insights

## Deployment

- Frontend on Vercel: https://ai-crypto-advisor-wine.vercel.app
- Backend on Render: https://ai-crypto-advisor-3azz.onrender.com
- Database on MongoDB Atlas

## Features

- Secure registration and login with JWT tokens
- Onboarding quiz to set preferences (which cryptos you follow, investor type, content types)
- Four personalized dashboard sections: Market News, Coin Prices, AI Insights, Memes
- Vote thumbs up/down on any content item
- Automatic refresh with new content after voting (filters out already-voted items)
- AI insights customized based on your voting patterns
- Responsive design that works on mobile and desktop

## API Documentation

The `documents` folder contains detailed API specifications and the original implementation plan:
**`documents/AI Crypto Advisor Server Description.docx`**

This includes endpoint descriptions, request/response formats, and architectural decisions.

## Running Locally

**1. Start MongoDB with Docker**

```bash
docker-compose up -d
```

**2. Get API tokens**

- CryptoPanic: https://cryptopanic.com/developers/api/
- HuggingFace: https://huggingface.co/settings/tokens

**3. Configure environment variables**

1. Copy `server/.env.example` to `server/.env`
2. Copy `client/.env.example` to `client/.env`
3. Fill missing env variables
