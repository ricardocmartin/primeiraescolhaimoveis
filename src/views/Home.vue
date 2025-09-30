<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Sua casa dos sonhos está aqui!</h1>
        <p>Encontre o imóvel perfeito na Grande São Paulo</p>
        <RouterLink to="/busca" class="btn">Começar Busca</RouterLink>
      </div>
    </section>

    <div class="container">
      <!-- Search Form -->
      <SearchForm @search="handleSearch" />

      <!-- Featured Properties -->
      <section style="margin: 4rem 0;">
        <h2 style="text-align: center; margin-bottom: 2rem; color: #2c3e50;">Destaques para Venda</h2>
        <div v-if="isLoading" style="text-align: center; color: #666; padding: 2rem;">
          Carregando imóveis em destaque...
        </div>
        <div v-else-if="featuredSaleProperties.length > 0" class="property-grid">
          <PropertyCard 
            v-for="property in featuredSaleProperties" 
            :key="property.ListingID" 
            :property="property" 
          />
        </div>
        <div v-else style="text-align: center; color: #666; padding: 2rem;">
          Nenhum imóvel para venda encontrado.
        </div>
      </section>

      <section style="margin: 4rem 0;">
        <h2 style="text-align: center; margin-bottom: 2rem; color: #2c3e50;">Oportunidades de Aluguel</h2>
        <div v-if="isLoading" style="text-align: center; color: #666; padding: 2rem;">
          Carregando imóveis para aluguel...
        </div>
        <div v-else-if="featuredRentProperties.length > 0" class="property-grid">
          <PropertyCard 
            v-for="property in featuredRentProperties" 
            :key="property.ListingID" 
            :property="property" 
          />
        </div>
        <div v-else style="text-align: center; color: #666; padding: 2rem;">
          Nenhum imóvel para aluguel encontrado.
        </div>
      </section>

      <!-- Call to Action -->
      <section style="text-align: center; background: #f8f9fa; padding: 3rem; border-radius: 10px; margin: 4rem 0;">
        <h2 style="color: #2c3e50; margin-bottom: 1rem;">Precisa de Ajuda?</h2>
        <p style="color: #666; margin-bottom: 2rem;">Nossa equipe está pronta para ajudar você a encontrar o imóvel ideal</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <RouterLink to="/contato" class="btn">Fale Conosco</RouterLink>
          <RouterLink to="/sobre" class="btn btn-secondary">Conheça Nossa Equipe</RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm.vue'
import PropertyCard from '../components/PropertyCard.vue'
import { usePropertyStore } from '../stores/propertyStore'

export default {
  name: 'Home',
  components: {
    SearchForm,
    PropertyCard
  },
  data() {
    return {
      featuredSaleProperties: [],
      featuredRentProperties: [],
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true
    const propertyStore = usePropertyStore()
    await propertyStore.loadProperties()
    
    // Get featured properties for sale (first 3)
    this.featuredSaleProperties = propertyStore.properties.value
      .filter(p => p.TransactionType === 'For Sale')
      .slice(0, 3)
    
    // Get featured properties for rent (first 3)
    this.featuredRentProperties = propertyStore.properties.value
      .filter(p => p.TransactionType === 'For Rent')
      .slice(0, 3)
    
    this.isLoading = false
  },
  methods: {
    handleSearch(filters) {
      this.$router.push({ 
        name: 'Search', 
        query: filters 
      })
    }
  }
}
</script>