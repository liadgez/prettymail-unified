#!/bin/bash

# PrettyMail Unified - Vercel Deployment Script
# Run this script to deploy your MVP to production

echo "🚀 PrettyMail Unified - Production Deployment"
echo "=============================================="

# Check if logged into Vercel
echo "📋 Step 1: Vercel Authentication"
echo "Run: vercel login"
echo "Choose 'Continue with GitHub' and authenticate in browser"
echo ""

# Deploy to Vercel
echo "📋 Step 2: Deploy to Vercel"
echo "Run: vercel --prod"
echo ""

# Set environment variables
echo "📋 Step 3: Set Environment Variables"
echo "After deployment, set these in Vercel dashboard:"
echo "- VITE_GOOGLE_CLIENT_ID=your_client_id_here"
echo "- VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here"
echo ""

echo "📋 Step 4: Google Cloud Console Setup"
echo "1. Go to: https://console.cloud.google.com/"
echo "2. Create new project: 'PrettyMail Production'"
echo "3. Enable Gmail API"
echo "4. Create OAuth 2.0 credentials"
echo "5. Add redirect URI: https://your-app.vercel.app"
echo ""

echo "✅ Your MVP will be live after these steps!"

# Alternative: Direct deployment command
echo ""
echo "🔥 QUICK DEPLOY (if already logged in):"
echo "vercel --prod"
