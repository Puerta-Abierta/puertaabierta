# Homepage Content Schema and Templates

This directory contains the Sanity schema, TypeScript types, queries, and helper functions for managing homepage content in the Puerta Abierta website.

## Files Overview

- `homepage.ts` - Sanity schema definition for homepage content
- `homepageTypes.ts` - TypeScript type definitions
- `homepageQueries.ts` - GROQ queries for fetching homepage data
- `homepageHelpers.ts` - Helper functions for working with homepage content
- `homepageExample.ts` - Example implementations and usage patterns

## Schema Structure

The homepage schema uses **content blocks** (PortableText) instead of simple text fields, providing rich text editing capabilities with support for:

- **Text formatting**: Bold, italic, code
- **Headings**: H2, H3, H4
- **Lists**: Bulleted and numbered lists
- **Links**: Internal and external links with target options
- **Blockquotes**: For highlighting important content

The schema includes the following sections:

### 1. Hero Section
- Main title and subtitle
- Primary and secondary call-to-action buttons
- Background styling options

### 2. Problem Section
- Section title
- Statistics with support for numbers, percentages, and charts
- Chart data for visual representations
- **Content blocks** for statistic descriptions

### 3. Solution Section
- Section title
- Feature cards with icons, titles, and descriptions
- **Content blocks** for feature descriptions

### 4. Testimonials Section
- Section title
- List of testimonials with names, titles, quotes, and ratings
- **Content blocks** for testimonial quotes

### 5. B2B Section
- Section title
- Challenge-solution pairs
- Call-to-action button
- **Content blocks** for challenges and solutions

### 6. Partners Section
- Partner logos with images and optional website links

### 7. Contact Section
- Section title, subtitle, and description
- Contact methods with icons and details
- **Content blocks** for subtitle and description

### 8. SEO Fields
- Meta title and description
- Open Graph image
- **Content blocks** for meta description

## Content Blocks

The homepage schema uses PortableText content blocks for rich text editing. This provides:

### Rich Text Features
- **Bold**, *italic*, and `code` formatting
- Multiple heading levels (H2, H3, H4)
- Bulleted and numbered lists
- Blockquotes for highlighting content
- Links with target options (open in new tab)

### Working with Content Blocks

```typescript
import { portableTextToPlainText, portableTextToHTML } from '@/sanity/lib/homepageHelpers'
import { PortableText } from '@portabletext/react'

// Convert to plain text
const plainText = portableTextToPlainText(homepage.hero.subtitle)

// Convert to HTML
const html = portableTextToHTML(homepage.hero.subtitle)

// Render with @portabletext/react
<PortableText value={homepage.hero.subtitle} />
```

### Helper Functions

The helper functions provide both PortableText and plain text versions:

```typescript
// Get PortableText (for rich rendering)
const subtitle = getHomepageSubtitlePortableText(homepage)

// Get plain text (for simple display)
const subtitleText = getHomepageSubtitle(homepage)

// Get data with plain text conversion
const statistics = getProblemStatisticsWithPlainText(homepage)
const features = getSolutionFeaturesWithPlainText(homepage)
const testimonials = getTestimonialsWithPlainText(homepage)
```

## Usage

### Basic Usage

```typescript
import { getHomepageData } from '@/sanity/lib/homepageExample'

export default async function HomePage() {
  const data = await getHomepageData()
  
  return (
    <div>
      <h1>{data.hero.title}</h1>
      <p>{data.hero.subtitle}</p>
      {/* Render other sections */}
    </div>
  )
}
```

### Individual Section Queries

```typescript
import { getHeroData, getProblemData } from '@/sanity/lib/homepageExample'

// Get only hero section data
const heroData = await getHeroData()

// Get only problem section data
const problemData = await getProblemData()
```

### Using Helper Functions

```typescript
import { 
  getHomepageTitle, 
  getProblemStatistics,
  getTestimonials 
} from '@/sanity/lib/homepageHelpers'

const homepage = await fetchHomepageContent()
const title = getHomepageTitle(homepage)
const statistics = getProblemStatistics(homepage)
const testimonials = getTestimonials(homepage)
```

## Sanity Studio Setup

1. The schema is automatically registered in `src/sanity/schemaTypes/index.ts`
2. After deployment, you'll see "Homepage Content" in your Sanity Studio
3. Create a new homepage document and fill in the content
4. The content will be immediately available through the queries

## Content Management

### Creating Homepage Content

1. Go to your Sanity Studio
2. Create a new "Homepage Content" document
3. Fill in all sections with your content
4. Use the preview to see how it will look
5. Publish the document

### Updating Content

1. Edit the existing homepage document in Sanity Studio
2. Make your changes
3. Publish to make changes live
4. The website will automatically reflect the changes

### Fallback Content

If no homepage content is found or if the content is invalid, the system will use default content defined in `homepageHelpers.ts`. This ensures the website always has content to display.

## Type Safety

All functions are fully typed with TypeScript, providing:
- IntelliSense support in your IDE
- Compile-time error checking
- Better refactoring capabilities
- Self-documenting code

## Query Optimization

The queries are optimized for performance:
- Use specific field selection to minimize data transfer
- Include only necessary fields for each query
- Support for both full content and individual section queries

## Error Handling

All functions include proper error handling:
- Graceful fallbacks when content is missing
- Console warnings for debugging
- Type-safe return values

## Examples

See `homepageExample.ts` for comprehensive examples of:
- Fetching homepage content
- Using helper functions
- React component integration
- Individual section queries
- Error handling patterns
