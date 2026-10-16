# Arquivo XML Reduzido - dados-reduzido.xml

Este arquivo contém uma versão simplificada do feed de dados com apenas **10 imóveis selecionados**, todos com **imagens válidas** e existentes na pasta `/img/`.

## 📊 Conteúdo

### Imóveis Incluídos:

1. **PEI-AP0001** - Apartamento de Luxo 150m² no Itaim Bibi (4 fotos)
2. **PEI-AP0002** - Espaçoso Apartamento em Moema, 180m² (3 fotos)
3. **PEI-AP0003** - Cobertura Duplex nos Jardins (3 fotos)
4. **PEI-AP0004** - Apartamento Moderno na Vila Nova Conceição (2 fotos)
5. **PEI-AP0005** - Apartamento com Varanda Gourmet no Itaim (3 fotos)
6. **PEI-AP0020** - Apartamento para Aluguel em Perdizes (2 fotos)
7. **PEI-AP0021** - Apartamento Novo no Brooklin (1 foto)
8. **PEI-AP0022** - Clássico Apartamento em Higienópolis (1 foto)
9. **PEI-AP0023** - Loft Moderno na Vila Madalena (1 foto)
10. **PEI-AP0024** - Apartamento Familiar na Saúde (1 foto)

### Mix de Transações:
- **8 imóveis para venda** (For Sale)
- **2 imóveis para aluguel** (For Rent)

### Imagens Validadas:
Todas as 21 imagens referenciadas foram verificadas e existem na pasta `public/img/`:

- ✅ apartamento-luxo-1.jpg até apartamento-luxo-4.jpg
- ✅ apartamento-moema-1.jpg até apartamento-moema-3.jpg
- ✅ cobertura-jardins-1.jpg até cobertura-jardins-3.jpg
- ✅ vila-nova-1.jpg e vila-nova-2.jpg
- ✅ itaim-varanda-1.jpg até itaim-varanda-3.jpg
- ✅ perdizes-1.jpg e perdizes-2.jpg
- ✅ brooklin-1.jpg
- ✅ higienopolis-1.jpg
- ✅ vila-madalena-1.jpg
- ✅ saude-1.jpg

## 🎯 Uso Recomendado

Este arquivo é ideal para:

- **Testes rápidos** durante desenvolvimento
- **Demos e apresentações** com dados limitados
- **Desenvolvimento local** com carregamento mais rápido
- **Prototipagem** com conjunto reduzido de dados

## 🔄 Como usar

Para usar este arquivo em vez do arquivo completo, você pode:

1. **Temporariamente** renomear os arquivos:
   ```bash
   mv public/xml/dados.xml public/xml/dados-completo.xml
   mv public/xml/dados-reduzido.xml public/xml/dados.xml
   ```

2. **Ou modificar o código** para apontar para o arquivo reduzido:
   ```javascript
   // Em src/stores/propertyStore.js
   const response = await fetch(`${baseUrl}xml/dados-reduzido.xml`)
   ```

3. **Para voltar ao arquivo completo**:
   ```bash
   mv public/xml/dados.xml public/xml/dados-reduzido.xml
   mv public/xml/dados-completo.xml public/xml/dados.xml
   ```

## 📈 Performance

- **Tamanho**: ~95% menor que o arquivo completo
- **Carregamento**: Muito mais rápido
- **Memória**: Menor uso de RAM
- **Desenvolvimento**: Ideal para iteração rápida