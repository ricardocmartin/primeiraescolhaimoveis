import { ref, reactive } from 'vue'

const properties = ref([])
const loading = ref(false)
const loaded = ref(false)

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
        property.Photos.push(url)
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
      const response = await fetch('/xml/dados.xml')
      const xmlData = await response.text()
      properties.value = await parseXMLData(xmlData)
      loaded.value = true
      console.log('Propriedades carregadas:', properties.value.length)
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error)
      // Fallback with mock data if XML fails to load
      properties.value = [
        {
          ListingID: 'PEI-AP0001',
          Title: 'Apartamento de Luxo no Itaim Bibi',
          TransactionType: 'For Sale',
          City: 'São Paulo',
          Neighborhood: 'Itaim Bibi',
          Address: 'Rua Joaquim Floriano',
          StreetNumber: '100',
          PostalCode: '04534-000',
          ListPrice: 3500000,
          Description: 'Apartamento impecável, andar alto com vista livre. Acabamentos de primeira linha, varanda gourmet integrada ao living e condomínio com lazer completo.',
          PropertyType: 'Residential / Apartment',
          LotArea: 150,
          LivingArea: 150,
          Bathrooms: 5,
          Bedrooms: 3,
          Suites: 3,
          Garage: 2,
          PropertyTax: 15000,
          CondominiumFee: 2500,
          Photos: []
        },
        {
          ListingID: 'PEI-CS0001',
          Title: 'Casa Moderna em Condomínio Fechado',
          TransactionType: 'For Sale',
          City: 'São Paulo',
          Neighborhood: 'Vila Olímpia',
          Address: 'Rua das Flores',
          StreetNumber: '250',
          PostalCode: '04551-000',
          ListPrice: 2800000,
          Description: 'Linda casa em condomínio fechado com área de lazer completa. 4 quartos, sendo 2 suítes, com quintal e piscina.',
          PropertyType: 'Residential / House',
          LotArea: 300,
          LivingArea: 250,
          Bathrooms: 4,
          Bedrooms: 4,
          Suites: 2,
          Garage: 2,
          PropertyTax: 12000,
          CondominiumFee: 1800,
          Photos: []
        },
        {
          ListingID: 'PEI-AL0001',
          Title: 'Apartamento para Aluguel em Moema',
          TransactionType: 'For Rent',
          City: 'São Paulo',
          Neighborhood: 'Moema',
          Address: 'Av. Ibirapuera',
          StreetNumber: '500',
          PostalCode: '04029-000',
          ListPrice: 8500,
          Description: 'Apartamento moderno e bem localizado, próximo ao Parque Ibirapuera. 3 dormitórios, sendo 1 suíte.',
          PropertyType: 'Residential / Apartment',
          LotArea: 120,
          LivingArea: 120,
          Bathrooms: 3,
          Bedrooms: 3,
          Suites: 1,
          Garage: 2,
          PropertyTax: 0,
          CondominiumFee: 1200,
          Photos: []
        }
      ]
    } finally {
      loading.value = false
    }
  }

  return {
    properties,
    loading,
    loaded,
    loadProperties
  }
}