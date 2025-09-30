<template>
  <div class="container" style="padding: 2rem 20px;">
    <div v-if="loading" style="text-align: center; padding: 4rem; color: #666;">
      <h2>Carregando detalhes do imóvel...</h2>
    </div>
    
    <div v-else-if="property">
      <!-- Breadcrumb -->
      <nav style="margin-bottom: 2rem; color: #666;">
        <RouterLink to="/" style="color: #3498db;">Início</RouterLink> > 
        <RouterLink to="/busca" style="color: #3498db;">Buscar Imóveis</RouterLink> > 
        {{ property.Title }}
      </nav>
      
      <!-- Property Title and Price -->
      <div style="margin-bottom: 2rem;">
        <h1 style="color: #2c3e50; margin-bottom: 0.5rem;">{{ property.Title }}</h1>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <p style="color: #666; font-size: 1.1rem;">
            📍 {{ property.Address }}, {{ property.StreetNumber }} - {{ property.Neighborhood }}, {{ property.City }}
          </p>
          <div style="text-align: right;">
            <div style="font-size: 2rem; font-weight: bold; color: #27ae60;">
              R$ {{ formatPrice(property.ListPrice) }}
              <span v-if="property.TransactionType === 'For Rent'" style="font-size: 1rem; color: #666;">/mês</span>
            </div>
            <p style="color: #666;">{{ property.TransactionType === 'For Sale' ? 'Venda' : 'Aluguel' }}</p>
          </div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
        <!-- Left Column - Photos and Description -->
        <div>
          <!-- Photo Gallery -->
          <div style="margin-bottom: 3rem;">
            <div style="height: 400px; border-radius: 10px; margin-bottom: 1rem; overflow: hidden;">
              <img 
                :src="getMainImageUrl()" 
                :alt="property.Title" 
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
              >
            </div>
            
            <!-- Thumbnail Gallery (if multiple photos) -->
            <div v-if="property.Photos && property.Photos.length > 1" style="display: flex; gap: 1rem; overflow-x: auto;">
              <div 
                v-for="(photo, index) in property.Photos.slice(1, 5)" 
                :key="index"
                style="flex: 0 0 100px; height: 80px; background: #f0f0f0; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #999; cursor: pointer;"
              >
                <img :src="photo" :alt="`Foto ${index + 2}`" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div style="margin-bottom: 3rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Descrição</h2>
            <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
              <p style="line-height: 1.8; color: #666;">{{ property.Description }}</p>
            </div>
          </div>
          
          <!-- Location Map -->
          <div>
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Localização</h2>
            <div style="background: #f0f0f0; height: 300px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #999; border: 2px solid #ddd;">
              <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                <p>Mapa Interativo</p>
                <p style="font-size: 0.9rem;">{{ property.Address }}, {{ property.StreetNumber }}<br>{{ property.Neighborhood }}, {{ property.City }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Details and Contact -->
        <div>
          <!-- Property Details -->
          <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); margin-bottom: 2rem;">
            <h3 style="color: #2c3e50; margin-bottom: 1.5rem;">Detalhes do Imóvel</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
              <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📏</div>
                <p style="font-weight: bold; color: #2c3e50;">{{ property.LivingArea }}m²</p>
                <p style="color: #666; font-size: 0.9rem;">Área</p>
              </div>
              
              <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🛏️</div>
                <p style="font-weight: bold; color: #2c3e50;">{{ property.Bedrooms || 'N/I' }}</p>
                <p style="color: #666; font-size: 0.9rem;">Quartos</p>
              </div>
              
              <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚿</div>
                <p style="font-weight: bold; color: #2c3e50;">{{ property.Bathrooms || 'N/I' }}</p>
                <p style="color: #666; font-size: 0.9rem;">Banheiros</p>
              </div>
              
              <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚗</div>
                <p style="font-weight: bold; color: #2c3e50;">{{ property.Garage || 'N/I' }}</p>
                <p style="color: #666; font-size: 0.9rem;">Vagas</p>
              </div>
            </div>
            
            <!-- Additional Details -->
            <div style="border-top: 1px solid #eee; padding-top: 1.5rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #666;">Tipo:</span>
                <span style="font-weight: bold;">{{ getPropertyType(property.PropertyType) }}</span>
              </div>
              
              <div v-if="property.PropertyTax" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #666;">IPTU:</span>
                <span style="font-weight: bold;">R$ {{ formatPrice(property.PropertyTax) }}</span>
              </div>
              
              <div v-if="property.CondominiumFee" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #666;">Condomínio:</span>
                <span style="font-weight: bold;">R$ {{ formatPrice(property.CondominiumFee) }}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Código:</span>
                <span style="font-weight: bold;">{{ property.ListingID }}</span>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #2c3e50; margin-bottom: 1.5rem;">Interessado? Fale Conosco!</h3>
            
            <form @submit.prevent="submitInterest">
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">Nome:</label>
                <input 
                  type="text" 
                  v-model="contactForm.name" 
                  required
                  style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;"
                  placeholder="Seu nome completo"
                >
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">E-mail:</label>
                <input 
                  type="email" 
                  v-model="contactForm.email" 
                  required
                  style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;"
                  placeholder="seu@email.com"
                >
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">Telefone:</label>
                <input 
                  type="tel" 
                  v-model="contactForm.phone"
                  style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;"
                  placeholder="(11) 99999-9999"
                >
              </div>
              
              <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">Mensagem:</label>
                <textarea 
                  v-model="contactForm.message" 
                  rows="3"
                  style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px; font-family: inherit; resize: vertical;"
                  placeholder="Estou interessado neste imóvel..."
                ></textarea>
              </div>
              
              <button type="submit" class="btn" style="width: 100%; margin-bottom: 1rem;">
                Enviar Mensagem
              </button>
              
              <a 
                href="tel:+551140041000" 
                style="display: block; text-align: center; padding: 10px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;"
              >
                📞 Ligar Agora
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else style="text-align: center; padding: 4rem;">
      <h2 style="color: #666;">Imóvel não encontrado</h2>
      <p style="margin: 1rem 0; color: #999;">O imóvel que você está procurando não foi encontrado.</p>
      <RouterLink to="/busca" class="btn">Voltar à Busca</RouterLink>
    </div>
  </div>
