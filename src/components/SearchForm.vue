<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <div class="form-row">
      <div class="form-group">
        <label for="transaction">Finalidade</label>
        <select id="transaction" v-model="filters.transaction">
          <option value="">Todas</option>
          <option value="For Sale">Venda</option>
          <option value="For Rent">Aluguel</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="city">Cidade</label>
        <select id="city" v-model="filters.city">
          <option value="">Todas as cidades</option>
          <option value="São Paulo">São Paulo</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="neighborhood">Bairro</label>
        <select id="neighborhood" v-model="filters.neighborhood">
          <option value="">Todos os bairros</option>
          <option v-for="neighborhood in neighborhoods" :key="neighborhood" :value="neighborhood">
            {{ neighborhood }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="propertyType">Tipo de Imóvel</label>
        <select id="propertyType" v-model="filters.propertyType">
          <option value="">Todos os tipos</option>
          <option value="Apartment">Apartamento</option>
          <option value="House">Casa</option>
          <option value="Penthouse">Cobertura</option>
        </select>
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label for="minPrice">Preço Mínimo (R$)</label>
        <input type="number" id="minPrice" v-model="filters.minPrice" placeholder="0">
      </div>
      
      <div class="form-group">
        <label for="maxPrice">Preço Máximo (R$)</label>
        <input type="number" id="maxPrice" v-model="filters.maxPrice" placeholder="10000000">
      </div>
      
      <div class="form-group">
        <label for="bedrooms">Quartos</label>
        <select id="bedrooms" v-model="filters.bedrooms">
          <option value="">Qualquer</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      
      <div class="form-group">
        <button type="submit" class="btn" style="margin-top: 1.8rem;">
          🔍 Buscar Imóveis
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'search'],
  data() {
    return {
      filters: {
        transaction: '',
        city: '',
        neighborhood: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: ''
      },
      neighborhoods: [
        'Itaim Bibi', 'Vila Olímpia', 'Moema', 'Brooklin', 'Santo Amaro',
        'Pinheiros', 'Vila Madalena', 'Perdizes', 'Higienópolis', 'Jardins',
        'Vila Nova Conceição', 'Campo Belo', 'Saúde', 'Ibirapuera'
      ]
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.$emit('update:modelValue', newFilters)
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('search', this.filters)
    }
  }
}
</script>