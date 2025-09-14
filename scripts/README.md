# Course Import Script

This script imports course data from `src/content/pages.json` into your Sanity CMS.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get your Sanity API token:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "API" tab
   - Create a new token with "Editor" permissions
   - Copy the token

3. **Add environment variables:**
   Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

## Usage

Run the import script:
```bash
npm run import-courses
```

## What it does

- ✅ Reads course data from `src/content/pages.json`
- ✅ Converts JSON format to Sanity format
- ✅ Checks for existing courses (skips duplicates)
- ✅ Imports all courses with lessons and mentors
- ✅ Provides detailed progress logging

## After Import

1. **Go to Sanity Studio:** Visit `/studio` in your app
2. **Add Thumbnails:** Upload images for each course
3. **Review & Publish:** Check the data and publish courses
4. **Test:** Visit `/courses` to see your imported courses

## Troubleshooting

- **"Project not found"**: Check your `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **"Unauthorized"**: Check your `SANITY_API_TOKEN` has Editor permissions
- **"Dataset not found"**: Check your `NEXT_PUBLIC_SANITY_DATASET` name

## Notes

- The script skips courses that already exist (based on slug)
- Thumbnail images need to be added manually in Sanity Studio
- All courses will be created as drafts initially
