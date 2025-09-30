<template>
  <div class="container" style="padding: 2rem 20px;">
    <h1 style="color: #2c3e50; margin-bottom: 2rem;">Buscar Imóveis</h1>
    
    <!-- Search Form -->
    <SearchForm v-model="searchFilters" @search="applyFilters" />
    
    <!-- Results Count -->
    <div v-if="hasSearched" style="margin: 2rem 0; color: #666;">
      {{ filteredProperties.length }} imóvel(is) encontrado(s)
    </div>
    
    <!-- Sorting Options -->
    <div v-if="filteredProperties.length > 0" style="margin-bottom: 2rem;">
      <label for="sort" style="margin-right: 1rem; font-weight: bold;">Ordenar por:</label>
      <select id="sort" v-model="sortBy" @change="sortProperties" style="padding: 5px 10px;">
        <option value="price-asc">Menor Preço</option>
        <option value="price-desc">Maior Preço</option>
        <option value="area-desc">Maior Área</option>
        <option value="bedrooms-desc">Mais Quartos</option>
      </select>
    </div>
    
    <!-- Property Grid -->
    <div v-if="filteredProperties.length > 0" class="property-grid">
      <PropertyCard 
        v-for="property in paginatedProperties" 
        :key="property.ListingID" 
        :property="property" 
      />
    </div>
    
    <!-- No Results -->
    <div v-else-if="hasSearched" style="text-align: center; padding: 3rem; color: #666;">
      <h3>Nenhum imóvel encontrado</h3>
      <p>Tente ajustar os filtros de busca</p>
    </div>
    
    <!-- Loading -->
    <div v-else style="text-align: center; padding: 3rem; color: #666;">
      <p>Use os filtros acima para buscar imóveis</p>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin: 3rem 0;">
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="btn btn-secondary"
      >
        ← Anterior
      </button>
      
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      
      <button 
        @click="currentPage++" 
        :disabled="currentPage === totalPages"
        class="btn btn-secondary"
      >
        Próxima →
      </button>
    </div>
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm.vue'
import PropertyCard from '../components/PropertyCard.vue'
import { usePropertyStore } from '../stores/propertyStore'

export default {
  name: 'Search',
  components: {
    SearchForm,
    PropertyCard
  },
  data() {
    return {
      searchFilters: {},
      filteredProperties: [],
      hasSearched: false,
      sortBy: 'price-asc',
      currentPage: 1,
      itemsPerPage: 9
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProperties.length / this.itemsPerPage)
    },
    paginatedProperties() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProperties.slice(start, end)
    }
  },
  async mounted() {
    const propertyStore = usePropertyStore()
    await propertyStore.loadProperties()
    
    // Apply filters from query params if present
    if (Object.keys(this.$route.query).length > 0) {
      this.searchFilters = { ...this.$route.query }
      this.applyFilters(this.searchFilters)
    }
  },
  methods: {
    applyFilters(filters) {
      const propertyStore = usePropertyStore()
      this.hasSearched = true
      this.currentPage = 1
      
      this.filteredProperties = propertyStore.properties.value.filter(property => {
        // Transaction type filter
        if (filters.transaction && property.TransactionType !== filters.transaction) {
          return false
        }
        
        // City filter
        if (filters.city && property.City !== filters.city) {
          return false
        }
        
        // Neighborhood filter
        if (filters.neighborhood && property.Neighborhood !== filters.neighborhood) {
          return false
        }
        
        // Property type filter
        if (filters.propertyType) {
          const propType = property.PropertyType.split('/')[1]?.trim()
          if (propType !== filters.propertyType) {
            return false
          }
        }
        
        // Price range filter
        const price = parseInt(property.ListPrice)
        if (filters.minPrice && price < parseInt(filters.minPrice)) {
          return false
        }
        if (filters.maxPrice && price > parseInt(filters.maxPrice)) {
          return false
        }
        
        // Bedrooms filter
        if (filters.bedrooms && property.Bedrooms < parseInt(filters.bedrooms)) {
          return false
        }
        
        return true
      })
      
      this.sortProperties()
    },
    
    sortProperties() {
      this.filteredProperties.sort((a, b) => {
        switch (this.sortBy) {
          case 'price-asc':
            return parseInt(a.ListPrice) - parseInt(b.ListPrice)
          case 'price-desc':
            return parseInt(b.ListPrice) - parseInt(a.ListPrice)
          case 'area-desc':
            return parseInt(b.LivingArea) - parseInt(a.LivingArea)
          case 'bedrooms-desc':
            return parseInt(b.Bedrooms) - parseInt(a.Bedrooms)
          default:
            return 0
        }
      })
    }
  }
}
</script>