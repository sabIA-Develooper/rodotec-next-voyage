# Prompt para Implementação de Notificações por Email no Backend

## Contexto do Projeto

Você está trabalhando no backend de um sistema de catálogo de produtos industriais (implementos rodoviários) com painel administrativo. O frontend está em React/TypeScript e o backend precisa implementar um sistema de notificações por email para novos orçamentos.

## Requisitos Funcionais

### 1. Sistema de Envio de Emails

Implementar um serviço de email utilizando **Nodemailer** ou biblioteca similar que suporte:

- Configuração SMTP (Gmail, SendGrid, AWS SES, ou outro provedor)
- Templates de email HTML para notificações
- Fila de emails (opcional mas recomendado para escalabilidade)
- Retry logic para falhas de envio
- Logs de emails enviados

### 2. Trigger de Notificação ao Criar Orçamento

Quando um novo orçamento for criado via API pública (`POST /api/quotes`), o sistema deve:

1. Verificar se as notificações estão habilitadas (buscar configuração no banco de dados)
2. Se habilitado, buscar lista de emails de vendedores/administradores
3. Enviar email para cada vendedor notificando sobre o novo orçamento
4. Não bloquear a resposta da API - executar envio de forma assíncrona

**Endpoint afetado:**
```
POST /api/quotes
```

### 3. API de Configurações (Settings)

Criar novos endpoints para gerenciar configurações do sistema:

#### GET /api/settings
Retorna as configurações atuais do sistema.

**Response:**
```json
{
  "sucesso": true,
  "dados": {
    "notificacoes": {
      "avisarNovosOrcamentos": true
    },
    "empresa": {
      "nome": "Nome da Empresa",
      "cnpj": "00.000.000/0000-00",
      "endereco": "Endereço completo",
      "telefone": "(00) 00000-0000",
      "email": "contato@empresa.com.br"
    },
    "aparencia": {
      "corPrimaria": "#0D47A1",
      "corFundo": "#FFFFFF",
      "logoUrl": "https://...",
      "faviconUrl": "https://..."
    }
  }
}
```

#### PUT /api/settings
Atualiza as configurações do sistema (requer autenticação de admin).

**Request:**
```json
{
  "notificacoes": {
    "avisarNovosOrcamentos": false
  },
  "empresa": {
    "email": "novo@email.com"
  }
}
```

**Response:**
```json
{
  "sucesso": true,
  "dados": {
    // configurações atualizadas
  }
}
```

#### POST /api/settings/test-email
Envia um email de teste para verificar se a configuração SMTP está funcionando.

**Request:**
```json
{
  "email": "teste@exemplo.com"
}
```

**Response:**
```json
{
  "sucesso": true,
  "dados": {
    "success": true,
    "message": "Email de teste enviado com sucesso!"
  }
}
```

### 4. Modelo de Dados

#### Collection: `settings`
```javascript
{
  _id: ObjectId,
  notificacoes: {
    avisarNovosOrcamentos: Boolean, // default: true
  },
  empresa: {
    nome: String,
    cnpj: String,
    endereco: String,
    telefone: String,
    email: String,
  },
  aparencia: {
    corPrimaria: String, // default: "#0D47A1"
    corFundo: String,    // default: "#FFFFFF"
    logoUrl: String,
    faviconUrl: String,
  },
  updatedAt: Date,
  createdAt: Date,
}
```

**Importante:** Deve haver apenas um documento de configurações no sistema (singleton pattern).

### 5. Destinatários dos Emails

Os emails de notificação devem ser enviados para:

1. **Todos os usuários administradores** (role: 'admin')
   - Buscar do collection `users` onde `role === 'admin'`
   - Usar o campo `email` de cada admin

2. **Email da empresa** (configurável)
   - Email configurado em `settings.empresa.email`

### 6. Template de Email de Notificação

O email deve conter as seguintes informações do orçamento:

**Assunto:** "Novo Orçamento Recebido - [Nome do Cliente]"

