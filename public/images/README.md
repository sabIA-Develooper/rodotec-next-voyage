# Imagens do Site RODOTEC

## 📁 Estrutura de Pastas

```
public/images/
├── logo/
│   └── rodotec.png          # Logo principal da RODOTEC (fundo azul)
└── partners/
    ├── tka.png              # Logo TKA
    └── silpa.png            # Logo SILPA
```

## 🖼️ Como Adicionar as Imagens

### 1. Logo Principal da RODOTEC
- **Arquivo**: A imagem 3 que você enviou (RODOTEC - Equipamentos Rodoviários, fundo azul)
- **Destino**: Salvar como `public/images/logo/rodotec.png`
- **Formato recomendado**: PNG com transparência ou JPG
- **Dimensões recomendadas**: Mínimo 400px de largura para manter qualidade
- **Uso**: Navbar, Footer, AdminLogin, AdminLayout

### 2. Logo TKA (Parceiro)
- **Arquivo**: A imagem 1 que você enviou
- **Destino**: Salvar como `public/images/partners/tka.png`
- **Formato recomendado**: PNG com fundo transparente (se disponível)
- **Dimensões recomendadas**: Proporcional, altura máxima 150px
- **Uso**: Seção de Parcerias na Home

### 3. Logo SILPA (Parceiro)
- **Arquivo**: A imagem 2 que você enviou (logo azul SILPA)
- **Destino**: Salvar como `public/images/partners/silpa.png`
- **Formato recomendado**: PNG com fundo transparente
- **Dimensões recomendadas**: Proporcional, altura máxima 150px
- **Uso**: Seção de Parcerias na Home

## ✅ Checklist de Instalação

- [ ] Copiar imagem RODOTEC para `public/images/logo/rodotec.png`
- [ ] Copiar imagem TKA para `public/images/partners/tka.png`
- [ ] Copiar imagem SILPA para `public/images/partners/silpa.png`
- [ ] Verificar se as imagens aparecem corretamente na Home
- [ ] Verificar se a logo RODOTEC aparece no Navbar
- [ ] Verificar se a logo RODOTEC aparece no Footer
- [ ] Verificar responsividade mobile

## 🎨 Otimizações Aplicadas

- **Lazy loading**: As logos de parceiros usam `loading="lazy"` para melhor performance
- **Alt text**: Todas as imagens têm texto alternativo para acessibilidade
- **Responsive**: As imagens se adaptam automaticamente ao tamanho da tela
- **Hover effects**: Efeitos sutis ao passar o mouse (scale, brightness)

## 📝 Notas Técnicas

- As imagens são referenciadas a partir de `/images/...` (relativo à pasta `public/`)
- Se preferir usar SVG (recomendado para logos), basta trocar a extensão `.png` por `.svg` nos arquivos e no código
- O componente `RodotecLogo` centraliza todas as referências à logo principal
- A seção `PartnersSection` gerencia a exibição das logos de parceiros

## 🔄 Se precisar trocar as imagens depois

1. **Logo RODOTEC**: Substitua o arquivo em `public/images/logo/rodotec.png`
2. **Logos de parceiros**: Substitua os arquivos em `public/images/partners/`
3. **Adicionar mais parceiros**: Edite o array `partners` em `/src/components/home/PartnersSection.tsx`
