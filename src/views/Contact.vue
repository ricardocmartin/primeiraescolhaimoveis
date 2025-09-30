<template>
  <div class="container" style="padding: 2rem 20px;">
    <h1 style="color: #2c3e50; margin-bottom: 3rem; text-align: center;">Entre em Contato</h1>
    
    <!-- Contact Info -->
    <section style="margin-bottom: 4rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="font-size: 3rem; margin-bottom: 1rem; color: #3498db;">📞</div>
          <h3 style="color: #2c3e50; margin-bottom: 1rem;">Telefone</h3>
          <p style="color: #666; font-size: 1.1rem;">(11) 4004-1000</p>
          <p style="color: #999; font-size: 0.9rem;">Segunda a Sexta: 8h às 18h<br>Sábado: 8h às 14h</p>
        </div>
        
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="font-size: 3rem; margin-bottom: 1rem; color: #3498db;">📧</div>
          <h3 style="color: #2c3e50; margin-bottom: 1rem;">E-mail</h3>
          <p style="color: #666; font-size: 1.1rem;">contato@primeiraescolhaimoveis.com.br</p>
          <p style="color: #999; font-size: 0.9rem;">Respondemos em até 24h</p>
        </div>
        
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="font-size: 3rem; margin-bottom: 1rem; color: #3498db;">📍</div>
          <h3 style="color: #2c3e50; margin-bottom: 1rem;">Endereço</h3>
          <p style="color: #666; font-size: 1.1rem;">Av. Paulista, 1000<br>Bela Vista, São Paulo - SP</p>
          <p style="color: #999; font-size: 0.9rem;">CEP: 01310-100</p>
        </div>
      </div>
    </section>
    
    <!-- Contact Form -->
    <section style="margin-bottom: 4rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
        <div>
          <h2 style="color: #2c3e50; margin-bottom: 2rem;">Envie sua Mensagem</h2>
          <form @submit.prevent="submitForm" class="search-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nome Completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                  placeholder="Seu nome completo"
                >
              </div>
              
              <div class="form-group">
                <label for="email">E-mail *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="seu@email.com"
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="phone">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  placeholder="(11) 99999-9999"
                >
              </div>
              
              <div class="form-group">
                <label for="subject">Assunto</label>
                <select id="subject" v-model="form.subject">
                  <option value="">Selecione um assunto</option>
                  <option value="compra">Quero Comprar</option>
                  <option value="venda">Quero Vender</option>
                  <option value="aluguel">Quero Alugar</option>
                  <option value="avaliacao">Avaliação de Imóvel</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="message">Mensagem *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required
                rows="5"
                placeholder="Descreva como podemos ajudá-lo..."
                style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px; font-family: inherit; resize: vertical;"
              ></textarea>
            </div>
            
            <button type="submit" class="btn" style="width: 100%;" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>
            
            <p v-if="submitMessage" :style="{ color: submitSuccess ? '#27ae60' : '#e74c3c', marginTop: '1rem' }">
              {{ submitMessage }}
            </p>
          </form>
        </div>
        
        <!-- Map Placeholder -->
        <div>
          <h2 style="color: #2c3e50; margin-bottom: 2rem;">Nossa Localização</h2>
          <div style="background: #f0f0f0; height: 400px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #999; border: 2px solid #ddd;">
            <div style="text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
              <p>Mapa Interativo</p>
              <p style="font-size: 0.9rem;">Av. Paulista, 1000 - Bela Vista<br>São Paulo - SP</p>
            </div>
          </div>
          
          <!-- Quick Contact -->
          <div style="margin-top: 2rem; padding: 1.5rem; background: #3498db; color: white; border-radius: 10px;">
            <h3 style="margin-bottom: 1rem;">Precisa de Atendimento Imediato?</h3>
            <p style="margin-bottom: 1rem;">Ligue agora e fale diretamente com nossa equipe!</p>
            <a href="tel:+551140041000" style="color: white; font-size: 1.2rem; font-weight: bold; text-decoration: none;">
              📞 (11) 4004-1000
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ -->
    <section>
      <h2 style="color: #2c3e50; text-align: center; margin-bottom: 2rem;">Perguntas Frequentes</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div style="padding: 1.5rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #3498db; margin-bottom: 1rem;">Qual o horário de atendimento?</h3>
          <p style="color: #666;">Atendemos de segunda a sexta das 8h às 18h, e aos sábados das 8h às 14h. Domingos e feriados não atendemos presencialmente, mas você pode nos enviar uma mensagem pelo site.</p>
        </div>
        
        <div style="padding: 1.5rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #3498db; margin-bottom: 1rem;">Como agendar uma visita?</h3>
          <p style="color: #666;">Você pode agendar uma visita ligando para (11) 4004-1000, enviando um e-mail ou preenchendo o formulário de contato. Nossa equipe entrará em contato em até 24h.</p>
        </div>
        
        <div style="padding: 1.5rem; background: white; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #3498db; margin-bottom: 1rem;">Vocês fazem avaliação gratuita?</h3>
          <p style="color: #666;">Sim! Oferecemos avaliação gratuita do seu imóvel. Entre em contato conosco e agende uma visita técnica com nossa equipe especializada.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      submitMessage: '',
      submitSuccess: false
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      this.submitMessage = ''
      
      // Simulate form submission
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }
        
        this.submitMessage = 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        this.submitSuccess = true
      } catch (error) {
        this.submitMessage = 'Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.'
        this.submitSuccess = false
      } finally {
        this.isSubmitting = false
        
        // Clear message after 5 seconds
        setTimeout(() => {
          this.submitMessage = ''
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
</style>