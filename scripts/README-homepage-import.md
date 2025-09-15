# Homepage Import Script

This script extracts homepage content from your React components and uploads it to Sanity as a structured document.

## Overview

The `import-homepage.js` script:
- Extracts content from all homepage components (Hero, Problem, Solution, Testimonials, B2B, Partners, ContactSection)
- Converts text content to PortableText format for rich text editing
- Uploads partner logos as Sanity assets
- Creates or updates a homepage document in Sanity

## Prerequisites

1. **Environment Variables**: Make sure you have the following environment variables set:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   SANITY_API_TOKEN=your_api_token
   NEXT_PUBLIC_SANITY_DATASET=production  # optional, defaults to 'production'
   ```

2. **Sanity API Token**: You need a Sanity API token with write permissions. Get one from:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "API" tab
   - Create a new token with "Editor" permissions

3. **Partner Images**: Ensure the following images exist in your `public` folder:
   - `ucirvine.png`
   - `intuit.png`
   - `HUSD.png`
   - `latinxcenter.png`
   - `blackstone.png`

## Usage

### Run the Script

```bash
# Using npm script
npm run import-homepage

# Or run directly
node scripts/import-homepage.js
```

### What the Script Does

1. **Extracts Content**: Reads data from your homepage components and structures it according to the Sanity schema
2. **Uploads Images**: Uploads partner logos to Sanity and gets asset references
3. **Creates PortableText**: Converts all text content to PortableText format for rich text editing
4. **Uploads to Sanity**: Creates or updates the homepage document in Sanity

### Expected Output

```
🏠 Starting homepage data import...
=====================================
📋 Extracting homepage data from components...
✅ Homepage data extracted successfully
📸 Uploading partner images to Sanity...
✅ Uploaded ucirvine.png - image-abc123
✅ Uploaded intuit.png - image-def456
✅ Uploaded HUSD.png - image-ghi789
✅ Uploaded latinxcenter.png - image-jkl012
✅ Uploaded blackstone.png - image-mno345
🔗 Updating homepage data with asset references...
🚀 Uploading homepage data to Sanity...
📝 Creating new homepage document...
✅ Homepage created successfully: homepage-xyz789
=====================================
🎉 Homepage import completed successfully!
📄 Document ID: homepage-xyz789
🌐 You can now view and edit the homepage content in Sanity Studio
```

## Content Structure

The script creates a homepage document with the following sections:

### Hero Section
- Title: "Financial Literacy for the Next Generation"
- Subtitle: Rich text with call-to-action description
- Primary Button: "Book Free Intro Session" → `/mentors`
- Secondary Button: "Explore Services" → `/services`

### Problem Section
- Title: "Financial stress is the #1 reason for College Dropout"
- Statistics:
  - $352B lost due to financial illiteracy
  - 73% of students not confident (with chart data)
  - 59% considered dropping out

### Solution Section
- Title: "We combine Intuit's trusted curriculum with mentorship..."
- Features:
  - 📘 Financial Literacy
  - 🎯 Holistic Mentorship
  - 🤝 Enterprise Partnerships

### Testimonials Section
- Title: "College applications are simpler with someone to guide you"
- 3 testimonials from Ben, Carlos Mendez, and Sofia Garcia

### B2B Section
- Title: "Why Partner With Puerta Abierta?"
- 2 challenge-solution pairs
- CTA: "Schedule a Consultation"

### Partners Section
- 5 partner logos (UCI, Intuit, HUSD, Latina Center, Blackstone)
- Each with uploaded image assets and website links

### Contact Section
- Title: "Ready to Get Started?"
- Subtitle and description in rich text
- Contact methods (email, consultation, response time)

### SEO Fields
- Meta title and description
- Open Graph image support

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   ```
   Error: NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required
   ```
   **Solution**: Set the required environment variables in your `.env.local` file

2. **Invalid API Token**
   ```
   Error: Unauthorized
   ```
   **Solution**: Check your `SANITY_API_TOKEN` has write permissions

3. **Missing Images**
   ```
   ⚠️ Image not found: /path/to/public/ucirvine.png
   ```
   **Solution**: Ensure all partner images exist in the `public` folder

4. **Network Issues**
   ```
   Error: Network error
   ```
   **Solution**: Check your internet connection and Sanity service status

### Debug Mode

To see more detailed output, you can modify the script to add debug logging:

```javascript
// Add this at the top of the script
process.env.DEBUG = 'true'
```

## After Running the Script

1. **Check Sanity Studio**: Go to your Sanity Studio and look for the "Homepage Content" document
2. **Verify Content**: Review all sections to ensure data was imported correctly
3. **Test Rich Text**: Try editing the content blocks to see the rich text editor in action
4. **Update Images**: If any images failed to upload, you can manually upload them in Sanity Studio

## Updating Content

The script is designed to be idempotent:
- If no homepage document exists, it creates one
- If a homepage document exists, it updates the existing one
- You can run the script multiple times safely

## Customization

To modify the extracted content, edit the `extractHomepageData()` function in the script:

```javascript
function extractHomepageData() {
  const homepageData = {
    // Modify the content here
    hero: {
      title: 'Your Custom Title',
      // ... rest of the data
    }
  }
  return homepageData
}
```

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your environment variables are set correctly
3. Ensure your Sanity project is accessible
4. Check that all required images exist in the `public` folder