</template>

<script>
import { usePropertyStore } from '../stores/propertyStore'
import { resolveAssetPath, getDefaultImage } from '../utils/assets.js'

export default {
  name: 'PropertyDetail',
  props: ['id'],
  data() {
    return {
      property: null,
      loading: true,
      contactForm: {
        name: '',
        email: '',
        phone: '',
        message: 'Tenho interesse neste imóvel. Gostaria de mais informações.'
      }
    }
  },
  async mounted() {
    const propertyStore = usePropertyStore()
    await propertyStore.loadProperties()
    
    this.property = propertyStore.properties.value.find(p => p.ListingID === this.id)
    this.loading = false
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('pt-BR').format(price)
    },
    
    getMainImageUrl() {
      if (this.property?.Photos && this.property.Photos.length > 0) {
        return this.property.Photos[0]
      }
      return getDefaultImage()
    },
    
    getPropertyType(type) {
      if (type.includes('Apartment')) return 'Apartamento'
      if (type.includes('House')) return 'Casa'
      if (type.includes('Penthouse')) return 'Cobertura'
      return type.split('/')[1]?.trim() || 'Imóvel'
    },
    
    async submitInterest() {
      // Simulate form submission
      alert('Mensagem enviada! Nossa equipe entrará em contato em breve.')
      this.contactForm = {
        name: '',
        email: '',
        phone: '',
        message: 'Tenho interesse neste imóvel. Gostaria de mais informações.'
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  div[style*="grid-template-columns: 2fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
</style>