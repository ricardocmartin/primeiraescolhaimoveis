<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div>
          <h3>Primeira Escolha Imóveis</h3>
          <p>A melhor imobiliária da Grande São Paulo</p>
          <p>Sua casa dos sonhos está aqui!</p>
        </div>
        <div>
          <h3>Links Úteis</h3>
          <ul>
            <li><RouterLink to="/">Início</RouterLink></li>
            <li><RouterLink to="/busca">Buscar Imóveis</RouterLink></li>
            <li><RouterLink to="/sobre">Sobre Nós</RouterLink></li>
            <li><RouterLink to="/contato">Contato</RouterLink></li>
          </ul>
        </div>
        <div>
          <h3>Contato</h3>
          <p>📞 (11) 4004-1000</p>
          <p>📧 contato@primeiraescolhaimoveis.com.br</p>
          <p>📍 São Paulo - SP</p>
        </div>
        <div>
          <h3>Horário de Atendimento</h3>
          <p>Segunda a Sexta: 8h às 18h</p>
          <p>Sábado: 8h às 14h</p>
          <p>Domingo: Fechado</p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #34495e;">
        <p>&copy; 2025 Primeira Escolha Imóveis. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>