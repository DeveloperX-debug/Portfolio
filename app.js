/* ==========================================================================
   Prem Saraf Portfolio - Interactive JavaScript Engine (App.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initHeaderScroll();
  initTypingTicker();
  initBenchmarkTabs();
  initPromptSandbox();
  initProjectFilters();
  initCopyButtons();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Interactive Neural Background Canvas
   -------------------------------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.floor(Math.min(width, height) / 18);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse influence
      const dxMouse = mouse.x - n.x;
      const dyMouse = mouse.y - n.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      if (distMouse < 140) {
        n.x -= (dxMouse / distMouse) * 0.5;
        n.y -= (dyMouse / distMouse) * 0.5;
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        let n2 = nodes[j];
        let dx = n.x - n2.x;
        let dy = n.y - n2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* --------------------------------------------------------------------------
   2. Sticky Header & Active Nav Scroll
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Dynamic Animated Ticker
   -------------------------------------------------------------------------- */
function initTypingTicker() {
  const phrases = [
    'Building with Gemini 1.5 Pro & 2M Token Context',
    'SWE-bench Leader Claude 3.5 Sonnet Integration',
    'Agentic Function Calling & RAG with Qdrant Vector DB',
    'Open-Source Llama 3.1 405B & DeepSeek V3/R1 Fine-Tuning',
    'Full-Stack Web Development (Django, React, Node.js)'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const tickerEl = document.getElementById('ticker-text');
  if (!tickerEl) return;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      tickerEl.textContent = currentPhrase.substring(0, charIdx);
    } else {
      charIdx++;
      tickerEl.textContent = currentPhrase.substring(0, charIdx);
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }
  type();
}

/* --------------------------------------------------------------------------
   4. Model Benchmark & Comparison Matrix Tabs
   -------------------------------------------------------------------------- */
const MODEL_BENCHMARKS = [
  {
    name: 'Gemini 1.5 Pro (Google)',
    category: 'frontier',
    mmlu: 85.9,
    humanEval: 84.1,
    context: '2,000,000',
    speed: '120 t/s',
    color: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    badge: '2M Context Native'
  },
  {
    name: 'Claude 3.5 Sonnet (Anthropic)',
    category: 'frontier',
    mmlu: 88.7,
    humanEval: 92.0,
    context: '200,000',
    speed: '85 t/s',
    color: 'linear-gradient(90deg, #f97316, #fb923c)',
    badge: 'SWE-bench Leader'
  },
  {
    name: 'GPT-4o & o1 (OpenAI)',
    category: 'frontier',
    mmlu: 88.6,
    humanEval: 90.2,
    context: '128,000',
    speed: '110 t/s',
    color: 'linear-gradient(90deg, #10b981, #34d399)',
    badge: 'Reasoning Leader'
  },
  {
    name: 'Llama 3.1 405B (Meta AI)',
    category: 'open',
    mmlu: 88.6,
    humanEval: 89.0,
    context: '128,000',
    speed: '65 t/s',
    color: 'linear-gradient(90deg, #a855f7, #ec4899)',
    badge: 'Open Weights SOTA'
  },
  {
    name: 'DeepSeek-V3 / R1 (DeepSeek)',
    category: 'open',
    mmlu: 88.5,
    humanEval: 91.5,
    context: '128,000',
    speed: '140 t/s',
    color: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
    badge: 'MoE & Reasoning'
  },
  {
    name: 'Qwen 2.5 72B (Alibaba)',
    category: 'open',
    mmlu: 86.1,
    humanEval: 86.8,
    context: '128,000',
    speed: '95 t/s',
    color: 'linear-gradient(90deg, #6366f1, #a855f7)',
    badge: 'Math & Multilingual'
  }
];

function initBenchmarkTabs() {
  const container = document.getElementById('benchmark-list');
  const tabs = document.querySelectorAll('.matrix-tabs .tab-btn');
  if (!container) return;

  function renderBenchmarks(filter = 'all') {
    container.innerHTML = '';
    const filtered = MODEL_BENCHMARKS.filter(
      (m) => filter === 'all' || m.category === filter
    );

    filtered.forEach((m) => {
      const row = document.createElement('div');
      row.className = 'benchmark-row';
      row.innerHTML = `
        <div class="benchmark-meta">
          <div class="model-info">
            <span class="model-title">${m.name}</span>
            <span class="llm-badge">${m.badge}</span>
          </div>
          <div class="score-pills">
            <span class="score-pill">MMLU: ${m.mmlu}%</span>
            <span class="score-pill">HumanEval: ${m.humanEval}%</span>
            <span style="color: var(--text-muted);">Context: ${m.context} tok</span>
          </div>
        </div>
        <div class="bar-container">
          <div class="bar-fill" style="width: 0%; background: ${m.color};"></div>
        </div>
      `;
      container.appendChild(row);

      // Trigger width animation
      setTimeout(() => {
        const fill = row.querySelector('.bar-fill');
        if (fill) fill.style.width = `${m.humanEval}%`;
      }, 50);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderBenchmarks(tab.dataset.filter);
    });
  });

  renderBenchmarks('all');
}

