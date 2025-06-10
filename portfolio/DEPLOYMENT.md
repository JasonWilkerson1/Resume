# Deployment Guide

This project is set up for deployment to Netlify. You can deploy using either of the following methods:

## Method 1: GitHub Deployment (Recommended)

1. Push your code to a GitHub repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Select your GitHub repository
5. Configure the build settings (should be auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Method 2: Netlify CLI

1. Install the Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize Netlify in your project:
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team (or create one)
   - Choose a site name or press enter for a random name

4. Deploy to production:
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Environment Variables

If your app uses environment variables, create a `.env` file in the root directory and add them there. For Netlify, you'll also need to add them in the Netlify dashboard under:

1. Site settings > Build & deploy > Environment
2. Click "Edit variables"
3. Add your environment variables

## Custom Domain

To set up a custom domain:

1. Go to your site in the Netlify dashboard
2. Navigate to "Domain management"
3. Click "Add custom domain"
4. Follow the instructions to verify domain ownership and set up DNS records
