# 🏳️‍⚧️ Projeto: Plataforma Web Inclusiva de Orientação para Pessoas Trans

## 🌐 Sistema Web Completo com Landing Page e Aplicação Interativa

Uma plataforma digital acolhedora e acessível especializada em fornecer informações sobre retificação de nome, terapia hormonal e prevenção de ISTs para a comunidade trans brasileira.

---

# 👥 Equipe: INTELI-NO-IMPACTO

| Integrante 1 | Integrante 2 | Integrante 3 | Integrante 4 |
| :----------: | :----------: | :----------: | :----------: |
| <img src="https://media.licdn.com/dms/image/v2/D4D03AQFpuCHH7zRE6w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1678716198904?e=1762992000&v=beta&t=RLdzg-MCyoqVbXLt6OSLU6LigBP3GfagPndLGp9gPmI" width="150" alt="Fernando Machado"> <br> [**Fernando Machado**](https://www.linkedin.com/in/fernando-machado-santos) | <img src="https://media.licdn.com/dms/image/v2/D4D03AQFEWbbQZVzBTA/profile-displayphoto-scale_400_400/B4DZl9519rH4Ak-/0/1758753940232?e=1762992000&v=beta&t=7O3oUlf2K3jwN66gi32vdRYfCjPyceCP_qCtPS9WVbQ" width="150" alt="Gabriel Pelinsari"> <br> [**Gabriel Pelinsari**](https://www.linkedin.com/in/gabriel-pelinsari) | <img src="https://media.licdn.com/dms/image/v2/D4D03AQF9VYDA7dTAkw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1678714840944?e=1762992000&v=beta&t=v8BNYFBASek__LV44Ie1DkBWZEUaIwizMEeOHB7eUDI" width="150" alt="João Paulo Silva"> <br> [**João Paulo Silva**](https://www.linkedin.com/in/joão-paulo-da-silva-a45229215) | <img src="https://media.licdn.com/dms/image/v2/D4D03AQHprrQcSOWJ_w/profile-displayphoto-crop_800_800/B4DZlo.DN1JgAI-/0/1758402722996?e=1762992000&v=beta&t=0vmN2_Ec3DzEdHvQoUnycjyhaNHGDTUWSRJztYcC-Cc" width="150" alt="Matheus Ribeiro"> <br> [**Matheus Ribeiro**](https://www.linkedin.com/in/omatheusrsantos) |

---

# 📖 Descrição

Este projeto nasceu da necessidade de criar uma **plataforma web acolhedora e inclusiva** para a comunidade trans brasileira. A aplicação combina uma **landing page moderna** com uma **aplicação web interativa** para fornecer informações precisas, respeitosas e personalizadas sobre três áreas principais:

- 🏥 **Retificação de Nome e Gênero**: Orientações sobre documentação, processos legais e cartórios
- 💊 **Hormonização**: Informações sobre terapia hormonal, acompanhamento médico e locais de atendimento
- 🩺 **Prevenção de ISTs**: Testagem, tratamento, PrEP, PEP e cuidados com saúde sexual

### 🎯 Diferenciais do Projeto

- **Dupla Interface**: Landing page institucional + Aplicação web completa
- **Design Responsivo**: Experiência otimizada para mobile, tablet e desktop
- **Componentes Reutilizáveis**: UI consistente com biblioteca de componentes (shadcn/ui)
- **Autenticação e Perfis**: Sistema completo de login, registro e gerenciamento de usuários
- **Chat Inteligente**: Assistente virtual com IA integrado
- **Acessibilidade**: Suporte VLibras e navegação adaptativa
- **Linguagem Inclusiva**: Tom acolhedor, emojis apropriados e terminologia respeitosa

---

# 📂 Estrutura de Pastas

```
📁 web-app/
├── 📁 landing-page/                 # Landing Page Institucional (Next.js)
│   ├── 📁 app/                      # App Router do Next.js
│   │   ├── 📄 layout.tsx            # Layout principal
│   │   ├── 📄 page.tsx              # Página inicial
│   │   └── 📄 globals.css           # Estilos globais
│   ├── 📁 components/               # Componentes React
│   │   ├── 📄 hero-section.tsx     # Seção hero
│   │   ├── 📄 how-it-works.tsx     # Como funciona
│   │   ├── 📄 testimonials.tsx     # Depoimentos
│   │   ├── 📄 faq.tsx              # Perguntas frequentes
│   │   ├── 📄 footer.tsx           # Rodapé
│   │   └── 📁 ui/                  # Componentes UI (shadcn/ui)
│   │       ├── 📄 button.tsx
│   │       ├── 📄 card.tsx
│   │       ├── 📄 accordion.tsx
│   │       └── ...                 # Mais de 40 componentes UI
│   ├── 📁 lib/
│   │   └── 📄 utils.ts             # Utilitários (cn, etc.)
│   ├── 📁 public/                  # Assets estáticos
│   ├── 📄 package.json             # Dependências do Next.js
│   ├── 📄 pnpm-lock.yaml           # Lock file (pnpm)
│   ├── 📄 tsconfig.json            # Config TypeScript
│   └── 📄 next.config.mjs          # Config Next.js
│
├── 📁 site-principal/              # Aplicação Web Principal (Vite + React)
│   ├── 📁 src/
│   │   ├── 📄 App.jsx              # Componente raiz
│   │   ├── 📄 main.jsx             # Entry point
│   │   ├── 📄 router.jsx           # Configuração de rotas
│   │   ├── 📁 pages/               # Páginas da aplicação
│   │   │   ├── 📄 Landing.jsx      # Landing integrada
│   │   │   ├── 📄 Login.jsx        # Autenticação
│   │   │   ├── 📄 Register.jsx     # Cadastro
│   │   │   ├── 📄 Dashboard.jsx    # Dashboard principal
│   │   │   ├── 📄 Chat.jsx         # Chat com IA
│   │   │   ├── 📄 Assistant.jsx    # Assistente virtual
│   │   │   ├── 📄 Articles.jsx     # Artigos informativos
│   │   │   ├── 📄 Profile.jsx      # Perfil do usuário
│   │   │   ├── 📄 Admin.jsx        # Painel administrativo
│   │   │   └── 📄 NotFound.jsx     # Página 404
│   │   ├── 📁 components/
│   │   │   ├── 📄 ProtectedRoute.jsx   # Rotas protegidas
│   │   │   ├── 📄 VLibras.jsx          # Widget de acessibilidade
│   │   │   ├── 📄 WavesFixed.jsx       # Animação de ondas
│   │   │   └── 📁 BottomNav/
│   │   │       └── 📄 BottomNav.jsx    # Navegação inferior mobile
│   │   ├── 📁 context/
│   │   │   └── 📄 AuthContext.jsx      # Contexto de autenticação
│   │   ├── 📁 lib/
│   │   │   └── 📄 api.js               # Cliente API (Supabase/Backend)
│   │   └── 📁 styles/
│   │       └── 📄 global.jsx           # Estilos globais
│   ├── 📄 index.html               # HTML base
│   ├── 📄 package.json             # Dependências do Vite
│   ├── 📄 vite.config.js           # Config Vite
│   └── 📄 eslint.config.js         # Config ESLint
│
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
└── 📄 README.md                    # Este arquivo
```

---

# 🏗️ Arquitetura do Sistema

## Componentes Principais

### 1. 🎨 Landing Page (Next.js + TypeScript)
- **Framework**: Next.js 14+ com App Router
- **Linguagem**: TypeScript para type safety
- **Componentes**:
  - Hero Section com CTA principal
  - How It Works (passo a passo)
  - Impact Numbers (estatísticas)
  - Testimonials (depoimentos)
  - FAQ (acordeão)
  - Dual CTA e Final CTA
  - Footer com links úteis
  - Floating Chat Button
- **UI Library**: shadcn/ui (40+ componentes reutilizáveis)
- **Estilização**: Tailwind CSS + CSS Modules
- **SEO**: Meta tags otimizadas, sitemap, robots.txt

### 2. 🚀 Aplicação Principal (Vite + React)
- **Build Tool**: Vite (dev server ultra-rápido)
- **Linguagem**: JavaScript (JSX)
- **Páginas**:
  - **Landing**: Página inicial integrada
  - **Login/Register**: Autenticação completa
  - **Dashboard**: Painel do usuário
  - **Chat/Conversation**: Chat em tempo real com IA
  - **Assistant**: Assistente virtual especializado
  - **Articles/ArticleDetail**: Base de conhecimento
  - **Profile/ProfileEdit**: Gerenciamento de perfil
  - **Beneficiários**: Gestão de beneficiários
  - **Admin**: Painel administrativo
- **Roteamento**: React Router com rotas protegidas
- **Estado Global**: Context API (AuthContext)
- **API Client**: Integração com Supabase/Backend
- **Acessibilidade**: VLibras para tradução em Libras

### 3. 🗄️ Backend & Banco de Dados (Supabase)
- **Database**: PostgreSQL (via Supabase)
- **Tabelas Principais**:
  - `users` - Perfis de usuários
  - `chats` - Conversas
  - `chat_messages` - Mensagens
  - `articles` - Artigos informativos
  - `beneficiarios` - Gestão de beneficiários
- **Storage**: Bucket para imagens e arquivos
- **Auth**: Supabase Auth (email/password, OAuth)
- **Real-time**: Subscriptions para chat ao vivo

### 4. 🧠 Inteligência Artificial
- **Modelo**: OpenAI GPT-4o-mini
- **Uso**: Chatbot conversacional no Assistant/Chat
- **Personalização**: Reconhecimento de contexto e histórico
- **Temperatura**: 0.7 (equilíbrio entre criatividade e precisão)

---

# 🔧 Tecnologias Utilizadas

## Frontend - Landing Page
- **Next.js** (14+) - Framework React com SSR/SSG
- **TypeScript** (5+) - Superset JavaScript com tipagem
- **Tailwind CSS** (3+) - Framework CSS utility-first
- **shadcn/ui** - Biblioteca de componentes UI
- **Radix UI** - Primitivos acessíveis para componentes
- **Lucide React** - Ícones modernos

## Frontend - Aplicação Principal
- **Vite** (5+) - Build tool ultra-rápido
- **React** (18+) - Biblioteca para interfaces
- **React Router** (6+) - Roteamento SPA
- **Axios/Fetch** - Cliente HTTP
- **Context API** - Gerenciamento de estado

## Backend & Infraestrutura
- **Supabase** - Backend-as-a-Service (PostgreSQL + Auth + Storage)
- **PostgreSQL** - Banco de dados relacional
- **OpenAI API** - Processamento de linguagem natural

## DevOps & Ferramentas
- **pnpm** - Gerenciador de pacotes (landing-page)
- **npm** - Gerenciador de pacotes (site-principal)
- **ESLint** - Linter JavaScript/TypeScript
- **Git** - Controle de versão
- **Conventional Commits** - Padrão de commits

---

# ⚙️ Requisitos

## Hardware Mínimo
- **Processador**: Dual-core 2.0 GHz ou superior
- **Memória RAM**: Mínimo 4GB (recomendado 8GB+)
- **Armazenamento**: 1GB de espaço livre
- **Conexão Internet**: Necessária para desenvolvimento e produção

## Software
- **Node.js**: Versão 18+ (recomendado LTS)
- **pnpm**: Versão 8+ (para landing-page)
- **npm**: Incluído com Node.js (para site-principal)
- **Git**: Para clonar o repositório
- **Navegador Web**: Chrome, Firefox, Edge ou Safari (versões atualizadas)
- **Sistema Operacional**: Windows 10/11, macOS 10.14+, ou Linux (Ubuntu 20.04+)

## Contas e Chaves Necessárias
- **Conta Supabase** (projeto configurado)
- **Conta OpenAI** com API Key (para chat IA)
- **Conta Vercel/Netlify** (opcional, para deploy)

---

# 🚀 Instruções para Execução

## 1. Clone o Repositório

```powershell
git clone https://github.com/INTELI-NO-IMPACTO/web-app.git
cd web-app
```

## 2. Configure a Landing Page (Next.js)

### Navegue para a pasta:
```powershell
cd landing-page
```

### Instale as dependências:
```powershell
# Com pnpm (recomendado)
pnpm install

# Ou com npm
npm install
```

### Configure variáveis de ambiente (opcional):
Crie um arquivo `landing-page/.env.local`:

```env
# Exemplo (ajuste conforme necessário)
NEXT_PUBLIC_API_URL=http://localhost:5173
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Execute em modo desenvolvimento:
```powershell
# Com pnpm
pnpm dev

# Ou com npm
npm run dev
```

✅ **Landing page rodando em**: `http://localhost:3000`

### Build para produção:
```powershell
# Com pnpm
pnpm build
pnpm start

# Ou com npm
npm run build
npm start
```

---

## 3. Configure a Aplicação Principal (Vite + React)

### Navegue para a pasta (abra um novo terminal):
```powershell
cd site-principal
```

### Instale as dependências:
```powershell
npm install
```

### Configure variáveis de ambiente:
Crie um arquivo `site-principal/.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# OpenAI API (se usado no frontend)
VITE_OPENAI_API_KEY=sk-proj-your-api-key-here

# API Backend (se separado)
VITE_API_URL=http://localhost:8000
```

### Como Obter as Chaves:

**Supabase:**
1. Acesse [supabase.com](https://supabase.com/)
2. Crie um novo projeto
3. Vá em **Settings > API**
4. Copie a **URL** e a **anon/public key**

**OpenAI API Key:**
1. Acesse [platform.openai.com](https://platform.openai.com/)
2. Faça login ou crie uma conta
3. Vá em **API Keys** e clique em **Create new secret key**

### Execute em modo desenvolvimento:
```powershell
npm run dev
```

✅ **Aplicação rodando em**: `http://localhost:5173`

### Build para produção:
```powershell
npm run build

# Para testar o build localmente:
npm install -g serve
serve -s dist
```

---

## 4. Configure o Banco de Dados (Supabase)

### Estrutura das Tabelas (SQL)

Execute no **SQL Editor** do Supabase:

```sql
-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    social_name VARCHAR(255),
    pronoun VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de chats
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    title VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de artigos
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author_id UUID REFERENCES users(id),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de beneficiários
CREATE TABLE beneficiarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    relationship VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_chats_user_id ON chats(user_id);
CREATE INDEX idx_chats_session_id ON chats(session_id);
CREATE INDEX idx_chat_messages_chat_id ON chat_messages(chat_id);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_beneficiarios_user_id ON beneficiarios(user_id);
```

### Configuração do Storage Bucket

1. No Supabase, vá em **Storage**
2. Crie um bucket chamado `avatars` (público)
3. Crie um bucket chamado `articles-media` (público ou privado)
4. Configure políticas de acesso (RLS - Row Level Security)

### Políticas de Segurança (RLS)

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Política: Usuários podem ver apenas seus próprios chats
CREATE POLICY "Users can view own chats" ON chats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON chat_messages
    FOR SELECT USING (
        chat_id IN (SELECT id FROM chats WHERE user_id = auth.uid())
    );
```

---

## 5. Rodando Ambos Simultaneamente (Desenvolvimento)

### Opção A: Dois terminais PowerShell

**Terminal 1 - Landing Page:**
```powershell
cd landing-page
pnpm dev
```

**Terminal 2 - Aplicação Principal:**
```powershell
cd site-principal
npm run dev
```

### Opção B: Script Único (Opcional)

Crie um arquivo `start-dev.ps1` na raiz:

```powershell
# start-dev.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd landing-page; pnpm dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd site-principal; npm run dev"
```

Execute:
```powershell
.\start-dev.ps1
```

---

# 🌐 Estrutura de URLs

## Desenvolvimento

| Aplicação | URL | Porta |
|-----------|-----|-------|
| Landing Page | `http://localhost:3000` | 3000 |
| Aplicação Principal | `http://localhost:5173` | 5173 |

## Produção (Exemplo)

| Aplicação | URL Sugerida |
|-----------|--------------|
| Landing Page | `https://www.seudominio.com` |
| Aplicação Principal | `https://app.seudominio.com` |

---

# 📡 Funcionalidades Implementadas

## Landing Page (Next.js)

✅ **Hero Section**: CTA principal com animações  
✅ **How It Works**: Seção explicativa em 3 passos  
✅ **Impact Numbers**: Estatísticas com contadores animados  
✅ **Testimonials**: Carrossel de depoimentos  
✅ **FAQ**: Acordeão com perguntas frequentes  
✅ **Dual CTA**: Duas chamadas para ação estratégicas  
✅ **Floating Chat Button**: Botão fixo de chat  
✅ **Footer**: Links, redes sociais e informações  
✅ **Theme Provider**: Suporte a tema claro/escuro  
✅ **Transparency**: Seção sobre transparência do projeto

## Aplicação Principal (Vite)

✅ **Autenticação**: Login, registro e recuperação de senha  
✅ **Dashboard**: Painel principal do usuário  
✅ **Chat com IA**: Conversação em tempo real  
✅ **Assistant**: Assistente virtual especializado  
✅ **Artigos**: Base de conhecimento categorizada  
✅ **Perfil de Usuário**: Edição completa de perfil  
✅ **Beneficiários**: Gestão de beneficiários  
✅ **Admin Panel**: Painel administrativo  
✅ **Rotas Protegidas**: Sistema de autenticação  
✅ **Bottom Nav**: Navegação inferior para mobile  
✅ **VLibras**: Widget de acessibilidade em Libras  
✅ **404 Page**: Página de erro personalizada

---

# 🧪 Testando o Sistema

## Teste da Landing Page

1. Acesse `http://localhost:3000`
2. Navegue pelas seções (Hero, How It Works, FAQ, etc.)
3. Teste o tema claro/escuro
4. Clique no botão flutuante de chat
5. Verifique responsividade (mobile/tablet/desktop)

## Teste da Aplicação Principal

### Sem Autenticação:
1. Acesse `http://localhost:5173`
2. Visualize a landing page integrada
3. Clique em "Entrar" ou "Registrar"

### Com Autenticação:
1. Crie uma conta em `/register`
2. Faça login em `/login`
3. Acesse o Dashboard (`/dashboard`)
4. Teste o Chat (`/chat`) e Assistant (`/assistant`)
5. Visualize artigos (`/articles`)
6. Edite seu perfil (`/profile`)
7. Teste VLibras (botão de acessibilidade)

### Teste do Chat com IA:
```javascript
// Exemplo de mensagem
"Como faço para retificar meu nome?"
"Onde encontro locais de hormonização?"
"Preciso de informações sobre PrEP"
```

---

# 📊 Fluxo de Navegação

## Landing Page → Aplicação

```
Landing Page (localhost:3000)
    ↓ [Clica em "Começar"]
Aplicação Principal (localhost:5173)
    ↓ [Sem autenticação]
Landing Integrada → Login/Register
    ↓ [Com autenticação]
Dashboard → Chat/Assistant/Articles/Profile
```

## Fluxo de Autenticação

```
Register → Supabase Auth → Email Verification (opcional)
    ↓
Login → Supabase Auth → JWT Token
    ↓
AuthContext → Protected Routes → Dashboard
```

---

# 🎨 Personalização e Temas

## Configuração de Cores (Tailwind)

Edite `landing-page/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
        accent: '#your-color',
      }
    }
  }
}
```

## Theme Provider (Dark Mode)

Já implementado em `landing-page/components/theme-provider.tsx`:
- Suporte automático a tema claro/escuro
- Persiste preferência do usuário
- Detecta preferência do sistema

---

# 🔐 Segurança e Privacidade

## Boas Práticas Implementadas

✅ **Variáveis de ambiente** para credenciais sensíveis  
✅ **Row Level Security (RLS)** no Supabase  
✅ **JWT Authentication** com refresh tokens  
✅ **HTTPS obrigatório** em produção  
✅ **Input validation** em formulários  
✅ **XSS Protection** com sanitização  
✅ **CORS configurado** adequadamente  
✅ **Rate limiting** (implementar em produção)

## Proteção de Dados (LGPD)

- Dados de usuários armazenados com segurança no Supabase
- Histórico de conversas isolado por usuário
- Política de privacidade implementada
- Termo de uso disponível
- Direito ao esquecimento (delete cascade)

---

# 🚀 Deploy em Produção

## Landing Page (Next.js)

### Vercel (Recomendado)
```powershell
# Instale a CLI da Vercel
npm install -g vercel

# Na pasta landing-page
cd landing-page
vercel

# Siga as instruções interativas
```

**Configuração:**
- Build Command: `pnpm build` ou `npm run build`
- Output Directory: `.next`
- Install Command: `pnpm install` ou `npm install`

### Netlify
```powershell
# Na pasta landing-page
cd landing-page

# Instale a CLI da Netlify
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Configuração:
# Build command: pnpm build
# Publish directory: .next
```

---

## Aplicação Principal (Vite)

### Vercel
```powershell
# Na pasta site-principal
cd site-principal
vercel

# Configuração:
# Build Command: npm run build
# Output Directory: dist
```

### Netlify
```powershell
# Na pasta site-principal
cd site-principal
netlify deploy --prod

# Configuração:
# Build command: npm run build
# Publish directory: dist
```

### Build Manual + Hosting Próprio
```powershell
# Build
cd site-principal
npm run build

# O diretório 'dist/' contém os arquivos estáticos
# Faça upload para seu servidor web (Apache, Nginx, etc.)
```

---

## Docker (Opcional)

### Dockerfile para Landing Page:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY landing-page/package*.json ./
RUN npm install
COPY landing-page/ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]
```

### Dockerfile para Aplicação Principal:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY site-principal/package*.json ./
RUN npm install
COPY site-principal/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose:
```yaml
version: '3.8'

services:
  landing:
    build:
      context: .
      dockerfile: landing-page/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5173

  app:
    build:
      context: .
      dockerfile: site-principal/Dockerfile
    ports:
      - "5173:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

---

# 🛠️ Troubleshooting

## Problemas Comuns

### ❌ Erro: "Module not found" ao rodar landing-page
**Solução:** 
```powershell
cd landing-page
Remove-Item -Recurse -Force node_modules
Remove-Item -Force pnpm-lock.yaml
pnpm install
```

### ❌ Erro: "Port 3000 already in use"
**Solução:** 
```powershell
# Mude a porta no package.json ou mate o processo:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou use outra porta:
pnpm dev -- -p 3001
```

### ❌ Erro: "Vite: Port 5173 already in use"
**Solução:**
```powershell
# Mate o processo ou use outra porta:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Ou configure no vite.config.js:
# server: { port: 5174 }
```

### ❌ Erro: "Supabase connection failed"
**Solução:**
1. Verifique se `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão corretos no `.env`
2. Confirme que o projeto Supabase está ativo
3. Teste a conexão via Supabase Dashboard
4. Verifique se o arquivo `.env` está na raiz de `site-principal/`

### ❌ Erro: "OpenAI API rate limit exceeded"
**Solução:**
1. Verifique seu plano na OpenAI
2. Implemente cache de respostas
3. Adicione rate limiting no frontend
4. Considere usar um backend intermediário

### ❌ Erro ao fazer build: "Out of memory"
**Solução:**
```powershell
# Aumente o limite de memória do Node:
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

# 📚 Documentação Adicional

## Tecnologias Principais

- [Next.js Documentation](https://nextjs.org/docs) - Documentação oficial do Next.js
- [Vite Documentation](https://vitejs.dev/) - Documentação oficial do Vite
- [React Documentation](https://react.dev/) - Documentação oficial do React
- [Supabase Documentation](https://supabase.com/docs) - Documentação oficial do Supabase
- [Tailwind CSS](https://tailwindcss.com/docs) - Documentação do Tailwind
- [shadcn/ui](https://ui.shadcn.com/) - Biblioteca de componentes UI

## Guias e Tutoriais

- [Como configurar Supabase Auth](https://supabase.com/docs/guides/auth)
- [Deploy Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Deploy Vite na Netlify](https://docs.netlify.com/configure-builds/common-configurations/vite/)

---

# 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **Fork** do projeto
2. Crie uma **branch** para sua feature:
   ```powershell
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** suas mudanças:
   ```powershell
   git commit -m 'feat: add amazing feature'
   ```
4. Faça **Push** para a branch:
   ```powershell
   git push origin feature/AmazingFeature
   ```
5. Abra um **Pull Request**

## Padrão de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (sem mudança de código)
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Manutenção (build, dependências, etc.)

**Exemplos:**
```
feat(chat): add voice message support
fix(auth): resolve login redirect issue
docs(readme): update installation steps
```

---

# 📄 Licença

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
  <a property="dct:title" rel="cc:attributionURL" href="https://github.com/INTELI-NO-IMPACTO/web-app">
    Plataforma Web Inclusiva Trans
  </a> by 
  <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br/">
    Inteli - Instituto de Tecnologia e Liderança
  </a> is licensed under 
  <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">
    CC BY 4.0
    <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
    <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
  </a>
</p>

---

# 📞 Contato e Suporte

## Equipe

- **Fernando Machado**: [fernando.machado.ismart@gmail.com](mailto:fernando.machado.ismart@gmail.com)
- **Gabriel Pelinsari**: [gabriel.pelinsari.projetos@gmail.com](mailto:gabriel.pelinsari.projetos@gmail.com)
- **João Paulo da Silva**: [joaopaulo.silva.ismart@gmail.com](mailto:joaopaulo.silva.ismart@gmail.com)
- **Matheus Ribeiro**: [matheus.ribeiro@sou.inteli.edu.br](mailto:matheus.ribeiro@sou.inteli.edu.br)

## Links

- **GitHub**: [INTELI-NO-IMPACTO](https://github.com/INTELI-NO-IMPACTO)
- **Organização**: [Inteli - Instituto de Tecnologia e Liderança](https://www.inteli.edu.br/)

---

# 🎯 Roadmap Futuro

## Melhorias Planejadas

- [ ] **Internacionalização (i18n)**: Suporte multi-idioma
- [ ] **PWA**: Transformar em Progressive Web App
- [ ] **Notificações Push**: Alertas em tempo real
- [ ] **Gamificação**: Sistema de conquistas e pontos
- [ ] **Calendário**: Agendamento de consultas
- [ ] **Mapa Interativo**: Localização de serviços
- [ ] **Fórum**: Comunidade de discussão
- [ ] **Chat em Grupo**: Salas de conversa temáticas
- [ ] **Upload de Documentos**: Armazenamento seguro
- [ ] **Relatórios PDF**: Geração de relatórios personalizados
- [ ] **Integração com Telegram**: Bot integrado
- [ ] **Analytics**: Dashboard de métricas de uso
- [ ] **Testes Automatizados**: Jest + Cypress
- [ ] **CI/CD**: GitHub Actions automatizado
- [ ] **Monitoramento**: Sentry para error tracking

---

# 📊 Scripts Úteis

## Landing Page (Next.js)

```powershell
cd landing-page

# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Lint
pnpm lint

# Type check
pnpm type-check
```

## Aplicação Principal (Vite)

```powershell
cd site-principal

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Format (se configurado)
npm run format
```

---

<p align="center">
  <br>
  Feito com 💜 pela equipe <strong>INTELI-NO-IMPACTO</strong>
  <br>
  <em>Tecnologia com propósito, acolhimento e respeito</em>
  <br><br>
  <a href="#-projeto-plataforma-web-inclusiva-de-orientação-para-pessoas-trans">⬆ Voltar ao topo</a>
</p>
