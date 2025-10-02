// Exemplo de como usar o arquivo XML reduzido
// Este arquivo mostra como alternar entre o XML completo e reduzido

import { ref, reactive } from 'vue'

const properties = ref([])
const loading = ref(false)
const loaded = ref(false)

// Configuração para alternar entre arquivos
const USE_REDUCED_XML = false // Mude para true para usar o arquivo reduzido

async function parseXMLData(xmlData) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml')
  
  const listings = xmlDoc.querySelectorAll('Listing')
  const properties = []
  
  listings.forEach(listing => {
    const getTextContent = (selector) => {
      const element = listing.querySelector(selector)
      return element ? element.textContent.trim() : ''
    }
    
    const property = {
      ListingID: getTextContent('ListingID'),
      Title: getTextContent('Title'),
      TransactionType: getTextContent('TransactionType'),
      City: getTextContent('City'),
      Neighborhood: getTextContent('Neighborhood'),
      Address: getTextContent('Address'),
      StreetNumber: getTextContent('StreetNumber'),
      PostalCode: getTextContent('PostalCode'),
      ListPrice: parseInt(getTextContent('ListPrice')) || 0,
      Description: getTextContent('Description'),
      PropertyType: getTextContent('PropertyType'),
      LotArea: parseInt(getTextContent('LotArea')) || 0,
      LivingArea: parseInt(getTextContent('LivingArea')) || 0,
      Bathrooms: parseInt(getTextContent('Bathrooms')) || 0,
      Bedrooms: parseInt(getTextContent('Bedrooms')) || 0,
      Suites: parseInt(getTextContent('Suites')) || 0,
      Garage: parseInt(getTextContent('Garage')) || 0,
      PropertyTax: parseInt(getTextContent('PropertyTax')) || 0,
      CondominiumFee: parseInt(getTextContent('CondominiumFee')) || 0,
      Photos: []
    }
    
    // Get photos from Media > Item tags
    const mediaItems = listing.querySelectorAll('Media Item[medium="image"]')
    mediaItems.forEach(item => {
      const url = item.textContent.trim()
      if (url) {
        // Ensure URLs have the correct base path
        const baseUrl = import.meta.env.BASE_URL || '/'
        const fullUrl = url.startsWith('/') ? `${baseUrl.slice(0, -1)}${url}` : url
        property.Photos.push(fullUrl)
      }
    })
    
    properties.push(property)
  })
  
  return properties
}

export function usePropertyStore() {
  const loadProperties = async () => {
    if (loaded.value) return
    
    loading.value = true
    try {
      const baseUrl = import.meta.env.BASE_URL || '/'
      
      // Escolhe qual arquivo XML usar baseado na configuração
      const xmlFile = USE_REDUCED_XML ? 'dados-reduzido.xml' : 'dados.xml'
      const xmlUrl = `${baseUrl}xml/${xmlFile}`
      
      console.log(`Carregando ${USE_REDUCED_XML ? 'XML reduzido' : 'XML completo'} de:`, xmlUrl)
      const response = await fetch(xmlUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const xmlData = await response.text()
      console.log(`${USE_REDUCED_XML ? 'XML reduzido' : 'XML completo'} carregado, tamanho:`, xmlData.length, 'caracteres')
      properties.value = await parseXMLData(xmlData)
      loaded.value = true
      console.log('Propriedades carregadas:', properties.value.length, USE_REDUCED_XML ? '(versão reduzida)' : '(versão completa)')
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error)
      // Fallback with mock data if XML fails to load
      properties.value = [
        {
          ListingID: 'PEI-MOCK-001',
          Title: 'Imóvel de Exemplo (Dados de Fallback)',
          TransactionType: 'For Sale',
          City: 'São Paulo',
          Neighborhood: 'Centro',
          Address: 'Rua de Exemplo',
          StreetNumber: '123',
          PostalCode: '01000-000',
          ListPrice: 500000,
          Description: 'Este é um imóvel de exemplo usado quando o XML não pode ser carregado.',
          PropertyType: 'Residential / Apartment',
          LotArea: 100,
          LivingArea: 100,
          Bathrooms: 2,
          Bedrooms: 3,
          Suites: 1,
          Garage: 1,
          PropertyTax: 0,
          CondominiumFee: 0,
          Photos: ['/img/sem-foto.svg']
        }
      ]
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  const searchProperties = (filters) => {
    return properties.value.filter(property => {
      let matches = true
      
      if (filters.type && property.TransactionType !== filters.type) {
        matches = false
      }
      
      if (filters.neighborhood && 
          !property.Neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
        matches = false
      }
      
      if (filters.minPrice && property.ListPrice < parseInt(filters.minPrice)) {
        matches = false
      }
      
      if (filters.maxPrice && property.ListPrice > parseInt(filters.maxPrice)) {
        matches = false
      }
      
      if (filters.bedrooms && property.Bedrooms < parseInt(filters.bedrooms)) {
        matches = false
      }
      
      return matches
    })
  }

  return {
    properties,
    loading,
    loaded,
    loadProperties,
    searchProperties
  }
}