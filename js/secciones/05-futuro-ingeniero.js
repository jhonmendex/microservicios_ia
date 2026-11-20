// Sección 5 de la ponencia
const SECTION_05 = {
  id: "mod-05",
  title: "05. Futuro del Ingeniero",
  color: "blue",
  open: true,
  lessons: [
    {
      slug: "slide-13-nuevo-rol-ingeniero",
      slideNum: 13,
      title: "El nuevo rol del Ingeniero de Software",
      subtitle:
        "Dar de alta el microservicio de Pagos con un agente de IA: una sola tarea de punta a punta donde en cada punto crítico interviene un rol humano distinto.",
      duration: "6 min",
      level: "05 · Cierre",
      kpis: [
        [
          { label: "ROL ACTIVO", val: "1. Arq. Contexto", status: "good" },
          { label: "AMBIGÜEDAD", val: "3 rutas → 1 contrato", status: "good" },
          { label: "ARTEFACTO", val: "contrato-pagos.yaml", status: "good" },
          { label: "RIESGO SIN SPEC", val: "Alto (deriva)", status: "alert" },
        ],
        [
          { label: "ROL ACTIVO", val: "2. Auditor Sistemas", status: "good" },
          { label: "SALIDA IA", val: "Validada vs esquema", status: "good" },
          { label: "TOKENS (EJ.)", val: "80% · Circuit Breaker", status: "alert" },
          { label: "CONTROL", val: "Evidencia + FinOps", status: "good" },
        ],
        [
          { label: "ROL ACTIVO", val: "3. Líder Colaborativo", status: "good" },
          { label: "ESTADO AGENTE", val: "En pausa por decisión", status: "alert" },
          { label: "DECISIÓN", val: "Datos mínimos (ética)", status: "good" },
          { label: "RESPONSABLE", val: "El equipo humano", status: "good" },
        ],
        [
          { label: "HERRAMIENTAS", val: "4 rotaciones (ej.)", status: "" },
          { label: "BASE TÉCNICA", val: "Redes · SO · Arq.", status: "good" },
          { label: "CONTRATO API", val: "Intacto", status: "good" },
          { label: "DURABILIDAD", val: "Principios > Tools", status: "good" },
        ],
        [
          { label: "SERVICIO", val: "Pagos en producción", status: "good" },
          { label: "CARGA HUMANA", val: "Estable (< límite)", status: "good" },
          { label: "ROLES", val: "3 roles · 1 equipo", status: "good" },
          { label: "CIERRE", val: "UNISALLE · Indivisa", status: "good" },
        ],
      ],
      checklist: [
        "Definir especificaciones y contratos claros de API antes de delegar al agente",
        "Auditar salidas probabilísticas contra esquemas y frenar costos con circuit breakers",
        "Asumir como equipo las decisiones de empatía, privacidad y ética profesional",
        "Anclar el trabajo en fundamentos inamovibles: redes, sistemas operativos y arquitectura",
        "Repartir la carga cognitiva entre los tres roles para operar de forma sostenible",
      ],
      steps: [
        {
          short: "1. Arq. Contexto",
          title: "Arquitecto de Contexto: definir antes de delegar",
          body: `<p>Arrancamos la tarea: dar de alta el microservicio de <strong>Pagos</strong> con ayuda de un agente de IA. Si el equipo lanza una instrucción vaga (<em>"haz el servicio de pagos"</em>), el agente puede divergir por tres caminos incompatibles.</p>
                 <p>Cuando el <strong>Arquitecto de Contexto</strong> entrega <code>contrato-pagos.yaml</code> con especificaciones, tipos y autenticación explícita, la ambigüedad colapsa en una única implementación alineada.</p>`,
          calloutTitle: "Rol activo · Arquitecto de Contexto",
          callout:
            "1. Arquitecto de Contexto: diseñar especificaciones y contratos claros de API",
          calloutAccent: true,
          console: {
            title: "01 · arquitecto-contexto — pagos-svc",
            prompt: "haz el servicio de pagos",
            lines: [
              {
                kind: "warn",
                text: "ruta ambigua A: REST con sesiones en memoria (sin contrato)",
                node: "r13-s1-opt-a",
                delay: 520,
              },
              {
                kind: "warn",
                text: "ruta ambigua B: gRPC sin autenticación (sin contrato)",
                node: "r13-s1-opt-b",
                delay: 520,
              },
              {
                kind: "warn",
                text: "ruta ambigua C: cola de eventos sin contrato",
                node: "r13-s1-opt-c",
                delay: 520,
              },
              {
                kind: "file",
                text: "contrato-pagos.yaml (especificaciones y contrato de API)",
                node: "r13-s1-people",
                delay: 620,
              },
              {
                kind: "result",
                text: "implementación conforme al contrato",
                node: "r13-s1-pagos",
                delay: 620,
              },
            ],
          },
          renderSvg: () => `
            <!-- Izquierda: Personas (Arquitecto de Contexto) -->
            <g class="iso-node" data-node-id="r13-s1-people" data-info="Arquitecto de Contexto: entrega contrato-pagos.yaml con endpoints, esquemas y autenticación antes de delegar.">
              ${ISO.peoplePlatform({ cx: 122, cy: 192, count: 4, caption: "1. Arq. Contexto" })}
            </g>

            <!-- Centro: Agente de IA -->
            ${ISO.agent({ id: "r13-s1-agent", cx: 365, cy: 178, rx: 56, ry: 31, h: 24, fill: "#b9a6e3", title: "Agente IA", sub: "Generador Pagos", badge: "SPEC", badgeColor: "#f7a800", info: "Sin contrato diverge en arquitecturas incompatibles; con contrato converge en una sola implementación." })}

            <!-- Derecha superior: 3 rutas divergentes del prompt vago -->
            ${ISO.block({ id: "r13-s1-opt-a", cx: 615, cy: 66, rx: 64, ry: 22, h: 12, fill: "#f2b8b5", title: "REST + sesiones", sub: "Sin contrato", info: "Interpretación divergente A: estado en memoria no escalable." })}
            ${ISO.block({ id: "r13-s1-opt-b", cx: 615, cy: 126, rx: 64, ry: 22, h: 12, fill: "#f2b8b5", title: "gRPC sin auth", sub: "Sin contrato", info: "Interpretación divergente B: exposición sin seguridad." })}
            ${ISO.block({ id: "r13-s1-opt-c", cx: 615, cy: 186, rx: 64, ry: 22, h: 12, fill: "#f2b8b5", title: "Cola sin contrato", sub: "Sin esquema", info: "Interpretación divergente C: eventos imposibles de consumir." })}

            <!-- Derecha inferior: Servicio de Pagos alineado al contrato -->
            ${ISO.block({ id: "r13-s1-pagos", cx: 615, cy: 266, rx: 74, ry: 32, h: 22, fill: "#8fc4a8", title: "Pagos · API", sub: "contrato-pagos.yaml", badge: "OK", badgeColor: "#1f6f4a", info: "Microservicio de Pagos implementado conforme al contrato de API definido por el Arquitecto de Contexto." })}

            <!-- Flujos -->
            ${ISO.flow({ id: "f13c-1a", d: "M 196 184 L 308 178", type: "request" })}
            ${ISO.flow({ id: "f13c-1b", d: "M 422 158 L 548 72", type: "error", dur: "2.8s" })}
            ${ISO.flow({ id: "f13c-1c", d: "M 422 168 L 548 128", type: "error", dur: "2.6s" })}
            ${ISO.flow({ id: "f13c-1d", d: "M 422 180 L 548 186", type: "error", dur: "2.4s" })}
            ${ISO.flow({ id: "f13c-1e", d: "M 422 196 L 540 258", type: "response", dur: "1.9s" })}
          `,
        },
        {
          short: "2. Auditor",
          title: "Auditor de Sistemas: validar lo probabilístico",
          body: `<p>El agente ya tiene contrato, pero sigue siendo un sistema probabilístico: puede devolver el campo <code>monto</code> como texto en lugar de número o entrar en reintentos que disparan el consumo de tokens.</p>
                 <p>Aquí interviene el <strong>Auditor de Sistemas</strong>: impone una compuerta de validación determinista contra el esquema y un <strong>circuit breaker</strong> de presupuesto que detiene la ejecución antes de perder control.</p>`,
          calloutTitle: "Rol activo · Auditor de Sistemas",
          callout:
            "2. Auditor de Sistemas: validar salidas probabilísticas y controlar tokens",
          calloutAccent: true,
          console: {
            title: "02 · auditor-sistemas — pagos-svc",
            prompt: "auditar salida y presupuesto de pagos-svc",
            lines: [
              {
                kind: "agent",
                text: "salida del agente: respuesta con campo 'monto' como texto",
                node: "r13-s2-agent",
                delay: 520,
              },
              {
                kind: "error",
                text: "rechazada: no cumple el esquema (monto debe ser número)",
                node: "r13-s2-gate",
                delay: 540,
              },
              {
                kind: "agent",
                text: "reintento con esquema estructurado",
                node: "r13-s2-agent",
                delay: 520,
              },
              {
                kind: "result",
                text: "validada contra contrato",
                node: "r13-s2-pagos",
                delay: 540,
              },
              {
                kind: "warn",
                text: "tokens 80% del presupuesto (ej.)",
                node: "r13-s2-meter",
                delay: 560,
              },
              {
                kind: "error",
                text: "circuit breaker: límite alcanzado, ejecución detenida",
                node: "r13-s2-meter",
                delay: 580,
              },
            ],
          },
          renderSvg: () => `
            <!-- Izquierda: Personas (Auditor de Sistemas) -->
            <g class="iso-node" data-node-id="r13-s2-people" data-info="Auditor de Sistemas: establece compuertas de esquema y límites de tokens (FinOps) para gobernar la IA.">
              ${ISO.peoplePlatform({ cx: 112, cy: 192, count: 4, caption: "2. Auditor Sistemas" })}
            </g>

            <!-- Centro: Agente de IA -->
            ${ISO.agent({ id: "r13-s2-agent", cx: 312, cy: 178, rx: 52, ry: 29, h: 22, fill: "#b9a6e3", title: "Agente IA", sub: "Salida probabilística", info: "Agente generando payloads y código para el microservicio de Pagos." })}

            <!-- Compuerta de validación y Medidor de Tokens -->
            ${ISO.block({ id: "r13-s2-gate", cx: 486, cy: 112, rx: 62, ry: 28, h: 18, fill: "#a9c5e8", title: "Validador", sub: "Esquema estricto", badge: "GATE", badgeColor: "#1f6f4a", info: "Compuerta determinista: rechaza tipos inválidos como 'monto' en texto antes de llegar a producción." })}
            ${ISO.block({ id: "r13-s2-meter", cx: 486, cy: 252, rx: 64, ry: 28, h: 18, fill: "#f2b8b5", title: "FinOps · 80% ej.", sub: "Circuit Breaker", badge: "STOP", badgeColor: "#c44536", info: "Control de presupuesto de tokens: alerta al 80% (ej.) y detiene la ejecución al alcanzar el tope." })}

            <!-- Derecha: Servicio de Pagos -->
            ${ISO.block({ id: "r13-s2-pagos", cx: 675, cy: 178, rx: 68, ry: 33, h: 22, fill: "#8fc4a8", title: "Pagos · API", sub: "Contrato verificado", badge: "OK", badgeColor: "#1f6f4a", info: "Solo recibe código y respuestas que superan la auditoría de esquema y presupuesto." })}

            <!-- Flujos -->
            ${ISO.flow({ id: "f13c-2a", d: "M 186 184 L 258 178", type: "request" })}
            ${ISO.flow({ id: "f13c-2b", d: "M 364 158 L 424 122", type: "request", dur: "2.1s" })}
            ${ISO.flow({ id: "f13c-2c", d: "M 364 200 L 422 242", type: "error", dur: "2.3s" })}
            ${ISO.flow({ id: "f13c-2d", d: "M 548 122 L 606 164", type: "response", dur: "2.0s" })}
          `,
        },
        {
          short: "3. Líder",
          title: "Líder Colaborativo: la decisión que no es técnica",
          body: `<p>El servicio de Pagos compila, pasa el esquema y respeta el presupuesto. Entonces surge una pregunta que ningún modelo puede resolver por su cuenta: <strong>¿qué datos del cliente es ético guardar?</strong></p>
                 <p>Aquí la terminal se detiene. El agente queda en pausa hasta que el equipo, con empatía hacia el usuario y criterio ético, decide optar por <strong>datos mínimos para cobrar</strong>.</p>`,
          calloutTitle: "Rol activo · Líder Colaborativo (tesis del autor)",
          callout:
            "Tesis del autor (no un hecho demostrado): 3. Líder Colaborativo: empatía y ética profesional insustituibles. La IA enumera opciones técnicas, pero no asume responsabilidad humana ante los clientes.",
          calloutAccent: true,
          decision: {
            title: "DECISIÓN DE PRODUCTO Y ÉTICA · PAGOS-SVC",
            question:
              "¿Guardamos el historial completo de compras del cliente o solo lo necesario para cobrar?",
            options: [
              {
                id: "opt-a",
                tag: "OPCIÓN A",
                title: "Historial completo del cliente",
                desc: "Más insumo para analítica y perfiles, pero mayor exposición de privacidad y riesgo regulatorio.",
              },
              {
                id: "opt-b",
                tag: "OPCIÓN B",
                title: "Solo datos mínimos para cobrar",
                desc: "Protege la privacidad del cliente, reduce la superficie de riesgo y aplica ética de minimización.",
              },
            ],
            chosenId: "opt-b",
            statusWaiting: "Agente en pausa · esperando decisión humana",
            statusChosen: "Decisión tomada: Opción B · agente reactivado",
            footerLeft: "decide: el equipo, no el agente",
            footerRight: "escenario ilustrativo",
            peopleNodeId: "r13-s3-people",
            resolvedNodeId: "r13-s3-pagos",
            svgPausedFlowId: "r13-s3-paused-arrow",
            svgActiveFlowId: "r13-s3-active-arrow",
          },
          renderSvg: () => `
            <!-- Izquierda: Personas (Líder Colaborativo) -->
            <g class="iso-node" data-node-id="r13-s3-people" data-info="Líder Colaborativo: delibera con producto, legal y negocio sobre privacidad y ética antes de autorizar al agente.">
              ${ISO.peoplePlatform({ cx: 145, cy: 192, count: 4, caption: "3. Líder Colaborativo" })}
            </g>

            <!-- Centro: Agente en Pausa -->
            ${ISO.agent({ id: "r13-s3-agent", cx: 395, cy: 178, rx: 58, ry: 32, h: 24, fill: "#e7c697", title: "Agente IA", sub: "Espera decisión ética", badge: "PAUSA", badgeColor: "#f7a800", info: "El agente no decide sobre privacidad ni ética: detiene su ejecución hasta recibir la directriz humana." })}

            <!-- Derecha: Servicio de Pagos -->
            ${ISO.block({ id: "r13-s3-pagos", cx: 648, cy: 178, rx: 74, ry: 34, h: 24, fill: "#8fc4a8", title: "Pagos · API", sub: "Datos mínimos", badge: "ÉTICA", badgeColor: "#1f6f4a", info: "Microservicio configurado con minimización de datos tras la decisión del equipo humano." })}

            <!-- Flujo humano hacia el agente -->
            ${ISO.flow({ id: "f13c-3a", d: "M 222 184 L 336 178", type: "request", dur: "2.3s" })}

            <!-- Flecha en pausa gris (visible hasta que el equipo decide) -->
            <g id="r13-s3-paused-arrow" class="decision-visible">
              <path d="M 456 178 L 570 178" fill="none" stroke="#8b96a3" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#arrow-head)" />
              <g transform="translate(513, 152)">
                <rect x="-46" y="-11" width="92" height="21" rx="10" fill="#ffffff" stroke="#8b96a3" stroke-width="1.4" />
                <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="9.2" font-weight="800" fill="#5e6b78">EN PAUSA</text>
              </g>
            </g>

            <!-- Flecha activa (aparece cuando se confirma la decisión humana) -->
            <g id="r13-s3-active-arrow" class="decision-hidden">
              ${ISO.flow({ id: "f13c-3b", d: "M 456 178 L 570 178", type: "response", dur: "1.8s" })}
            </g>
          `,
        },
        {
          short: "4. Fundamentos",
          title: "Fundamentos que no cambian: las herramientas rotan",
          body: `<p>A los pocos meses el equipo decide migrar el orquestador del agente de Pagos: pasa por <strong>LangGraph</strong>, <strong>CrewAI</strong>, <strong>Claude Code</strong> y <strong>MCP</strong> (ej.).</p>
                 <p>La capa superior rota sin pausa, pero la base —<strong>redes, sistemas operativos y arquitectura</strong>— y el contrato del servicio permanecen intactos. Quien domina los fundamentos cambia de herramienta sin empezar de cero.</p>`,
          calloutTitle: "Principios sobre herramientas",
          callout:
            "Cambiar de framework es rutinario cuando dominas contratos de red, aislamiento de procesos, concurrencia y arquitectura limpia.",
          console: {
            title: "04 · fundamentos — pagos-svc",
            prompt: "migrar orquestador del agente de pagos",
            initialBadgeTarget: "r13-rot-tool",
            initialBadgeText: "LangGraph",
            lines: [
              {
                kind: "tool",
                text: "LangGraph",
                node: "r13-s4-rot",
                badgeTarget: "r13-rot-tool",
                badgeText: "LangGraph",
                delay: 640,
              },
              {
                kind: "tool",
                text: "CrewAI",
                node: "r13-s4-rot",
                badgeTarget: "r13-rot-tool",
                badgeText: "CrewAI",
                delay: 640,
              },
              {
                kind: "tool",
                text: "Claude Code",
                node: "r13-s4-rot",
                badgeTarget: "r13-rot-tool",
                badgeText: "Claude Code",
                delay: 640,
              },
              {
                kind: "tool",
                text: "MCP",
                node: "r13-s4-rot",
                badgeTarget: "r13-rot-tool",
                badgeText: "MCP",
                delay: 640,
              },
              {
                kind: "result",
                text: "las herramientas cambiaron 4 veces; el contrato, la red y el sistema operativo siguen siendo los mismos",
                node: "r13-s4-base",
                delay: 700,
              },
            ],
          },
          renderSvg: () => `
            <!-- Base fija inferior: Fundamentos inamovibles -->
            ${ISO.block({ id: "r13-s4-base", cx: 395, cy: 274, rx: 252, ry: 42, h: 20, fill: "#103250", title: "REDES · SISTEMAS OPERATIVOS · ARQUITECTURA", sub: "Fundamentos que no cambian", info: "Base técnica duradera: protocolos de red, procesos/memoria del SO y principios de arquitectura." })}

            <!-- Izquierda: Personas -->
            <g class="iso-node" data-node-id="r13-s4-people" data-info="Equipo de ingeniería: se apoya en fundamentos sólidos para adoptar o reemplazar herramientas de IA sin fricción.">
              ${ISO.peoplePlatform({ cx: 122, cy: 158, count: 4, caption: "Equipo Ingeniería" })}
            </g>

            <!-- Centro: Placa rotatoria de herramienta sobre el agente -->
            <g class="iso-node" data-node-id="r13-s4-rot" data-info="Capa superior intercambiable: frameworks y protocolos de agentes que rotan cada trimestre (ej.).">
              <rect x="315" y="42" width="160" height="34" rx="17" fill="#f7a800" stroke="var(--svg-stroke)" stroke-width="1.8" />
              <text x="395" y="55" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="800" fill="#103250">HERRAMIENTA ACTIVA (EJ.)</text>
              <text id="r13-rot-tool" x="395" y="69" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="#103250">LangGraph</text>
            </g>

            ${ISO.agent({ id: "r13-s4-agent", cx: 395, cy: 154, rx: 56, ry: 30, h: 22, fill: "#b9a6e3", title: "Agente IA", sub: "Capa intercambiable", info: "El runtime o framework del agente rota, pero sigue conectado al mismo contrato." })}

            <!-- Derecha: Servicio de Pagos -->
            ${ISO.block({ id: "r13-s4-pagos", cx: 668, cy: 154, rx: 68, ry: 32, h: 22, fill: "#8fc4a8", title: "Pagos · API", sub: "Contrato intacto", badge: "ESTABLE", badgeColor: "#1f6f4a", info: "El microservicio y su contrato permanecen estables aunque cambie el orquestador de IA." })}

            <!-- Flujos -->
            ${ISO.flow({ id: "f13c-4a", d: "M 196 154 L 338 154", type: "request", dur: "2.2s" })}
            ${ISO.flow({ id: "f13c-4b", d: "M 452 154 L 598 154", type: "response", dur: "2.0s" })}
          `,
        },
        {
          short: "5. Síntesis",
          title: "Síntesis: tres roles, una carga repartida",
          body: `<p>El microservicio de <strong>Pagos</strong> queda en producción con su agente gobernado. El desarrollador ya no carga todo en solitario: la <strong>memoria de trabajo se mantiene por debajo del límite humano</strong> porque los tres roles reparten el peso entre contexto, auditoría y liderazgo ético.</p>
                 <p><strong>Reflexión final (UNISALLE · Indivisa Manent):</strong> las herramientas cambian cada mes; los principios perduran.</p>`,
          calloutTitle: "Cierre · Indivisa Manent · UNISALLE",
          callout:
            "Las herramientas cambian cada mes; los principios perduran.",
          calloutAccent: true,
          renderSvg: () => `
            <!-- Izquierda: Equipo y los 3 roles articulados -->
            <g class="iso-node" data-node-id="r13-s5-people" data-info="Equipo de ingeniería UNISALLE: colabora con la IA repartiendo contexto, auditoría y ética.">
              ${ISO.peoplePlatform({ cx: 108, cy: 196, count: 4, caption: "Equipo UNISALLE" })}
            </g>

            <!-- Los 3 roles rodeando el flujo -->
            ${ISO.block({ id: "r13-s5-rol1", cx: 282, cy: 74, rx: 60, ry: 24, h: 15, fill: "#e7c697", title: "1. Arquitecto", sub: "Specs y contratos", info: "Define el problema y los contratos antes de delegar." })}
            ${ISO.block({ id: "r13-s5-rol2", cx: 282, cy: 174, rx: 60, ry: 24, h: 15, fill: "#a9c5e8", title: "2. Auditor", sub: "Esquemas + FinOps", info: "Valida salidas probabilísticas y controla tokens." })}
            ${ISO.block({ id: "r13-s5-rol3", cx: 282, cy: 274, rx: 60, ry: 24, h: 15, fill: "#8fc4a8", title: "3. Líder Ético", sub: "Empatía y criterio", info: "Toma las decisiones humanas y éticas que el agente no asume." })}

            <!-- Centro: Agente gobernado -->
            ${ISO.agent({ id: "r13-s5-agent", cx: 472, cy: 174, rx: 52, ry: 28, h: 20, fill: "#b9a6e3", title: "Agente IA", sub: "Gobernado", info: "Agente operando dentro de contratos claros, validación y límites éticos." })}

            <!-- Derecha superior: Pagos en producción -->
            ${ISO.block({ id: "r13-s5-pagos", cx: 668, cy: 96, rx: 70, ry: 30, h: 20, fill: "#8fc4a8", title: "Pagos · Prod", sub: "Indivisa Manent", badge: "UNISALLE", badgeColor: "#1f6f4a", info: "Microservicio de Pagos en producción, confiable y alineado a principios de ingeniería." })}

            <!-- Esquina inferior derecha: Memoria de Trabajo estable (reutilizando ISO.vessel) -->
            <g transform="translate(490, 148) scale(0.56)">
              ${ISO.vessel({
                id: "r13-s5-vessel",
                cx: 330,
                cy: 258,
                rx: 74,
                ry: 34,
                capacity: 144,
                limit: 118,
                caption: "Carga Cognitiva Estable",
                info: "Memoria de trabajo por debajo del límite humano gracias a contratos claros, plataforma y reparto de roles.",
                layers: [
                  {
                    h: 40,
                    fill: "#a9c5e8",
                    sideLabel: "Intrínseca",
                    rightLabel: "Negocio",
                    topLabel: false,
                    info: "Complejidad esencial del dominio de Pagos.",
                  },
                  {
                    h: 34,
                    fill: "#8fc4a8",
                    sideLabel: "Pertinente",
                    rightLabel: "Criterio",
                    title: "Carga Estable",
                    sub: "Bajo límite humano",
                    info: "Espacio mental reservado para arquitectura, auditoría y ética.",
                  },
                ],
              })}
            </g>

            <!-- Flujos -->
            ${ISO.flow({ id: "f13c-5a", d: "M 176 172 L 222 86", type: "request", dur: "2.4s" })}
            ${ISO.flow({ id: "f13c-5b", d: "M 180 190 L 222 178", type: "request", dur: "2.2s" })}
            ${ISO.flow({ id: "f13c-5c", d: "M 176 212 L 222 266", type: "request", dur: "2.4s" })}
            ${ISO.flow({ id: "f13c-5d", d: "M 344 82 L 420 156", type: "response", dur: "2.1s" })}
            ${ISO.flow({ id: "f13c-5e", d: "M 344 174 L 418 174", type: "response", dur: "2.0s" })}
            ${ISO.flow({ id: "f13c-5f", d: "M 344 266 L 420 192", type: "response", dur: "2.1s" })}
            ${ISO.flow({ id: "f13c-5g", d: "M 526 160 L 598 112", type: "response", dur: "1.9s" })}
          `,
        },
      ],
    },
  ],
};
