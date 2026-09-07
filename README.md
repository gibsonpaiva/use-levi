# USE LEVI ⚡
> **Automações Inteligentes, Softwares Sob Demanda & Dashboards em Tempo Real**

Website institucional e interativo da **USE LEVI**, desenvolvido com foco em alta performance, estética tecnológica minimalista e conversão de clientes.

---

## 🚀 Tecnologias & Arquitetura

- **Vite**: Bundler ultra-rápido para desenvolvimento e build de produção otimizado.
- **Lenis Smooth Scroll**: Motor de rolagem inercial de alta precisão (padrão Linear, Stripe, Vercel).
- **Simulador Interativo n8n**: Módulo visual interativo com fluxos SVG animados e pacotes de dados em tempo real.
- **Pipeline Planilha -> Dashboard**: Demonstração viva de sincronização de planilhas estáticas para painel de controle web executivo.
- **Design System Color Blocking**:
  - *Accent*: `#2dd4bf` (Turquesa Neon)
  - *Dark Block*: `#3d3d3d` (Grafite Profundo)
  - *Light Block*: `#feffff` (Branco Puro)
- **Tipografia**: Exclusivamente **Cabinet Grotesk** (arquivos locais otimizados).

---

## 💻 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/use-levi.git

# 2. Acesse a pasta
cd use-levi

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`.

---

## 📦 Build de Produção

```bash
# Gerar os arquivos otimizados na pasta dist/
npm run build

# Pré-visualizar o build localmente
npm run preview
```

---

## 🌐 Deploy na Vercel

O projeto está 100% configurado para a **Vercel**:

1. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
2. Clique em **"Add New Project"** e selecione o repositório **use-levi**.
3. A Vercel detectará automaticamente as configurações:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Clique em **Deploy**. Seu site estará no ar em segundos com certificado SSL e CDN global automática!
