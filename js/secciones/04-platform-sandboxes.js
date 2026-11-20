// Sección 4 de la ponencia
const SECTION_04 = {
          id: "mod-04",
          title: "04. Platform Engineering",
          color: "green",
          open: true,
          lessons: [
            {
              slug: "slide-10-platform-engineering",
              slideNum: 10,
              title:
                "Platform Engineering paso a paso: qué se hace y con qué herramientas",
              subtitle:
                "Alta de un nuevo microservicio de Pagos con agente de IA: de diagnosticar fricción a observar producción.",
              duration: "7 min",
              level: "04 · Plataforma",
              kpis: [
                [
                  { label: "ETAPA", val: "1. Diagnóstico", status: "" },
                  { label: "TIME-TO-PROD", val: "ej. 3 semanas", status: "alert" },
                  { label: "FUENTES", val: "DORA + Tickets", status: "" },
                  { label: "OBJETIVO", val: "Medir fricción", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "2. Portal IDP", status: "good" },
                  { label: "EJEMPLO", val: "Backstage / Port", status: "good" },
                  { label: "CATÁLOGO", val: "Servicios + Docs", status: "" },
                  { label: "FRICCIÓN", val: "Centralizada", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "3. Golden Path", status: "good" },
                  { label: "PLANTILLA", val: "Repo + Docker + CI", status: "good" },
                  { label: "ALTA SERVICIO", val: "ej. < 5 min", status: "good" },
                  { label: "CARGA AJENA", val: "Baja", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "4. Pipeline CI", status: "good" },
                  { label: "PRUEBAS", val: "ej. 41/41 OK", status: "good" },
                  { label: "SEGURIDAD", val: "Trivy + Cosign", status: "good" },
                  { label: "TRAZABILIDAD", val: "SBOM firmado", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "5. IaC Declarativa", status: "good" },
                  { label: "RECURSOS", val: "BD · Colas · IAM", status: "" },
                  { label: "EJEMPLOS", val: "OpenTofu/Crosspl.", status: "good" },
                  { label: "SECRETOS", val: "Vault / AWS SM", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "6. GitOps", status: "good" },
                  { label: "FUENTE VERDAD", val: "Git", status: "good" },
                  { label: "EJEMPLOS", val: "Argo CD / Flux", status: "good" },
                  { label: "SINCRONÍA", val: "Automática", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "7. Guardrails", status: "good" },
                  { label: "ADMISIÓN", val: "Kyverno / OPA", status: "good" },
                  { label: "GATEWAY LLM", val: "ej. LiteLLM", status: "good" },
                  { label: "CONTROL IA", val: "Tokens + Retries", status: "good" },
                ],
                [
                  { label: "ETAPA", val: "8. Observar", status: "good" },
                  { label: "TELEMETRÍA", val: "OTel + Grafana", status: "good" },
                  { label: "COSTOS", val: "OpenCost", status: "" },
                  { label: "ALCANCE", val: "No quita fatiga", status: "alert" },
                ],
              ],
              checklist: [
                "Diagnosticar la fricción midiendo tiempo hasta producción y métricas DORA",
                "Construir un portal único de catálogo, documentación y plantillas",
                "Ofrecer un Golden Path que genere repo, Dockerfile, CI y observabilidad",
                "Asegurar el pipeline CI con pruebas, escaneo, firma de imagen y SBOM",
                "Declarar infraestructura y secretos mediante IaC sin tickets manuales",
                "Sincronizar el clúster automáticamente desde Git con GitOps",
                "Aplicar políticas de admisión y pasarela LLM con límites de tokens",
                "Medir adopción, costos y reconocer lo que la plataforma no resuelve",
              ],
              steps: [
                {
                  short: "1. Diagnosticar",
                  title: "1. Diagnosticar la fricción antes de elegir herramientas",
                  body: `<p><strong>Qué se hace:</strong> Se entrevista a los equipos de producto y se mide el tiempo real desde el primer commit hasta producción (ej. 3 semanas para dar de alta Pagos + agente).</p>
                         <p><strong>Herramientas (ejemplos):</strong> Encuestas internas, métricas <code>DORA</code> y análisis de tickets de soporte.</p>
                         <p><strong>Resultado para el desarrollador:</strong> Los cuellos de botella reales quedan visibles en lugar de construir infraestructura a ciegas.</p>`,
                  calloutTitle: "Empezar por el dolor real",
                  callout:
                    "No compres herramientas primero: mide dónde pierden más horas los equipos (ej. permisos IAM, colas de tickets y despliegues fallidos).",
                  console: {
                    title: "platform · paso 1 · diagnóstico dora y tickets",
                    prompt: "Mide el tiempo de alta de un nuevo microservicio de Pagos",
                    lines: [
                      { kind: "tool", text: "dora-report --team pagos --window 90d", node: "p10-dev", delay: 360 },
                      { kind: "warn", text: "Lead time alta servicio: ej. 18 días · 14 tickets manuales", node: "p10-portal", delay: 400 },
                      { kind: "think", text: "Mayor fricción: YAML K8s, IAM, secretos y pipeline desde cero", node: "p10-iac", delay: 400 },
                      { kind: "result", text: "Diagnóstico listo: prioridad 1 → portal + Golden Path", node: "p10-portal", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Encuestas · Métricas DORA · Tickets", width: 355, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-dev", cx: 240, cy: 105, rx: 46, ry: 22, h: 14, fill: "#f7a800", title: "Diagnóstico", sub: "DORA + Tickets", badge: "ej. 18d", badgeColor: "#103250", info: "Medición de fricción y tiempo hasta producción." })}
                    ${ISO.block({ id: "p10-portal", cx: 270, cy: 205, rx: 40, ry: 20, h: 14, fill: "#ffffff", title: "Portal", sub: "sin crear", opacity: 0.4, info: "Catálogo interno." })}
                    ${ISO.block({ id: "p10-repo", cx: 355, cy: 205, rx: 40, ry: 20, h: 14, fill: "#ffffff", title: "Repo", sub: "manual", opacity: 0.4, info: "Repositorio." })}
                    ${ISO.block({ id: "p10-ci", cx: 440, cy: 205, rx: 40, ry: 20, h: 14, fill: "#ffffff", title: "CI", sub: "manual", opacity: 0.4, info: "Integración continua." })}
                    ${ISO.block({ id: "p10-iac", cx: 525, cy: 205, rx: 40, ry: 20, h: 14, fill: "#ffffff", title: "IaC", sub: "tickets", opacity: 0.4, info: "Infraestructura declarativa." })}
                    ${ISO.block({ id: "p10-gitops", cx: 610, cy: 205, rx: 40, ry: 20, h: 14, fill: "#ffffff", title: "GitOps", sub: "manual", opacity: 0.4, info: "Sincronización declarativa." })}
                    ${ISO.container({ id: "p10-cluster", cx: 715, cy: 195, rx: 46, ry: 24, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", opacity: 0.4, info: "Clúster de producción." })}
                    ${ISO.flow({ id: "f10p-1a", d: "M 172 178 L 210 128", type: "request" })}
                    ${ISO.flow({ id: "f10p-1b", d: "M 285 122 L 505 190", type: "error" })}
                  `,
                },
                {
                  short: "2. Portal IDP",
                  title: "2. Construir el portal: catálogo único y documentación viva",
                  body: `<p><strong>Qué se hace:</strong> Se levanta un portal interno con el catálogo de microservicios, dueños, APIs, documentación y plantillas aprobadas.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>Backstage</code> (alternativas: <code>Port</code>, <code>Humanitec</code>).</p>
                         <p><strong>Resultado para el desarrollador:</strong> Un solo lugar para descubrir dependencias de Pagos y solicitar recursos sin buscar wikis obsoletas.</p>`,
                  calloutTitle: "Puerta de entrada del cliente interno",
                  callout:
                    "El portal organiza lo que ya existe; sus herramientas son intercambiables (Backstage, Port o Humanitec según el tamaño del equipo).",
                  console: {
                    title: "platform · paso 2 · portal interno (ej. backstage)",
                    prompt: "Abre el catálogo de servicios y plantillas para Pagos",
                    lines: [
                      { kind: "tool", text: "portal catalog search --domain pagos", node: "p10-portal", delay: 350 },
                      { kind: "result", text: "Encontrados: users-api · orders-api · plantilla-ms-agente-ia", node: "p10-portal", delay: 400 },
                      { kind: "result", text: "Docs OpenAPI y dueños sincronizados desde catalog-info.yaml", node: "p10-repo", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Backstage · alternativas: Port, Humanitec", width: 380, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 270, cy: 195, rx: 46, ry: 24, h: 20, fill: "#f7a800", title: "Portal IDP", sub: "Backstage / Port", badge: "ACTIVO", badgeColor: "#103250", info: "Catálogo único de servicios, docs y plantillas." })}
                    ${ISO.block({ id: "p10-repo", cx: 365, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "Repo", sub: "catálogo", opacity: 0.65, info: "Repositorios registrados." })}
                    ${ISO.block({ id: "p10-ci", cx: 450, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "CI", sub: "etapa 4", opacity: 0.4, info: "Integración continua." })}
                    ${ISO.block({ id: "p10-iac", cx: 535, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "IaC", sub: "etapa 5", opacity: 0.4, info: "Infraestructura." })}
                    ${ISO.block({ id: "p10-gitops", cx: 618, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "GitOps", sub: "etapa 6", opacity: 0.4, info: "Despliegue." })}
                    ${ISO.container({ id: "p10-cluster", cx: 718, cy: 195, rx: 46, ry: 24, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", opacity: 0.4, info: "Clúster destino." })}
                    ${ISO.flow({ id: "f10p-2a", d: "M 185 205 L 222 200", type: "request", bidirectional: true })}
                    ${ISO.flow({ id: "f10p-2b", d: "M 316 202 L 326 205", type: "response" })}
                  `,
                },
                {
                  short: "3. Golden Path",
                  title: "3. Crear el Golden Path: plantilla lista para producción",
                  body: `<p><strong>Qué se hace:</strong> El desarrollador rellena un formulario corto (nombre <code>pagos-ia</code>, dueño y tipo) y la plantilla genera el repositorio con código base, <code>Dockerfile</code>, pipeline CI y telemetría listos.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>Backstage Software Templates</code> (alternativa: <code>cookiecutter</code>).</p>
                         <p><strong>Resultado para el desarrollador:</strong> Arranca a programar lógica de pagos en minutos (ej. &lt; 5 min) sin copiar repos viejos.</p>`,
                  calloutTitle: "El camino fácil es el camino seguro",
                  callout:
                    "El Golden Path no obliga por burocracia: se adopta porque ahorra días de configuración repetitiva.",
                  console: {
                    title: "platform · paso 3 · golden path (plantilla)",
                    prompt: "Crea el microservicio pagos-ia desde la plantilla corporativa",
                    lines: [
                      { kind: "tool", text: "scaffolder run --template ms-agente-ia --name pagos-ia", node: "p10-portal", delay: 350 },
                      { kind: "file", text: "repo creado desde plantilla: src/ · Dockerfile · .github/workflows/", node: "p10-repo", delay: 400 },
                      { kind: "file", text: "otel-config.yaml · catalog-info.yaml · runtime-agent.yaml", node: "p10-repo", delay: 360 },
                      { kind: "result", text: "Repositorio pagos-ia listo en ej. 2 min con observabilidad base", node: "p10-repo", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Backstage Templates · alternativa: cookiecutter", width: 410, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 265, cy: 205, rx: 42, ry: 21, h: 16, fill: "#ffffff", title: "Portal IDP", sub: "plantilla", info: "Dispara el Golden Path." })}
                    ${ISO.block({ id: "p10-repo", cx: 365, cy: 192, rx: 46, ry: 24, h: 20, fill: "#f7a800", title: "Repo Pagos", sub: "Docker + CI + OTel", badge: "GOLDEN", badgeColor: "#103250", info: "Repositorio recién creado con todos los estándares." })}
                    ${ISO.block({ id: "p10-ci", cx: 460, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "CI", sub: "listo", opacity: 0.55, info: "Pipeline preconfigurado." })}
                    ${ISO.block({ id: "p10-iac", cx: 540, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "IaC", sub: "etapa 5", opacity: 0.4, info: "Infraestructura." })}
                    ${ISO.block({ id: "p10-gitops", cx: 620, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "GitOps", sub: "etapa 6", opacity: 0.4, info: "Despliegue." })}
                    ${ISO.container({ id: "p10-cluster", cx: 718, cy: 195, rx: 46, ry: 24, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", opacity: 0.4, info: "Clúster destino." })}
                    ${ISO.flow({ id: "f10p-3a", d: "M 185 205 L 222 205", type: "request" })}
                    ${ISO.flow({ id: "f10p-3b", d: "M 308 202 L 318 198", type: "response" })}
                  `,
                },
                {
                  short: "4. Pipeline CI",
                  title: "4. Pipeline de integración: pruebas, escaneo, firma y SBOM",
                  body: `<p><strong>Qué se hace:</strong> En cada push el pipeline corre pruebas automatizadas, escanea vulnerabilidades de la imagen, genera el <code>SBOM</code> y firma el artefacto criptográficamente.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>GitHub Actions</code> o <code>GitLab CI</code>, <code>Trivy</code> y <code>Cosign (Sigstore)</code>.</p>
                         <p><strong>Resultado para el desarrollador:</strong> Confianza automática en cada entrega sin configurar escáneres de seguridad a mano.</p>`,
                  calloutTitle: "Cadena de suministro verificable",
                  callout:
                    "Solo imágenes escaneadas y firmadas (ej. Trivy + Cosign) pueden avanzar hacia el clúster.",
                  console: {
                    title: "platform · paso 4 · pipeline ci + seguridad",
                    prompt: "Ejecuta el pipeline CI del commit en pagos-ia",
                    lines: [
                      { kind: "tool", text: "ci-run test && trivy image pagos-ia:sha-9f2a", node: "p10-ci", delay: 360 },
                      { kind: "result", text: "pipeline: ej. 41/41 tests · 0 vulnerabilidades críticas", node: "p10-ci", delay: 400 },
                      { kind: "tool", text: "cosign sign pagos-ia:sha-9f2a --sbom sbom.spdx.json", node: "p10-ci", delay: 380 },
                      { kind: "result", text: "Imagen firmada y SBOM publicado en el registro OCI", node: "p10-ci", delay: 360 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): GitHub Actions / GitLab CI · Trivy · Cosign", width: 405, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 260, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "Portal", sub: "OK", opacity: 0.7, info: "Portal IDP." })}
                    ${ISO.block({ id: "p10-repo", cx: 348, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "Repo", sub: "push", info: "Código de pagos-ia." })}
                    ${ISO.block({ id: "p10-ci", cx: 446, cy: 192, rx: 48, ry: 25, h: 20, fill: "#f7a800", title: "Pipeline CI", sub: "Trivy · Cosign · SBOM", badge: "FIRMADO", badgeColor: "#103250", info: "Pruebas, escaneo de vulnerabilidades y firma criptográfica." })}
                    ${ISO.block({ id: "p10-iac", cx: 544, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "IaC", sub: "etapa 5", opacity: 0.45, info: "Infraestructura." })}
                    ${ISO.block({ id: "p10-gitops", cx: 624, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "GitOps", sub: "etapa 6", opacity: 0.45, info: "Despliegue." })}
                    ${ISO.container({ id: "p10-cluster", cx: 718, cy: 195, rx: 46, ry: 24, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", opacity: 0.45, info: "Clúster destino." })}
                    ${ISO.flow({ id: "f10p-4a", d: "M 386 202 L 398 198", type: "request" })}
                    ${ISO.flow({ id: "f10p-4b", d: "M 494 198 L 506 202", type: "response" })}
                  `,
                },
                {
                  short: "5. IaC + Secretos",
                  title: "5. Infraestructura como código y gestión de secretos",
                  body: `<p><strong>Qué se hace:</strong> La base de datos de Pagos, colas de eventos, roles IAM y secretos se declaran como código y se aprovisionan sin intervención manual.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>Terraform</code> u <code>OpenTofu</code>, <code>Crossplane</code>; secretos con <code>AWS Secrets Manager</code> o <code>HashiCorp Vault</code>.</p>
                         <p><strong>Resultado para el desarrollador:</strong> Pide una base de datos con un archivo declarativo corto en vez de abrir tickets de infraestructura.</p>`,
                  calloutTitle: "Cero infraestructura artesanal",
                  callout:
                    "Todo recurso (BD, cola, secreto) queda versionado, auditable y reproducible entre staging y producción.",
                  console: {
                    title: "platform · paso 5 · iac y secretos",
                    prompt: "Aprovisiona la BD, cola y secretos para pagos-ia",
                    lines: [
                      { kind: "file", text: "infra/pagos-claim.yaml (BD PostgreSQL + cola + rol IAM)", node: "p10-iac", delay: 360 },
                      { kind: "tool", text: "tofu apply -auto-approve / crossplane reconcile pagos-ia", node: "p10-iac", delay: 400 },
                      { kind: "tool", text: "secrets sync --provider aws-secrets-manager (alt: vault)", node: "p10-iac", delay: 380 },
                      { kind: "result", text: "BD, cola y secretos listos sin credenciales en el repo", node: "p10-iac", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Terraform / OpenTofu · Crossplane · Vault / AWS SM", width: 435, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 256, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "Portal", sub: "OK", opacity: 0.7, info: "Portal IDP." })}
                    ${ISO.block({ id: "p10-repo", cx: 338, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "Repo", sub: "OK", opacity: 0.7, info: "Repositorio." })}
                    ${ISO.block({ id: "p10-ci", cx: 422, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "CI", sub: "OK", opacity: 0.75, info: "Imagen firmada." })}
                    ${ISO.block({ id: "p10-iac", cx: 522, cy: 190, rx: 50, ry: 25, h: 20, fill: "#f7a800", title: "IaC + Secretos", sub: "OpenTofu · Vault", badge: "DECLARATIVO", badgeColor: "#103250", info: "Aprovisiona BD, colas, IAM y secretos automáticamente." })}
                    ${ISO.block({ id: "p10-gitops", cx: 622, cy: 205, rx: 38, ry: 19, h: 14, fill: "#ffffff", title: "GitOps", sub: "etapa 6", opacity: 0.5, info: "Sincronización." })}
                    ${ISO.container({ id: "p10-cluster", cx: 718, cy: 195, rx: 46, ry: 24, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", opacity: 0.5, info: "Clúster destino." })}
                    ${ISO.flow({ id: "f10p-5a", d: "M 458 202 L 472 198", type: "request" })}
                    ${ISO.flow({ id: "f10p-5b", d: "M 572 198 L 584 202", type: "response" })}
                  `,
                },
                {
                  short: "6. GitOps",
                  title: "6. Despliegue GitOps: el clúster se sincroniza solo desde Git",
                  body: `<p><strong>Qué se hace:</strong> El estado deseado del microservicio vive en Git; un controlador dentro del clúster detecta cambios y sincroniza el despliegue o revierte en un commit.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>Argo CD</code> o <code>Flux</code>, junto con <code>Helm</code> o <code>Kustomize</code>.</p>
                         <p><strong>Resultado para el desarrollador:</strong> Nadie ejecuta <code>kubectl apply</code> a mano en producción; cada cambio tiene historial y rollback inmediato.</p>`,
                  calloutTitle: "Git como única fuente de verdad",
                  callout:
                    "Si alguien altera algo a mano en el clúster, Argo CD o Flux detectan la deriva (drift) y restauran el estado declarado.",
                  console: {
                    title: "platform · paso 6 · despliegue gitops",
                    prompt: "Sincroniza el manifiesto de pagos-ia hacia el clúster",
                    lines: [
                      { kind: "file", text: "gitops/prod/pagos-ia/kustomization.yaml (tag sha-9f2a)", node: "p10-gitops", delay: 360 },
                      { kind: "tool", text: "argocd app sync pagos-ia (alt: flux reconcile)", node: "p10-gitops", delay: 400 },
                      { kind: "result", text: "argocd: sincronizado · Health: Healthy · 2 réplicas activas", node: "p10-cluster", delay: 400 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Argo CD / Flux · Helm / Kustomize", width: 355, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 252, cy: 205, rx: 35, ry: 18, h: 14, fill: "#ffffff", title: "Portal", sub: "OK", opacity: 0.7, info: "Portal IDP." })}
                    ${ISO.block({ id: "p10-repo", cx: 330, cy: 205, rx: 35, ry: 18, h: 14, fill: "#ffffff", title: "Repo", sub: "OK", opacity: 0.7, info: "Repo Git." })}
                    ${ISO.block({ id: "p10-ci", cx: 408, cy: 205, rx: 35, ry: 18, h: 14, fill: "#ffffff", title: "CI", sub: "OK", opacity: 0.7, info: "Imagen firmada." })}
                    ${ISO.block({ id: "p10-iac", cx: 486, cy: 205, rx: 35, ry: 18, h: 14, fill: "#ffffff", title: "IaC", sub: "OK", opacity: 0.75, info: "Recursos listos." })}
                    ${ISO.block({ id: "p10-gitops", cx: 590, cy: 190, rx: 48, ry: 25, h: 20, fill: "#f7a800", title: "GitOps", sub: "Argo CD / Flux", badge: "SYNCED", badgeColor: "#103250", info: "Reconcilia automáticamente el estado deseado en Git." })}
                    ${ISO.container({ id: "p10-cluster", cx: 716, cy: 190, rx: 48, ry: 25, h: 26, fill: "#103250", title: "Clúster", sub: "Pagos + IA LIVE", badge: "HEALTHY", badgeColor: "#f7a800", info: "Microservicio y agente corriendo en el clúster." })}
                    ${ISO.flow({ id: "f10p-6a", d: "M 522 202 L 540 198", type: "request" })}
                    ${ISO.flow({ id: "f10p-6b", d: "M 638 192 L 666 192", type: "response" })}
                  `,
                },
                {
                  short: "7. Guardrails",
                  title: "7. Políticas, guardrails y pasarela para agentes de IA",
                  body: `<p><strong>Qué se hace:</strong> Se aplican políticas automáticas de admisión en el clúster y, para el agente de Pagos, todo llamado a modelos pasa por una <strong>pasarela LLM</strong> con límites de tokens, reintentos y validación de salidas.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>Kyverno</code> u <code>OPA Gatekeeper</code>; pasarela LLM como <code>LiteLLM</code> (alternativa: <code>Portkey</code> / gateway propio).</p>
                         <p><strong>Resultado para el desarrollador:</strong> Cumplimiento de seguridad y presupuesto protegido por defecto sin reinventar filtros en cada servicio.</p>`,
                  calloutTitle: "Guardrails para código y para LLMs",
                  callout:
                    "Kyverno/OPA protege el clúster; la pasarela LLM controla cuotas, timeouts y validación de esquemas del agente.",
                  console: {
                    title: "platform · paso 7 · kyverno + pasarela llm",
                    prompt: "Aplica guardrails de admisión y presupuesto LLM a pagos-ia",
                    lines: [
                      { kind: "tool", text: "kyverno verify policy-require-signed-and-limits.yaml", node: "p10-policy", delay: 360 },
                      { kind: "result", text: "kyverno: política aplicada (imagen firmada · non-root · límites)", node: "p10-policy", delay: 400 },
                      { kind: "tool", text: "litellm-gateway route pagos-agent --max-tokens 4000 --max-retries 2", node: "p10-llm", delay: 380 },
                      { kind: "result", text: "Pasarela LLM activa · validación JSON Schema habilitada", node: "p10-cluster", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): Kyverno / OPA Gatekeeper · LiteLLM Gateway", width: 400, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p10-portal", cx: 250, cy: 205, rx: 34, ry: 18, h: 14, fill: "#ffffff", title: "Portal", sub: "OK", opacity: 0.65, info: "Portal IDP." })}
                    ${ISO.block({ id: "p10-repo", cx: 324, cy: 205, rx: 34, ry: 18, h: 14, fill: "#ffffff", title: "Repo", sub: "OK", opacity: 0.65, info: "Repo." })}
                    ${ISO.block({ id: "p10-ci", cx: 398, cy: 205, rx: 34, ry: 18, h: 14, fill: "#ffffff", title: "CI", sub: "OK", opacity: 0.65, info: "CI." })}
                    ${ISO.block({ id: "p10-policy", cx: 525, cy: 120, rx: 56, ry: 26, h: 18, fill: "#f7a800", title: "Kyverno / OPA", sub: "admisión K8s", badge: "POLICY", badgeColor: "#103250", info: "Reglas obligatorias al desplegar en el clúster." })}
                    ${ISO.block({ id: "p10-llm", cx: 525, cy: 248, rx: 56, ry: 26, h: 18, fill: "#ffffff", title: "LLM Gateway", sub: "ej. LiteLLM · cuota", badge: "GUARD", badgeColor: "#103250", info: "Controla tokens, reintentos y esquema de salida del agente." })}
                    ${ISO.container({ id: "p10-cluster", cx: 705, cy: 188, rx: 50, ry: 26, h: 26, fill: "#103250", title: "Clúster", sub: "Pagos + Agente", badge: "SEGURO", badgeColor: "#f7a800", info: "Despliegue protegido por políticas y pasarela." })}
                    ${ISO.flow({ id: "f10p-7a", d: "M 582 132 L 656 174", type: "response" })}
                    ${ISO.flow({ id: "f10p-7b", d: "M 582 238 L 656 202", type: "response", bidirectional: true })}
                  `,
                },
                {
                  short: "8. Observar",
                  title: "8. Observar, medir costos y reconocer el alcance real",
                  body: `<p><strong>Qué se hace:</strong> Se recopilan trazas distribuidas, métricas de servicio, costo de clúster/tokens y adopción interna de los Golden Paths.</p>
                         <p><strong>Herramientas (ejemplos):</strong> <code>OpenTelemetry</code>, <code>Prometheus</code> y <code>Grafana</code> (alternativa: <code>Datadog</code>), más <code>OpenCost</code> (o <code>Kubecost</code>).</p>
                         <p><strong>Resultado para el desarrollador:</strong> Visibilidad inmediata sin instrumentar a mano. <strong>Alcance real:</strong> la plataforma comprime la carga ajena, pero <em>no elimina la fatiga de auditar código generado (94 %) ni la paradoja de Jevons</em>, y solo se justifica cuando hay suficientes equipos para amortizarla.</p>`,
                  calloutTitle: "Alcance honesto de Platform Engineering",
                  callout:
                    "Reduce drásticamente la carga ajena, pero no reemplaza la revisión humana ni resuelve los 47 cambios de contexto/día si el equipo lanza agentes sin disciplina. Evalúa el ROI según tu número de equipos.",
                  console: {
                    title: "platform · paso 8 · observabilidad y adopción",
                    prompt: "Consulta telemetría, costos y adopción del Golden Path",
                    lines: [
                      { kind: "tool", text: "otel-query traces --service pagos-ia --window 1h", node: "p10-obs", delay: 360 },
                      { kind: "result", text: "Grafana: p95 ej. 110 ms · OpenCost: ej. $42/mes + cuota LLM", node: "p10-obs", delay: 400 },
                      { kind: "warn", text: "Recordatorio: IDP baja carga ajena, pero la auditoría humana sigue crítica", node: "p10-cluster", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Herramientas (ej.): OpenTelemetry · Prometheus/Grafana · OpenCost", width: 415, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev + Producto" })}
                    ${ISO.block({ id: "p10-portal", cx: 255, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "Portal", sub: "adopción", info: "Mide adopción de plantillas." })}
                    ${ISO.block({ id: "p10-repo", cx: 340, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "Repo+CI", sub: "DORA", info: "Métricas de entrega." })}
                    ${ISO.block({ id: "p10-iac", cx: 425, cy: 205, rx: 36, ry: 18, h: 14, fill: "#ffffff", title: "IaC+GitOps", sub: "sync", info: "Despliegue continuo." })}
                    ${ISO.container({ id: "p10-cluster", cx: 540, cy: 195, rx: 48, ry: 25, h: 24, fill: "#103250", title: "Clúster", sub: "Pagos + IA", info: "Emite trazas OTel y métricas." })}
                    ${ISO.cylinder({ id: "p10-obs", cx: 700, cy: 170, rx: 42, ry: 18, h: 42, fill: "#f7a800", label: "OTel · Grafana · OpenCost", badge: "MÉTRICAS", badgeColor: "#103250", info: "Trazas, métricas, costos y adopción de la plataforma." })}
                    ${ISO.flow({ id: "f10p-8a", d: "M 590 192 L 654 185", type: "response", bidirectional: true })}
                    ${ISO.flow({ id: "f10p-8b", d: "M 690 232 L 420 278 L 170 238", type: "response" })}
                  `,
                },
              ],
            },
            {
              slug: "slide-11-aws-nitro-sandboxes",
              slideNum: 11,
              title:
                "Sandboxes y plataforma: aislar a los agentes sin que el desarrollador lo configure",
              subtitle:
                "Cómo la plataforma incorpora AWS Nitro Sandboxes por defecto, los hace obligatorios por política y prepara sesiones interactivas.",
              duration: "6 min",
              level: "04 · Cloud Security",
              kpis: [
                [
                  { label: "CONTENEDOR STD", val: "Kernel compartido", status: "alert" },
                  { label: "RIESGO AGENTE", val: "Escape a vecinos", status: "alert" },
                  { label: "RADIO IMPACTO", val: "Todo el nodo", status: "alert" },
                  { label: "AISLAMIENTO", val: "Insuficiente", status: "alert" },
                ],
                [
                  { label: "TECNOLOGÍA", val: "Nitro Sandboxes", status: "good" },
                  { label: "AISLAMIENTO", val: "Micro-VM + Kernel", status: "good" },
                  { label: "MODOS", val: "isolated / conf.", status: "" },
                  { label: "RESPALDO", val: "Hardware AWS", status: "good" },
                ],
                [
                  { label: "CAMBIO EKS", val: "1 línea pod spec", status: "good" },
                  { label: "CAMPO", val: "runtimeClassName", status: "good" },
                  { label: "QUIÉN LO PONE", val: "Golden Path IDP", status: "good" },
                  { label: "CARGA AL DEV", val: "Cero", status: "good" },
                ],
                [
                  { label: "ADMISIÓN", val: "Kyverno / OPA", status: "good" },
                  { label: "SIN SANDBOX", val: "Rechazado", status: "alert" },
                  { label: "CON SANDBOX", val: "Aceptado", status: "good" },
                  { label: "CUMPLIMIENTO", val: "Automático", status: "good" },
                ],
                [
                  { label: "ISOLATED", val: "Código no conf.", status: "good" },
                  { label: "CONFIDENTIAL", val: "Datos + KMS", status: "good" },
                  { label: "ATTESTATION", val: "Verif. externa", status: "alert" },
                  { label: "COSTO / RAM", val: "Verificar docs AWS", status: "" },
                ],
                [
                  { label: "SESIONES", val: "Interactivas IA", status: "" },
                  { label: "PROYECTO", val: "agent-sandbox SIG", status: "good" },
                  { label: "POOL CALIENTE", val: "Pre-arrancadas", status: "good" },
                  { label: "RECLAMO", val: "ej. ~2 s (verif.)", status: "good" },
                ],
                [
                  { label: "SANDBOX", val: "Contiene daño", status: "good" },
                  { label: "GOBERNANZA", val: "Sigue en IDP", status: "" },
                  { label: "CONTROL", val: "Roles·Tokens·TTL", status: "good" },
                  { label: "AUDITORÍA", val: "Revisión humana", status: "alert" },
                ],
              ],
              checklist: [
                "Comprender el riesgo del kernel compartido cuando un agente ejecuta código",
                "Distinguir los modos isolated y confidential de AWS Nitro Sandboxes",
                "Incluir runtimeClassName por defecto dentro del Golden Path para agentes",
                "Hacer obligatorio el sandbox mediante políticas de admisión (Kyverno/OPA)",
                "Elegir isolated vs confidential y exigir verificación externa de attestation",
                "Usar pools pre-arrancados (Kubernetes SIG agent-sandbox) en sesiones interactivas",
                "Reconocer que el sandbox contiene el daño pero no reemplaza gobernanza ni revisión",
              ],
              steps: [
                {
                  short: "1. El riesgo",
                  title: "El riesgo: contenedores comparten el kernel del nodo",
                  body: `<p>En Kubernetes estándar, todos los contenedores de un mismo nodo comparten el <strong>kernel Linux del host</strong>.</p>
                         <p>Cuando el agente de <strong>Pagos</strong> ejecuta código generado dinámicamente, un bug o escape de contenedor puede comprometer al nodo y a los microservicios vecinos.</p>`,
                  calloutTitle: "Por qué un contenedor estándar no basta",
                  callout:
                    "Un agente que ejecuta scripts generados por un LLM equivale a correr código no confiable dentro de tu clúster.",
                  console: {
                    title: "sandbox · paso 1 · riesgo de kernel compartido",
                    prompt: "El agente de Pagos ejecuta un script generado en un pod estándar",
                    lines: [
                      { kind: "agent", text: "Agente Pagos › ejecuta script dinámico en pod estándar", node: "p11-agent", delay: 360 },
                      { kind: "warn", text: "Pod comparte kernel del nodo con Usuarios y Pedidos", node: "p11-kernel", delay: 400 },
                      { kind: "error", text: "Riesgo crítico: un escape expone secretos y pods vecinos", node: "p11-neighbor", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.peoplePlatform({ cx: 115, cy: 215, count: 3, caption: "Dev Pagos" })}
                    ${ISO.agent({ id: "p11-agent", cx: 340, cy: 145, rx: 56, ry: 29, h: 20, fill: "#f7a800", title: "Pod Agente IA", sub: "código dinámico", badge: "NO CONF.", badgeColor: "#103250", info: "Ejecuta código generado por LLM." })}
                    ${ISO.container({ id: "p11-neighbor", cx: 615, cy: 145, rx: 56, ry: 29, h: 22, fill: "#ffffff", title: "Pods Vecinos", sub: "Usuarios · Pedidos", info: "Microservicios críticos compartiendo el mismo nodo." })}
                    ${ISO.block({ id: "p11-kernel", cx: 475, cy: 258, rx: 165, ry: 32, h: 18, fill: "#103250", title: "KERNEL DEL NODO COMPARTIDO", sub: "superficie de ataque común", badge: "RIESGO", badgeColor: "#f7a800", info: "Un solo kernel para todos los contenedores del nodo." })}
                    ${ISO.flow({ id: "f11p-1a", d: "M 365 182 L 420 232", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f11p-1b", d: "M 530 232 L 585 182", type: "error", dur: "1.0s" })}
                  `,
                },
                {
                  short: "2. Nitro Sandboxes",
                  title: "Qué es AWS Nitro Sandboxes: micro-VM y kernel dedicado",
                  body: `<p>Con <strong>AWS Nitro Sandboxes</strong>, cada pod de EKS o tarea de ECS corre dentro de su propia <strong>micro-VM con su propio kernel</strong>, respaldada por el hardware Nitro de AWS.</p>
                         <p>Ofrece dos modos: <code>isolated</code> (desconfía del código dentro del pod) y <code>confidential</code> (desconfía también del nodo anfitrión).</p>`,
                  calloutTitle: "Nota de vigencia (tecnología reciente)",
                  callout:
                    "AWS Nitro Sandboxes es una capacidad muy reciente y sus detalles técnicos, precios o comportamiento de memoria pueden cambiar: verificar siempre en la documentación oficial de AWS.",
                  console: {
                    title: "sandbox · paso 2 · arquitectura nitro sandboxes",
                    prompt: "Aísla cada pod de agente en su propia micro-VM Nitro",
                    lines: [
                      { kind: "agent", text: "Pod Agente Pagos → micro-VM dedicada con kernel propio", node: "p11-iso", delay: 380 },
                      { kind: "result", text: "Modo isolated: contiene código no confiable del agente", node: "p11-iso", delay: 380 },
                      { kind: "result", text: "Modo confidential: protege además frente al propio nodo", node: "p11-conf", delay: 400 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Hardware AWS Nitro: cada pod/tarea corre en su propia micro-VM", width: 400, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 215, count: 3, caption: "Dev Pagos" })}
                    ${ISO.container({ id: "p11-iso", cx: 365, cy: 178, rx: 66, ry: 34, h: 30, fill: "#f7a800", title: "isolated-sandbox", sub: "kernel propio · micro-VM", badge: "MODO 1", badgeColor: "#103250", info: "Desconfía del código ejecutado por el agente dentro del pod." })}
                    ${ISO.container({ id: "p11-conf", cx: 625, cy: 178, rx: 68, ry: 34, h: 30, fill: "#103250", title: "confidential-sandbox", sub: "desconfía también del nodo", badge: "MODO 2", badgeColor: "#f7a800", info: "Aislamiento adicional frente al nodo anfitrión con attestation." })}
                    ${ISO.flow({ id: "f11p-2a", d: "M 185 205 L 296 186", type: "response" })}
                    ${ISO.flow({ id: "f11p-2b", d: "M 432 180 L 556 180", type: "request", active: false })}
                  `,
                },
                {
                  short: "3. Por defecto (IDP)",
                  title: "La plataforma lo activa por defecto en el Golden Path",
                  body: `<p>En Amazon EKS, activar el sandbox es <strong>una sola línea</strong> en el manifiesto del pod: <code>runtimeClassName: isolated-sandbox</code> (o <code>confidential-sandbox</code>).</p>
                         <p>El equipo de plataforma incluye esa línea en la <strong>plantilla del Golden Path para agentes</strong>, de modo que el desarrollador de Pagos nunca tiene que configurarla a mano.</p>`,
                  calloutTitle: "Seguridad invisible para el dev",
                  callout:
                    "El desarrollador solo marca 'incluye agente IA' en el portal (Backstage / Port); la plantilla inyecta automáticamente el runtimeClassName.",
                  console: {
                    title: "sandbox · paso 3 · runtimeclass inyectado por el golden path",
                    prompt: "kubectl get runtimeclass",
                    lines: [
                      { kind: "tool", text: "kubectl get runtimeclass", node: "p11-cluster", delay: 320 },
                      { kind: "result", text: "NAME                   HANDLER               AGE", node: "p11-cluster", delay: 260 },
                      { kind: "result", text: "isolated-sandbox       nitro-isolated        14d", node: "p11-tpl", delay: 280 },
                      { kind: "result", text: "confidential-sandbox   nitro-confidential    14d", node: "p11-tpl", delay: 280 },
                      { kind: "file", text: "Golden Path añade: runtimeClassName: isolated-sandbox", node: "p11-tpl", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "1 línea en Pod Spec: runtimeClassName: isolated-sandbox", width: 370, accent: true })}
                    ${ISO.peoplePlatform({ cx: 115, cy: 205, count: 4, caption: "Dev Pagos" })}
                    ${ISO.block({ id: "p11-tpl", cx: 365, cy: 192, rx: 68, ry: 34, h: 22, fill: "#f7a800", title: "Golden Path IA", sub: "inyecta runtimeClassName", badge: "POR DEFECTO", badgeColor: "#103250", info: "Plantilla de plataforma que activa el sandbox automáticamente." })}
                    ${ISO.container({ id: "p11-cluster", cx: 640, cy: 190, rx: 64, ry: 32, h: 30, fill: "#103250", title: "Clúster EKS", sub: "isolated / confidential", badge: "1 LÍNEA", badgeColor: "#f7a800", info: "RuntimeClasses registradas en el clúster." })}
                    ${ISO.flow({ id: "f11p-3a", d: "M 185 202 L 296 196", type: "request" })}
                    ${ISO.flow({ id: "f11p-3b", d: "M 434 192 L 574 192", type: "response" })}
                  `,
                },
                {
                  short: "4. Obligatorio",
                  title: "La plataforma lo hace obligatorio en admisión (Kyverno / OPA)",
                  body: `<p>Confiar solo en la plantilla no basta si alguien despliega un YAML a mano. Una <strong>política de admisión</strong> (<code>Kyverno</code> u <code>OPA Gatekeeper</code>) rechaza cualquier workload etiquetado como agente que no declare un <code>runtimeClassName</code> de sandbox.</p>`,
                  calloutTitle: "Guardrail en el plano de control",
                  callout:
                    "El clúster bloquea el despliegue inseguro antes de que el pod llegue a agendarse en ningún nodo.",
                  console: {
                    title: "sandbox · paso 4 · política de admisión obligatoria",
                    prompt: "Despliega dos pods de agente: uno sin sandbox y otro con sandbox",
                    lines: [
                      { kind: "tool", text: "kubectl apply -f pagos-agent-sin-sandbox.yaml", node: "p11-bad", delay: 340 },
                      { kind: "error", text: "Kyverno DENY: workload=agent requiere runtimeClassName de sandbox", node: "p11-gate", delay: 420 },
                      { kind: "tool", text: "kubectl apply -f pagos-agent-sandbox.yaml", node: "p11-good", delay: 360 },
                      { kind: "result", text: "Kyverno ALLOW: runtimeClassName=isolated-sandbox aceptado", node: "p11-cluster", delay: 400 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Admisión (ej.): Kyverno u OPA Gatekeeper", width: 300, accent: true })}
                    ${ISO.block({ id: "p11-bad", cx: 145, cy: 118, rx: 56, ry: 26, h: 18, fill: "#ffffff", title: "Pod sin Sandbox", sub: "runtime estándar", badge: "DENY", badgeColor: "#f7a800", info: "Rechazado automáticamente por política de admisión." })}
                    ${ISO.block({ id: "p11-good", cx: 145, cy: 238, rx: 56, ry: 26, h: 18, fill: "#f7a800", title: "Pod con Sandbox", sub: "isolated-sandbox", badge: "ALLOW", badgeColor: "#103250", info: "Cumple la política y avanza al clúster." })}
                    ${ISO.block({ id: "p11-gate", cx: 415, cy: 178, rx: 64, ry: 34, h: 24, fill: "#103250", title: "Kyverno / OPA", sub: "valida runtimeClassName", badge: "GUARDRAIL", badgeColor: "#f7a800", info: "Controlador de admisión que exige sandbox a todo agente." })}
                    ${ISO.container({ id: "p11-cluster", cx: 665, cy: 178, rx: 56, ry: 29, h: 28, fill: "#103250", title: "Clúster EKS", sub: "solo pods válidos", badge: "PROTEGIDO", badgeColor: "#f7a800", info: "Solo admite agentes aislados." })}
                    ${ISO.flow({ id: "f11p-4a", d: "M 202 128 L 350 165", type: "error", dur: "1.0s" })}
                    ${ISO.flow({ id: "f11p-4b", d: "M 202 230 L 350 192", type: "response" })}
                    ${ISO.flow({ id: "f11p-4c", d: "M 480 178 L 608 178", type: "response" })}
                  `,
                },
                {
                  short: "5. Elegir modo",
                  title: "Elegir isolated vs. confidential y verificar attestation",
                  body: `<p>Usa <code>isolated</code> para agentes que ejecutan código no confiable. Usa <code>confidential</code> cuando además manejan datos sensibles que ni el nodo anfitrión debe ver: la plataforma configura la política del pod y claves de <code>AWS KMS</code> que exigen <strong>attestation</strong>.</p>
                         <p><strong>Punto clave:</strong> medir el entorno no basta; un verificador externo (como la política de KMS) debe validar esa attestation antes de entregar secretos.</p>`,
                  calloutTitle: "Verificar en la documentación de AWS",
                  callout:
                    "Detalles sobre cifrado de memoria, asignación de RAM sin overcommit o costos de Nitro Sandboxes deben verificarse directamente en la documentación oficial de AWS, pues el servicio es muy reciente.",
                  console: {
                    title: "sandbox · paso 5 · confidential + kms attestation",
                    prompt: "Solicita clave de descifrado de Pagos desde confidential-sandbox",
                    lines: [
                      { kind: "agent", text: "Pod confidential-sandbox › envía documento de attestation a KMS", node: "p11-conf", delay: 380 },
                      { kind: "tool", text: "aws kms decrypt --attestation-doc signed.cbor", node: "p11-kms", delay: 400 },
                      { kind: "warn", text: "Medir no basta: KMS verifica criptográficamente el hash del pod", node: "p11-kms", delay: 400 },
                      { kind: "result", text: "Attestation válida → clave liberada solo dentro del sandbox", node: "p11-conf", delay: 400 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "isolated (código no confiable)  vs.  confidential (datos + KMS attestation)", width: 455, accent: true })}
                    ${ISO.container({ id: "p11-iso", cx: 165, cy: 185, rx: 58, ry: 30, h: 28, fill: "#ffffff", title: "isolated", sub: "código no confiable", info: "Adecuado para agentes generales." })}
                    ${ISO.container({ id: "p11-conf", cx: 415, cy: 185, rx: 64, ry: 32, h: 30, fill: "#f7a800", title: "confidential", sub: "datos sensibles", badge: "ATTEST", badgeColor: "#103250", info: "Protege secretos frente al nodo y presenta attestation." })}
                    ${ISO.cylinder({ id: "p11-kms", cx: 660, cy: 168, rx: 44, ry: 19, h: 42, fill: "#103250", label: "AWS KMS (verifica)", badge: "KMS", badgeColor: "#f7a800", info: "Verificador externo que exige attestation válida antes de liberar claves." })}
                    ${ISO.flow({ id: "f11p-5a", d: "M 480 185 L 614 185", type: "response", bidirectional: true })}
                  `,
                },
                {
                  short: "6. Interactivos",
                  title: "Sandboxes para sesiones interactivas: pool pre-arrancado",
                  body: `<p>En sesiones interactivas de agentes, arrancar una micro-VM en frío en cada mensaje se siente lento. AWS recomienda el proyecto <code>agent-sandbox</code> de <strong>Kubernetes SIG</strong> (alternativa: pools propios de micro-VMs calientes).</p>
                         <p>Este controlador mantiene un <strong>pool de micro-VMs pre-arrancadas</strong> listas para reclamar rápidamente (la documentación indica ej. ~2 segundos; verificar la cifra vigente en la documentación de AWS/SIG).</p>`,
                  calloutTitle: "Baja latencia sin sacrificar aislamiento",
                  callout:
                    "El pool caliente separa el tiempo de arranque del tiempo de respuesta al usuario, reclamando un sandbox limpio en segundos (ej. ~2 s, verificar en docs).",
                  console: {
                    title: "sandbox · paso 6 · kubernetes sig agent-sandbox",
                    prompt: "Reclama una micro-VM pre-arrancada para sesión interactiva",
                    lines: [
                      { kind: "tool", text: "kubectl apply -f sandbox-claim-pagos-session.yaml", node: "p11-sig", delay: 360 },
                      { kind: "agent", text: "agent-sandbox controller › asigna micro-VM caliente del pool", node: "p11-pool", delay: 400 },
                      { kind: "result", text: "Sandbox listo para sesión interactiva en ej. ~2 s (verificar docs)", node: "p11-pool", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Kubernetes SIG agent-sandbox: micro-VMs pre-arrancadas (ej. ~2 s)", width: 420, accent: true })}
                    ${ISO.peoplePlatform({ cx: 120, cy: 205, count: 3, caption: "Sesión Interactiva" })}
                    ${ISO.block({ id: "p11-sig", cx: 365, cy: 192, rx: 64, ry: 33, h: 22, fill: "#f7a800", title: "agent-sandbox", sub: "Kubernetes SIG", badge: "CLAIM", badgeColor: "#103250", info: "Controlador que asigna micro-VMs calientes bajo demanda." })}
                    ${ISO.container({ id: "p11-pool", cx: 645, cy: 130, rx: 56, ry: 26, h: 24, fill: "#103250", title: "Micro-VM #1", sub: "reclamada (ej. ~2 s)", badge: "ACTIVA", badgeColor: "#f7a800", info: "Instancia asignada de inmediato a la sesión." })}
                    ${ISO.container({ id: "p11-warm", cx: 645, cy: 245, rx: 56, ry: 26, h: 24, fill: "#ffffff", title: "Pool Caliente", sub: "pre-arrancadas", info: "Sandboxes en espera listas para el siguiente reclamo." })}
                    ${ISO.flow({ id: "f11p-6a", d: "M 190 202 L 300 194", type: "request" })}
                    ${ISO.flow({ id: "f11p-6b", d: "M 430 176 L 588 140", type: "response" })}
                    ${ISO.flow({ id: "f11p-6c", d: "M 430 206 L 588 238", type: "request" })}
                  `,
                },
                {
                  short: "7. Qué no resuelve",
                  title: "Lo que el sandbox no resuelve: gobernanza y revisión humana",
                  body: `<p>Un sandbox <strong>contiene el daño</strong> cuando un agente ejecuta código riesgoso, pero <strong>no decide quién puede lanzar qué</strong> ni detiene bucles de gasto.</p>
                         <p>La gobernanza sigue siendo responsabilidad de la <strong>plataforma</strong> (admisión, roles IAM, límites de tokens y TTL) y el criterio final sigue exigiendo <strong>revisión humana</strong>.</p>`,
                  calloutTitle: "Defensa en profundidad",
                  callout:
                    "Sandbox (contención) + Plataforma (admisión, roles, cuotas y tiempo) + Humano (aprobación crítica). Ninguna capa sustituye a las otras.",
                  console: {
                    title: "sandbox · paso 7 · límites del sandbox y gobernanza",
                    prompt: "Evalúa qué cubre el sandbox y qué depende de plataforma + humano",
                    lines: [
                      { kind: "result", text: "Sandbox Nitro › contiene escape de código a nivel hardware", node: "p11-sbx", delay: 360 },
                      { kind: "warn", text: "No decide permisos ni presupuesto → lo gobierna la plataforma", node: "p11-gov", delay: 400 },
                      { kind: "result", text: "Plataforma: admisión + roles + max_tokens + TTL", node: "p11-gov", delay: 380 },
                      { kind: "result", text: "Humano: aprueba cambios críticos y valida el negocio", node: "p11-human", delay: 400 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Defensa en profundidad: Sandbox + Gobernanza IDP + Revisión Humana", width: 435, accent: true })}
                    ${ISO.container({ id: "p11-sbx", cx: 165, cy: 190, rx: 58, ry: 30, h: 28, fill: "#103250", title: "Nitro Sandbox", sub: "contiene el daño", badge: "AISLA", badgeColor: "#f7a800", info: "Frena el impacto técnico en el nodo." })}
                    ${ISO.block({ id: "p11-gov", cx: 415, cy: 190, rx: 68, ry: 35, h: 24, fill: "#f7a800", title: "Gobernanza IDP", sub: "admisión · roles · cuotas", badge: "DECIDE", badgeColor: "#103250", info: "Define quién puede lanzar qué y con qué presupuesto." })}
                    <g class="iso-node" data-node-id="p11-human" data-info="Revisión humana en puntos críticos de negocio y arquitectura.">${ISO.peoplePlatform({ cx: 660, cy: 200, count: 4, caption: "Revisión Humana" })}</g>
                    ${ISO.flow({ id: "f11p-7a", d: "M 224 190 L 346 190", type: "response", bidirectional: true })}
                    ${ISO.flow({ id: "f11p-7b", d: "M 484 190 L 584 196", type: "response", bidirectional: true })}
                  `,
                },
              ],
            },
            {
              slug: "slide-12-ia-code-reviews",
              slideNum: 12,
              title: "IA en Code Reviews: 10 consejos prácticos en 5 pasos",
              subtitle:
                "Revisión del PR #482 del servicio de Pagos: del prompt ruidoso a evidencia reproducible, reglas permanentes y control humano.",
              duration: "7 min",
              level: "04 · Gobernanza",
              kpis: [
                [
                  { label: "PROMPT MALO", val: "'Revisa este PR'", status: "alert" },
                  { label: "RUIDO ESTILO", val: "ej. 12 notas", status: "alert" },
                  { label: "PROMPT BUENO", val: "Foco + Contratos", status: "good" },
                  { label: "RESULTADO", val: "Hallazgos reales", status: "good" },
                ],
                [
                  { label: "ALCANCE", val: "Fuera del diff", status: "good" },
                  { label: "IMPACTO", val: "ej. 3 servicios", status: "alert" },
                  { label: "COMPARACIÓN", val: "PR vs. main", status: "good" },
                  { label: "CLASIFICACIÓN", val: "Nuevo vs. Previo", status: "good" },
                ],
                [
                  { label: "REVISORES", val: "3 Subagentes", status: "good" },
                  { label: "CONTEXTO", val: "Sesión nueva (0)", status: "good" },
                  { label: "ESPECIALIDAD", val: "Sec · Lóg · Perf", status: "good" },
                  { label: "SESIÓN SUCIA", val: "Sesgo / ruido", status: "alert" },
                ],
                [
                  { label: "VALIDACIÓN", val: "Simular el bug", status: "good" },
                  { label: "EVIDENCIA", val: "200 ≠ 401", status: "alert" },
                  { label: "SIN PRUEBA", val: "Descartada", status: "good" },
                  { label: "TABLA", val: "gravedad.md", status: "good" },
                ],
                [
                  { label: "MEMORIA", val: "agents/review.md", status: "good" },
                  { label: "0 HALLAZGOS", val: "Revisar humano", status: "alert" },
                  { label: "CAMBIO GRANDE", val: "ej. 1.200 líneas", status: "alert" },
                  { label: "CONTROL FINAL", val: "Humano", status: "good" },
                ],
              ],
              checklist: [
                "Definir foco explícito y dar contexto completo (código + contratos)",
                "Revisar impacto fuera del diff y separar errores nuevos de preexistentes",
                "Usar subagentes por especialidad siempre en sesiones limpias",
                "Exigir evidencia reproducible y clasificar cada hallazgo por gravedad",
                "Convertir feedback repetido en reglas (agents.md/review.md) con control humano",
              ],
              steps: [
                {
                  short: "1. Foco y contexto",
                  title: "1. Antes de pedir: definir foco y dar contexto suficiente",
                  body: `<p><strong style="color:#c8332b;">✕ Cómo NO hacerlo:</strong> escribir un prompt genérico como <code style="color:#c8332b;">"Revisa este PR"</code> sobre un diff aislado; solo genera <strong style="color:#c8332b;">ruido cosmético</strong> (nombres de variables, espacios) y deja pasar bugs de negocio.</p>
                         <p><strong>✓ Cómo hacerlo bien:</strong> entrega <strong>objetivo, restricciones, foco y archivos relacionados</strong> (<code>src/pagos/</code> y <code>/contracts</code>) para que el revisor evalúe la lógica real del PR #482.</p>`,
                  calloutTitle: "Consejos 1 y 2: Foco + Contexto",
                  callout:
                    "Nunca pidas 'revisa este PR' en vacío: indica qué cambia, qué invariantes no pueden romperse (ej. timeout de 3 s) y qué contratos leer.",
                  console: {
                    title: "review · paso 1 · prompt malo vs. prompt con foco y contexto",
                    prompt: "Revisa este PR",
                    lines: [
                      { kind: "error", text: "NO HACER › prompt vacío: 12 comentarios de estilo (variables, espacios)", node: "r12-pr-bad", delay: 340 },
                      { kind: "error", text: "NO HACER › diff aislado: sin hallazgos de negocio ni seguridad", node: "r12-rev1", delay: 320 },
                      { kind: "agent", text: "Prompt bueno › Revisa PR #482 de Pagos. Objetivo: reintentos de cobro. Restricción: timeout 3 s. Foco: seguridad y lógica. Lee src/pagos/ y /contracts", node: "r12-pr-good", delay: 460 },
                      { kind: "result", text: "Contexto cargado (src/pagos/ + /contracts) → hallazgos concretos de cobro", node: "r12-out1", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "PR #482 Pagos: Diff aislado (ruido) vs. PR con contexto y contratos", width: 430, accent: true })}
                    ${ISO.block({ id: "r12-pr-bad", cx: 145, cy: 118, rx: 56, ry: 26, h: 18, fill: "#ffffff", title: "PR Aislado", sub: "solo el diff", badge: "✕ RUIDO", badgeColor: "#c8332b", info: "Cómo NO hacerlo: sin contratos ni objetivo produce comentarios de estilo." })}
                    ${ISO.block({ id: "r12-pr-good", cx: 145, cy: 238, rx: 58, ry: 27, h: 18, fill: "#f7a800", title: "PR #482 + Docs", sub: "src/pagos + /contracts", badge: "CON FOCO", badgeColor: "#103250", info: "Incluye objetivo, timeout de 3 s y contratos relacionados." })}
                    ${ISO.agent({ id: "r12-rev1", cx: 410, cy: 178, rx: 62, ry: 33, h: 22, fill: "#103250", title: "Revisor IA", sub: "seguridad + lógica", info: "Cambia por completo la calidad de salida según el contexto recibido." })}
                    ${ISO.cylinder({ id: "r12-out1", cx: 655, cy: 162, rx: 42, ry: 18, h: 42, fill: "#103250", label: "review.md / agents.md", badge: "CONCRETO", badgeColor: "#f7a800", info: "Hallazgos accionables de negocio y seguridad." })}
                    ${ISO.flow({ id: "f12r-1a", d: "M 202 128 L 346 164", type: "error", dur: "1.1s" })}
                    ${ISO.flow({ id: "f12r-1b", d: "M 204 232 L 346 194", type: "response" })}
                    ${ISO.flow({ id: "f12r-1c", d: "M 474 178 L 610 178", type: "response" })}
                  `,
                },
                {
                  short: "2. Fuera del diff",
                  title: "2. Qué mirar: impacto fuera del diff y errores nuevos vs. previos",
                  body: `<p><strong style="color:#c8332b;">✕ Cómo NO hacerlo:</strong> revisar <strong style="color:#c8332b;">solo las líneas del diff</strong> sin buscar quién llama a <code>cobrar()</code> en el resto del repo, o <strong style="color:#c8332b;">culpar al PR por tests que ya fallaban en main</strong>.</p>
                         <p><strong>✓ Cómo hacerlo bien:</strong> rastrea referencias fuera del diff y compara contra la rama <code>main</code> para distinguir <strong>errores introducidos por este PR</strong> de fallos <strong>preexistentes</strong>.</p>`,
                  calloutTitle: "Consejos 3 y 4: Impacto global + Línea base main",
                  callout:
                    "Audita quién llama a la función modificada fuera del diff y valida en main si un fallo ya existía antes del cambio.",
                  console: {
                    title: "review · paso 2 · impacto fuera del diff y comparación con main",
                    prompt: "Analiza impacto de PR #482 fuera del diff y compara tests contra main",
                    lines: [
                      { kind: "tool", text: "git diff main...pr-482", node: "r12-pr2", delay: 340 },
                      { kind: "tool", text: "grep -r 'cobrar(' src/", node: "r12-deps", delay: 360 },
                      { kind: "error", text: "NO IGNORAR › 3 servicios fuera del diff llaman a cobrar() con firma antigua", node: "r12-deps", delay: 400 },
                      { kind: "tool", text: "git stash; git checkout main; npm test", node: "r12-main", delay: 420 },
                      { kind: "error", text: "NO CONFUNDIR › firma cobrar(): INTRODUCIDO por PR · test_reintento: PREEXISTENTE", node: "r12-main", delay: 440 },
                      { kind: "result", text: "el fallo en test_reintento YA existía en main: el cambio solo lo hizo evidente", node: "r12-out2", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Impacto fuera del diff (3 llamadores) + comparación con main", width: 400, accent: true })}
                    ${ISO.block({ id: "r12-pr2", cx: 145, cy: 185, rx: 56, ry: 28, h: 20, fill: "#f7a800", title: "PR #482 Pagos", sub: "cambia cobrar()", info: "Pull Request bajo revisión." })}
                    ${ISO.block({ id: "r12-deps", cx: 405, cy: 112, rx: 62, ry: 28, h: 18, fill: "#103250", title: "Dependencias", sub: "3 servicios llaman cobrar()", badge: "NUEVO", badgeColor: "#f7a800", info: "Impacto real fuera de los archivos tocados en el diff." })}
                    ${ISO.block({ id: "r12-main", cx: 405, cy: 245, rx: 62, ry: 28, h: 18, fill: "#ffffff", title: "Rama main", sub: "test_reintento ya fallaba", badge: "PREVIO", badgeColor: "#103250", info: "Línea base para separar errores nuevos de preexistentes." })}
                    ${ISO.cylinder({ id: "r12-out2", cx: 655, cy: 162, rx: 42, ry: 18, h: 42, fill: "#103250", label: "review.md", badge: "CLASIFICADO", badgeColor: "#f7a800", info: "Distingue fallos nuevos vs. deuda preexistente." })}
                    ${ISO.flow({ id: "f12r-2a", d: "M 202 172 L 340 120", type: "error", dur: "1.1s" })}
                    ${ISO.flow({ id: "f12r-2b", d: "M 202 198 L 340 240", type: "request", bidirectional: true })}
                    ${ISO.flow({ id: "f12r-2c", d: "M 468 122 L 610 172", type: "error" })}
                    ${ISO.flow({ id: "f12r-2d", d: "M 468 238 L 610 192", type: "response" })}
                  `,
                },
                {
                  short: "3. Subagentes limpios",
                  title: "3. Quién revisa: subagentes por especialidad en sesiones limpias",
                  body: `<p><strong style="color:#c8332b;">✕ Cómo NO hacerlo:</strong> pedirle todo a un solo chat y <strong style="color:#c8332b;">reutilizar una sesión con historial de otro PR</strong>; el contexto sucio contamina el juicio y repite conclusiones que no aplican.</p>
                         <p><strong>✓ Cómo hacerlo bien:</strong> divide en <strong>3 subagentes especializados</strong> (Seguridad, Lógica y Rendimiento), cada uno arrancando en una <strong>sesión nueva (0 tokens de historial)</strong>.</p>`,
                  calloutTitle: "Consejos 5 y 6: Especialidades + Contexto limpio",
                  callout:
                    "Una sesión limpia por especialidad evita sesgo de arrastre y mantiene alta la atención en cada criterio.",
                  console: {
                    title: "review · paso 3 · 3 subagentes en sesiones limpias",
                    prompt: "Lanza revisión del PR #482 por especialidad en sesiones nuevas",
                    lines: [
                      { kind: "agent", text: "Lanzando 3 subagentes, cada uno en sesión nueva (0 tokens de historial)", node: "r12-pr3", delay: 260 },
                      { kind: "agent", text: "Seguridad › OWASP, IAM", node: "r12-sec", delay: 120 },
                      { kind: "agent", text: "Lógica › casos borde", node: "r12-log", delay: 120 },
                      { kind: "agent", text: "Rendimiento › latencia y consultas", node: "r12-perf", delay: 120 },
                      { kind: "error", text: "NO HACER › sesión reutilizada con otro PR: repite conclusiones que no aplican", node: "r12-out3", delay: 460 },
                      { kind: "result", text: "3 sesiones limpias listas para validar hallazgos sin sesgo", node: "r12-out3", delay: 380 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "3 Subagentes en paralelo · cada uno con sesión nueva (0 historial)", width: 425, accent: true })}
                    ${ISO.block({ id: "r12-pr3", cx: 140, cy: 185, rx: 54, ry: 27, h: 20, fill: "#f7a800", title: "PR #482 Pagos", sub: "contexto completo", info: "Entrada común para los 3 especialistas." })}
                    ${ISO.agent({ id: "r12-sec", cx: 405, cy: 92, rx: 56, ry: 24, h: 16, fill: "#103250", title: "Seguridad", sub: "OWASP · IAM", badge: "NUEVA 0", badgeColor: "#f7a800", info: "Sesión limpia dedicada a seguridad." })}
                    ${ISO.agent({ id: "r12-log", cx: 405, cy: 182, rx: 56, ry: 24, h: 16, fill: "#f7a800", title: "Lógica", sub: "casos borde", badge: "NUEVA 0", badgeColor: "#103250", info: "Sesión limpia dedicada a lógica de negocio." })}
                    ${ISO.agent({ id: "r12-perf", cx: 405, cy: 272, rx: 56, ry: 24, h: 16, fill: "#ffffff", title: "Rendimiento", sub: "latencia · SQL", badge: "NUEVA 0", badgeColor: "#103250", info: "Sesión limpia dedicada a rendimiento." })}
                    ${ISO.cylinder({ id: "r12-out3", cx: 655, cy: 162, rx: 42, ry: 18, h: 42, fill: "#103250", label: "review.md (3 vistas)", info: "Hallazgos consolidados sin contaminación de sesiones viejas." })}
                    ${ISO.flow({ id: "f12r-3a", d: "M 196 170 L 346 98", type: "request", dur: "1.2s" })}
                    ${ISO.flow({ id: "f12r-3b", d: "M 196 185 L 346 185", type: "request", dur: "1.2s" })}
                    ${ISO.flow({ id: "f12r-3c", d: "M 196 200 L 346 270", type: "request", dur: "1.2s" })}
                    ${ISO.flow({ id: "f12r-3d", d: "M 462 98 L 610 170", type: "response" })}
                    ${ISO.flow({ id: "f12r-3e", d: "M 462 182 L 610 182", type: "response" })}
                    ${ISO.flow({ id: "f12r-3f", d: "M 462 270 L 610 196", type: "response" })}
                  `,
                },
                {
                  short: "4. Evidencia y gravedad",
                  title: "4. Cómo se valida: puerta de evidencia y tabla de gravedad",
                  body: `<p><strong style="color:#c8332b;">✕ Cómo NO hacerlo:</strong> aceptar <strong style="color:#c8332b;">opiniones sin prueba ni evidencia reproducible</strong>, o mezclar bugs críticos de seguridad con detalles cosméticos sin prioridad.</p>
                         <p><strong>✓ Cómo hacerlo bien:</strong> cada hallazgo cruza la <strong>puerta de evidencia</strong> (ej. simular <code>POST /cobrar</code> con token expirado → responde <code>200</code> en vez de <code>401</code>) y se clasifica en <code>gravedad.md</code>.</p>`,
                  calloutTitle: "Consejos 7 y 8: Evidencia reproducible + Gravedad",
                  callout:
                    "Si el agente no puede demostrar el fallo con una prueba o traza concreta, se descarta para evitar fatiga por falsos positivos.",
                  console: {
                    title: "review · paso 4 · puerta de evidencia y gravedad",
                    prompt: "Valida con prueba reproducible los hallazgos del PR #482",
                    lines: [
                      { kind: "error", text: "Seguridad › hallazgo: el token expirado no se valida", node: "r12-rev4", delay: 360 },
                      { kind: "tool", text: "simular: POST /cobrar con token expirado", node: "r12-gate", delay: 400 },
                      { kind: "result", text: "reproducido: HTTP 200 cuando debía ser 401", node: "r12-gate", delay: 380 },
                      { kind: "error", text: "NO ACEPTAR › opinión sin evidencia reproducible → descartada", node: "r12-gate", delay: 360 },
                      { kind: "file", text: "gravedad.md · Crítico: token · Medio: retry sin backoff · Bajo: nombre var", node: "r12-out4", delay: 440 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "Hallazgo → Puerta de Evidencia (simulación) → Gravedad", width: 390, accent: true })}
                    ${ISO.agent({ id: "r12-rev4", cx: 145, cy: 185, rx: 56, ry: 28, h: 20, fill: "#ffffff", title: "Sub. Seguridad", sub: "propone hallazgo", info: "Reporta posible falla de token expirado." })}
                    ${ISO.block({ id: "r12-gate", cx: 405, cy: 185, rx: 66, ry: 34, h: 24, fill: "#f7a800", title: "Puerta Evidencia", sub: "simula POST /cobrar", badge: "200 ≠ 401", badgeColor: "#103250", info: "Solo pasan hallazgos reproducidos; opiniones sin prueba se descartan." })}
                    ${ISO.block({ id: "r12-out4", cx: 655, cy: 112, rx: 58, ry: 24, h: 16, fill: "#103250", title: "gravedad.md", sub: "Crítico: token", badge: "CRÍTICO", badgeColor: "#f7a800", info: "Tabla de criticidad: Crítico (rojo/alerta), Medio (ámbar), Bajo (verde/ok)." })}
                    ${ISO.block({ id: "r12-med4", cx: 655, cy: 192, rx: 58, ry: 24, h: 16, fill: "#f7a800", title: "Medio: Retry", sub: "sin backoff", badge: "MEDIO", badgeColor: "#103250", info: "Severidad media verificada." })}
                    ${ISO.block({ id: "r12-low4", cx: 655, cy: 272, rx: 58, ry: 24, h: 16, fill: "#ffffff", title: "Bajo: Estilo", sub: "nombre variable", badge: "BAJO", badgeColor: "#103250", info: "No bloquea el merge." })}
                    ${ISO.flow({ id: "f12r-4a", d: "M 202 185 L 336 185", type: "request" })}
                    ${ISO.flow({ id: "f12r-4b", d: "M 472 166 L 594 118", type: "error" })}
                    ${ISO.flow({ id: "f12r-4c", d: "M 472 188 L 594 192", type: "request" })}
                    ${ISO.flow({ id: "f12r-4d", d: "M 472 208 L 594 266", type: "response" })}
                  `,
                },
                {
                  short: "5. Reglas y humano",
                  title: "5. Qué queda: reglas permanentes y revisión humana obligatoria",
                  body: `<p><strong style="color:#c8332b;">✕ Cómo NO hacerlo:</strong> repetir el mismo comentario en cada PR sin guardarlo, y <strong style="color:#c8332b;">hacer merge a ciegas porque la IA dijo "0 hallazgos"</strong> en un cambio grande (ej. 1.200 líneas).</p>
                         <p><strong>✓ Cómo hacerlo bien:</strong> convierte el feedback repetido en regla permanente en <code>agents.md</code> / <code>review.md</code> y mantén la <strong>revisión humana</strong> como último control.</p>
                         <p style="font-size:11.5px; opacity:0.75; margin-top:8px;"><em>Basado en: [AUTOR / CANAL DEL VIDEO — completar]</em></p>`,
                  calloutTitle: "Consejos 9 y 10: Memoria viva + Control humano",
                  callout:
                    "Sugerencia del video: considerar un modelo con razonamiento profundo (deep thinking) para cambios grandes. En cualquier caso, 0 hallazgos de IA nunca reemplazan el escepticismo humano.",
                  console: {
                    title: "review · paso 5 · agents.md / review.md y control humano",
                    prompt: "Persiste la regla aprendida y evalúa el veredicto final",
                    lines: [
                      { kind: "agent", text: "Corrección repetida 3 veces: validar siempre el token", node: "r12-pr5", delay: 340 },
                      { kind: "file", text: "agents.md (regla permanente: validar token antes de cobrar)", node: "r12-mem5", delay: 400 },
                      { kind: "result", text: "la próxima revisión aplica la regla sin que se la pidan", node: "r12-mem5", delay: 380 },
                      { kind: "error", text: "NO HACER › confiar en 0 hallazgos en ej. 1.200 líneas → revisión humana obligatoria", node: "r12-human5", delay: 440 },
                      { kind: "think", text: "sugerencia: considerar razonamiento profundo (deep thinking) en cambios grandes", node: "r12-human5", delay: 420 },
                    ],
                  },
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "agents.md / review.md alimenta el siguiente PR · Humano decide", width: 415, accent: true })}
                    ${ISO.block({ id: "r12-pr5", cx: 145, cy: 190, rx: 56, ry: 28, h: 20, fill: "#ffffff", title: "Siguiente PR", sub: "aplica reglas auto", badge: "PR #483", badgeColor: "#103250", info: "El próximo Pull Request hereda las reglas sin repetir prompts." })}
                    ${ISO.cylinder({ id: "r12-mem5", cx: 405, cy: 162, rx: 46, ry: 20, h: 46, fill: "#f7a800", label: "agents.md / review.md", badge: "REGLA +1", badgeColor: "#103250", info: "Memoria permanente del equipo de ingeniería." })}
                    <g class="iso-node" data-node-id="r12-human5" data-info="Último control obligatorio: sin hallazgos de la IA no garantiza código limpio.">${ISO.peoplePlatform({ cx: 655, cy: 200, count: 4, caption: "Revisión Humana" })}</g>
                    ${ISO.flow({ id: "f12r-5a", d: "M 358 188 L 204 190", type: "response" })}
                    ${ISO.flow({ id: "f12r-5b", d: "M 454 188 L 580 196", type: "response", bidirectional: true })}
                  `,
                },
              ],
            },
          ],
        };
