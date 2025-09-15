# Troubleshooting Guide for Homepage Import Scripts

This guide helps you resolve common issues when running the homepage import scripts.

## Common Issues and Solutions

### 1. Schema Not Found Error

**Error Message:**
```
❌ Homepage schema not found
   Make sure you have deployed your schema with the homepage type
```

**Solutions:**

#### Option A: Automatic Schema Deployment
```bash
npm run deploy-schema
```

#### Option B: Manual Schema Deployment
1. Go to your Sanity Studio
2. Make sure your schema includes the homepage type
3. Deploy your schema from the Studio

#### Option C: Check Schema Files
Ensure your schema files are properly configured:
- `src/sanity/schemaTypes/homepage.ts` exists
- `src/sanity/schemaTypes/index.ts` includes the homepage schema
- Schema is properly exported

### 2. Environment Variables Not Set

**Error Message:**
```
❌ Missing required environment variables:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - SANITY_API_TOKEN
```

**Solutions:**

#### Option A: Interactive Setup
```bash
npm run create-env
```

#### Option B: Manual Setup
Create `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Option C: Test Environment
```bash
npm run test-env
```

### 3. Sanity Connection Failed

**Error Message:**
```
❌ Failed to connect to Sanity: Unauthorized
```

**Solutions:**

1. **Check API Token:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "API" tab
   - Verify your token has "Editor" permissions

2. **Check Project ID:**
   - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
   - Check for typos in the project ID

3. **Check Dataset:**
   - Ensure the dataset exists
   - Default is "production"

### 4. Images Not Found

**Error Message:**
```
⚠️ Image not found: /path/to/public/ucirvine.png
```

**Solutions:**

1. **Check Image Files:**
   - Ensure images exist in `public` folder
   - Check file names match exactly
   - Verify file permissions

2. **Required Images:**
   - `ucirvine.png`
   - `intuit.png`
   - `HUSD.png`
   - `latinxcenter.png`
   - `blackstone.png`

3. **Skip Missing Images:**
   - Script will continue without missing images
   - You can add them later in Sanity Studio

### 5. Permission Denied Errors

**Error Message:**
```
❌ Error uploading homepage data: Forbidden
```

**Solutions:**

1. **Check API Token Permissions:**
   - Token must have "Editor" permissions
   - Not just "Viewer" permissions

2. **Check Project Access:**
   - Ensure you have access to the project
   - Verify you're using the correct project ID

### 6. Network/Connection Issues

**Error Message:**
```
❌ Error fetching homepage content: Network error
```

**Solutions:**

1. **Check Internet Connection:**
   - Ensure stable internet connection
   - Try again after a few minutes

2. **Check Sanity Status:**
   - Visit [status.sanity.io](https://status.sanity.io)
   - Check if there are any service issues

3. **Retry:**
   - Run the script again
   - Sometimes it's a temporary issue

## Step-by-Step Troubleshooting

### Complete Reset and Setup

1. **Clean Environment:**
   ```bash
   # Remove existing .env files
   rm .env.local .env
   
   # Create fresh environment
   npm run create-env
   ```

2. **Test Environment:**
   ```bash
   npm run test-env
   ```

3. **Deploy Schema:**
   ```bash
   npm run deploy-schema
   ```

4. **Run Setup:**
   ```bash
   npm run setup-homepage
   ```

### Debug Mode

Enable debug logging by modifying the scripts:

```javascript
// Add at the top of any script
process.env.DEBUG = 'true'
console.log('Environment variables:', process.env)
```

### Manual Verification

1. **Check Sanity Studio:**
   - Go to your Sanity Studio
   - Look for "Homepage Content" document type
   - Verify schema is deployed

2. **Check API Access:**
   - Use Sanity Vision in Studio
   - Run query: `*[_type == "homepage"][0]`

3. **Check Environment:**
   - Verify `.env.local` file exists
   - Check variable values are correct

## Getting Help

### Check Script Output

Look for these success indicators:
```
✅ Loaded environment variables from .env.local
✅ Successfully connected to Sanity
✅ Homepage schema found
✅ Homepage created successfully: homepage-xyz789
```

### Common Success Patterns

**Successful Setup:**
```
🏠 Starting homepage data import...
=====================================
✅ Loaded environment variables from .env.local
📋 Extracting homepage data from components...
✅ Homepage data extracted successfully
📸 Uploading partner images to Sanity...
✅ Uploaded ucirvine.png - image-abc123
🚀 Uploading homepage data to Sanity...
✅ Homepage created successfully: homepage-xyz789
🎉 Homepage import completed successfully!
```

### When to Start Over

If you're still having issues after trying all solutions:

1. **Complete Reset:**
   ```bash
   # Remove all environment files
   rm .env.local .env
   
   # Start fresh
   npm run create-env
   npm run test-env
   npm run deploy-schema
   npm run setup-homepage
   ```

2. **Check Sanity Project:**
   - Verify project exists and is accessible
   - Check if you have proper permissions
   - Ensure dataset exists

3. **Verify Schema:**
   - Check schema files are correct
   - Ensure homepage type is included
   - Deploy schema manually from Studio

## Prevention Tips

1. **Always test environment first:**
   ```bash
   npm run test-env
   ```

2. **Deploy schema before importing:**
   ```bash
   npm run deploy-schema
   ```

3. **Keep environment variables secure:**
   - Never commit `.env.local` to version control
   - Use different tokens for different environments

4. **Regular maintenance:**
   - Rotate API tokens regularly
   - Keep Sanity CLI updated
   - Test imports after schema changes

