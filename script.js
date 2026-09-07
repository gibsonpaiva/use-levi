/**
 * USE LEVI - Interactive Engine & n8n Flow Simulator
 * Author: USE LEVI
 */

import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Smooth Scroll Engine (Lenis)
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Suaviza navegação de âncoras compensando altura do header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -65, duration: 1.15 });
          }
        }
      });
    });
  }

  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  const updateHeaderState = (scrollY) => {
    if (scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => updateHeaderState(scroll));
  } else {
    window.addEventListener('scroll', () => updateHeaderState(window.scrollY));
  }

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

  // 3.1. Spreadsheet to Dashboard Simulation
  const btnSimulateSheetSync = document.getElementById('btnSimulateSheetSync');
  const sheetConsoleLog = document.getElementById('sheetConsoleLog');
  const sheetNewRow = document.getElementById('sheetNewRow');
  const sheetNewRowBadge = document.getElementById('sheetNewRowBadge');
  const kpiRevenueVal = document.getElementById('kpiRevenueVal');
  const kpiSalesVal = document.getElementById('kpiSalesVal');
  const kpiTicketVal = document.getElementById('kpiTicketVal');
  const chartBarToday = document.getElementById('chartBarToday');
  const chartLiveTag = document.getElementById('chartLiveTag');

  let isSheetSyncing = false;
  let isSynced = false;

  if (btnSimulateSheetSync) {
    btnSimulateSheetSync.addEventListener('click', async () => {
      if (isSheetSyncing) return;
      isSheetSyncing = true;

      if (!isSynced) {
        btnSimulateSheetSync.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-spin" style="width:13px;height:13px;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
          SINCRONIZANDO...
        `;

        if (sheetConsoleLog) {
          sheetConsoleLog.innerHTML = `<span style="color: var(--accent);">⚡ Detectado novo registro na planilha: Linha #8422 (Grupo Alpha — R$ 15.600)...</span>`;
        }

        if (sheetNewRow) {
          sheetNewRow.classList.add('active-sync');
        }
        if (sheetNewRowBadge) {
          sheetNewRowBadge.className = 'badge-syncing';
          sheetNewRowBadge.textContent = 'Enviando...';
        }

        await new Promise(r => setTimeout(r, 700));

        if (sheetConsoleLog) {
          sheetConsoleLog.innerHTML = `<span style="color: var(--accent);">⚡ Disparo de Webhook executado em 35ms -> Recalculando métricas e gráficos do Dashboard...</span>`;
        }

        await new Promise(r => setTimeout(r, 600));

        // Update Dashboard values
        if (kpiRevenueVal) {
          kpiRevenueVal.textContent = 'R$ 164.520';
          kpiRevenueVal.classList.add('highlight-number');
        }
        if (kpiSalesVal) {
          kpiSalesVal.textContent = '49';
          kpiSalesVal.classList.add('highlight-number');
        }
        if (kpiTicketVal) {
          kpiTicketVal.textContent = 'R$ 3.357';
          kpiTicketVal.classList.add('highlight-number');
        }
        if (chartBarToday) {
          chartBarToday.style.height = '96%';
        }
        if (chartLiveTag) {
          chartLiveTag.textContent = 'Recalculado Agora';
          chartLiveTag.style.background = 'rgba(45, 212, 191, 0.25)';
        }
        if (sheetNewRowBadge) {
          sheetNewRowBadge.className = 'badge-synced';
          sheetNewRowBadge.textContent = 'Gravado no Painel';
        }

        if (sheetConsoleLog) {
          sheetConsoleLog.innerHTML = `<span style="color: #4ade80;">✓ Sucesso! Linha #8422 incorporada ao Dashboard. Receita atualizada para R$ 164.520 sem intervenção humana.</span>`;
        }

        btnSimulateSheetSync.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          DADOS SINCRONIZADOS
        `;

        isSynced = true;
      } else {
        // Reset to initial
        if (sheetNewRow) sheetNewRow.classList.remove('active-sync');
        if (sheetNewRowBadge) {
          sheetNewRowBadge.className = 'badge-syncing';
          sheetNewRowBadge.textContent = 'Aguardando';
        }
        if (kpiRevenueVal) {
          kpiRevenueVal.textContent = 'R$ 148.920';
          kpiRevenueVal.classList.remove('highlight-number');
        }
        if (kpiSalesVal) {
          kpiSalesVal.textContent = '48';
          kpiSalesVal.classList.remove('highlight-number');
        }
        if (kpiTicketVal) {
          kpiTicketVal.textContent = 'R$ 3.102';
          kpiTicketVal.classList.remove('highlight-number');
        }
        if (chartBarToday) {
          chartBarToday.style.height = '78%';
        }
        if (chartLiveTag) {
          chartLiveTag.textContent = 'Atualizado';
          chartLiveTag.style.background = 'rgba(45, 212, 191, 0.1)';
        }
        if (sheetConsoleLog) {
          sheetConsoleLog.innerHTML = `<span class="console-terminal-text">Conexão ativa com o banco.</span> Clique em "SIMULAR NOVO DADO" para ver uma nova linha da planilha alimentar o painel web instantaneamente.`;
        }

        btnSimulateSheetSync.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          SIMULAR NOVO DADO
        `;
        isSynced = false;
      }

      isSheetSyncing = false;
    });
  }

  // 4. Modal de Diagnóstico Gratuito
  const modal = document.getElementById('diagnosticModal');
  const openModalButtons = document.querySelectorAll('[data-open-modal="diagnostic"]');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const diagnosticForm = document.getElementById('diagnosticForm');

  const openModal = () => {
    if (modal) {
      modal.classList.add('open');
      if (window.lenis) window.lenis.stop();
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('open');
      if (window.lenis) window.lenis.start();
    }
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
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
      window.open(`https://wa.me/5531983344521?text=${encoded}`, '_blank');
      closeModal();
      diagnosticForm.reset();
    });
  }
});