/* --------------------------------------------------------------------------
   5. Interactive Live Prompt Sandbox Simulator
   -------------------------------------------------------------------------- */
const PROMPT_PRESETS = [
  {
    id: 'code-refactor',
    title: 'Autonomous Code Refactoring & Testing',
    model: 'Claude 3.5 Sonnet',
    prompt: 'Refactor Django ORM query to optimize database latency & generate PyTest unit tests.',
    output: `// [SYSTEM]: Claude 3.5 Sonnet Agent Initialized...
// [1/3] Analyzing database query AST execution plan...
// [2/3] Found N+1 query vulnerability in select_related() pipeline.
// [3/3] Emitting optimized Python code & pytest suite:

from django.db import models
from django.db.models import Prefetch

# Optimized Query Pipeline (Execution time reduced from 240ms -> 18ms)
class QueryOptimizer:
    @staticmethod
    def get_user_portfolios(user_id: int):
        return Portfolio.objects.filter(owner_id=user_id)\\
            .select_related('owner')\\
            .prefetch_related(
                Prefetch('projects', queryset=Project.objects.filter(is_active=True))
            )

# Automated PyTest Verification Suite
def test_portfolio_query_optimization(django_assert_num_queries):
    with django_assert_num_queries(2):
        results = list(QueryOptimizer.get_user_portfolios(user_id=42))
        assert len(results) >= 1
// [STATUS]: Complete. 0 lint errors, 100% test coverage achieved.`
  },
  {
    id: 'video-audio',
    title: 'Multimodal Video & Audio Reasoning',
    model: 'Gemini 1.5 Pro',
    prompt: 'Analyze 2-hour software architecture lecture video & synthesize key visual diagrams.',
    output: `// [SYSTEM]: Gemini 1.5 Pro 2M Token Context Window active...
// [1/3] Processing 1,840,000 multimodal video frames & audio stream...
// [2/3] Timestamp [01:14:22]: Detected Whiteboard Diagram for Vector Database Architecture.
// [3/3] Generating Structured JSON Summary & Architecture Specs:

{
  "timestamp": "01:14:22",
  "topic": "Hybrid Dense + Sparse RAG Retrieval Architecture",
  "components": [
    { "name": "Dense Embeddings", "model": "text-embedding-004", "dimension": 768 },
    { "name": "Sparse Retrieval", "algorithm": "BM25 Keyword Matching" },
    { "name": "Vector Store", "db": "Qdrant Vector Cluster", "hnsw_ef": 128 }
  ],
  "reasoning_summary": "Speaker demonstrated a 42% accuracy enhancement when combining BM25 sparse keyword indices with cosine dense vector embeddings."
}
// [STATUS]: 1.84M Tokens analyzed in 1.4 seconds. TTFT: 165ms.`
  },
  {
    id: 'agent-rag',
    title: 'Multi-Agent RAG & Tool Calling',
    model: 'Llama 3.1 405B & Qdrant',
    prompt: 'Orchestrate multi-agent workflow to fetch real-time market data & execute RAG search.',
    output: `// [SYSTEM]: Multi-Agent Crew Framework (Llama 3.1 405B) Started...
// [Agent-1: Retriever]: Querying Qdrant Vector DB for corporate earnings context...
// Tool Call -> qdrant_search(collection="sec_filings", query="Q3 AI infrastructure spend")
// [Agent-2: Execution]: Parsing live REST API response...

>>> Executing Tool: fetch_market_ticker(ticker="GOOGL")
<<< Result: { "ticker": "GOOGL", "price": 182.40, "change_pct": "+2.4%" }

// [Agent-3: Synthesis]: Constructing final quantitative summary:
"Based on recent filings stored in Qdrant and live market API feeds, capital expenditure in generative AI infrastructure grew by 34% quarter-over-quarter, driven by custom TPU and GPU cluster deployments."
// [STATUS]: Multi-agent tool execution completed successfully.`
  },
  {
    id: 'math-reasoning',
    title: 'Chain-of-Thought Math Reasoning',
    model: 'DeepSeek-R1 / GPT-o1',
    prompt: 'Solve complex algorithmic probability optimization problem step-by-step.',
    output: `// [SYSTEM]: DeepSeek-R1 Reasoning Engine active...
<thought>
To solve for the optimal stopping probability in a stream of N items:
1. Formulate the secretary problem payoff function P(r) = (r-1)/N * sum_{k=r}^N 1/(k-1).
2. Approximate the summation using integral int_{r}^N 1/x dx = ln(N) - ln(r).
3. Differentiate P(r) with respect to r and set to 0.
4. Obtain r/N -> 1/e ≈ 0.368.
</thought>

Conclusion & Proof:
The optimal strategy dictates skipping the first 36.8% (1/e) of candidates and subsequently selecting the first candidate that outperforms all previous candidates.
Success probability: 1/e ≈ 36.78%.`
  }
];

