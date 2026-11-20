// Sección 2 de la ponencia
const SECTION_02 = {
          id: "mod-02",
          title: "02. Carga Cognitiva y Fatiga",
          color: "orange",
          open: true,
          lessons: [
            {
              slug: "slide-5-carga-cognitiva-fatiga",
              slideNum: 5,
              title:
                "Cuando la IA acelera y el humano no escala: la carga cognitiva",
              subtitle:
                "Cómo la carga ajena, la auditoría continua y la paradoja de Jevons desbordan la memoria de trabajo del desarrollador.",
              duration: "6 min",
              level: "02 · Factor Humano",
              kpis: [
                [
                  { label: "MEMORIA TRABAJO", val: "Capacidad fija", status: "good" },
                  { label: "CARGA ACTUAL", val: "ej. 10%", status: "good" },
                  { label: "MARGEN LIBRE", val: "ej. 90%", status: "good" },
                  { label: "ESTADO MENTAL", val: "Óptimo", status: "good" },
                ],
                [
                  { label: "INTRÍNSECA", val: "35% (Lógica)", status: "good" },
                  { label: "PERTINENTE", val: "ej. 35% (Negocio)", status: "good" },
                  { label: "AJENA", val: "ej. 5%", status: "good" },
                  { label: "ESTADO MENTAL", val: "Flujo Activo", status: "good" },
                ],
                [
                  { label: "INTRÍNSECA", val: "35%", status: "" },
                  { label: "PERTINENTE", val: "Asfixiada", status: "alert" },
                  { label: "CARGA AJENA", val: "K8s · YAML · MCP", status: "alert" },
                  { label: "ESTADO MENTAL", val: "Al Límite", status: "alert" },
                ],
                [
                  { label: "GENERACIÓN IA", val: "ej. 500 lín / 10s", status: "good" },
                  { label: "AUDITORÍA HUM.", val: "ej. 30 min", status: "alert" },
                  { label: "NIVEL MEMORIA", val: "Cruza límite", status: "alert" },
                  { label: "ESTADO MENTAL", val: "Saturado", status: "alert" },
                ],
                [
                  { label: "DEVS CON FATIGA", val: "94%", status: "alert" },
                  { label: "CAMBIOS / DÍA", val: "47 contextos", status: "alert" },
                  { label: "EFECTO JEVONS", val: "Agentes + Cuota", status: "alert" },
                  { label: "ESTADO MENTAL", val: "COLAPSO", status: "alert" },
                ],
                [
                  { label: "CARGA AJENA", val: "IDP (ej. 12%)", status: "good" },
                  { label: "AUDITORÍA", val: "Subagentes", status: "good" },
                  { label: "DISCIPLINA", val: "Foco + Goals", status: "good" },
                  { label: "ESTADO MENTAL", val: "Recuperado", status: "good" },
                ],
              ],
              checklist: [
                "Reconocer que la memoria de trabajo humana tiene un límite fijo",
                "Distinguir carga intrínseca (35 %), pertinente (negocio) y ajena",
                "Detectar cómo K8s, YAML, IAM, prompts y MCP asfixian la pertinente",
                "Medir la brecha entre generar código en segundos y auditarlo con rigor",
                "Identificar el colapso: 94 % de fatiga, 47 cambios/día y paradoja de Jevons",
                "Recuperar capacidad con IDP, subagentes verificadores, foco y desconexión",
              ],
              steps: [
                {
                  short: "1. Capacidad",
                  title: "Capacidad limitada: la memoria de trabajo humana no escala",
                  body: `<p>Antes de hablar de herramientas o IA, hay una restricción física inmutable: la <strong>memoria de trabajo del desarrollador</strong> es un recipiente finito.</p>
                         <p>Todo lo que el ingeniero necesita sostener en la cabeza al mismo tiempo compite por el espacio debajo de la línea de <strong>LÍMITE HUMANO</strong>.</p>`,
                  calloutTitle: "Restricción biológica",
                  callout:
                    "Podemos multiplicar servidores y tokens, pero la memoria de trabajo humana (ej. ~4 bloques activos simultáneos) no se amplía por decreto.",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 26, text: "Memoria de trabajo: capacidad fija bajo el LÍMITE HUMANO", width: 375 })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 3, caption: "Desarrollador" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      layers: [
                        {
                          h: 16,
                          fill: "#a9c5e8",
                          title: "Base mental libre",
                          sub: "ej. 10% en uso",
                          info: "Estado inicial despejado: amplia holgura bajo el límite humano.",
                        },
                      ],
                    })}
                    ${ISO.block({
                      id: "v5-src1",
                      cx: 660,
                      cy: 185,
                      rx: 56,
                      ry: 30,
                      h: 20,
                      fill: "#ffffff",
                      title: "Problema Nuevo",
                      sub: "contexto inicial",
                      badge: "ÓPTIMO",
                      badgeColor: "#103250",
                      info: "El desarrollador inicia con claridad mental y espacio disponible.",
                    })}
                    ${ISO.flow({ id: "f5c-1a", d: "M 218 220 L 336 220", type: "response" })}
                    ${ISO.flow({ id: "f5c-1b", d: "M 602 192 L 494 218", type: "request" })}
                  `,
                },
                {
                  short: "2. Tres cargas",
                  title: "Tres tipos de carga (Team Topologies: Skelton & Pais)",
                  body: `<p>Según <strong>Skelton & Pais (Team Topologies)</strong>, la memoria se llena con tres capas: <strong>intrínseca</strong> (~35 %, la dificultad propia de programar) y <strong>pertinente</strong> (las reglas del negocio, donde reside el valor real).</p>
                         <p>Cuando la fricción accidental es baja, ambas conviven cómodamente con espacio de sobra debajo del límite.</p>`,
                  calloutTitle: "Dónde está el valor",
                  callout:
                    "La carga intrínseca (~35 %) es inevitable; proteger espacio para la pertinente (ej. 35 %) es lo que hace que el equipo genere valor de negocio.",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 26, text: "Team Topologies: Intrínseca (35%) + Pertinente (negocio)", width: 375, accent: true })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 3, caption: "Foco en Negocio" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      layers: [
                        {
                          h: 40,
                          fill: "#a9c5e8",
                          sideLabel: "Intrínseca",
                          rightLabel: "35%",
                          topLabel: false,
                          info: "Carga intrínseca: algoritmos, lenguaje y lógica propia del problema.",
                        },
                        {
                          h: 40,
                          fill: "#8fc4a8",
                          title: "Pertinente (Negocio)",
                          sub: "valor · ej. 35%",
                          sideLabel: "Pertinente",
                          rightLabel: "ej. 35%",
                          info: "Carga pertinente: comprensión del dominio y reglas del producto.",
                        },
                      ],
                    })}
                    ${ISO.block({
                      id: "v5-src2a",
                      cx: 660,
                      cy: 140,
                      rx: 56,
                      ry: 28,
                      h: 18,
                      fill: "#8fc4a8",
                      title: "Reglas Negocio",
                      sub: "dominio + usuarios",
                      info: "Fuente de carga pertinente: aporta valor directo.",
                    })}
                    ${ISO.block({
                      id: "v5-src2b",
                      cx: 660,
                      cy: 240,
                      rx: 56,
                      ry: 28,
                      h: 18,
                      fill: "#a9c5e8",
                      title: "Lógica Técnica",
                      sub: "35% intrínseca",
                      info: "Fuente de carga intrínseca: dificultad propia del software.",
                    })}
                    ${ISO.flow({ id: "f5c-2a", d: "M 218 220 L 336 220", type: "response" })}
                    ${ISO.flow({ id: "f5c-2b", d: "M 602 148 L 494 188", type: "response" })}
                    ${ISO.flow({ id: "f5c-2c", d: "M 602 238 L 494 238", type: "response" })}
                  `,
                },
                {
                  short: "3. Carga ajena",
                  title: "La carga ajena entra y asfixia la lógica del negocio",
                  body: `<p>Al operar microservicios e IA sin abstracciones, entra una capa pesada de <strong>carga ajena</strong>: <code>Kubernetes</code>, <code>YAML</code>, políticas <code>IAM</code>, <code>prompts</code>, servidores <code>MCP</code> y bases vectoriales.</p>
                         <p>El nivel trepa hasta rozar el <strong>LÍMITE HUMANO</strong> y la carga pertinente queda comprimida y <strong>asfixiada</strong>.</p>`,
                  calloutTitle: "Regla de Arquitectura",
                  callout:
                    "Cuando la carga ajena (ej. 300 líneas de YAML, IAM y configuración de MCP) llena el recipiente, ya no queda espacio mental para el negocio.",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 26, text: "Carga ajena: K8s · YAML · IAM · Prompts · MCP · Vector DB", width: 395, accent: true })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 4, caption: "Presión Operativa" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      layers: [
                        {
                          h: 36,
                          fill: "#a9c5e8",
                          sideLabel: "Intrínseca",
                          rightLabel: "35%",
                          topLabel: false,
                          info: "Base técnica del problema.",
                        },
                        {
                          h: 16,
                          fill: "#8fc4a8",
                          sideLabel: "Asfixiada",
                          topLabel: false,
                          info: "La carga pertinente se comprime al mínimo.",
                        },
                        {
                          h: 56,
                          fill: "#e8a47c",
                          title: "Carga Ajena",
                          sub: "K8s · YAML · IAM · MCP",
                          sideLabel: "Ajena",
                          rightLabel: "alta",
                          info: "Fricción accidental de infraestructura, permisos y orquestación.",
                        },
                      ],
                    })}
                    ${ISO.block({
                      id: "v5-src3a",
                      cx: 660,
                      cy: 120,
                      rx: 56,
                      ry: 27,
                      h: 18,
                      fill: "#e8a47c",
                      title: "K8s + YAML + IAM",
                      sub: "infra manual",
                      info: "Manifiestos, redes y permisos que el dev gestiona a mano.",
                    })}
                    ${ISO.cylinder({
                      id: "v5-src3b",
                      cx: 660,
                      cy: 228,
                      rx: 38,
                      ry: 16,
                      h: 36,
                      fill: "#103250",
                      label: "Prompts + MCP",
                      info: "Orquestación de prompts, herramientas MCP y bases vectoriales.",
                    })}
                    ${ISO.flow({ id: "f5c-3a", d: "M 218 220 L 336 220", type: "request" })}
                    ${ISO.flow({ id: "f5c-3b", d: "M 602 128 L 494 166", type: "error" })}
                    ${ISO.flow({ id: "f5c-3c", d: "M 618 232 L 494 192", type: "error" })}
                  `,
                },
                {
                  short: "4. Auditoría IA",
                  title: "La IA genera más rápido de lo que el humano puede auditar",
                  body: `<p>Generar <strong>500 líneas de código</strong> toma apenas unos segundos (ej. 10 s), pero verificar con criterio que no rompan seguridad ni reglas de negocio toma mucho más tiempo (ej. 30 min).</p>
                         <p>La <strong>auditoría continua de código ajeno</strong> se apila sobre la carga ajena y el nivel <strong>cruza el LÍMITE HUMANO</strong>.</p>`,
                  calloutTitle: "Asimetría generación vs. verificación",
                  callout:
                    "Escribir se volvió instantáneo (ej. 500 líneas en 10 s), pero auditar sigue siendo trabajo cognitivo profundo que no escala al ritmo del LLM.",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 26, text: "Generar: ej. 500 lín / 10 s  vs.  Auditar: ej. 30 min", width: 365, accent: true })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 4, caption: "Auditoría Continua" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      overflowLabel: "CRUZA LÍMITE",
                      layers: [
                        {
                          h: 32,
                          fill: "#a9c5e8",
                          sideLabel: "Intrínseca",
                          rightLabel: "35%",
                          topLabel: false,
                          info: "Lógica propia del problema.",
                        },
                        {
                          h: 12,
                          fill: "#8fc4a8",
                          topLabel: false,
                          info: "Carga pertinente reducida.",
                        },
                        {
                          h: 48,
                          fill: "#e8a47c",
                          sideLabel: "Ajena",
                          rightLabel: "K8s+MCP",
                          topLabel: false,
                          info: "Infraestructura y configuración manual.",
                        },
                        {
                          h: 38,
                          fill: "#e8a47c",
                          title: "Auditoría IA",
                          sub: "ej. 500 lín / 10 s",
                          sideLabel: "Auditar",
                          rightLabel: "30m",
                          info: "Sobrecarga por validar parches y PRs generados a gran velocidad.",
                        },
                      ],
                    })}
                    ${ISO.agent({
                      id: "v5-ag4",
                      cx: 660,
                      cy: 128,
                      rx: 54,
                      ry: 28,
                      h: 22,
                      fill: "#f7a800",
                      title: "Generación IA",
                      sub: "ej. 500 lín / 10s",
                      badge: "TURBO",
                      badgeColor: "#103250",
                      info: "Produce código y PRs mucho más rápido de lo que un humano puede auditar.",
                    })}
                    ${ISO.block({
                      id: "v5-pr4",
                      cx: 660,
                      cy: 238,
                      rx: 56,
                      ry: 28,
                      h: 18,
                      fill: "#ffffff",
                      title: "Cola de PRs",
                      sub: "revisión manual",
                      info: "Cambios esperando verificación de seguridad y negocio.",
                    })}
                    ${ISO.flow({ id: "f5c-4a", d: "M 218 220 L 336 220", type: "error" })}
                    ${ISO.flow({ id: "f5c-4b", d: "M 604 134 L 494 146", type: "error", dur: "0.9s" })}
                    ${ISO.flow({ id: "f5c-4c", d: "M 602 232 L 494 176", type: "error", dur: "1.2s" })}
                  `,
                },
                {
                  short: "5. Jevons / Colapso",
                  title: "Fragmentación, 47 cambios al día y trampa de Jevons",
                  body: `<p>El golpe final viene de la <strong>fragmentación</strong>: <strong>47 cambios de herramienta al día</strong> entre IDE, Claude Code, terminal y chats/PRs, sumados a la <strong>Paradoja de Jevons</strong> (lanzar múltiples agentes en paralelo por ansiedad de exprimir la cuota de tokens).</p>
                         <p>El recipiente se desborda en <strong>COLAPSO</strong>: el <strong>94 % de los desarrolladores reporta fatiga</strong> por IA.</p>`,
                  calloutTitle: "Paradoja de Jevons",
                  callout:
                    "94 % de fatiga y 47 cambios de contexto al día: herramientas más veloces no nos hacen trabajar menos si disparamos más hilos paralelos sin pausa.",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 24, text: "94% Fatiga · 47 cambios/día · Paradoja de Jevons", width: 355, accent: true })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 6, caption: "94% Fatiga · 47/día" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      overflowLabel: "COLAPSO",
                      layers: [
                        {
                          h: 28,
                          fill: "#a9c5e8",
                          sideLabel: "Intrínseca",
                          rightLabel: "35%",
                          topLabel: false,
                          info: "Base técnica.",
                        },
                        {
                          h: 10,
                          fill: "#8fc4a8",
                          topLabel: false,
                          info: "Negocio casi sin espacio.",
                        },
                        {
                          h: 42,
                          fill: "#e8a47c",
                          sideLabel: "Ajena",
                          rightLabel: "K8s+MCP",
                          topLabel: false,
                          info: "Carga de infraestructura y configuración.",
                        },
                        {
                          h: 34,
                          fill: "#e8a47c",
                          sideLabel: "Auditoría",
                          rightLabel: "PRs IA",
                          topLabel: false,
                          info: "Revisión continua de código generado.",
                        },
                        {
                          h: 44,
                          fill: "#e8a47c",
                          title: "47 Saltos + Jevons",
                          sub: "agentes paralelos · cuota",
                          sideLabel: "Colapso",
                          rightLabel: "94%",
                          info: "Desborde total por cambios de contexto y ansiedad por cuota de tokens.",
                        },
                      ],
                    })}
                    ${ISO.block({
                      id: "v5-ctx5a",
                      cx: 660,
                      cy: 102,
                      rx: 56,
                      ry: 24,
                      h: 16,
                      fill: "#ffffff",
                      title: "IDE · CLI · Chats",
                      sub: "47 cambios / día",
                      badge: "47/DÍA",
                      badgeColor: "#f7a800",
                      info: "Saltos constantes entre IDE, Claude Code, terminal y PRs.",
                    })}
                    ${ISO.agent({
                      id: "v5-ag5",
                      cx: 660,
                      cy: 186,
                      rx: 52,
                      ry: 25,
                      h: 18,
                      fill: "#f7a800",
                      title: "Agentes ×N",
                      sub: "hilos paralelos",
                      info: "Múltiples agentes compitiendo por la atención del desarrollador.",
                    })}
                    ${ISO.cylinder({
                      id: "v5-tok5",
                      cx: 660,
                      cy: 258,
                      rx: 38,
                      ry: 15,
                      h: 28,
                      fill: "#103250",
                      label: "cuota tokens",
                      badge: "100%",
                      badgeColor: "#f7a800",
                      info: "Ansiedad por consumir la cuota disponible sin pausas.",
                    })}
                    ${ISO.flow({ id: "f5c-5a", d: "M 218 215 L 336 195", type: "error", dur: "0.9s" })}
                    ${ISO.flow({ id: "f5c-5b", d: "M 602 108 L 494 126", type: "error", dur: "0.8s" })}
                    ${ISO.flow({ id: "f5c-5c", d: "M 606 186 L 494 156", type: "error", dur: "0.9s" })}
                    ${ISO.flow({ id: "f5c-5d", d: "M 620 264 L 494 205", type: "error", dur: "1.1s" })}
                  `,
                },
                {
                  short: "6. Recuperación",
                  title: "Recuperación: IDP, subagentes verificadores y salud del ingeniero",
                  body: `<p>Recuperar el control ataca las tres fuentes de desborde: una <strong>Plataforma Interna (IDP / Golden Paths)</strong> comprime la carga ajena al mínimo, y <strong>subagentes verificadores</strong> filtran la auditoría con evidencia reproducible.</p>
                         <p>Del lado humano, <strong>foco profundo</strong>, un <strong>Goal claro</strong> y <strong>desconexión real</strong> devuelven el recipiente muy por debajo del límite para volver a pensar en el negocio.</p>`,
                  calloutTitle: "Salud del Ingeniero",
                  callout:
                    "La disciplina hoy exige foco profundo, metas claras (Goals) y desconexión real fuera de la pantalla (ej. reduciendo la carga ajena a ~12 %).",
                  renderSvg: () => `
                    ${ISO.pill({ x: 395, y: 26, text: "IDP + Subagentes + Foco Profundo, Goals y Desconexión Real", width: 410, accent: true })}
                    ${ISO.peoplePlatform({ cx: 145, cy: 225, count: 4, caption: "Foco + Goals" })}
                    ${ISO.vessel({
                      cx: 415,
                      cy: 262,
                      capacity: 142,
                      limit: 112,
                      layers: [
                        {
                          h: 36,
                          fill: "#a9c5e8",
                          sideLabel: "Intrínseca",
                          rightLabel: "35%",
                          topLabel: false,
                          info: "Base técnica saludable.",
                        },
                        {
                          h: 44,
                          fill: "#8fc4a8",
                          sideLabel: "Pertinente",
                          rightLabel: "ej. 45%",
                          topLabel: false,
                          info: "Espacio mental recuperado para innovar en el negocio.",
                        },
                        {
                          h: 14,
                          fill: "#e8a47c",
                          title: "Ajena mínima (IDP)",
                          sub: "ej. 12% · bajo límite",
                          info: "Carga ajena y de auditoría comprimidas mediante plataforma y subagentes.",
                        },
                      ],
                    })}
                    ${ISO.block({
                      id: "v5-idp6",
                      cx: 660,
                      cy: 112,
                      rx: 58,
                      ry: 26,
                      h: 18,
                      fill: "#ffffff",
                      title: "IDP / Golden Path",
                      sub: "comprime ajena",
                      badge: "IDP",
                      badgeColor: "#103250",
                      info: "Abstrae K8s, YAML, IAM y despliegues repetitivos.",
                    })}
                    ${ISO.agent({
                      id: "v5-sub6",
                      cx: 660,
                      cy: 192,
                      rx: 54,
                      ry: 26,
                      h: 18,
                      fill: "#f7a800",
                      title: "Subag. Verificador",
                      sub: "filtra auditoría",
                      info: "Valida contratos y pruebas antes de pedir revisión humana.",
                    })}
                    ${ISO.cylinder({
                      id: "v5-off6",
                      cx: 660,
                      cy: 264,
                      rx: 40,
                      ry: 15,
                      h: 26,
                      fill: "#103250",
                      label: "desconexión real",
                      info: "Descanso cognitivo real fuera de pantalla.",
                    })}
                    ${ISO.flow({ id: "f5c-6a", d: "M 218 220 L 336 210", type: "response", bidirectional: true })}
                    ${ISO.flow({ id: "f5c-6b", d: "M 600 118 L 494 176", type: "response" })}
                    ${ISO.flow({ id: "f5c-6c", d: "M 604 196 L 494 196", type: "response" })}
                  `,
                },
              ],
            },
          ],
        };
