// Utility functions for handling asset paths
export function resolveAssetPath(path) {
  if (!path) return path
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // If it's a relative path starting with /, add base URL
  if (path.startsWith('/')) {
    const baseUrl = import.meta.env.BASE_URL || '/'
    return `${baseUrl.slice(0, -1)}${path}`
  }
  
  // Otherwise return as is
  return path
}

export function getDefaultImage() {
  return resolveAssetPath('/img/sem-foto.svg')
}