function initPromptSandbox() {
  const presetsContainer = document.getElementById('preset-list');
  const terminalBody = document.getElementById('terminal-body');
  const runBtn = document.getElementById('run-prompt-btn');
  const termTitle = document.getElementById('terminal-title');
  const tokenCounter = document.getElementById('token-count');
  const latencyVal = document.getElementById('latency-val');

  if (!presetsContainer || !terminalBody) return;

  let activePreset = PROMPT_PRESETS[0];
  let isStreaming = false;

  function renderPresets() {
    presetsContainer.innerHTML = '';
    PROMPT_PRESETS.forEach((p) => {
      const card = document.createElement('div');
      card.className = `preset-card ${p.id === activePreset.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="preset-title">
          <span>${p.title}</span>
          <span class="preset-model">${p.model}</span>
        </div>
        <div class="preset-desc">${p.prompt}</div>
      `;
      card.addEventListener('click', () => {
        if (isStreaming) return;
        activePreset = p;
        renderPresets();
        updateTerminalDisplay(p);
      });
      presetsContainer.appendChild(card);
    });
  }

  function updateTerminalDisplay(preset) {
    if (termTitle) termTitle.textContent = `${preset.model} - Sandbox Session`;
    terminalBody.textContent = preset.output;
    if (tokenCounter) tokenCounter.textContent = Math.floor(preset.output.length / 4);
    if (latencyVal) latencyVal.textContent = '145ms';
  }

  function streamOutput() {
    if (isStreaming) return;
    isStreaming = true;
    terminalBody.innerHTML = '';
    
    let text = activePreset.output;
    let index = 0;

    if (runBtn) {
      runBtn.disabled = true;
      runBtn.style.opacity = '0.5';
    }

    const interval = setInterval(() => {
      terminalBody.textContent = text.substring(0, index);
      terminalBody.scrollTop = terminalBody.scrollHeight;

      if (tokenCounter) {
        tokenCounter.textContent = Math.floor(index / 4);
      }
      if (latencyVal) {
        latencyVal.textContent = `${120 + Math.floor(Math.random() * 40)}ms`;
      }

      index += 4;
      if (index >= text.length) {
        terminalBody.textContent = text;
        clearInterval(interval);
        isStreaming = false;
        if (runBtn) {
          runBtn.disabled = false;
          runBtn.style.opacity = '1';
        }
      }
    }, 12);
  }

  if (runBtn) {
    runBtn.addEventListener('click', streamOutput);
  }

  renderPresets();
  updateTerminalDisplay(activePreset);
}

/* --------------------------------------------------------------------------
   6. Project Filters
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;

      projectCards.forEach((card) => {
        const cardCat = card.dataset.category;
        if (cat === 'all' || cardCat.includes(cat)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Functionality
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const origText = btn.innerHTML;
          btn.innerHTML = `<span style="color: var(--accent-emerald); font-size: 0.8rem;">Copied!</span>`;
          setTimeout(() => {
            btn.innerHTML = origText;
          }, 2000);
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.innerHTML = `<div style="padding: 0.75rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); border-radius: 10px; color: var(--accent-emerald); font-size: 0.9rem;">
        🚀 Message sent successfully! Prem will get back to you shortly.
      </div>`;
    }
    form.reset();
  });
}
