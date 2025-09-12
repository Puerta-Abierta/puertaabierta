import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

// Server-side client with write permissions
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always false for server-side operations
  token, // API token for write operations
  perspective: 'published', // Use published perspective for consistency
})