**Corpo do Email (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    /* Estilos para o email */
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #3B4BA8; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
    .button { display: inline-block; background: #3B4BA8; color: white; padding: 12px 24px;
              text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 Novo Orçamento Recebido</h1>
    </div>

    <div class="content">
      <p>Um novo orçamento foi solicitado através do site:</p>

      <div class="field">
        <div class="label">Nome do Cliente:</div>
        <div class="value">{{nome}}</div>
      </div>

      <div class="field">
        <div class="label">Email:</div>
        <div class="value">{{email}}</div>
      </div>

      <div class="field">
        <div class="label">Telefone:</div>
        <div class="value">{{telefone}}</div>
      </div>

      {{#if empresa}}
      <div class="field">
        <div class="label">Empresa:</div>
        <div class="value">{{empresa}}</div>
      </div>
      {{/if}}

      {{#if produto}}
      <div class="field">
        <div class="label">Produto de Interesse:</div>
        <div class="value">{{produto}}</div>
      </div>
      {{/if}}

      <div class="field">
        <div class="label">Mensagem:</div>
        <div class="value">{{mensagem}}</div>
      </div>

      <div class="field">
        <div class="label">Data da Solicitação:</div>
        <div class="value">{{data}}</div>
      </div>

      <a href="{{adminUrl}}/admin/orcamentos" class="button">
        Ver no Painel Administrativo
      </a>
    </div>

    <div class="footer">
      <p>Este é um email automático do sistema de gerenciamento Rodotec.</p>
      <p>Para desativar estas notificações, acesse as configurações do painel administrativo.</p>
    </div>
  </div>
</body>
</html>
```

### 7. Configurações de Ambiente

Adicionar as seguintes variáveis de ambiente ao arquivo `.env`:

```env
# Configurações de Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
EMAIL_FROM=noreply@rodotec.com.br
EMAIL_FROM_NAME=Sistema Rodotec

# URL do frontend para links no email
FRONTEND_URL=http://localhost:5173
```

### 8. Fluxo de Execução

```
1. Cliente preenche formulário de orçamento no site
   ↓
2. POST /api/quotes recebe dados
   ↓
3. Valida e salva orçamento no banco de dados
   ↓
4. Retorna resposta 200 OK para o cliente (não bloqueia)
   ↓
5. [Assíncrono] Verifica settings.notificacoes.avisarNovosOrcamentos
   ↓
6. Se true: Busca lista de emails (admins + empresa)
   ↓
7. Para cada email: Renderiza template e envia
   ↓
8. Loga resultado (sucesso/erro) no console
```

### 9. Tratamento de Erros

- Se o envio de email falhar, **NÃO** deve afetar o salvamento do orçamento
- Implementar retry (3 tentativas com intervalo de 5s)
- Logar erros de envio de email para monitoramento
- Se SMTP não estiver configurado, apenas logar warning (não crashar a aplicação)

### 10. Segurança

- Endpoints de settings requerem autenticação JWT
- Apenas usuários com `role: 'admin'` podem modificar settings
- Sanitizar inputs de email para prevenir injeção
- Validar emails com regex antes de enviar

## Estrutura de Arquivos Sugerida

```
backend/
├── src/
│   ├── models/
│   │   └── Settings.js          // Modelo Mongoose para configurações
│   ├── services/
│   │   └── emailService.js      // Serviço de envio de emails
│   ├── templates/
│   │   └── quoteNotification.html  // Template do email
│   ├── routes/
│   │   └── settings.routes.js   // Rotas de configurações
│   ├── controllers/
│   │   └── settings.controller.js
│   └── middleware/
│       └── isAdmin.js           // Middleware para verificar admin
```

## Bibliotecas Recomendadas

```json
{
  "dependencies": {
    "nodemailer": "^6.9.0",
    "handlebars": "^4.7.8",    // Para templates de email
    "validator": "^13.11.0"    // Para validação de emails
  }
}
```

## Exemplo de Uso do Nodemailer

```javascript
const nodemailer = require('nodemailer');

// Criar transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Função para enviar email
async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}
```

## Checklist de Implementação

- [ ] Instalar dependências (nodemailer, handlebars, validator)
- [ ] Criar modelo Settings no MongoDB
- [ ] Criar serviço de email (emailService.js)
- [ ] Criar template HTML de notificação
- [ ] Implementar rotas GET/PUT /api/settings
- [ ] Implementar POST /api/settings/test-email
- [ ] Adicionar middleware de admin para rotas de settings
- [ ] Modificar POST /api/quotes para disparar notificação
- [ ] Adicionar variáveis de ambiente ao .env
- [ ] Testar envio de email de teste
- [ ] Testar criação de orçamento com notificação
- [ ] Testar toggle on/off de notificações
- [ ] Implementar logs adequados
- [ ] Documentar API no README

## Notas Importantes

1. **Performance:** O envio de emails deve ser assíncrono para não bloquear a resposta da API
2. **Configuração Inicial:** Criar um documento de settings padrão na primeira execução
3. **Gmail:** Se usar Gmail, habilitar "Acesso a apps menos seguros" ou usar senha de app
4. **Produção:** Considerar usar serviços como SendGrid, AWS SES, ou Mailgun para maior confiabilidade
5. **Queue:** Para alta demanda, considerar implementar fila com Bull ou BeeQueue

## Pronto para Frontend

O frontend já está preparado com:
- ✅ API service (`api.settings.get()`, `api.settings.update()`, `api.settings.testEmail()`)
- ✅ Interface de configurações (`AdminConfiguracoes.tsx`)
- ✅ Toggle para ativar/desativar notificações
- ✅ Lista de usuários administradores com emails

Após implementar o backend conforme este prompt, o sistema estará completo e funcional! 🚀
