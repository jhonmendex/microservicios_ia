// Ensamblado de las 5 secciones de la ponencia
const MODULES = [
  SECTION_01,
  SECTION_02,
  SECTION_03,
  SECTION_04,
  SECTION_05,
];

      /* ==========================================================================
       ESTADO GLOBAL Y CONTROLADORES DE INTERFAZ
       ========================================================================== */
      const state = {
        modIdx: 0,
        lessonIdx: 0,
        stepIdx: 0,
        paused: false,
        view: "ponencia", // 'ponencia' | 'simulador' | 'patrones' | 'cheatsheets'
        themeIdx: 0, // 0: editorial, 1: dark, 2: unisalle
        completedSlugs: new Set(["slide-3b-anatomia-monolito"]),
        // Estado del simulador FinOps independiente
        simWorkload: "parallel", // 'sequential' | 'parallel'
        simAgents: 4,
        simCircuitBreaker: true,
      };

      const THEMES = [
        { id: "", icon: "🌙", title: "Papel Editorial" },
        { id: "dark", icon: "🏛️", title: "Modo Oscuro" },
        { id: "unisalle", icon: "☀️", title: "Institucional UNISALLE" },
      ];

      function getCurrentLesson() {
        return MODULES[state.modIdx].lessons[state.lessonIdx];
      }

      function getFlatLessons() {
        const list = [];
        MODULES.forEach((m, mIdx) => {
          m.lessons.forEach((l, lIdx) => {
            list.push({ mod: m, lesson: l, mIdx, lIdx });
          });
        });
        return list;
      }

      /* ==========================================================================
       RENDERIZADO DE SIDEBAR IZQUIERDA
       ========================================================================== */
      function renderSidebar() {
        const treeEl = document.getElementById("course-tree");
        treeEl.innerHTML = MODULES.map((mod, mIdx) => {
          const doneInMod = mod.lessons.filter((l) =>
            state.completedSlugs.has(l.slug),
          ).length;
          return `
          <section class="mod ${mod.open ? "is-open" : ""}">
            <button class="mod__head" type="button" onclick="toggleModule(${mIdx})">
              <svg class="mod__chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <svg class="folder folder--${mod.color}" width="19" height="15" viewBox="0 0 20 16">
                <path d="M1.2 3.2A2 2 0 0 1 3.2 1.2h4.1l2 2.2h7.5a2 2 0 0 1 2 2v8.4a2 2 0 0 1-2 2H3.2a2 2 0 0 1-2-2Z"></path>
                <path class="folder__lip" d="M1.2 6.2h17.6"></path>
              </svg>
              <span>${mod.title}</span>
              <span class="mod__count">${doneInMod}/${mod.lessons.length}</span>
            </button>
            <ul class="mod__lessons">
              ${mod.lessons
                .map((l, lIdx) => {
                  const isSel =
                    state.view === "ponencia" &&
                    state.modIdx === mIdx &&
                    state.lessonIdx === lIdx;
                  const isDone = state.completedSlugs.has(l.slug);
                  return `
                  <li>
                    <button class="lesson-btn ${isSel ? "is-selected" : ""}" type="button" onclick="selectLesson(${mIdx}, ${lIdx})">
                      ${
                        isDone
                          ? `<svg class="lesson-btn__mark--done" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><path d="m16 9-5.5 5.5L8 12"></path></svg>`
                          : `<svg class="lesson-btn__mark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z"></path><path d="M14 2v6h6"></path></svg>`
                      }
                      <span><strong style="font-family:monospace; opacity:0.7;">S${l.slideNum}</strong> · ${l.title}</span>
                    </button>
                  </li>
                `;
                })
                .join("")}
            </ul>
          </section>
        `;
        }).join("");

        const total = getFlatLessons().length;
        const done = state.completedSlugs.size;
        const slidesCountEl = document.getElementById("slides-count");
        if (slidesCountEl) slidesCountEl.textContent = `${total} slides`;
        document.getElementById("progress-text").textContent =
          `${done} / ${total}`;
        document.getElementById("progress-fill").style.width =
          `${Math.round((done / total) * 100)}%`;
      }

      /* ==========================================================================
       MOTOR DE CONSOLA ANIMADA (RELOJ PROPIO QUE RESPETA PAUSE / REPLAY / SKIP)
       ========================================================================== */
      const termEngine = {
        timerId: null,
        runToken: 0,
        config: null,
        phase: "idle", // 'idle' | 'typing' | 'lines' | 'done'
        charIdx: 0,
        lineIdx: 0,
        remainingMs: 0,
        scheduledAt: 0,
        activeNodeId: null,
      };

      const TERM_PREFIX = {
        think: "·",
        tool: "⚙",
        agent: "↳",
        result: "✓",
        error: "✕",
        file: "+",
        warn: "!",
      };

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      function clearTermHighlight() {
        document
          .querySelectorAll("#iso-scene .iso-node.is-active")
          .forEach((n) => n.classList.remove("is-active"));
        document
          .querySelectorAll("#iso-scene .iso-node.term-dim")
          .forEach((n) => n.classList.remove("term-dim"));
        termEngine.activeNodeId = null;
      }

      function highlightTermNode(nodeId, config) {
        clearTermHighlight();
        if (!nodeId) return;
        const target = document.querySelector(
          `#iso-scene .iso-node[data-node-id="${nodeId}"]`,
        );
        if (target) {
          target.classList.add("is-active");
          termEngine.activeNodeId = nodeId;
        }
        // En patrón de enrutamiento, atenuar los especialistas no seleccionados
        if (config && config.routeMode && Array.isArray(config.routePeers)) {
          if (config.routePeers.includes(nodeId)) {
            config.routePeers.forEach((peerId) => {
              if (peerId !== nodeId) {
                const peerEl = document.querySelector(
                  `#iso-scene .iso-node[data-node-id="${peerId}"]`,
                );
                if (peerEl) peerEl.classList.add("term-dim");
              }
            });
          }
        }
      }

      function stopTerminal() {
        termEngine.runToken++;
        if (termEngine.timerId !== null) {
          clearTimeout(termEngine.timerId);
          termEngine.timerId = null;
        }
        termEngine.remainingMs = 0;
        termEngine.scheduledAt = 0;
        clearTermHighlight();
      }

      function appendTermLine(bodyEl, line, config) {
        const div = document.createElement("div");
        div.className = `term-line term-line--${line.kind || "think"}`;
        const prefix = TERM_PREFIX[line.kind] || "·";
        div.innerHTML = `<span class="term-prefix">${prefix}</span>${escapeHtml(line.text)}`;
        bodyEl.appendChild(div);
        bodyEl.scrollTop = bodyEl.scrollHeight;
        highlightTermNode(line.node, config);
        if (line.badgeTarget && line.badgeText) {
          const badgeEl = document.getElementById(line.badgeTarget);
          if (badgeEl) badgeEl.textContent = line.badgeText;
        }
      }

      function finishTerminalImmediately() {
        const cfg = termEngine.config;
        const bodyEl = document.getElementById("term-body");
        const promptEl = document.getElementById("term-prompt-text");
        const cursorEl = document.getElementById("term-cursor");
        if (!cfg || !bodyEl || !promptEl) return;

        if (termEngine.timerId !== null) {
          clearTimeout(termEngine.timerId);
          termEngine.timerId = null;
        }
        termEngine.remainingMs = 0;
        promptEl.textContent = cfg.prompt;
        if (cursorEl) cursorEl.style.display = "none";

        while (termEngine.lineIdx < cfg.lines.length) {
          appendTermLine(bodyEl, cfg.lines[termEngine.lineIdx], cfg);
          termEngine.lineIdx++;
        }
        termEngine.phase = "done";
      }

      function scheduleTermStep(delayMs, token) {
        if (token !== termEngine.runToken) return;
        termEngine.remainingMs = Math.max(0, delayMs);
        if (state.paused) return;
        termEngine.scheduledAt = Date.now();
        termEngine.timerId = setTimeout(() => {
          termEngine.timerId = null;
          termEngine.remainingMs = 0;
          stepTerminal(token);
        }, delayMs);
      }

      function stepTerminal(token) {
        if (token !== termEngine.runToken || state.paused) return;
        const cfg = termEngine.config;
        const bodyEl = document.getElementById("term-body");
        const promptEl = document.getElementById("term-prompt-text");
        const cursorEl = document.getElementById("term-cursor");
        if (!cfg || !bodyEl || !promptEl) return;

        if (termEngine.phase === "typing") {
          if (termEngine.charIdx < cfg.prompt.length) {
            termEngine.charIdx++;
            promptEl.textContent = cfg.prompt.slice(0, termEngine.charIdx);
            bodyEl.scrollTop = bodyEl.scrollHeight;
            scheduleTermStep(25, token);
            return;
          }
          if (cursorEl) cursorEl.style.display = "none";
          termEngine.phase = "lines";
          const firstDelay =
            cfg.lines[0] && typeof cfg.lines[0].delay === "number"
              ? cfg.lines[0].delay
              : 350;
          scheduleTermStep(firstDelay, token);
          return;
        }

        if (termEngine.phase === "lines") {
          if (termEngine.lineIdx < cfg.lines.length) {
            const line = cfg.lines[termEngine.lineIdx];
            appendTermLine(bodyEl, line, cfg);
            termEngine.lineIdx++;
            if (termEngine.lineIdx < cfg.lines.length) {
              const nextLine = cfg.lines[termEngine.lineIdx];
              const nextDelay =
                typeof nextLine.delay === "number" ? nextLine.delay : 350;
              scheduleTermStep(nextDelay, token);
            } else {
              termEngine.phase = "done";
            }
          } else {
            termEngine.phase = "done";
          }
        }
      }

      function startTerminal(config) {
        stopTerminal();
        termEngine.config = config || null;
        if (!config) {
          termEngine.phase = "idle";
          return;
        }
        const token = termEngine.runToken;
        termEngine.phase = "typing";
        termEngine.charIdx = 0;
        termEngine.lineIdx = 0;

        const bodyEl = document.getElementById("term-body");
        const promptEl = document.getElementById("term-prompt-text");
        const cursorEl = document.getElementById("term-cursor");
        if (!bodyEl || !promptEl) return;

        // Limpiar líneas anteriores excepto la fila del prompt
        bodyEl
          .querySelectorAll(".term-line:not(.term-line--prompt)")
          .forEach((el) => el.remove());
        promptEl.textContent = "";
        if (cursorEl) cursorEl.style.display = "inline-block";
        if (config.initialBadgeTarget && config.initialBadgeText) {
          const badgeEl = document.getElementById(config.initialBadgeTarget);
          if (badgeEl) badgeEl.textContent = config.initialBadgeText;
        }

        const reducedMotion =
          typeof window !== "undefined" &&
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          finishTerminalImmediately();
          return;
        }

        scheduleTermStep(120, token);
      }

      function pauseTerminal() {
        if (termEngine.timerId !== null) {
          const elapsed = Date.now() - termEngine.scheduledAt;
          termEngine.remainingMs = Math.max(20, termEngine.remainingMs - elapsed);
          clearTimeout(termEngine.timerId);
          termEngine.timerId = null;
        }
      }

      function resumeTerminal() {
        if (!termEngine.config || termEngine.phase === "done" || termEngine.phase === "idle") {
          return;
        }
        if (termEngine.timerId === null) {
          scheduleTermStep(
            termEngine.remainingMs > 0 ? termEngine.remainingMs : 40,
            termEngine.runToken,
          );
        }
      }

      /* ==========================================================================
       MOTOR DE PANEL DE DECISIÓN HUMANA (RELOJ PROPIO CON PAUSE / REPLAY / SKIP)
       ========================================================================== */
      const decisionEngine = {
        timerId: null,
        runToken: 0,
        config: null,
        stage: 0, // 0: esperando, 1: eval A, 2: eval B, 3: elegido
        remainingMs: 0,
        scheduledAt: 0,
      };

      function stopDecision() {
        decisionEngine.runToken++;
        if (decisionEngine.timerId !== null) {
          clearTimeout(decisionEngine.timerId);
          decisionEngine.timerId = null;
        }
        decisionEngine.remainingMs = 0;
        decisionEngine.scheduledAt = 0;
      }

      function applyDecisionStage(stage, cfg) {
        if (!cfg) return;
        const optA = document.getElementById("decision-opt-0");
        const optB = document.getElementById("decision-opt-1");
        const statusEl = document.getElementById("decision-status");
        const pausedFlow = cfg.svgPausedFlowId
          ? document.getElementById(cfg.svgPausedFlowId)
          : null;
        const activeFlow = cfg.svgActiveFlowId
          ? document.getElementById(cfg.svgActiveFlowId)
          : null;

        if (optA) optA.classList.remove("is-evaluating", "is-chosen", "is-dimmed");
        if (optB) optB.classList.remove("is-evaluating", "is-chosen", "is-dimmed");

        if (stage === 0) {
          if (statusEl) {
            statusEl.textContent = cfg.statusWaiting || "Agente en pausa";
            statusEl.classList.remove("is-resolved");
          }
          if (pausedFlow) pausedFlow.classList.remove("decision-hidden");
          if (activeFlow) {
            activeFlow.classList.add("decision-hidden");
            activeFlow.classList.remove("decision-visible");
          }
          highlightTermNode(cfg.peopleNodeId || null, null);
        } else if (stage === 1) {
          if (optA) optA.classList.add("is-evaluating");
          highlightTermNode(cfg.peopleNodeId || null, null);
        } else if (stage === 2) {
          if (optB) optB.classList.add("is-evaluating");
          highlightTermNode(cfg.peopleNodeId || null, null);
        } else if (stage >= 3) {
          const chooseA = cfg.options[0] && cfg.options[0].id === cfg.chosenId;
          if (optA) optA.classList.add(chooseA ? "is-chosen" : "is-dimmed");
          if (optB) optB.classList.add(chooseA ? "is-dimmed" : "is-chosen");
          if (statusEl) {
            statusEl.textContent = cfg.statusChosen || "Decisión confirmada";
            statusEl.classList.add("is-resolved");
          }
          if (pausedFlow) pausedFlow.classList.add("decision-hidden");
          if (activeFlow) {
            activeFlow.classList.remove("decision-hidden");
            activeFlow.classList.add("decision-visible");
          }
          highlightTermNode(cfg.resolvedNodeId || null, null);
        }
      }

      function scheduleDecisionStep(delayMs, token) {
        if (token !== decisionEngine.runToken) return;
        decisionEngine.remainingMs = Math.max(0, delayMs);
        if (state.paused) return;
        decisionEngine.scheduledAt = Date.now();
        decisionEngine.timerId = setTimeout(() => {
          decisionEngine.timerId = null;
          decisionEngine.remainingMs = 0;
          stepDecision(token);
        }, delayMs);
      }

      function stepDecision(token) {
        if (token !== decisionEngine.runToken || state.paused) return;
        const cfg = decisionEngine.config;
        if (!cfg) return;
        decisionEngine.stage++;
        applyDecisionStage(decisionEngine.stage, cfg);
        if (decisionEngine.stage === 1) {
          scheduleDecisionStep(1300, token);
        } else if (decisionEngine.stage === 2) {
          scheduleDecisionStep(1300, token);
        }
      }

      function finishDecisionImmediately() {
        const cfg = decisionEngine.config;
        if (!cfg) return;
        if (decisionEngine.timerId !== null) {
          clearTimeout(decisionEngine.timerId);
          decisionEngine.timerId = null;
        }
        decisionEngine.remainingMs = 0;
        decisionEngine.stage = 3;
        applyDecisionStage(3, cfg);
      }

      function startDecision(config) {
        stopDecision();
        decisionEngine.config = config || null;
        if (!config) {
          decisionEngine.stage = 0;
          return;
        }
        const token = decisionEngine.runToken;
        decisionEngine.stage = 0;
        applyDecisionStage(0, config);

        const reducedMotion =
          typeof window !== "undefined" &&
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion) {
          finishDecisionImmediately();
          return;
        }
        scheduleDecisionStep(950, token);
      }

      function pauseDecision() {
        if (decisionEngine.timerId !== null) {
          const elapsed = Date.now() - decisionEngine.scheduledAt;
          decisionEngine.remainingMs = Math.max(20, decisionEngine.remainingMs - elapsed);
          clearTimeout(decisionEngine.timerId);
          decisionEngine.timerId = null;
        }
      }

      function resumeDecision() {
        if (!decisionEngine.config || decisionEngine.stage >= 3) return;
        if (decisionEngine.timerId === null) {
          scheduleDecisionStep(
            decisionEngine.remainingMs > 0 ? decisionEngine.remainingMs : 40,
            decisionEngine.runToken,
          );
        }
      }

      /* ==========================================================================
       RENDERIZADO DEL ESCENARIO PRINCIPAL (PONENCIA 3D O VISTAS AUXILIARES)
       ========================================================================== */
      function renderMain() {
        stopTerminal();
        stopDecision();
        const mount = document.getElementById("main-mount");
        if (state.view === "simulador") {
          mount.innerHTML = renderFinOpsSimulator();
          return;
        }
        if (state.view === "patrones") {
          mount.innerHTML = renderPatternsGallery();
          return;
        }
        if (state.view === "cheatsheets") {
          mount.innerHTML = renderCheatsheetsView();
          return;
        }

        const mod = MODULES[state.modIdx];
        const lesson = getCurrentLesson();
        const totalSteps = lesson.steps.length;
        if (state.stepIdx >= totalSteps) state.stepIdx = totalSteps - 1;
        const currentStep = lesson.steps[state.stepIdx];
        const kpis = lesson.kpis[state.stepIdx] || lesson.kpis[0];

        // Cálculo de porcentaje de barra inferior de pasos
        const progressPct =
          totalSteps > 1 ? (state.stepIdx / (totalSteps - 1)) * 100 : 100;

        // Texto del botón siguiente
        const isLastStep = state.stepIdx === totalSteps - 1;
        const nextStepTitle = !isLastStep
          ? lesson.steps[state.stepIdx + 1].short
          : hasNextLesson()
            ? "Siguiente Slide"
            : "Completar";

        const totalSlides = getFlatLessons().length;
        mount.innerHTML = `
        <div class="lesson-shell">
          <!-- Cabecera Editorial -->
          <header class="lesson-header">
            <div>
              <div class="lesson-breadcrumb">${mod.title} / Diapositiva ${lesson.slideNum} de ${totalSlides}</div>
              <h1 class="lesson-title">${lesson.title}</h1>
              <p class="lesson-subtitle">${lesson.subtitle}</p>
            </div>
            <div class="header-pills">
              <span class="meta-pill meta-pill--sand">⏱ ${lesson.duration}</span>
              <span class="meta-pill meta-pill--green">📶 ${lesson.level}</span>
              <span class="meta-pill meta-pill--violet">☰ ${totalSteps} pasos</span>
            </div>
          </header>

          <!-- Lienzo Isométrico 3D -->
          <section class="canvas-zone">
            <div class="canvas-hud-top">
              <div class="kpi-strip">
                ${kpis
                  .map(
                    (k) => `
                  <div class="kpi-card ${k.status === "alert" ? "is-alert" : k.status === "good" ? "is-good" : ""}">
                    <div class="kpi-card__label">${k.label}</div>
                    <div class="kpi-card__val">${k.val}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>

              <div class="playback-controls">
                <button class="hud-btn" type="button" onclick="replayAnimation()" title="Reiniciar animación y pasos">
                  ↺ Replay
                </button>
                <button class="hud-btn ${state.paused ? "is-paused" : ""}" id="pause-btn" type="button" onclick="togglePause()">
                  ${state.paused ? "▶ Resume" : "⏸ Pause"}
                </button>
              </div>
            </div>

            <div class="iso-stage-wrap">
              <svg id="iso-scene" viewBox="0 0 790 345" role="img" aria-label="Diagrama isométrico 3D interactivo">
                <defs>
                  <marker id="arrow-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="var(--svg-stroke)" />
                  </marker>
                </defs>
                ${currentStep.renderSvg()}
              </svg>

              <!-- Inspector de Nodo al hacer clic -->
              <div class="node-inspector" id="node-inspector">
                <div class="node-inspector__head">
                  <span id="inspector-title">Componente 3D</span>
                  <button type="button" onclick="closeInspector()" style="background:none; border:none; cursor:pointer; font-weight:800; color:var(--ink);">✕</button>
                </div>
                <p id="inspector-body" style="color:var(--muted); line-height:1.45;"></p>
              </div>
            </div>

            ${
              currentStep.console
                ? `
            <div class="term-panel" id="term-panel" onclick="finishTerminalImmediately()" title="Haz clic para mostrar toda la traza al instante">
              <div class="term-bar">
                <div class="term-bar-left">
                  <span class="term-dots" aria-hidden="true">
                    <i class="term-dot term-dot--r"></i>
                    <i class="term-dot term-dot--y"></i>
                    <i class="term-dot term-dot--g"></i>
                  </span>
                  <span class="term-title">${escapeHtml(currentStep.console.title || "terminal")}</span>
                </div>
                <span class="term-hint">clic para saltar</span>
              </div>
              <div class="term-body" id="term-body" aria-live="polite">
                <div class="term-line term-line--prompt"><span class="term-prefix">›</span><span id="term-prompt-text"></span><span class="term-cursor" id="term-cursor"></span></div>
              </div>
              <div class="term-footer">
                <span>traza sincronizada con el diagrama</span>
                <span>ejemplo ilustrativo</span>
              </div>
            </div>
            `
                : ""
            }

            ${
              currentStep.decision
                ? `
            <div class="decision-panel" id="decision-panel" onclick="finishDecisionImmediately()" title="Haz clic para ver la decisión final al instante">
              <div class="decision-header">
                <span>${escapeHtml(currentStep.decision.title || "DECISIÓN HUMANA")}</span>
                <span class="decision-status" id="decision-status">${escapeHtml(currentStep.decision.statusWaiting || "Agente en pausa")}</span>
              </div>
              <div class="decision-body">
                <div class="decision-question">${escapeHtml(currentStep.decision.question)}</div>
                <div class="decision-grid">
                  ${currentStep.decision.options
                    .map(
                      (opt, idx) => `
                    <div class="decision-card" id="decision-opt-${idx}">
                      <div class="decision-card__tag">${escapeHtml(opt.tag)}</div>
                      <div class="decision-card__title">${escapeHtml(opt.title)}</div>
                      <div class="decision-card__desc">${escapeHtml(opt.desc)}</div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
              <div class="decision-footer">
                <span>${escapeHtml(currentStep.decision.footerLeft || "decide: el equipo, no el agente")}</span>
                <span>${escapeHtml(currentStep.decision.footerRight || "escenario ilustrativo")}</span>
              </div>
            </div>
            `
                : ""
            }

            <div class="canvas-legend">
              <div class="legend-items">
                <span><i class="legend-dot" style="background:#f7a800;"></i>request / prompt</span>
                <span><i class="legend-dot" style="background:#103250;"></i>response / verificado</span>
                <span><i class="legend-dot" style="background:#ffffff;"></i>error / cuello botella</span>
              </div>
              <span>💡 Haz clic en cualquier bloque 3D para inspeccionarlo</span>
            </div>
          </section>

          <!-- Barra Inferior de Pasos (Stepper) -->
          <footer class="bottom-stepper">
            <div class="stepper-top-row">
              <span>En esta diapositiva</span>
              <span>Paso ${state.stepIdx + 1} de ${totalSteps}</span>
            </div>
            <div class="stepper-track">
              <div class="stepper-line-bg"></div>
              <div class="stepper-line-fill" style="width: calc(${progressPct}% - 16px);"></div>
              ${lesson.steps
                .map((st, idx) => {
                  const cls =
                    idx === state.stepIdx
                      ? "is-current"
                      : idx < state.stepIdx
                        ? "is-past"
                        : "";
                  return `
                  <button class="step-node-btn ${cls}" type="button" onclick="setStep(${idx})">
                    <span class="step-circle">${idx + 1}</span>
                    <span class="step-node-label">${st.short}</span>
                  </button>
                `;
                })
                .join("")}
            </div>
          </footer>

          <!-- Panel Derecho de Explicación Pedagógica -->
          <aside class="narrative-panel">
            <div class="step-kicker-row">
              <span>PASO ${state.stepIdx + 1} DE ${totalSteps}</span>
              <span>SLIDE #${lesson.slideNum}</span>
            </div>

            <h2 class="step-heading">${currentStep.title}</h2>
            <div class="step-body">${currentStep.body}</div>

            <div class="callout-box ${currentStep.calloutAccent ? "decision-role-callout" : ""}">
              <div class="callout-box__title">${currentStep.calloutTitle}</div>
              <div>${currentStep.callout}</div>
            </div>

            <div class="step-nav-buttons">
              <button class="btn-back" type="button" onclick="prevStep()" ${state.stepIdx === 0 && state.modIdx === 0 && state.lessonIdx === 0 ? "disabled" : ""}>
                ← Atrás
              </button>
              <button class="btn-next" type="button" onclick="nextStep()">
                Siguiente: ${nextStepTitle} →
              </button>
            </div>

            <div class="checklist-box">
              <div class="checklist-box__title">Consideraciones</div>
              <ul class="checklist-list">
                ${lesson.checklist
                  .map((item, idx) => {
                    const checked = idx <= state.stepIdx;
                    return `
                    <li class="${checked ? "is-done" : ""}">
                      <span class="checklist-icon">${checked ? "✓" : "○"}</span>
                      <span>${item}</span>
                    </li>
                  `;
                  })
                  .join("")}
              </ul>
            </div>
          </aside>
        </div>
      `;

        bindNodeInspectors();
        applyPauseState();
        if (currentStep.console) {
          startTerminal(currentStep.console);
        }
        if (currentStep.decision) {
          startDecision(currentStep.decision);
        }
      }

      /* ==========================================================================
       VISTAS AUXILIARES: SIMULADOR FINOPS, PATRONES Y CHEATSHEETS
       ========================================================================== */
      function renderFinOpsSimulator() {
        const isParallel = state.simWorkload === "parallel";
        const n = state.simAgents;
        const baseTokens = 2500;
        const multiplier = isParallel ? 1 + n * 2.4 : 1 + n * 3.6;
        const loopFactor = state.simCircuitBreaker ? 1 : 2.8;
        const totalTokens = Math.round(baseTokens * multiplier * loopFactor);
        const estCost = (totalTokens * 0.000015).toFixed(3);
        const speedup = isParallel
          ? `${Math.min(n, 4.2).toFixed(1)}× más rápido`
          : "0.7× (Más lento por coordinación)";

        return `
        <div class="alt-view-container">
          <div class="lesson-breadcrumb">SIMULADOR INTERACTIVO · BLOQUE 03 FINOPS DE TOKENS</div>
          <h1 class="lesson-title">Calculadora FinOps: ¿Enjambre o Agente Individual?</h1>
          <p class="lesson-subtitle">Evalúa en vivo el impacto de paralelismo real, número de agentes y Circuit Breakers sobre el costo de tokens.</p>

          <div class="cards-grid-3" style="margin-top:20px;">
            <div class="editorial-card">
              <h3 style="margin-bottom:10px;">1. Naturaleza de la Tarea</h3>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <button class="nav__item ${!isParallel ? "is-active" : ""}" type="button" onclick="updateSim('sequential', null, null)">
                  🔗 Secuencial (Paso B depende de A)
                </button>
                <button class="nav__item ${isParallel ? "is-active" : ""}" type="button" onclick="updateSim('parallel', null, null)">
                  ⚡ Paralelizable (Subtareas independientes)
                </button>
              </div>
            </div>

            <div class="editorial-card">
              <h3 style="margin-bottom:10px;">2. Tamaño del Enjambre: ${n} agente(s)</h3>
              <input type="range" min="1" max="8" value="${n}" style="width:100%; accent-color:var(--accent);"
                     oninput="updateSim(null, Number(this.value), null)" />
              <label style="display:flex; align-items:center; gap:8px; margin-top:12px; font-size:13px; cursor:pointer;">
                <input type="checkbox" ${state.simCircuitBreaker ? "checked" : ""}
                       onchange="updateSim(null, null, this.checked)" />
                <span>Activar Circuit Breaker (<code>max_tokens</code> + TTL)</span>
              </label>
            </div>

            <div class="editorial-card" style="background:var(--surface-2);">
              <h3 style="margin-bottom:10px;">3. Diagnóstico de Arquitectura</h3>
              <p style="font-family:var(--mono); font-size:13px; margin-bottom:6px;">Tokens estimados: <strong>${totalTokens.toLocaleString()}</strong></p>
              <p style="font-family:var(--mono); font-size:13px; margin-bottom:6px;">Costo por ejecución: <strong>$${estCost} USD</strong></p>
              <p style="font-family:var(--mono); font-size:13px; margin-bottom:10px;">Velocidad neta: <strong>${speedup}</strong></p>
              <div class="callout-box">
                ${
                  !state.simCircuitBreaker
                    ? "🚨 Riesgo crítico: Sin Circuit Breaker, un bucle de autocorrección dispara el gasto casi 3×."
                    : !isParallel && n > 1
                      ? "⚠️ Recomendación: Usa 1 solo Agente + Tools. Un Swarm en tareas secuenciales no mejora precisión y multiplica costos."
                      : "✅ Arquitectura óptima: Paralelismo real protegido con límites estrictos."
                }
              </div>
            </div>
          </div>
        </div>
      `;
      }

      function renderPatternsGallery() {
        const patterns = [
          {
            num: "01",
            name: "Agente + Tools",
            rate: "90–95% casos",
            desc: "Observa, actúa y ejecuta comandos. Punto de partida obligatorio antes de escalar a multiagentes.",
          },
          {
            num: "02",
            name: "Cadena Secuencial",
            rate: "Flujos rígidos",
            desc: "Etapas lineales donde la salida estructurada de A es la entrada estricta de B.",
          },
          {
            num: "03",
            name: "Enrutamiento",
            rate: "Clasificación",
            desc: "Un Router inspecciona la intención y delega al especialista de dominio más pequeño y preciso.",
          },
          {
            num: "04",
            name: "Paralelismo",
            rate: "Auditoría / PRs",
            desc: "Múltiples agentes evalúan el mismo artefacto desde ángulos ortogonales (seguridad, lógica, perf).",
          },
          {
            num: "05",
            name: "Orquestador",
            rate: "Planes abiertos",
            desc: "Crea un plan dinámico en ejecución y delega subtareas impredecibles a workers especializados.",
          },
          {
            num: "06",
            name: "Agent Swarm (Archivos)",
            rate: "BOARD.md",
            desc: "Memoria compartida en archivos locales con escritor único y verificador con ojos frescos.",
          },
        ];
        return `
        <div class="alt-view-container">
          <div class="lesson-breadcrumb">CATÁLOGO DE ARQUITECTURA · DIAPOSITIVAS 7 Y 8</div>
          <h1 class="lesson-title">Catálogo de Patrones Agénticos</h1>
          <p class="lesson-subtitle">Selecciona el patrón mínimo necesario según la complejidad y paralelismo real de tu problema.</p>
          <div class="cards-grid-3">
            ${patterns
              .map(
                (p) => `
              <div class="editorial-card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span style="font-family:var(--mono); font-weight:800; color:var(--accent);">PATRÓN ${p.num}</span>
                  <span class="meta-pill meta-pill--sand">${p.rate}</span>
                </div>
                <h3 style="margin-bottom:6px;">${p.name}</h3>
                <p style="font-size:13px; color:var(--muted); line-height:1.5;">${p.desc}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `;
      }

      function renderCheatsheetsView() {
        const rules = [
          {
            title: "Tesis Central de la Ponencia",
            text: "Programar hoy es más rápido que nunca; el verdadero reto es gobernar la complejidad operativa y mental.",
          },
          {
            title: "Regla de Carga Cognitiva",
            text: "Cuando la carga ajena (K8s, YAML, IAM, prompts) ocupa la memoria de trabajo del dev, no queda espacio para el negocio.",
          },
          {
            title: "Salud del Ingeniero (Paradoja de Jevons)",
            text: "La disciplina hoy exige foco profundo, metas claras (Goals) y desconexión real fuera de la pantalla.",
          },
          {
            title: "5 Reglas de Oro del Agent Swarm",
            text: "1) Independencia · 2) Un solo dueño · 3) Escritor único por archivo · 4) Verificador con ojos frescos · 5) Límites estrictos de memoria y tiempo.",
          },
          {
            title: "Filosofía Platform Engineering",
            text: "Tratar la infraestructura como un producto interno cuyo cliente es el desarrollador (Golden Paths).",
          },
          {
            title: "Regla de Oro en Code Reviews & Sandboxes",
            text: "Usa AWS Nitro Sandboxes solo en agentes no confiables. En PRs: 'Sin hallazgos de la IA' no significa código limpio; mantén el escepticismo humano.",
          },
        ];
        return `
        <div class="alt-view-container">
          <div class="lesson-breadcrumb">HOJA DE REFERENCIA RÁPIDA · UNISALLE 2026</div>
          <h1 class="lesson-title">Cheatsheet: Gobierno de Ecosistemas Agénticos</h1>
          <p class="lesson-subtitle">Síntesis ejecutiva de las reglas de arquitectura, FinOps y liderazgo técnico de la conferencia.</p>
          <div class="cards-grid-3">
            ${rules
              .map(
                (r) => `
              <div class="editorial-card">
                <h3 style="color:var(--accent); font-size:15px; margin-bottom:8px;">${r.title}</h3>
                <p style="font-size:13px; line-height:1.55;">${r.text}</p>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `;
      }

      /* ==========================================================================
       INTERACTIVIDAD DEL LIENZO SVG, NAVEGACIÓN Y BÚSQUEDA
       ========================================================================== */
      function bindNodeInspectors() {
        document.querySelectorAll(".iso-node").forEach((node) => {
          node.addEventListener("click", () => {
            const info = node.getAttribute("data-info");
            const titleEl = node.querySelector("text");
            if (!info) return;
            document.getElementById("inspector-title").textContent = titleEl
              ? titleEl.textContent
              : "Componente 3D";
            document.getElementById("inspector-body").textContent = info;
            document
              .getElementById("node-inspector")
              .classList.add("is-visible");
          });
        });
      }

      function closeInspector() {
        const el = document.getElementById("node-inspector");
        if (el) el.classList.remove("is-visible");
      }

      function applyPauseState() {
        const svg = document.getElementById("iso-scene");
        if (!svg || typeof svg.pauseAnimations !== "function") return;
        if (state.paused) svg.pauseAnimations();
        else svg.unpauseAnimations();
      }

      function togglePause() {
        state.paused = !state.paused;
        applyPauseState();
        const pauseBtn = document.getElementById("pause-btn");
        if (pauseBtn) {
          pauseBtn.classList.toggle("is-paused", state.paused);
          pauseBtn.textContent = state.paused ? "▶ Resume" : "⏸ Pause";
        }
        if (state.paused) {
          pauseTerminal();
          pauseDecision();
        } else {
          resumeTerminal();
          resumeDecision();
        }
      }

      function replayAnimation() {
        state.paused = false;
        const lesson = getCurrentLesson();
        const step = lesson && lesson.steps[state.stepIdx];
        if (step && (step.console || step.decision)) {
          applyPauseState();
          const pauseBtn = document.getElementById("pause-btn");
          if (pauseBtn) {
            pauseBtn.classList.remove("is-paused");
            pauseBtn.textContent = "⏸ Pause";
          }
          if (step.console) startTerminal(step.console);
          if (step.decision) startDecision(step.decision);
          return;
        }
        state.stepIdx = 0;
        renderMain();
      }

      function toggleModule(mIdx) {
        MODULES[mIdx].open = !MODULES[mIdx].open;
        renderSidebar();
      }

      function selectLesson(mIdx, lIdx) {
        state.view = "ponencia";
        state.modIdx = mIdx;
        state.lessonIdx = lIdx;
        state.stepIdx = 0;
        state.paused = false;
        MODULES[mIdx].open = true;
        state.completedSlugs.add(MODULES[mIdx].lessons[lIdx].slug);
        updateTopNavHighlight();
        document
          .getElementById("workspace")
          .classList.remove("mobile-sidebar-open");
        renderSidebar();
        renderMain();
      }

      function setStep(idx) {
        state.stepIdx = idx;
        const lesson = getCurrentLesson();
        if (idx === lesson.steps.length - 1) {
          state.completedSlugs.add(lesson.slug);
          renderSidebar();
        }
        renderMain();
      }

      function hasNextLesson() {
        const mod = MODULES[state.modIdx];
        return (
          state.lessonIdx < mod.lessons.length - 1 ||
          state.modIdx < MODULES.length - 1
        );
      }

      function nextStep() {
        const lesson = getCurrentLesson();
        if (state.stepIdx < lesson.steps.length - 1) {
          state.stepIdx++;
          if (state.stepIdx === lesson.steps.length - 1) {
            state.completedSlugs.add(lesson.slug);
            renderSidebar();
          }
          renderMain();
        } else {
          // Avanzar a la siguiente diapositiva
          const mod = MODULES[state.modIdx];
          if (state.lessonIdx < mod.lessons.length - 1) {
            selectLesson(state.modIdx, state.lessonIdx + 1);
          } else if (state.modIdx < MODULES.length - 1) {
            selectLesson(state.modIdx + 1, 0);
          }
        }
      }

      function prevStep() {
        if (state.stepIdx > 0) {
          state.stepIdx--;
          renderMain();
        } else if (state.lessonIdx > 0) {
          const prevLesson = MODULES[state.modIdx].lessons[state.lessonIdx - 1];
          selectLesson(state.modIdx, state.lessonIdx - 1);
          state.stepIdx = prevLesson.steps.length - 1;
          renderMain();
        } else if (state.modIdx > 0) {
          const prevMod = MODULES[state.modIdx - 1];
          const lastL = prevMod.lessons.length - 1;
          selectLesson(state.modIdx - 1, lastL);
          state.stepIdx = prevMod.lessons[lastL].steps.length - 1;
          renderMain();
        }
      }

      function updateSim(workload, agents, cb) {
        if (workload !== null) state.simWorkload = workload;
        if (agents !== null) state.simAgents = agents;
        if (cb !== null) state.simCircuitBreaker = cb;
        renderMain();
      }

      function updateTopNavHighlight() {
        document.querySelectorAll("#top-nav .nav__item").forEach((btn) => {
          btn.classList.toggle("is-active", btn.dataset.view === state.view);
        });
      }

      /* ==========================================================================
       BUSCADOR RÁPIDO (⌘K / Ctrl+K)
       ========================================================================== */
      function openSearch() {
        const modal = document.getElementById("search-modal");
        const input = document.getElementById("search-input");
        modal.classList.add("is-open");
        input.value = "";
        renderSearchHits("");
        setTimeout(() => input.focus(), 40);
      }

      function closeSearch() {
        document.getElementById("search-modal").classList.remove("is-open");
      }

      function renderSearchHits(query) {
        const q = query.trim().toLowerCase();
        const hits = getFlatLessons().filter(
          ({ mod, lesson }) =>
            !q ||
            lesson.title.toLowerCase().includes(q) ||
            lesson.subtitle.toLowerCase().includes(q) ||
            mod.title.toLowerCase().includes(q) ||
            `slide ${lesson.slideNum}`.includes(q),
        );

        document.getElementById("search-results").innerHTML = hits.length
          ? hits
              .map(
                ({ mod, lesson, mIdx, lIdx }) => `
            <button class="search-hit" type="button" onclick="selectLesson(${mIdx}, ${lIdx}); closeSearch();">
              <div>
                <div style="font-size:13px; font-weight:700;">Slide ${lesson.slideNum}: ${lesson.title}</div>
                <div style="font-size:11.5px; color:var(--muted);">${mod.title} · ${lesson.steps.length} pasos</div>
              </div>
              <span style="font-family:monospace; font-size:11px; color:var(--accent);">Ir →</span>
            </button>
          `,
              )
              .join("")
          : `<div style="padding:16px; text-align:center; color:var(--muted); font-size:13px;">No se encontraron coincidencias para "${query}".</div>`;
      }

      /* ==========================================================================
       EVENTOS GLOBALES
       ========================================================================== */
      document
        .getElementById("search-close")
        ?.addEventListener("click", closeSearch);
      document.getElementById("search-modal")?.addEventListener("click", (e) => {
        if (e.target.id === "search-modal") closeSearch();
      });
      document.getElementById("search-input")?.addEventListener("input", (e) => {
        renderSearchHits(e.target.value);
      });

      document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          openSearch();
          return;
        }
        if (e.key === "Escape") {
          closeSearch();
          closeInspector();
          const langMenu = document.getElementById("lang-menu");
          if (langMenu) langMenu.hidden = true;
          return;
        }
        if (
          document.getElementById("search-modal")?.classList.contains("is-open")
        )
          return;
        if (e.target.tagName === "INPUT") return;

        if (state.view === "ponencia") {
          if (e.key === "ArrowRight") nextStep();
          if (e.key === "ArrowLeft") prevStep();
        }
      });

      // Arranque inicial
      renderSidebar();
      renderMain();
