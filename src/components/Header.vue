<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          Primeira Escolha Imóveis
        </RouterLink>
        <nav class="nav">
          <ul>
            <li><RouterLink to="/">Início</RouterLink></li>
            <li><RouterLink to="/busca">Buscar Imóveis</RouterLink></li>
            <li><RouterLink to="/sobre">Sobre</RouterLink></li>
            <li><RouterLink to="/contato">Contato</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>