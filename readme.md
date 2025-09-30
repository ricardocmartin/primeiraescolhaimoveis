# Site da Imobiliária Fictícia "Primeira Escolha Imóveis"

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Static Data](https://img.shields.io/badge/Data-Static%20XML-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Funcionando-green?style=for-the-badge)

Este repositório contém o código-fonte para o site da **Primeira Escolha Imóveis**, uma imobiliária fictícia criada como um cenário de testes realista (sandboxing) para produtos e demonstrações no ecossistema OLX Brasil.

## ✅ Status da Implementação

✅ **Estrutura Base Criada**: Aplicação Vue.js 3 totalmente funcional  
✅ **Página Inicial**: Hero section, busca rápida e destaques  
✅ **Página de Busca**: Filtros avançados, ordenação e paginação  
✅ **Página Sobre**: História da empresa, equipe e valores  
✅ **Página de Contato**: Formulário, mapa e informações  
✅ **Detalhes do Imóvel**: Página completa com galeria e contato  
✅ **Carregamento de Dados**: Parser XML integrado  
✅ **Roteamento**: Vue Router configurado  
✅ **Design Responsivo**: Mobile-friendly  

🚀 **Aplicação rodando em**: http://localhost:5173

## 🏢 Sobre o Projeto

A **Primeira Escolha Imóveis** é a nossa versão da "Contoso" da Microsoft. É uma entidade totalmente fictícia, projetada para simular uma imobiliária moderna e tecnológica que atua na Região Metropolitana de São Paulo.

**O propósito deste site é:**
* Servir como uma plataforma de demonstração viva e interativa.
* Permitir testes de novas ferramentas e funcionalidades em um ambiente que se assemelha ao de um cliente real.
* Criar um repositório de front-end que possa ser usado como base para diversos projetos e provas de conceito.

## ✨ Funcionalidades e Estrutura do Site

O site será uma aplicação de página única (SPA) desenvolvida em **Vue.js**. A base de dados será o arquivo `carga_vivareal.xml` presente neste repositório, que será lido e processado pela aplicação no lado do cliente.

A estrutura do site será composta pelas seguintes páginas:

### 1. Página Principal (Home)
A porta de entrada do site, focada em capturar a atenção do usuário e facilitar a busca inicial.
* **Componentes Principais:**
    * **Hero Section:** Uma imagem ou vídeo de destaque com o slogan da imobiliária.
    * **Barra de Busca Principal:** Campos para buscar imóveis por `Finalidade (Venda/Aluguel)`, `Cidade`, `Bairro` e `Tipo de Imóvel`.
    * **Listagens em Destaque:** Seções com carrosséis de imóveis selecionados, como "Destaques para Venda" e "Oportunidades de Aluguel".
    * **Chamada para Ação (CTA):** Botões que direcionam para a página de busca ou de contato.

### 2. Página de Resultados da Busca
Esta página exibirá os imóveis que correspondem aos critérios de busca do usuário, com ferramentas de filtragem avançada.
* **Componentes Principais:**
    * **Grid de Imóveis:** Uma lista de cards, cada um mostrando a foto principal do imóvel, tipo, bairro, área, quartos e preço.
    * **Filtros Avançados:** Uma barra lateral com filtros para refinar a busca por:
        * Faixa de preço
        * Número de quartos
        * Número de banheiros
        * Vagas de garagem
        * Área útil
    * **Ordenação:** Opção para ordenar os resultados por preço (maior/menor), data de cadastro, etc.
    * **Paginação:** Para navegar entre múltiplas páginas de resultados.

### 3. Página de Detalhes do Imóvel
Visão completa de um único imóvel selecionado pelo usuário.
* **Componentes Principais:**
    * **Galeria de Fotos:** Um carrossel com todas as imagens do imóvel.
    * **Informações Principais:** Título, preço, condomínio, IPTU e endereço.
    * **Descrição Completa:** O texto descritivo do imóvel.
    * **Tabela de Detalhes:** Área, quartos, suítes, banheiros, vagas.
    * **Informações de Contato do Corretor:** Um formulário para enviar uma mensagem diretamente ao corretor responsável.
    * **Mapa de Localização:** Um mapa interativo mostrando a localização do imóvel.

### 4. Página "Sobre a Empresa"
Apresenta a história e a equipe da imobiliária para gerar confiança e credibilidade.
* **Componentes Principais:**
    * **Texto Institucional:** Missão, visão e valores da "Primeira Escolha Imóveis".
    * **Apresentação da Equipe:** Fotos e mini-biografias dos gerentes (Ricardo Almeida e Carolina Santos) e talvez de alguns corretores.
    * **Nosso Escritório:** Fotos do "escritório" fictício.

### 5. Página de Contato
Centraliza todas as formas de entrar em contato com a imobiliária.
* **Componentes Principais:**
    * **Formulário de Contato Geral.**
    * **Endereço Fictício** com mapa incorporado.
    * **Telefone e Email** de contato fictícios.

## 💻 Tecnologias Utilizadas

* **Framework Front-end:** [Vue.js](https://vuejs.org/) (versão 3 com Composition API).
* **Roteamento:** Vue Router.
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) ou outra biblioteca de componentes (a ser definida).
* **Fonte de Dados:** Arquivo estático `carga_vivareal.xml`.
* **Parsing do XML:** Será utilizada uma biblioteca como `xml2js` ou o `DOMParser` nativo do navegador para converter o XML em JSON.

## 📊 Fonte de Dados

Este projeto **não utiliza um banco de dados tradicional**. A aplicação foi projetada para ser totalmente estática.

O fluxo de dados é o seguinte:
1.  Ao iniciar a aplicação, o arquivo `public/carga_vivareal.xml` é requisitado.
2.  O conteúdo do XML é parseado e convertido para um objeto/array JSON em memória.
3.  Todas as buscas, filtros e exibições de dados no site irão operar sobre este conjunto de dados em memória, proporcionando uma experiência extremamente rápida para o usuário.

## 🚀 Como Começar

Siga os passos abaixo para configurar e executar o projeto localmente.

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/seu-usuario/primeira-escolha-imoveis.git](https://github.com/seu-usuario/primeira-escolha-imoveis.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```sh
    cd primeira-escolha-imoveis
    ```

3.  **Instale as dependências:**
    ```sh
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```
5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no terminal).

## 🌐 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages. O processo funciona da seguinte forma:

### Deploy Automático
- Sempre que houver um push na branch `main`, o GitHub Actions irá:
  1. Instalar as dependências
  2. Fazer o build do projeto
  3. Fazer deploy na branch `gh-pages`
  
### Deploy Manual
Você também pode fazer deploy manualmente:

```sh
npm run deploy
```

### Configuração no GitHub
1. Vá para as configurações do seu repositório no GitHub
2. Na seção "Pages", selecione:
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`

O site ficará disponível em: `https://seu-usuario.github.io/primeiraescolhaimoveis/`

