/**
 * USE LEVI - Interactive Engine & n8n Flow Simulator
 * Author: USE LEVI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // 3. n8n Interactive Workflow Simulation
  const btnSimulate = document.getElementById('btnSimulateFlow');
  const consoleLog = document.getElementById('consoleLog');
  const nodeTrigger = document.getElementById('nodeTrigger');
  const nodeAgent = document.getElementById('nodeAgent');
  const nodeAction = document.getElementById('nodeAction');
  const subModel = document.getElementById('subModel');
  const subMemory = document.getElementById('subMemory');
  const subTools = document.getElementById('subTools');
  const wire1 = document.getElementById('wire1');
  const wire2 = document.getElementById('wire2');
  const packet1 = document.getElementById('packet1');
  const packet2 = document.getElementById('packet2');

  let isSimulating = false;

  function setLog(text, isAccent = true) {
    if (!consoleLog) return;
    consoleLog.innerHTML = `<span style="color: ${isAccent ? 'var(--accent)' : '#aaa'}">⚡ ${text}</span>`;
  }

  function resetFlowState() {
    [nodeTrigger, nodeAgent, nodeAction, subModel, subMemory, subTools].forEach(el => {
      if (el) el.classList.remove('active-step');
    });
    if (wire1) wire1.classList.remove('active');
    if (wire2) wire2.classList.remove('active');
    if (packet1) packet1.classList.remove('flowing');
    if (packet2) packet2.classList.remove('flowing');
  }

  async function runSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    if (btnSimulate) {
      btnSimulate.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-spin">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        EXECUTANDO...
      `;
      btnSimulate.style.opacity = '0.8';
    }

    resetFlowState();

    // Step 1: Trigger Acionado
    setLog("Passo 1/3: Gatilho acionado (Novo lead / WhatsApp recebido)");
    if (nodeTrigger) nodeTrigger.classList.add('active-step');
    if (wire1) wire1.classList.add('active');
    if (packet1) packet1.classList.add('flowing');

    await new Promise(r => setTimeout(r, 900));

    // Step 2: Agente de IA e Sub-nós
    setLog("Passo 2/3: Agente de IA processando contexto, memória e regras...");
    if (nodeAgent) nodeAgent.classList.add('active-step');
    if (subModel) subModel.classList.add('active-step');
    await new Promise(r => setTimeout(r, 450));
    if (subMemory) subMemory.classList.add('active-step');
    await new Promise(r => setTimeout(r, 450));
    if (subTools) subTools.classList.add('active-step');

    await new Promise(r => setTimeout(r, 800));

    // Step 3: Ação de Saída / Atualização
    setLog("Passo 3/3: Executando ação -> Painel atualizado & WhatsApp disparado!");
    if (wire2) wire2.classList.add('active');
    if (packet2) packet2.classList.add('flowing');
    if (nodeAction) nodeAction.classList.add('active-step');

    await new Promise(r => setTimeout(r, 1100));

    // Finish
    setLog("Sucesso! Fluxo executado em 420ms com 100% de precisão.", true);

    if (btnSimulate) {
      btnSimulate.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        SIMULAR NOVAMENTE
      `;
      btnSimulate.style.opacity = '1';
    }
    isSimulating = false;
  }

  if (btnSimulate) {
    btnSimulate.addEventListener('click', runSimulation);
  }

  // Node click inspection
  const nodeInfoMap = {
    nodeTrigger: "Gatilho: Escuta webhooks de WhatsApp, formulários, Instagram e ERPs em tempo real sem latência.",
    nodeAgent: "Agente IA: Classifica a intenção do cliente, extrai parâmetros estruturados e formula respostas sob medida.",
    nodeAction: "Ação de Saída: Registra no banco de dados / planilhas, notifica sua equipe e envia confirmação automática.",
    subModel: "Modelo IA: Motor Gemini / LLM otimizado para raciocínio ágil e linguagem natural corporativa.",
    subMemory: "Memória: Guarda o histórico da conversa e do cliente para interações hiper-personalizadas.",
    subTools: "Ferramentas: Acesso a documentos, tabelas de preços, estoque e APIs proprietárias do cliente."
  };

  Object.keys(nodeInfoMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        resetFlowState();
        el.classList.add('active-step');
        setLog(nodeInfoMap[id], false);
      });
    }
  });

  // 4. Modal de Diagnóstico Gratuito
  const modal = document.getElementById('diagnosticModal');
  const openModalButtons = document.querySelectorAll('[data-open-modal="diagnostic"]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const diagnosticForm = document.getElementById('diagnosticForm');

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('open');
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  if (diagnosticForm) {
    diagnosticForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('diagName').value.trim();
      const company = document.getElementById('diagCompany').value.trim();
      const area = document.getElementById('diagArea').value;
      const desc = document.getElementById('diagDesc').value.trim();

      const message = `Olá Levi! Vim pelo site da USE LEVI e gostaria de agendar um diagnóstico gratuito.
- Meu nome: ${name}
- Empresa: ${company}
- Interesse principal: ${area}
- Detalhes: ${desc || 'Gostaria de entender como automatizar processos.'}`;

      const encoded = encodeURIComponent(message);
      // Link direto WhatsApp
      window.open(`https://wa.me/5548996118796?text=${encoded}`, '_blank');
      modal.classList.remove('open');
      diagnosticForm.reset();
    });
  }
});
