# Homepage Import Scripts - Usage Guide

This guide explains how to use the homepage import scripts to extract content from your React components and upload it to Sanity.

## Quick Start

### 1. Set up Environment Variables

**Option A: Interactive Setup (Recommended)**
```bash
npm run create-env
```
This will guide you through creating your `.env.local` file.

**Option B: Manual Setup**
Create a `.env.local` file in your project root with:

```bash
# Copy from scripts/env-template.txt
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
SANITY_API_TOKEN=your_api_token_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Run the Interactive Setup

```bash
npm run setup-homepage
```

This will:
- Load environment variables from `.env.local` or `.env`
- Validate your environment setup
- Test your Sanity connection
- Check for required images
- Guide you through the import process

### 3. Direct Import (Alternative)

If you prefer to skip the interactive setup:

```bash
npm run import-homepage
```

## Scripts Overview

### 1. `create-env.js` - Environment Setup Helper
- **Purpose**: Interactive creation of `.env.local` file
- **Best for**: First-time setup or when you need to configure environment variables
- **Features**:
  - Prompts for Sanity project ID and API token
  - Creates properly formatted `.env.local` file
  - Validates required fields
  - Handles existing file overwrite

### 2. `setup-homepage.js` - Interactive Setup Wizard
- **Purpose**: Guided setup with validation and error checking
- **Best for**: First-time setup or troubleshooting
- **Features**:
  - Loads environment variables from `.env.local` or `.env`
  - Environment validation
  - Sanity connection testing
  - Schema verification
  - Image checking
  - Interactive choices

### 3. `import-homepage.js` - Direct Import
- **Purpose**: Direct content extraction and upload
- **Best for**: Automated imports or when you're confident in your setup
- **Features**:
  - Loads environment variables from `.env.local` or `.env`
  - Extracts content from components
  - Uploads images to Sanity
  - Creates/updates homepage document
  - Converts text to PortableText format

## What Gets Imported

### Content Sections
- **Hero**: Title, subtitle, buttons
- **Problem**: Statistics with chart data
- **Solution**: Feature cards with icons
- **Testimonials**: Customer quotes and ratings
- **B2B**: Challenge-solution pairs
- **Partners**: Logo images and links
- **Contact**: Contact methods and information
- **SEO**: Meta title and description

### Data Format
- All text content is converted to **PortableText** for rich text editing
- Images are uploaded as **Sanity assets**
- Content is structured according to your **homepage schema**

## Prerequisites

### Required Environment Variables
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_api_token
```

### Required Images
Place these in your `public` folder:
- `ucirvine.png`
- `intuit.png`
- `HUSD.png`
- `latinxcenter.png`
- `blackstone.png`

### Sanity Setup
- Project must have the homepage schema deployed
- API token must have "Editor" permissions

## Usage Examples

### First Time Setup
```bash
# Option 1: Interactive environment setup (Recommended)
npm run create-env
# Follow the prompts to create .env.local

# Option 2: Manual environment setup
cp scripts/env-template.txt .env.local
# Edit .env.local with your actual values

# 2. Run interactive setup
npm run setup-homepage

# 3. Follow the prompts
```

### Update Existing Homepage
```bash
# Run the import script (it will update existing content)
npm run import-homepage
```

### Check Setup Only
```bash
# Run setup wizard but don't import
npm run setup-homepage
# Choose option 2: "Check setup only"
```

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Set
```
❌ Missing required environment variables:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - SANITY_API_TOKEN
```
**Solution**: Create `.env.local` file with required variables

#### 2. Sanity Connection Failed
```
❌ Failed to connect to Sanity: Unauthorized
```
**Solution**: Check your API token has correct permissions

#### 3. Schema Not Found
```
❌ Homepage schema not found
```
**Solution**: Deploy your schema first, then run the import

#### 4. Images Missing
```
⚠️ Missing images: ucirvine.png, intuit.png
```
**Solution**: Add missing images to `public` folder or they'll be skipped

### Debug Mode

Add debug logging to see more details:

```javascript
// In import-homepage.js, add at the top:
process.env.DEBUG = 'true'
```

## Advanced Usage

### Custom Content

To modify the imported content, edit the `extractHomepageData()` function:

```javascript
// In scripts/import-homepage.js
function extractHomepageData() {
  return {
    hero: {
      title: 'Your Custom Title',
      subtitle: createPortableTextBlock('Your custom subtitle'),
      // ... rest of the data
    }
  }
}
```

### Batch Operations

Run multiple imports:

```bash
# Import homepage
npm run import-homepage

# Import courses
npm run import-courses

# Or run both
npm run import-homepage && npm run import-courses
```

### Automation

Add to your CI/CD pipeline:

```yaml
# .github/workflows/deploy.yml
- name: Import Homepage Content
  run: npm run import-homepage
  env:
    SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
```

## After Import

### 1. Verify in Sanity Studio
- Go to your Sanity Studio
- Look for "Homepage Content" document
- Check all sections are populated correctly

### 2. Test Rich Text Editing
- Try editing content blocks
- Test formatting (bold, italic, links)
- Verify images are displaying

### 3. Update Your Components
- Modify your React components to use Sanity data
- Use the helper functions from `homepageHelpers.ts`
- Implement `@portabletext/react` for rich text rendering

## File Structure

```
scripts/
├── import-homepage.js          # Main import script
├── setup-homepage.js           # Interactive setup wizard
├── README-homepage-import.md   # Detailed documentation
├── README-usage.md             # This usage guide
└── env-template.txt            # Environment variables template
```

## Support

If you encounter issues:

1. **Check the console output** for specific error messages
2. **Verify environment variables** are set correctly
3. **Test Sanity connection** using the setup wizard
4. **Check image files** exist in the public folder
5. **Verify schema** is deployed to Sanity

## Next Steps

After successful import:

1. **Update your homepage components** to use Sanity data
2. **Implement rich text rendering** with `@portabletext/react`
3. **Set up content management workflows** in Sanity Studio
4. **Train content editors** on using the rich text editor
5. **Set up automated imports** for regular content updates
