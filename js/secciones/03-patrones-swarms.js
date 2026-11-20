// Sección 3 de la ponencia
const SECTION_03 = {
          id: "mod-03",
          title: "03. Patrones y Swarms",
          color: "violet",
          open: true,
          lessons: [
            {
              slug: "slide-7-cinco-patrones",
              slideNum: 7,
              title: "Los 5 patrones fundamentales de diseño de agentes",
              subtitle:
                "De un agente único con buenas herramientas hasta orquestadores dinámicos.",
              duration: "5 min",
              level: "03 · Patrones",
              kpis: [
                [
                  { label: "PATRÓN", val: "01. Agente+Tools", status: "good" },
                  { label: "COBERTURA", val: "90–95% tareas", status: "good" },
                  { label: "COMPLEJIDAD", val: "Baja", status: "good" },
                  {
                    label: "RECOMENDACIÓN",
                    val: "Empezar aquí",
                    status: "good",
                  },
                ],
                [
                  { label: "PATRÓN", val: "02. Cadena", status: "" },
                  { label: "FLUJO", val: "A → B → C", status: "" },
                  { label: "COMPLEJIDAD", val: "Baja-Media", status: "" },
                  { label: "USO IDEAL", val: "Pasos rígidos", status: "" },
                ],
                [
                  { label: "PATRÓN", val: "03. Enrutamiento", status: "" },
                  { label: "MECANISMO", val: "Router + Esp.", status: "" },
                  { label: "COMPLEJIDAD", val: "Media", status: "" },
                  { label: "USO IDEAL", val: "Clasificación", status: "" },
                ],
                [
                  { label: "PATRÓN", val: "04. Paralelismo", status: "" },
                  { label: "MECANISMO", val: "Multi-ángulo", status: "" },
                  { label: "COMPLEJIDAD", val: "Media-Alta", status: "" },
                  { label: "USO IDEAL", val: "Auditoría / PRs", status: "" },
                ],
                [
                  { label: "PATRÓN", val: "05. Orquestador", status: "alert" },
                  { label: "MECANISMO", val: "Plan Dinámico", status: "" },
                  { label: "COMPLEJIDAD", val: "Alta", status: "alert" },
                  { label: "PRINCIPIO", val: "Solo si exige", status: "" },
                ],
              ],
              checklist: [
                "Resolver el 90–95% de tareas con Patrón 01 (Agente + Tools)",
                "Aplicar Cadena Secuencial cuando la salida de A es entrada estricta de B",
                "Usar Enrutamiento para derivar peticiones a especialistas",
                "Escalar a Paralelismo u Orquestador solo cuando la complejidad lo exija",
              ],
              steps: [
                {
                  short: "01. Tools",
                  title: "Patrón 01: Agente + Tools (90–95% de tareas diarias)",
                  body: `<p>Un único modelo que observa, actúa y ejecuta comandos mediante herramientas bien diseñadas (APIs, SQL, terminal).</p>
                       <p><strong>Dato clave:</strong> Resuelve entre el <strong>90% y 95%</strong> de las tareas diarias sin necesidad de multiagentes.</p>`,
                  calloutTitle: "Principio de Simplicidad",
                  callout:
                    "No empieces con multiagentes: usa 1 agente con buenas herramientas hasta que la complejidad exija delegar.",
                  console: {
                    title: "patrón-01 · agente + tools · pagos",
                    prompt:
                      "Revisa el PR #482 del servicio de Pagos y dime si puedo hacer merge",
                    lines: [
                      {
                        kind: "think",
                        text: "Necesito ver el diff y correr las pruebas",
                        node: "p7-agent",
                        delay: 350,
                      },
                      {
                        kind: "tool",
                        text: "git diff main...pr-482",
                        node: "p7-tool-apis",
                        delay: 420,
                      },
                      {
                        kind: "tool",
                        text: "npm test -- pagos",
                        node: "p7-tool-bash",
                        delay: 460,
                      },
                      {
                        kind: "tool",
                        text: "grep -r 'timeout' src/pagos",
                        node: "p7-tool-sql",
                        delay: 420,
                      },
                      {
                        kind: "result",
                        text: "2 archivos cambiados · 41/41 tests OK · sin hallazgos críticos",
                        node: "p7-agent",
                        delay: 420,
                      },
                    ],
                  },
                  renderSvg: () => `
                  ${ISO.block({ id: "p7-agent", cx: 295, cy: 185, rx: 74, ry: 41, h: 26, fill: "#e7c697", title: "Agente Único", sub: "Observa · Actúa · Ejecuta", badge: "90-95%", badgeColor: "#1f6f4a", info: "Bucle agéntico simple con herramientas." })}
                  ${ISO.block({ id: "p7-tool-apis", cx: 565, cy: 115, rx: 52, ry: 28, h: 18, fill: "#8fc4a8", title: "Tool: APIs", sub: "REST / GraphQL", info: "Integración externa." })}
                  ${ISO.block({ id: "p7-tool-bash", cx: 565, cy: 190, rx: 52, ry: 28, h: 18, fill: "#a9c5e8", title: "Tool: Bash", sub: "Comandos / Git", info: "Ejecución de terminal." })}
                  ${ISO.cylinder({ id: "p7-tool-sql", cx: 565, cy: 255, rx: 36, ry: 16, h: 34, fill: "#b9a6e3", label: "SQL / Docs", info: "Consulta de datos." })}
                  ${ISO.flow({ id: "f7-1a", d: "M 368 168 L 512 125", type: "request", bidirectional: true })}
                  ${ISO.flow({ id: "f7-1b", d: "M 370 185 L 512 190", type: "request", bidirectional: true })}
                  ${ISO.flow({ id: "f7-1c", d: "M 365 205 L 525 262", type: "response", bidirectional: true })}
                `,
                },
                {
                  short: "02. Cadena",
                  title: "Patrón 02: Cadena Secuencial",
                  body: `<p>Etapas rígidas y deterministas en su secuencia: la salida validada del <strong>Agente A</strong> se convierte en la entrada estricta del <strong>Agente B</strong>.</p>`,
                  calloutTitle: "Tubería estructurada",
                  callout:
                    "Ideal cuando puedes descomponer un flujo en pasos fijos con puertas de validación intermedias.",
                  console: {
                    title: "patrón-02 · cadena secuencial · pagos",
                    prompt:
                      "Genera el reporte de endpoints modificados en Pagos",
                    lines: [
                      {
                        kind: "agent",
                        text: "Agente A › extrae los endpoints del diff → endpoints.json",
                        node: "p7-chain-a",
                        delay: 360,
                      },
                      {
                        kind: "result",
                        text: "salida validada contra schema",
                        node: "p7-chain-a",
                        delay: 340,
                      },
                      {
                        kind: "agent",
                        text: "Agente B › transforma a tabla de contratos",
                        node: "p7-chain-b",
                        delay: 380,
                      },
                      {
                        kind: "result",
                        text: "contrato OK",
                        node: "p7-chain-b",
                        delay: 320,
                      },
                      {
                        kind: "agent",
                        text: "Agente C › valida y emite reporte.md",
                        node: "p7-chain-c",
                        delay: 380,
                      },
                      {
                        kind: "result",
                        text: "reporte listo",
                        node: "p7-chain-c",
                        delay: 340,
                      },
                    ],
                  },
                  renderSvg: () => `
                  ${ISO.block({ id: "p7-chain-a", cx: 170, cy: 195, rx: 58, ry: 32, h: 22, fill: "#a9c5e8", title: "Agente A", sub: "Extrae Datos", info: "Paso 1 de la cadena." })}
                  ${ISO.block({ id: "p7-chain-b", cx: 395, cy: 195, rx: 58, ry: 32, h: 22, fill: "#e7c697", title: "Agente B", sub: "Transforma", info: "Paso 2: recibe salida estricta de A." })}
                  ${ISO.block({ id: "p7-chain-c", cx: 620, cy: 195, rx: 58, ry: 32, h: 22, fill: "#8fc4a8", title: "Agente C", sub: "Valida & Emite", info: "Paso 3: salida final." })}
                  ${ISO.flow({ id: "f7-2a", d: "M 228 195 L 336 195", type: "request" })}
                  ${ISO.flow({ id: "f7-2b", d: "M 453 195 L 561 195", type: "response" })}
                `,
                },
                {
                  short: "03. Router",
                  title: "Patrón 03: Enrutamiento (Routing)",
                  body: `<p>Un agente <strong>Router</strong> clasifica la intención de la petición entrante y la deriva al especialista ideal, evitando prompts gigantes llenos de instrucciones irrelevantes.</p>`,
                  calloutTitle: "Especialización limpia",
                  callout:
                    "Cada agente especialista mantiene un contexto pequeño, preciso y económico.",
                  console: {
                    title: "patrón-03 · enrutamiento · 3 peticiones",
                    prompt: "Error 500 en el checkout",
                    routeMode: true,
                    routePeers: ["p7-esp-soporte", "p7-esp-cloud", "p7-esp-finops"],
                    lines: [
                      {
                        kind: "agent",
                        text: "Router › intención: incidente cloud",
                        node: "p7-router",
                        delay: 350,
                      },
                      {
                        kind: "result",
                        text: "Derivado → Esp. Cloud (revisa pods y logs de Pagos)",
                        node: "p7-esp-cloud",
                        delay: 420,
                      },
                      {
                        kind: "think",
                        text: "› ¿Cuánto cuesta el clúster este mes?",
                        node: "p7-router",
                        delay: 520,
                      },
                      {
                        kind: "agent",
                        text: "Router › intención: costos",
                        node: "p7-router",
                        delay: 340,
                      },
                      {
                        kind: "result",
                        text: "Derivado → Esp. FinOps (consulta consumo mensual)",
                        node: "p7-esp-finops",
                        delay: 420,
                      },
                      {
                        kind: "think",
                        text: "› ¿Cómo restablezco mi contraseña?",
                        node: "p7-router",
                        delay: 520,
                      },
                      {
                        kind: "agent",
                        text: "Router › intención: soporte",
                        node: "p7-router",
                        delay: 340,
                      },
                      {
                        kind: "result",
                        text: "Derivado → Esp. Soporte (guía de recuperación)",
                        node: "p7-esp-soporte",
                        delay: 420,
                      },
                    ],
                  },
                  renderSvg: () => `
                  ${ISO.block({ id: "p7-router", cx: 215, cy: 190, rx: 64, ry: 36, h: 24, fill: "#e7c697", title: "Router", sub: "Clasifica petición", info: "Enrutador semántico." })}
                  ${ISO.block({ id: "p7-esp-soporte", cx: 545, cy: 105, rx: 58, ry: 31, h: 20, fill: "#a9c5e8", title: "Esp. Soporte", sub: "Tickets / FAQ", info: "Ruta 1." })}
                  ${ISO.block({ id: "p7-esp-cloud", cx: 545, cy: 190, rx: 62, ry: 33, h: 22, fill: "#8fc4a8", title: "Esp. Cloud", sub: "Ruta activa", badge: "MATCH", badgeColor: "#1f6f4a", info: "Ruta seleccionada." })}
                  ${ISO.block({ id: "p7-esp-finops", cx: 545, cy: 275, rx: 58, ry: 31, h: 20, fill: "#b9a6e3", title: "Esp. FinOps", sub: "Costos / SQL", info: "Ruta 3." })}
                  ${ISO.flow({ id: "f7-3a", d: "M 278 175 L 485 112", type: "request", active: false })}
                  ${ISO.flow({ id: "f7-3b", d: "M 280 190 L 482 190", type: "response" })}
                  ${ISO.flow({ id: "f7-3c", d: "M 278 205 L 485 268", type: "request", active: false })}
                `,
                },
                {
                  short: "04. Paralelo",
                  title: "Patrón 04: Paralelismo",
                  body: `<p>Múltiples agentes evalúan simultáneamente un mismo objeto desde distintos ángulos (por ejemplo: <strong>Seguridad, Rendimiento y Arquitectura</strong>) y consolidan sus hallazgos.</p>`,
                  calloutTitle: "Perspectivas ortogonales",
                  callout:
                    "Separar criterios en sesiones paralelas evita que un agente pierda atención en documentos largos.",
                  console: {
                    title: "patrón-04 · paralelismo · pr #482 pagos",
                    prompt: "Audita el PR #482 desde todos los ángulos",
                    lines: [
                      {
                        kind: "agent",
                        text: "Lanzando 3 agentes en paralelo",
                        node: "p7-par-art",
                        delay: 260,
                      },
                      {
                        kind: "agent",
                        text: "Seguridad › revisa OWASP/IAM",
                        node: "p7-par-sec",
                        delay: 120,
                      },
                      {
                        kind: "agent",
                        text: "Lógica › ejecuta edge cases",
                        node: "p7-par-log",
                        delay: 120,
                      },
                      {
                        kind: "agent",
                        text: "Perf › mide latencia",
                        node: "p7-par-perf",
                        delay: 120,
                      },
                      {
                        kind: "result",
                        text: "Seguridad: 1 hallazgo medio",
                        node: "p7-par-sec",
                        delay: 420,
                      },
                      {
                        kind: "result",
                        text: "Lógica: OK",
                        node: "p7-par-log",
                        delay: 240,
                      },
                      {
                        kind: "result",
                        text: "Perf: +12 ms",
                        node: "p7-par-perf",
                        delay: 240,
                      },
                      {
                        kind: "agent",
                        text: "Agregador › consolida veredicto",
                        node: "p7-par-agg",
                        delay: 380,
                      },
                      {
                        kind: "result",
                        text: "Merge bloqueado: corregir 1 hallazgo",
                        node: "p7-par-agg",
                        delay: 360,
                      },
                    ],
                  },
                  renderSvg: () => `
                  ${ISO.block({ id: "p7-par-art", cx: 155, cy: 190, rx: 54, ry: 30, h: 20, fill: "#a9c5e8", title: "Artefacto", sub: "PR / Spec", info: "Entrada común." })}
                  ${ISO.block({ id: "p7-par-sec", cx: 395, cy: 105, rx: 56, ry: 30, h: 18, fill: "#e8a47c", title: "Ag. Seguridad", sub: "OWASP / IAM", info: "Evaluador 1." })}
                  ${ISO.block({ id: "p7-par-log", cx: 395, cy: 190, rx: 56, ry: 30, h: 18, fill: "#e7c697", title: "Ag. Lógica", sub: "Edge cases", info: "Evaluador 2." })}
                  ${ISO.block({ id: "p7-par-perf", cx: 395, cy: 275, rx: 56, ry: 30, h: 18, fill: "#b9a6e3", title: "Ag. Perf", sub: "Latencia / SQL", info: "Evaluador 3." })}
                  ${ISO.block({ id: "p7-par-agg", cx: 635, cy: 190, rx: 56, ry: 31, h: 22, fill: "#8fc4a8", title: "Agregador", sub: "Consolida voto", info: "Veredicto unificado." })}
                  ${ISO.flow({ id: "f7-4a", d: "M 208 175 L 338 112", type: "request" })}
                  ${ISO.flow({ id: "f7-4b", d: "M 210 190 L 338 190", type: "request" })}
                  ${ISO.flow({ id: "f7-4c", d: "M 208 205 L 338 268", type: "request" })}
                  ${ISO.flow({ id: "f7-4d", d: "M 452 112 L 578 175", type: "response" })}
                  ${ISO.flow({ id: "f7-4e", d: "M 452 190 L 578 190", type: "response" })}
                  ${ISO.flow({ id: "f7-4f", d: "M 452 268 L 578 205", type: "response" })}
                `,
                },
                {
                  short: "05. Orquestador",
                  title: "Patrón 05: Orquestador Dinámico",
                  body: `<p>Un agente central crea un <strong>plan dinámico</strong> en tiempo de ejecución, delega subtareas abiertas a especialistas y sintetiza el resultado.</p>
                       <p><strong>Regla:</strong> Úsalo solo cuando las subtareas no puedan predecirse de antemano.</p>`,
                  calloutTitle: "Principio de Simplicidad",
                  callout:
                    "No empieces con multiagentes: usa 1 agente con buenas herramientas hasta que la complejidad exija delegar.",
                  console: {
                    title: "patrón-05 · orquestador dinámico · migración pagos",
                    prompt:
                      "Migra el servicio de Pagos a un contenedor nuevo con el mismo contrato",
                    lines: [
                      {
                        kind: "think",
                        text: "No puedo prever todas las subtareas",
                        node: "p7-orch",
                        delay: 360,
                      },
                      {
                        kind: "agent",
                        text: "Orquestador › plan: [dockerfile, config, pruebas, despliegue]",
                        node: "p7-orch",
                        delay: 420,
                      },
                      {
                        kind: "agent",
                        text: "Worker 1 › escribe Dockerfile",
                        node: "p7-w1",
                        delay: 380,
                      },
                      {
                        kind: "agent",
                        text: "Worker N › adapta configuración",
                        node: "p7-wn",
                        delay: 380,
                      },
                      {
                        kind: "error",
                        text: "Worker N › falla: variable DB_URL faltante",
                        node: "p7-wn",
                        delay: 480,
                      },
                      {
                        kind: "agent",
                        text: "Orquestador › replanifica: agrega paso de secretos",
                        node: "p7-orch",
                        delay: 460,
                      },
                      {
                        kind: "result",
                        text: "Síntesis: contenedor construido y probado",
                        node: "p7-synth",
                        delay: 420,
                      },
                    ],
                  },
                  renderSvg: () => `
                  ${ISO.block({ id: "p7-orch", cx: 215, cy: 190, rx: 68, ry: 38, h: 26, fill: "#e7c697", title: "Orquestador", sub: "Plan dinámico", badge: "PATRÓN 05", badgeColor: "#b84a27", info: "Descompone tareas dinámicamente." })}
                  ${ISO.block({ id: "p7-w1", cx: 455, cy: 120, rx: 52, ry: 28, h: 18, fill: "#a9c5e8", title: "Worker 1", sub: "Subtarea A", info: "Especialista dinámico 1." })}
                  ${ISO.block({ id: "p7-wn", cx: 455, cy: 255, rx: 52, ry: 28, h: 18, fill: "#b9a6e3", title: "Worker N", sub: "Subtarea B", info: "Especialista dinámico N." })}
                  ${ISO.block({ id: "p7-synth", cx: 665, cy: 190, rx: 54, ry: 30, h: 20, fill: "#8fc4a8", title: "Síntesis", sub: "Entregable", info: "Consolidación final." })}
                  ${ISO.flow({ id: "f7-5a", d: "M 282 172 L 402 128", type: "request", bidirectional: true })}
                  ${ISO.flow({ id: "f7-5b", d: "M 282 208 L 402 248", type: "request", bidirectional: true })}
                  ${ISO.flow({ id: "f7-5c", d: "M 508 132 L 610 175", type: "response" })}
                  ${ISO.flow({ id: "f7-5d", d: "M 508 245 L 610 205", type: "response" })}
                `,
                },
              ],
            },
            {
              slug: "slide-8-agent-swarms",
              slideNum: 8,
              title:
                "Cómo funciona un swarm: un equipo de agentes que comparte archivos",
              subtitle:
                "Auditoría de seguridad de 5 microservicios (Usuarios, Catálogo, Pedidos, Pagos, Inventario) coordinada por archivos locales.",
              duration: "6 min",
              level: "03 · Enjambres",
              kpis: [
                [
                  { label: "SERVICIOS", val: "5 microservicios", status: "" },
                  { label: "AGENTES", val: "1 secuencial", status: "alert" },
                  { label: "TIEMPO TOTAL", val: "ej. ~50 min", status: "alert" },
                  { label: "CONTEXTO", val: "Se satura", status: "alert" },
                ],
                [
                  { label: "DUEÑO PLAN", val: "1 Único Líder", status: "good" },
                  { label: "TABLERO", val: "BOARD.md", status: "good" },
                  { label: "BRIEFS", val: "tasks/T1..T5.md", status: "good" },
                  { label: "ACOPLAMIENTO", val: "Cero (Autónomos)", status: "good" },
                ],
                [
                  { label: "WORKERS", val: "5 en paralelo", status: "good" },
                  { label: "TIEMPO TOTAL", val: "ej. ~12 min", status: "good" },
                  { label: "ESCRITURA", val: "1 archivo / worker", status: "good" },
                  { label: "COLISIONES", val: "0 (Aislados)", status: "good" },
                ],
                [
                  { label: "AUDITOR", val: "Ojos frescos", status: "good" },
                  { label: "HISTORIAL", val: "0 tokens previos", status: "good" },
                  { label: "HALLAZGO", val: "Pagos: token exp.", status: "alert" },
                  { label: "CARPETA", val: "checks/", status: "good" },
                ],
                [
                  { label: "ENTREGABLE", val: "FINAL.md", status: "good" },
                  { label: "MEMORIA", val: "LESSONS.md", status: "good" },
                  { label: "SERVICIOS OK", val: "5/5 auditados", status: "good" },
                  { label: "ESTADO", val: "Consolidado", status: "good" },
                ],
                [
                  { label: "REGLAS ORO", val: "5 activas", status: "good" },
                  { label: "ESCRITOR", val: "Único / archivo", status: "good" },
                  { label: "VERIFICACIÓN", val: "Ojos frescos", status: "good" },
                  { label: "LÍMITES", val: "RAM + Tiempo", status: "good" },
                ],
              ],
              checklist: [
                "Identificar por qué 1 solo agente secuencial tarda ~50 min (ej.) en 5 servicios",
                "Preparar BOARD.md y 5 briefs autónomos (tasks/T1.md … T5.md) desde el Líder",
                "Ejecutar 5 workers en paralelo escribiendo cada uno en su propio archivo en outputs/",
                "Auditar con un Verificador con ojos frescos que escribe en checks/",
                "Consolidar hallazgos y aprendizajes en FINAL.md y LESSONS.md",
                "Aplicar las 5 reglas de oro de un swarm confiable",
              ],
              steps: [
                {
                  short: "1. El problema",
                  title: "El problema: auditar 5 microservicios uno por uno",
                  body: `<p>Queremos hacer una <strong>auditoría de seguridad</strong> sobre 5 microservicios: <strong>Usuarios, Catálogo, Pedidos, Pagos e Inventario</strong>.</p>
                         <p>Con un solo agente avanzando de uno en uno, el proceso toma <strong>~50 min (ej.)</strong> y la ventana de contexto se llena antes de llegar al quinto servicio. La salida es <strong>dividir el trabajo</strong> en piezas independientes.</p>`,
                  calloutTitle: "Cuello de botella secuencial",
                  callout:
                    "Auditar 5 repositorios en una sola sesión (ej. ~10 min por servicio = ~50 min) degrada la atención; si los servicios son independientes, podemos paralelizar.",
                  console: {
                    title: "swarm · paso 1 · auditoría secuencial (1 agente)",
                    prompt:
                      "Audita la seguridad de Usuarios, Catálogo, Pedidos, Pagos e Inventario",
                    lines: [
                      { kind: "think", text: "Un solo agente: revisaré los 5 servicios en fila", node: "s8-leader", delay: 340 },
                      { kind: "agent", text: "Agente › [1/5] auditando Usuarios (ej. 10 min)…", node: "s8-w1", delay: 380 },
                      { kind: "agent", text: "Agente › [2/5] auditando Catálogo (ej. 20 min)…", node: "s8-w2", delay: 380 },
                      { kind: "agent", text: "Agente › [3/5] auditando Pedidos (ej. 30 min)…", node: "s8-w3", delay: 380 },
                      { kind: "warn", text: "Contexto al 85% · faltan Pagos e Inventario (ej. ~50 min total)", node: "s8-w4", delay: 420 },
                      { kind: "result", text: "Idea: dividir en 5 tareas independientes con un swarm", node: "s8-leader", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 130, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "1 Agente", sub: "secuencial", badge: "~50m ej.", badgeColor: "#103250", info: "Un único agente intentando auditar los 5 microservicios en una sola sesión." })}
                    ${ISO.block({ id: "s8-w1", cx: 345, cy: 52, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "1. Usuarios", sub: "en curso", info: "Microservicio de Usuarios." })}
                    ${ISO.block({ id: "s8-w2", cx: 345, cy: 108, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "2. Catálogo", sub: "en espera", opacity: 0.7, info: "Microservicio de Catálogo." })}
                    ${ISO.block({ id: "s8-w3", cx: 345, cy: 164, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "3. Pedidos", sub: "en espera", opacity: 0.55, info: "Microservicio de Pedidos." })}
                    ${ISO.block({ id: "s8-w4", cx: 345, cy: 220, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "4. Pagos", sub: "en espera", opacity: 0.45, info: "Microservicio de Pagos." })}
                    ${ISO.block({ id: "s8-w5", cx: 345, cy: 276, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "5. Inventario", sub: "en espera", opacity: 0.35, info: "Microservicio de Inventario." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 36, ry: 15, h: 30, fill: "#103250", label: "outputs/", opacity: 0.3, info: "Carpeta de salidas (aún vacía)." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.3, info: "Carpeta de verificación (aún vacía)." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "pendiente", opacity: 0.3, info: "Reporte consolidado final." })}
                    ${ISO.flow({ id: "f8s-1a", d: "M 174 118 L 296 58", type: "request" })}
                    ${ISO.flow({ id: "f8s-1b", d: "M 345 78 L 345 92", type: "request" })}
                    ${ISO.flow({ id: "f8s-1c", d: "M 345 134 L 345 148", type: "request" })}
                    ${ISO.flow({ id: "f8s-1d", d: "M 345 190 L 345 204", type: "error" })}
                  `,
                },
                {
                  short: "2. El Líder",
                  title: "El Líder prepara el tablero: BOARD.md y briefs autónomos",
                  body: `<p>Un único agente <strong>Líder</strong> crea <code>BOARD.md</code> con el plan y las reglas de auditoría globales, y escribe cinco briefs en <code>tasks/T1.md … T5.md</code>.</p>
                         <p>Cada brief es <strong>100% autónomo</strong>: incluye rutas, criterios de seguridad y formato de salida para que ningún worker tenga que preguntar nada.</p>`,
                  calloutTitle: "Un solo dueño del plan",
                  callout:
                    "El Líder define el tablero y los briefs una sola vez; la memoria compartida vive en archivos locales, no en chats largos.",
                  console: {
                    title: "swarm · paso 2 · líder prepara tablero y briefs",
                    prompt: "Planifica la auditoría de los 5 microservicios en archivos",
                    lines: [
                      { kind: "agent", text: "Líder › define alcance OWASP, tokens y formato de salida", node: "s8-leader", delay: 340 },
                      { kind: "file", text: "BOARD.md (plan y reglas globales)", node: "s8-board", delay: 380 },
                      { kind: "file", text: "tasks/T1.md (brief autónomo: Usuarios)", node: "s8-w1", delay: 220 },
                      { kind: "file", text: "tasks/T2.md … T5.md (Catálogo, Pedidos, Pagos, Inventario)", node: "s8-w4", delay: 320 },
                      { kind: "result", text: "5 briefs autocontenidos listos · cero dependencias cruzadas", node: "s8-board", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "dueño del plan", badge: "PLAN", badgeColor: "#103250", info: "Único responsable de planificar y emitir briefs." })}
                    ${ISO.cylinder({ id: "s8-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", badge: "REGLAS", badgeColor: "#f7a800", info: "Tablero global con reglas de seguridad y formato de salida." })}
                    ${ISO.block({ id: "s8-w1", cx: 345, cy: 52, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "tasks/T1.md", sub: "Usuarios", info: "Brief autónomo para Usuarios." })}
                    ${ISO.block({ id: "s8-w2", cx: 345, cy: 108, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "tasks/T2.md", sub: "Catálogo", info: "Brief autónomo para Catálogo." })}
                    ${ISO.block({ id: "s8-w3", cx: 345, cy: 164, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "tasks/T3.md", sub: "Pedidos", info: "Brief autónomo para Pedidos." })}
                    ${ISO.block({ id: "s8-w4", cx: 345, cy: 220, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "tasks/T4.md", sub: "Pagos", info: "Brief autónomo para Pagos." })}
                    ${ISO.block({ id: "s8-w5", cx: 345, cy: 276, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "tasks/T5.md", sub: "Inventario", info: "Brief autónomo para Inventario." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 36, ry: 15, h: 30, fill: "#103250", label: "outputs/", opacity: 0.35, info: "Carpeta de salidas lista para recibir reportes." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.35, info: "Carpeta para el verificador." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "pendiente", opacity: 0.35, info: "Entregable final." })}
                    ${ISO.flow({ id: "f8s-2a", d: "M 120 156 L 120 202", type: "request" })}
                    ${ISO.flow({ id: "f8s-2b", d: "M 174 108 L 296 56", type: "request" })}
                    ${ISO.flow({ id: "f8s-2c", d: "M 174 114 L 296 110", type: "request" })}
                    ${ISO.flow({ id: "f8s-2d", d: "M 174 120 L 296 164", type: "request" })}
                    ${ISO.flow({ id: "f8s-2e", d: "M 174 126 L 296 220", type: "request" })}
                    ${ISO.flow({ id: "f8s-2f", d: "M 174 132 L 296 276", type: "request" })}
                  `,
                },
                {
                  short: "3. Workers ×5",
                  title: "Workers en paralelo con escritor único por archivo",
                  body: `<p>Los <strong>5 workers</strong> arrancan casi al mismo tiempo, cada uno leyendo solo su brief y escribiendo exclusivamente en su archivo dentro de <code>outputs/</code>.</p>
                         <p>Como cada archivo tiene un <strong>único escritor</strong>, no se pisan entre sí y la auditoría baja de ~50 min a <strong>~12 min (ej.)</strong>.</p>`,
                  calloutTitle: "Escritor único por archivo",
                  callout:
                    "El paralelismo real (ej. ~12 min vs ~50 min) funciona sin bloqueos porque ningún worker modifica el archivo de otro.",
                  console: {
                    title: "swarm · paso 3 · 5 workers en paralelo",
                    prompt: "Lanza los 5 workers sobre tasks/T1.md … T5.md",
                    lines: [
                      { kind: "agent", text: "Worker 1 › audita Usuarios", node: "s8-w1", delay: 120 },
                      { kind: "agent", text: "Worker 2 › audita Catálogo", node: "s8-w2", delay: 120 },
                      { kind: "agent", text: "Worker 3 › audita Pedidos", node: "s8-w3", delay: 120 },
                      { kind: "agent", text: "Worker 4 › audita Pagos", node: "s8-w4", delay: 120 },
                      { kind: "agent", text: "Worker 5 › audita Inventario", node: "s8-w5", delay: 120 },
                      { kind: "file", text: "outputs/usuarios.md · catalogo.md · pedidos.md", node: "s8-out", delay: 360 },
                      { kind: "file", text: "outputs/pagos.md · inventario.md", node: "s8-out", delay: 320 },
                      { kind: "result", text: "5 reportes aislados listos en ej. ~12 min · 0 colisiones", node: "s8-out", delay: 360 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "monitorea", opacity: 0.7, info: "Líder esperando la carpeta outputs/." })}
                    ${ISO.cylinder({ id: "s8-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Reglas de referencia." })}
                    ${ISO.agent({ id: "s8-w1", cx: 345, cy: 52, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W1 · Usuarios", sub: "usuarios.md", info: "Escritor único de outputs/usuarios.md." })}
                    ${ISO.agent({ id: "s8-w2", cx: 345, cy: 108, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W2 · Catálogo", sub: "catalogo.md", info: "Escritor único de outputs/catalogo.md." })}
                    ${ISO.agent({ id: "s8-w3", cx: 345, cy: 164, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W3 · Pedidos", sub: "pedidos.md", info: "Escritor único de outputs/pedidos.md." })}
                    ${ISO.agent({ id: "s8-w4", cx: 345, cy: 220, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W4 · Pagos", sub: "pagos.md", info: "Escritor único de outputs/pagos.md." })}
                    ${ISO.agent({ id: "s8-w5", cx: 345, cy: 276, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W5 · Inventario", sub: "inventario.md", info: "Escritor único de outputs/inventario.md." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "outputs/ (5)", badge: "~12m ej.", badgeColor: "#f7a800", info: "5 archivos independientes sin sobrescritura." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.4, info: "Aún pendiente de verificación." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "pendiente", opacity: 0.4, info: "Consolidación pendiente." })}
                    ${ISO.flow({ id: "f8s-3a", d: "M 392 52 L 598 92", type: "response", dur: "1.4s" })}
                    ${ISO.flow({ id: "f8s-3b", d: "M 392 108 L 598 98", type: "response", dur: "1.3s" })}
                    ${ISO.flow({ id: "f8s-3c", d: "M 392 164 L 598 106", type: "response", dur: "1.5s" })}
                    ${ISO.flow({ id: "f8s-3d", d: "M 392 220 L 598 114", type: "response", dur: "1.4s" })}
                    ${ISO.flow({ id: "f8s-3e", d: "M 392 276 L 598 122", type: "response", dur: "1.6s" })}
                  `,
                },
                {
                  short: "4. Verificador",
                  title: "El verificador con ojos frescos detecta el hueco en Pagos",
                  body: `<p>Un agente <strong>Verificador nuevo, sin historial previo</strong>, lee únicamente <code>BOARD.md</code> y los archivos de <code>outputs/</code> para contrastarlos contra el código real y escribir en <code>checks/</code>.</p>
                         <p>Al no arrastrar el sesgo del worker, atrapa un fallo real: <strong>Pagos</strong> se marcó OK pero no valida el <strong>token expirado</strong>.</p>`,
                  calloutTitle: "El valor de un contexto limpio",
                  callout:
                    "Quien escribe el código suele justificar sus propias suposiciones; un verificador con ojos frescos audita evidencia, no intenciones.",
                  console: {
                    title: "swarm · paso 4 · verificador con ojos frescos",
                    prompt: "Verifica outputs/ contra las reglas de BOARD.md",
                    lines: [
                      { kind: "agent", text: "Verificador (0 historial) › lee BOARD.md y outputs/", node: "s8-ver", delay: 360 },
                      { kind: "tool", text: "check_auth_cases outputs/usuarios.md catalogo.md pedidos.md", node: "s8-out", delay: 380 },
                      { kind: "error", text: "Pagos: el worker marcó OK pero falta validar el token expirado", node: "s8-ver", delay: 460 },
                      { kind: "file", text: "checks/pagos-check.md (1 hallazgo crítico reproducible)", node: "s8-chk", delay: 380 },
                      { kind: "result", text: "4/5 servicios aprobados · Pagos devuelto con evidencia", node: "s8-chk", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "espera checks", opacity: 0.65, info: "Líder esperando el dictamen del verificador." })}
                    ${ISO.cylinder({ id: "s8-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Criterios de verificación." })}
                    ${ISO.agent({ id: "s8-ver", cx: 365, cy: 164, rx: 64, ry: 34, h: 24, fill: "#103250", title: "Verificador", sub: "ojos frescos (0 bias)", badge: "1 HALLAZGO", badgeColor: "#f7a800", info: "Agente limpio sin historial de los workers: detecta el token expirado en Pagos." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "outputs/ (5)", info: "Reportes de los 5 workers." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 38, ry: 16, h: 34, fill: "#103250", label: "checks/", badge: "PAGOS !", badgeColor: "#f7a800", info: "Hallazgos verificados con evidencia reproducible." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "pendiente", opacity: 0.45, info: "Aún pendiente de consolidación." })}
                    ${ISO.flow({ id: "f8s-4a", d: "M 160 220 L 298 182", type: "request" })}
                    ${ISO.flow({ id: "f8s-4b", d: "M 598 102 L 430 154", type: "request" })}
                    ${ISO.flow({ id: "f8s-4c", d: "M 430 176 L 598 198", type: "error" })}
                  `,
                },
                {
                  short: "5. Consolidación",
                  title: "Consolidación en FINAL.md y memoria en LESSONS.md",
                  body: `<p>Una vez corregido el hallazgo de Pagos y aprobados todos los <code>checks/</code>, el <strong>Líder</strong> consolida el entregable ejecutivo en <code>FINAL.md</code>.</p>
                         <p>Además escribe <code>LESSONS.md</code> con las reglas aprendidas (por ejemplo, probar siempre expiración de JWT) para que la próxima auditoría arranque más precisa.</p>`,
                  calloutTitle: "Aprendizaje persistente en archivos",
                  callout:
                    "FINAL.md entrega valor hoy; LESSONS.md evita repetir el mismo punto ciego en la siguiente corrida del swarm.",
                  console: {
                    title: "swarm · paso 5 · consolidación y aprendizajes",
                    prompt: "Consolida outputs/ y checks/ en el reporte final",
                    lines: [
                      { kind: "agent", text: "Líder › integra los 5 reportes y checks aprobados", node: "s8-leader", delay: 360 },
                      { kind: "file", text: "FINAL.md (resumen ejecutivo · 5 servicios · 1 fix en Pagos)", node: "s8-final", delay: 420 },
                      { kind: "file", text: "LESSONS.md (regla nueva: validar siempre JWT expirado)", node: "s8-lessons", delay: 400 },
                      { kind: "result", text: "Auditoría completada y lista para aprobación humana", node: "s8-final", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "consolida", badge: "DONE", badgeColor: "#103250", info: "Redacta FINAL.md y actualiza LESSONS.md." })}
                    ${ISO.cylinder({ id: "s8-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Plan cerrado." })}
                    ${ISO.block({ id: "s8-lessons", cx: 365, cy: 268, rx: 62, ry: 28, h: 18, fill: "#ffffff", title: "LESSONS.md", sub: "memoria futura", badge: "+1 REGLA", badgeColor: "#103250", info: "Reglas aprendidas para futuras corridas del swarm." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "outputs/ (5)", info: "Salidas individuales aprobadas." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 38, ry: 16, h: 34, fill: "#103250", label: "checks/ (OK)", info: "Verificaciones en verde." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 58, ry: 25, h: 18, fill: "#f7a800", title: "FINAL.md", sub: "resumen listo", badge: "OK", badgeColor: "#103250", info: "Entregable consolidado de los 5 microservicios." })}
                    ${ISO.flow({ id: "f8s-5a", d: "M 598 102 L 174 112", type: "response" })}
                    ${ISO.flow({ id: "f8s-5b", d: "M 598 196 L 174 128", type: "response" })}
                    ${ISO.flow({ id: "f8s-5c", d: "M 174 134 L 580 288", type: "response" })}
                    ${ISO.flow({ id: "f8s-5d", d: "M 164 142 L 314 252", type: "response" })}
                  `,
                },
                {
                  short: "6. 5 Reglas de oro",
                  title: "Las 5 reglas de oro para que un swarm no se descontrole",
                  body: `<p>Un swarm funciona en producción solo cuando cumple cinco invariantes: <strong>(1) Independencia</strong> de tareas, <strong>(2) Un solo dueño del plan</strong>, <strong>(3) Escritor único por archivo</strong>, <strong>(4) Verificador con ojos frescos</strong> y <strong>(5) Límites estrictos de memoria y tiempo</strong>.</p>`,
                  calloutTitle: "Checklist de arquitectura Swarm",
                  callout:
                    "Si rompes cualquiera de estas 5 reglas, el enjambre pasa de acelerar a multiplicar errores y costos.",
                  console: {
                    title: "swarm · paso 6 · verificación de las 5 reglas de oro",
                    prompt: "Verifica las 5 reglas de oro del enjambre",
                    lines: [
                      { kind: "result", text: "1) Independencia: 5 servicios sin dependencias cruzadas", node: "s8-w3", delay: 380 },
                      { kind: "result", text: "2) Un solo dueño del plan: Líder + BOARD.md", node: "s8-leader", delay: 400 },
                      { kind: "result", text: "3) Escritor único por archivo en outputs/", node: "s8-out", delay: 400 },
                      { kind: "result", text: "4) Verificador con ojos frescos en checks/", node: "s8-chk", delay: 400 },
                      { kind: "result", text: "5) Límites estrictos de memoria, tokens y tiempo", node: "s8-final", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s8-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "2. Un Dueño", sub: "Líder + BOARD", badge: "REGLA 2", badgeColor: "#103250", info: "Un único dueño del plan global." })}
                    ${ISO.cylinder({ id: "s8-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Reglas y contrato global." })}
                    ${ISO.agent({ id: "s8-w3", cx: 365, cy: 164, rx: 64, ry: 34, h: 24, fill: "#ffffff", title: "1. Independencia", sub: "5 workers aislados", badge: "REGLA 1", badgeColor: "#103250", info: "Tareas fragmentadas sin bloqueos entre sí." })}
                    ${ISO.cylinder({ id: "s8-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "3. Escritor Único", badge: "REGLA 3", badgeColor: "#f7a800", info: "Cada archivo en outputs/ pertenece a un solo worker." })}
                    ${ISO.cylinder({ id: "s8-chk", cx: 640, cy: 192, rx: 38, ry: 16, h: 34, fill: "#103250", label: "4. Ojos Frescos", badge: "REGLA 4", badgeColor: "#f7a800", info: "Verificador sin historial previo." })}
                    ${ISO.block({ id: "s8-final", cx: 640, cy: 292, rx: 58, ry: 25, h: 18, fill: "#f7a800", title: "5. Límites", sub: "RAM · Tokens · TTL", badge: "REGLA 5", badgeColor: "#103250", info: "Presupuesto de memoria, tokens y tiempo acotado." })}
                    ${ISO.flow({ id: "f8s-6a", d: "M 174 122 L 298 156", type: "response" })}
                    ${ISO.flow({ id: "f8s-6b", d: "M 430 148 L 598 102", type: "response" })}
                    ${ISO.flow({ id: "f8s-6c", d: "M 430 168 L 598 196", type: "response" })}
                    ${ISO.flow({ id: "f8s-6d", d: "M 430 184 L 580 282", type: "response" })}
                  `,
                },
              ],
            },
            {
              slug: "slide-9b-problemas-swarm",
              slideNum: "9b",
              title: "Los problemas de los swarms: cuando más agentes no es mejor",
              subtitle:
                "Seis modos de fallo reales en la auditoría de los 5 microservicios y cómo mitigarlos antes de escalar.",
              duration: "6 min",
              level: "03 · Riesgos",
              kpis: [
                [
                  { label: "DEPENDENCIA", val: "W2 espera W1", status: "alert" },
                  { label: "LATENCIA EXTRA", val: "+320%", status: "alert" },
                  { label: "PARALELISMO", val: "Falso", status: "alert" },
                  { label: "MITIGACIÓN", val: "Verificar indep.", status: "good" },
                ],
                [
                  { label: "BRIEF", val: "Incompleto", status: "alert" },
                  { label: "FORMATO W1", val: "JSON", status: "alert" },
                  { label: "FORMATO W2", val: "Tabla MD", status: "alert" },
                  { label: "MITIGACIÓN", val: "Contrato salida", status: "good" },
                ],
                [
                  { label: "ARCHIVO", val: "outputs/pagos.md", status: "alert" },
                  { label: "ESCRITORES", val: "2 simultáneos", status: "alert" },
                  { label: "PÉRDIDA", val: "Trabajo borrado", status: "alert" },
                  { label: "MITIGACIÓN", val: "Escritor único", status: "good" },
                ],
                [
                  { label: "ERROR RAÍZ", val: "BOARD (30s ≠ 3s)", status: "alert" },
                  { label: "PROPAGACIÓN", val: "×5 workers", status: "alert" },
                  { label: "VERIFICADOR", val: "Lo da por OK", status: "alert" },
                  { label: "MITIGACIÓN", val: "Plan revisado", status: "good" },
                ],
                [
                  { label: "BUCLE", val: "Worker ↔ Verif.", status: "alert" },
                  { label: "CONSUMO", val: "Hasta 15× tokens", status: "alert" },
                  { label: "CORTE", val: "Circuit Breaker", status: "good" },
                  { label: "MITIGACIÓN", val: "max_tokens + TTL", status: "good" },
                ],
                [
                  { label: "ARTEFACTOS", val: "5 inf.+checks+LES", status: "alert" },
                  { label: "CUELLO", val: "Revisión humana", status: "alert" },
                  { label: "FATIGA", val: "Límite humano", status: "alert" },
                  { label: "REGLA FINAL", val: "Empezar con 1", status: "good" },
                ],
              ],
              checklist: [
                "Detectar tareas secuenciales disfrazadas de paralelas (+320% latencia)",
                "Evitar el teléfono roto exigiendo un contrato de salida en cada brief",
                "Prevenir colisiones de escritura con escritor único por archivo",
                "Frenar errores en cascada revisando BOARD.md con criterios independientes",
                "Cortar bucles sin límite (hasta 15× tokens) con max_tokens, TTL y retries",
                "Aliviar el cuello de botella humano resumiendo y aprobando solo puntos críticos",
              ],
              steps: [
                {
                  short: "1. Falso paralelo",
                  title: "Tarea secuencial disfrazada de paralela (+320% latencia)",
                  body: `<p>Lanzamos 5 workers en paralelo, pero <strong>Worker 2 (Catálogo)</strong> depende del resultado de <strong>Worker 1 (Usuarios)</strong> y se queda bloqueado esperando <code>T1.md</code>.</p>
                         <p>La coordinación añade <strong>+320% de latencia</strong> sin ninguna ganancia real frente a un solo agente.</p>`,
                  calloutTitle: "Mitigación",
                  callout:
                    "Antes de crear un swarm, comprueba que las piezas sean verdaderamente independientes; si A bloquea a B, usa un solo agente.",
                  console: {
                    title: "riesgo-01 · falsa paralelización · +320% latencia",
                    prompt: "Ejecuta los 5 workers en paralelo sobre la auditoría",
                    lines: [
                      { kind: "agent", text: "Worker 1 (Usuarios) › procesando T1.md…", node: "s9-w1", delay: 320 },
                      { kind: "warn", text: "Worker 2 › esperando T1.md… (dependencia oculta)", node: "s9-w2", delay: 420 },
                      { kind: "warn", text: "Worker 3 › esperando salida de Worker 2…", node: "s9-w3", delay: 400 },
                      { kind: "error", text: "Swarm bloqueado en fila · latencia +320% vs 1 agente", node: "s9-w2", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s9-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "BOARD.md", info: "Distribuyó tareas con dependencias ocultas." })}
                    ${ISO.cylinder({ id: "s9-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Plan con dependencia secuencial." })}
                    ${ISO.agent({ id: "s9-w1", cx: 345, cy: 52, rx: 46, ry: 20, h: 12, fill: "#f7a800", title: "W1 · Usuarios", sub: "en curso", info: "Worker 1 bloqueando al resto." })}
                    ${ISO.agent({ id: "s9-w2", cx: 345, cy: 118, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W2 · Catálogo", sub: "ESPERA T1", badge: "+320%", badgeColor: "#f7a800", info: "Ocioso esperando a Worker 1." })}
                    ${ISO.agent({ id: "s9-w3", cx: 345, cy: 184, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W3 · Pedidos", sub: "ESPERA W2", info: "Bloqueado en cadena." })}
                    ${ISO.agent({ id: "s9-w4", cx: 345, cy: 250, rx: 46, ry: 20, h: 12, fill: "#ffffff", title: "W4 · Pagos", sub: "esperando", opacity: 0.55, info: "A la espera." })}
                    ${ISO.cylinder({ id: "s9-out", cx: 640, cy: 92, rx: 36, ry: 15, h: 30, fill: "#103250", label: "outputs/", opacity: 0.4, info: "Salidas retenidas." })}
                    ${ISO.cylinder({ id: "s9-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.4, info: "Sin poder auditar." })}
                    ${ISO.block({ id: "s9-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "retrasado", opacity: 0.4, info: "Retrasado por falsa paralelización." })}
                    ${ISO.flow({ id: "f9s-1a", d: "M 174 112 L 296 58", type: "request" })}
                    ${ISO.flow({ id: "f9s-1b", d: "M 345 78 L 345 96", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f9s-1c", d: "M 345 144 L 345 162", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f9s-1d", d: "M 345 210 L 345 228", type: "error", dur: "1.1s" })}
                  `,
                },
                {
                  short: "2. Teléfono roto",
                  title: "Teléfono roto: briefs incompletos producen salidas incompatibles",
                  body: `<p>Un brief ambiguo hace que <strong>Worker 1</strong> entregue su reporte en <code>JSON</code> mientras <strong>Worker 2</strong> escribe una <code>tabla Markdown</code> libre.</p>
                         <p>Al intentar consolidar en <code>outputs/</code> y <code>FINAL.md</code>, los formatos chocan y el parser falla.</p>`,
                  calloutTitle: "Mitigación",
                  callout:
                    "Define un contrato de salida explícito (esquema JSON o plantilla exacta) dentro de cada brief antes de lanzar los workers.",
                  console: {
                    title: "riesgo-02 · teléfono roto · formatos incompatibles",
                    prompt: "Consolida los reportes de Usuarios y Catálogo",
                    lines: [
                      { kind: "warn", text: "tasks/T1.md y T2.md no especifican formato de salida", node: "s9-board", delay: 360 },
                      { kind: "file", text: "outputs/usuarios.md → {\"service\":\"users\",\"issues\":[]}", node: "s9-w1", delay: 400 },
                      { kind: "file", text: "outputs/catalogo.md → | Servicio | Estado | OK |", node: "s9-w2", delay: 400 },
                      { kind: "error", text: "Parser FINAL.md › error: JSON vs Tabla Markdown incompatibles", node: "s9-out", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s9-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "brief ambiguo", info: "No definió plantilla de salida." })}
                    ${ISO.cylinder({ id: "s9-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", badge: "SIN SCHEMA", badgeColor: "#f7a800", info: "Sin contrato de formato." })}
                    ${ISO.agent({ id: "s9-w1", cx: 345, cy: 96, rx: 50, ry: 22, h: 14, fill: "#ffffff", title: "W1 · Usuarios", sub: "entrega JSON", badge: "{ JSON }", badgeColor: "#103250", info: "Interpretó salida en JSON." })}
                    ${ISO.agent({ id: "s9-w2", cx: 345, cy: 206, rx: 50, ry: 22, h: 14, fill: "#f7a800", title: "W2 · Catálogo", sub: "entrega Tabla", badge: "| MD |", badgeColor: "#103250", info: "Interpretó salida como tabla Markdown." })}
                    ${ISO.cylinder({ id: "s9-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "outputs/", badge: "CHOQUE", badgeColor: "#f7a800", info: "Archivos incompatibles al consolidar." })}
                    ${ISO.cylinder({ id: "s9-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.45, info: "Falla al validar." })}
                    ${ISO.block({ id: "s9-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "roto", opacity: 0.45, info: "No puede fusionar formatos dispares." })}
                    ${ISO.flow({ id: "f9s-2a", d: "M 174 112 L 292 98", type: "request" })}
                    ${ISO.flow({ id: "f9s-2b", d: "M 174 128 L 292 204", type: "request" })}
                    ${ISO.flow({ id: "f9s-2c", d: "M 396 98 L 598 98", type: "error", dur: "1.1s" })}
                    ${ISO.flow({ id: "f9s-2d", d: "M 396 204 L 598 112", type: "error", dur: "1.1s" })}
                  `,
                },
                {
                  short: "3. Colisión",
                  title: "Colisión de escritura: dos workers pisan el mismo archivo",
                  body: `<p>Cuando dos workers editan la misma ruta compartida (<code>outputs/pagos.md</code>), el último en guardar <strong>sobrescribe y borra el trabajo del primero</strong> sin aviso.</p>`,
                  calloutTitle: "Mitigación",
                  callout:
                    "Impón la regla de escritor único por archivo: cada worker solo puede escribir en su propia ruta exclusiva y el Líder consolida al final.",
                  console: {
                    title: "riesgo-03 · colisión de escritura en outputs/",
                    prompt: "Guarda los hallazgos de Pedidos y Pagos en outputs/",
                    lines: [
                      { kind: "file", text: "Worker 3 › escribe outputs/pagos.md (hallazgos de checkout)", node: "s9-w3", delay: 360 },
                      { kind: "warn", text: "Worker 4 › abre el mismo archivo outputs/pagos.md", node: "s9-w4", delay: 360 },
                      { kind: "error", text: "outputs/pagos.md sobrescrito por Worker 4 (trabajo de W3 perdido)", node: "s9-out", delay: 460 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s9-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "BOARD.md", opacity: 0.7, info: "No aisló las rutas de salida." })}
                    ${ISO.cylinder({ id: "s9-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD.md", info: "Sin propiedad exclusiva por archivo." })}
                    ${ISO.agent({ id: "s9-w3", cx: 345, cy: 108, rx: 50, ry: 22, h: 14, fill: "#ffffff", title: "W3 · Pedidos", sub: "escribe pagos.md", info: "Escribe primero en outputs/pagos.md." })}
                    ${ISO.agent({ id: "s9-w4", cx: 345, cy: 214, rx: 50, ry: 22, h: 14, fill: "#f7a800", title: "W4 · Pagos", sub: "sobrescribe!", badge: "COLISIÓN", badgeColor: "#103250", info: "Sobrescribe outputs/pagos.md y borra a W3." })}
                    ${ISO.cylinder({ id: "s9-out", cx: 640, cy: 92, rx: 40, ry: 17, h: 36, fill: "#103250", label: "outputs/pagos.md", badge: "PISADO", badgeColor: "#f7a800", info: "Archivo sobrescrito: pérdida silenciosa de hallazgos." })}
                    ${ISO.cylinder({ id: "s9-chk", cx: 640, cy: 192, rx: 36, ry: 15, h: 30, fill: "#103250", label: "checks/", opacity: 0.45, info: "Verificación incompleta." })}
                    ${ISO.block({ id: "s9-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "incompleto", opacity: 0.45, info: "Faltan hallazgos borrados." })}
                    ${ISO.flow({ id: "f9s-3a", d: "M 396 108 L 598 96", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f9s-3b", d: "M 396 210 L 598 108", type: "error", dur: "0.9s" })}
                  `,
                },
                {
                  short: "4. Cascada BOARD",
                  title: "Error en cascada: un dato falso en BOARD.md se multiplica ×5",
                  body: `<p>Si el <strong>Líder</strong> comete un error en <code>BOARD.md</code> —por ejemplo, escribir <code>"timeout = 30 s"</code> cuando la regla real era <code>3 s</code>— los <strong>5 workers</strong> replican el error en paralelo.</p>
                         <p>Peor aún: si el <strong>Verificador</strong> solo compara contra <code>BOARD.md</code>, también da por bueno el fallo.</p>`,
                  calloutTitle: "Mitigación",
                  callout:
                    "Revisa humanamente el plan en BOARD.md antes de lanzar el enjambre y dota al verificador de criterios independientes (tests y políticas reales).",
                  console: {
                    title: "riesgo-04 · error en cascada desde BOARD.md",
                    prompt: "Aplica la política de timeout de BOARD.md a los 5 servicios",
                    lines: [
                      { kind: "error", text: "BOARD.md › regla errónea: \"el timeout es 30 s\" (real: 3 s)", node: "s9-board", delay: 380 },
                      { kind: "warn", text: "W1..W5 › copian timeout=30 s a los 5 microservicios (×5)", node: "s9-w3", delay: 400 },
                      { kind: "error", text: "Verificador › compara contra BOARD.md y marca 5/5 OK (falso)", node: "s9-chk", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s9-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "error raíz", info: "Introdujo timeout=30 s en lugar de 3 s." })}
                    ${ISO.cylinder({ id: "s9-board", cx: 120, cy: 220, rx: 38, ry: 16, h: 34, fill: "#103250", label: "BOARD: 30s!", badge: "×5 ERROR", badgeColor: "#f7a800", info: "Premisa falsa que se propaga a todo el swarm." })}
                    ${ISO.agent({ id: "s9-w1", cx: 345, cy: 52, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W1 · 30s", sub: "copiado", info: "Propaga error 1." })}
                    ${ISO.agent({ id: "s9-w2", cx: 345, cy: 108, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W2 · 30s", sub: "copiado", info: "Propaga error 2." })}
                    ${ISO.agent({ id: "s9-w3", cx: 345, cy: 164, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W3 · 30s", sub: "copiado", badge: "×5", badgeColor: "#f7a800", info: "Propaga error 3." })}
                    ${ISO.agent({ id: "s9-w4", cx: 345, cy: 220, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W4 · 30s", sub: "copiado", info: "Propaga error 4." })}
                    ${ISO.agent({ id: "s9-w5", cx: 345, cy: 276, rx: 46, ry: 20, h: 12, fill: "#103250", title: "W5 · 30s", sub: "copiado", info: "Propaga error 5." })}
                    ${ISO.cylinder({ id: "s9-out", cx: 640, cy: 92, rx: 36, ry: 15, h: 30, fill: "#103250", label: "outputs/ (×5!)", info: "5 reportes con la misma premisa falsa." })}
                    ${ISO.cylinder({ id: "s9-chk", cx: 640, cy: 192, rx: 38, ry: 16, h: 34, fill: "#103250", label: "checks/ OK?", badge: "FALSO OK", badgeColor: "#f7a800", info: "El verificador validó contra el mismo BOARD erróneo." })}
                    ${ISO.block({ id: "s9-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "sesgado", opacity: 0.7, info: "Reporte final contaminado." })}
                    ${ISO.flow({ id: "f9s-4a", d: "M 162 212 L 296 58", type: "error", dur: "1.1s" })}
                    ${ISO.flow({ id: "f9s-4b", d: "M 162 216 L 296 164", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f9s-4c", d: "M 162 224 L 296 276", type: "error", dur: "1.1s" })}
                    ${ISO.flow({ id: "f9s-4d", d: "M 392 164 L 598 192", type: "error", dur: "1.2s" })}
                  `,
                },
                {
                  short: "5. Bucle 15×",
                  title: "Bucle sin límite: ping-pong entre worker y verificador (15× tokens)",
                  body: `<p><strong>Worker 4 (Pagos)</strong> y el <strong>Verificador</strong> se devuelven <code>outputs/pagos.md</code> una y otra vez sin converger, disparando el consumo hasta el <strong>15× de tokens</strong>.</p>
                         <p>Solo un <strong>Circuit Breaker</strong> con presupuesto máximo corta el bucle antes de agotar el crédito.</p>`,
                  calloutTitle: "Mitigación",
                  callout:
                    "Configura límites estrictos desde el inicio: max_tokens, TTL y máximo de reintentos (ej. 3 ciclos) con escalamiento automático a humano.",
                  console: {
                    title: "riesgo-05 · bucle sin límite · circuit breaker",
                    prompt: "Corrige outputs/pagos.md hasta pasar checks/",
                    lines: [
                      { kind: "warn", text: "Intento #1 · W4 ↔ Verificador: rechazado · consumo 4× tokens", node: "s9-w4", delay: 320 },
                      { kind: "warn", text: "Intento #2 · W4 ↔ Verificador: rechazado · consumo 9× tokens", node: "s9-chk", delay: 340 },
                      { kind: "error", text: "Intento #3 · W4 ↔ Verificador: consumo 15× tokens (límite)", node: "s9-w4", delay: 380 },
                      { kind: "result", text: "Circuit Breaker › CORTE (max_retries=3 · TTL) → escalado a humano", node: "s9-cb", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.agent({ id: "s9-leader", cx: 120, cy: 112, rx: 52, ry: 27, h: 20, fill: "#f7a800", title: "Líder", sub: "vigila cuota", opacity: 0.7, info: "Supervisa el presupuesto." })}
                    ${ISO.block({ id: "s9-cb", cx: 120, cy: 230, rx: 54, ry: 26, h: 18, fill: "#103250", title: "Circuit Breaker", sub: "max_tokens · TTL", badge: "CORTE", badgeColor: "#f7a800", info: "Detiene el bucle al llegar al límite de reintentos o tokens." })}
                    ${ISO.agent({ id: "s9-w4", cx: 365, cy: 164, rx: 60, ry: 32, h: 22, fill: "#f7a800", title: "W4 · Pagos", sub: "reintenta #1..#3", badge: "15× TOK", badgeColor: "#103250", info: "Reescribe pagos.md en bucle sin converger." })}
                    ${ISO.cylinder({ id: "s9-out", cx: 640, cy: 92, rx: 38, ry: 16, h: 34, fill: "#103250", label: "outputs/pagos.md", info: "Archivo rebotando entre agentes." })}
                    ${ISO.cylinder({ id: "s9-chk", cx: 640, cy: 192, rx: 38, ry: 16, h: 34, fill: "#103250", label: "checks/ (RECHAZA)", badge: "LOOP", badgeColor: "#f7a800", info: "Verificador devolviendo el archivo repetidamente." })}
                    ${ISO.block({ id: "s9-final", cx: 640, cy: 292, rx: 52, ry: 22, h: 14, fill: "#ffffff", title: "FINAL.md", sub: "pausado", opacity: 0.4, info: "Bloqueado hasta intervención humana." })}
                    ${ISO.flow({ id: "f9s-5a", d: "M 426 150 L 598 102", type: "error", dur: "0.8s", bidirectional: true })}
                    ${ISO.flow({ id: "f9s-5b", d: "M 426 174 L 598 196", type: "error", dur: "0.8s", bidirectional: true })}
                    ${ISO.flow({ id: "f9s-5c", d: "M 176 224 L 304 182", type: "response" })}
                  `,
                },
                {
                  short: "6. Cuello humano",
                  title: "El cuello de botella vuelve a ser humano",
                  body: `<p>Al terminar el swarm llegan <strong>5 informes de golpe</strong>, más <code>checks/</code>, más <code>FINAL.md</code> y <code>LESSONS.md</code>. Si la persona intenta revisarlo todo a mano, su <strong>memoria de trabajo</strong> cruza el <strong>LÍMITE HUMANO</strong>.</p>
                         <p><strong>Regla de cierre:</strong> empieza con un agente; escala a swarm solo si las piezas son independientes.</p>`,
                  calloutTitle: "Mitigación y regla de oro",
                  callout:
                    "Pide un resumen ejecutivo al verificador y reserva la aprobación humana solo para puntos críticos. Empieza con un agente; escala a swarm solo si las piezas son independientes.",
                  console: {
                    title: "riesgo-06 · cuello humano · límite cognitivo",
                    prompt: "Entrega todos los artefactos del swarm para revisión humana",
                    lines: [
                      { kind: "file", text: "5 reportes outputs/*.md + checks/*.md + LESSONS.md", node: "s9-out", delay: 340 },
                      { kind: "warn", text: "Revisor humano recibe ej. 1.800 líneas de auditoría simultáneas", node: "s9-vessel", delay: 420 },
                      { kind: "error", text: "Límite cognitivo humano desbordado sin filtrado previo", node: "s9-vessel", delay: 420 },
                      { kind: "result", text: "Mitigación: resumen ejecutivo en FINAL.md + aprobar solo puntos críticos", node: "s9-final", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.peoplePlatform({ cx: 135, cy: 225, count: 4, caption: "Revisor Humano" })}
                    ${ISO.vessel({
                      id: "s9-vessel",
                      cx: 395,
                      cy: 262,
                      capacity: 140,
                      limit: 110,
                      overflowLabel: "SATURADO",
                      caption: "Límite Humano",
                      layers: [
                        { h: 32, fill: "#a9c5e8", sideLabel: "Negocio", topLabel: false, info: "Contexto propio del equipo." },
                        { h: 42, fill: "#e8a47c", sideLabel: "5 outputs/", topLabel: false, info: "Cinco informes completos llegando a la vez." },
                        { h: 52, fill: "#e8a47c", title: "checks/ + LESSONS", sub: "revisión masiva", sideLabel: "checks/", info: "Sobrecarga si no hay resumen ejecutivo." },
                      ],
                    })}
                    ${ISO.cylinder({ id: "s9-out", cx: 650, cy: 92, rx: 38, ry: 16, h: 32, fill: "#103250", label: "5 outputs/ + checks/", info: "Volumen total generado por el swarm." })}
                    ${ISO.block({ id: "s9-final", cx: 650, cy: 235, rx: 58, ry: 26, h: 18, fill: "#f7a800", title: "FINAL.md", sub: "resumen ejecutivo", badge: "1 CRÍTICO", badgeColor: "#103250", info: "Filtro ejecutivo: el humano aprueba solo lo crítico." })}
                    ${ISO.flow({ id: "f9s-6a", d: "M 608 104 L 474 146", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f9s-6b", d: "M 590 232 L 474 218", type: "response" })}
                    ${ISO.flow({ id: "f9s-6c", d: "M 208 220 L 316 218", type: "request" })}
                  `,
                },
              ],
            } 
          ],
        };
