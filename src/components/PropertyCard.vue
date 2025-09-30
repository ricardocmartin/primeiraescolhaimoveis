<template>
  <div class="property-card">
    <div class="property-image">
      <img 
        :src="getImageUrl()" 
        :alt="property.Title" 
        style="width: 100%; height: 100%; object-fit: cover;"
      >
    </div>
    <div class="property-info">
      <h3 class="property-title">{{ property.Title }}</h3>
      <div class="property-price">
        R$ {{ formatPrice(property.ListPrice) }}
        <span v-if="property.TransactionType === 'For Rent'" style="font-size: 0.8rem; color: #666;">/mês</span>
      </div>
      <div class="property-details">
        <span>📏 {{ property.LivingArea }}m²</span>
        <span>🛏️ {{ property.Bedrooms }} quartos</span>
        <span>🚿 {{ property.Bathrooms }} banheiros</span>
      </div>
      <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">
        📍 {{ property.Neighborhood }}, {{ property.City }}
      </p>
      <RouterLink 
        :to="`/imovel/${property.ListingID}`" 
        class="btn" 
        style="width: 100%; text-align: center;"
      >
        Ver Detalhes
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { resolveAssetPath, getDefaultImage } from '../utils/assets.js'

export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('pt-BR').format(price)
    },
    getImageUrl() {
      if (this.property.Photos && this.property.Photos.length > 0) {
        return this.property.Photos[0]
      }
      return getDefaultImage()
    }
  }
}
</script>