      /* ==========================================================================
       MOTOR DE PRIMITIVAS ISOMÉTRICAS 3D (2.5D SVG CON PROYECCIÓN A 30°)
       ========================================================================== */
      const ISO_FILL_MAP = {
        "#e7c697": "#f7a800",
        "#e8a47c": "#f7a800",
        "#8fc4a8": "#ffffff",
        "#b9a6e3": "#103250",
        "#a9c5e8": "#ffffff",
        "#efe5d8": "#ffffff",
      };
      const ISO_BADGE_MAP = {
        "#1f6f4a": "#103250",
        "#c8332b": "#f7a800",
        "#b84a27": "#f7a800",
        "#1d1b18": "#103250",
      };

      const ISO = {
        // Dibuja un bloque isométrico 3D (rombo superior + 2 caras laterales extruidas)
        block({
          id = "",
          cx,
          cy,
          rx = 62,
          ry = 35,
          h = 24,
          fill = "#f7a800",
          stroke = "var(--svg-stroke)",
          title = "",
          sub = "",
          badge = "",
          badgeColor = "#103250",
          icon = "",
          opacity = 1,
          scale = 1,
          info = "",
        }) {
          const resolvedFill = ISO_FILL_MAP[fill.toLowerCase()] || fill;
          const isDarkFill = resolvedFill.toLowerCase() === "#103250";
          const textPrimary = isDarkFill ? "#ffffff" : "#103250";
          const textSecondary = isDarkFill ? "rgba(255,255,255,0.82)" : "rgba(16,50,80,0.8)";
          const resolvedBadge = ISO_BADGE_MAP[badgeColor.toLowerCase()] || badgeColor;
          const badgeTextColor = resolvedBadge.toLowerCase() === "#f7a800" ? "#103250" : "#ffffff";
          const topPts = `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
          const leftPts = `${cx - rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + h} ${cx - rx},${cy + h}`;
          const rightPts = `${cx},${cy + ry} ${cx + rx},${cy} ${cx + rx},${cy + h} ${cx},${cy + ry + h}`;

          return `
          <g class="iso-node" data-node-id="${id}" data-info="${info.replace(/"/g, "&quot;")}"
             style="opacity:${opacity}; transform: scale(${scale}); transform-origin: ${cx}px ${cy}px;">
            <!-- Sombra proyectada en el suelo -->
            <polygon points="${cx},${cy - ry + h + 5} ${cx + rx + 3},${cy + h + 5} ${cx},${cy + ry + h + 6} ${cx - rx - 3},${cy + h + 5}"
                     fill="rgba(16,50,80,0.10)" />
            <!-- Cara izquierda (sombra media) -->
            <polygon points="${leftPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${leftPts}" fill="rgba(16,50,80,0.10)" pointer-events="none" />
            <!-- Cara derecha (sombra profunda) -->
            <polygon points="${rightPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${rightPts}" fill="rgba(16,50,80,0.20)" pointer-events="none" />
            <!-- Tapa superior iluminada -->
            <polygon points="${topPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            ${icon ? `<g transform="translate(${cx - 10}, ${cy - ry + 8})">${icon}</g>` : ""}
            ${title ? `<text x="${cx}" y="${cy + (icon ? 5 : -2)}" text-anchor="middle" font-size="12.5" font-weight="800" fill="${textPrimary}">${title}</text>` : ""}
            ${sub ? `<text x="${cx}" y="${cy + (icon ? 19 : 13)}" text-anchor="middle" font-size="10" font-weight="600" fill="${textSecondary}">${sub}</text>` : ""}
            ${
              badge
                ? `
              <g transform="translate(${cx + rx - 22}, ${cy - ry - 6})">
                <rect x="-24" y="-11" width="52" height="20" rx="10" fill="${resolvedBadge}" stroke="${stroke}" stroke-width="1.5" />
                <text x="2" y="3" text-anchor="middle" font-family="monospace" font-size="10" font-weight="800" fill="${badgeTextColor}">${badge}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },

        // Dibuja un cilindro isométrico 3D para Bases de Datos, Memoria Vectorial o Archivos .md
        cylinder({
          id = "",
          cx,
          cy,
          rx = 38,
          ry = 17,
          h = 42,
          fill = "#103250",
          stroke = "var(--svg-stroke)",
          label = "",
          sub = "",
          badge = "",
          badgeColor = "#f7a800",
          opacity = 1,
          info = "",
        }) {
          const resolvedFill = ISO_FILL_MAP[fill.toLowerCase()] || fill;
          const isDarkFill = resolvedFill.toLowerCase() === "#103250";
          const diskIconStroke = isDarkFill ? "#f7a800" : "#103250";
          const resolvedBadge = ISO_BADGE_MAP[badgeColor.toLowerCase()] || badgeColor;
          const badgeTextColor = resolvedBadge.toLowerCase() === "#f7a800" ? "#103250" : "#ffffff";
          return `
          <g class="iso-node" data-node-id="${id}" data-info="${info.replace(/"/g, "&quot;")}" style="opacity:${opacity};">
            <ellipse cx="${cx}" cy="${cy + h + 4}" rx="${rx + 2}" ry="${ry + 2}" fill="rgba(16,50,80,0.10)" />
            <path d="M ${cx - rx} ${cy} L ${cx - rx} ${cy + h} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} L ${cx + rx} ${cy} Z"
                  fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <path d="M ${cx} ${cy + ry} L ${cx} ${cy + h + ry} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry} Z"
                  fill="rgba(16,50,80,0.16)" pointer-events="none" />
            <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" />
            <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(255,255,255,0.15)" pointer-events="none" />
            <!-- Icono interno de disco -->
            <ellipse cx="${cx}" cy="${cy + h * 0.52}" rx="10" ry="4.5" fill="none" stroke="${diskIconStroke}" stroke-width="1.4" />
            <path d="M ${cx - 10} ${cy + h * 0.52} v 8 a 10 4.5 0 0 0 20 0 v -8" fill="none" stroke="${diskIconStroke}" stroke-width="1.4" />
            ${
              label
                ? `
              <g transform="translate(${cx}, ${cy + h + ry + 16})">
                <rect x="-56" y="-11" width="112" height="21" rx="10" fill="var(--pill-bg)" stroke="${stroke}" stroke-width="1.5" />
                <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700" fill="var(--ink)">${label}</text>
              </g>
            `
                : ""
            }
            ${
              badge
                ? `
              <g transform="translate(${cx + rx - 6}, ${cy - ry - 4})">
                <rect x="-26" y="-10" width="54" height="19" rx="9" fill="${resolvedBadge}" stroke="${stroke}" stroke-width="1.4" />
                <text x="1" y="3" text-anchor="middle" font-family="monospace" font-size="10" font-weight="800" fill="${badgeTextColor}">${badge}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },

        // Plataforma isométrica con grupo de usuarios / desarrolladores estilizados (como en el video)
        peoplePlatform({
          cx,
          cy,
          count = 8,
          caption = "desarrolladores",
          opacity = 1,
        }) {
          const colors = [
            "#103250",
            "#f7a800",
            "#ffffff",
            "#f7a800",
            "#103250",
          ];
          let peopleSvg = "";
          const cols = 4;
          for (let i = 0; i < count; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const px = cx - 34 + c * 22 - r * 14;
            const py = cy - 12 + c * 11 + r * 14;
            const col = colors[i % colors.length];
            peopleSvg += `
            <g transform="translate(${px}, ${py})">
              <rect x="-5" y="4" width="10" height="13" rx="4" fill="${col}" stroke="var(--svg-stroke)" stroke-width="1.4" />
              <circle cx="0" cy="-2" r="4.5" fill="#ffffff" stroke="var(--svg-stroke)" stroke-width="1.4" />
            </g>
          `;
          }
          return `
          <g style="opacity:${opacity};">
            <!-- Plataforma base 2.5D -->
            <polygon points="${cx - 75},${cy + 6} ${cx - 5},${cy + 42} ${cx - 5},${cy + 50} ${cx - 75},${cy + 14}"
                     fill="rgba(16,50,80,0.14)" stroke="var(--svg-stroke)" stroke-width="1.6" stroke-linejoin="round" />
            <polygon points="${cx - 5},${cy + 42} ${cx + 75},${cy + 2} ${cx + 75},${cy + 10} ${cx - 5},${cy + 50}"
                     fill="rgba(16,50,80,0.24)" stroke="var(--svg-stroke)" stroke-width="1.6" stroke-linejoin="round" />
            <polygon points="${cx},${cy - 32} ${cx + 75},${cy + 2} ${cx - 5},${cy + 42} ${cx - 75},${cy + 6}"
                     fill="#ffffff" stroke="var(--svg-stroke)" stroke-width="1.6" stroke-linejoin="round" />
            ${peopleSvg}
            ${
              caption
                ? `
              <g transform="translate(${cx}, ${cy + 64})">
                <rect x="-64" y="-11" width="128" height="21" rx="10" fill="var(--pill-bg)" stroke="var(--svg-stroke)" stroke-width="1.5" />
                <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700" fill="var(--ink)">👥 ${caption}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },

        // Píldora flotante tipo anotación del video
        pill({ x, y, text, width = 150, accent = false }) {
          return `
          <g transform="translate(${x}, ${y})">
            <rect x="${-width / 2}" y="-12" width="${width}" height="23" rx="11.5"
                  fill="${accent ? "#f7a800" : "#ffffff"}" stroke="var(--svg-stroke)" stroke-width="1.5" />
            <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="10.5" font-weight="700"
                  fill="#103250">${text}</text>
          </g>
        `;
        },

        // Ruta animada con flecha + partícula viajando por <animateMotion>
        flow({
          id,
          d,
          type = "request",
          dur = "2.2s",
          active = true,
          bidirectional = false,
        }) {
          if (!active) {
            return `<path d="${d}" fill="none" stroke="var(--border)" stroke-width="1.8" stroke-dasharray="4 4" />`;
          }
          const dotColor =
            type === "response"
              ? "#103250"
              : type === "error"
                ? "#f7a800"
                : "#f7a800";
          return `
          <g>
            <path id="${id}" d="${d}" fill="none" stroke="var(--svg-stroke)" stroke-width="2"
                  marker-end="url(#arrow-head)" stroke-linecap="round" stroke-linejoin="round" />
            <circle r="4.6" fill="${dotColor}" stroke="var(--svg-stroke)" stroke-width="1.4">
              <animateMotion dur="${dur}" repeatCount="indefinite" rotate="auto">
                <mpath href="#${id}" />
              </animateMotion>
            </circle>
            ${
              bidirectional
                ? `
              <circle r="4.4" fill="#103250" stroke="var(--svg-stroke)" stroke-width="1.4">
                <animateMotion dur="${dur}" begin="1.1s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath href="#${id}" />
                </animateMotion>
              </circle>
            `
                : ""
            }
          </g>
        `;
        },

        // Dibuja un contenedor / micro-VM isométrico 3D con acanalado lateral y sello de aislamiento
        container({
          id = "",
          cx,
          cy,
          rx = 56,
          ry = 30,
          h = 30,
          fill = "#103250",
          stroke = "var(--svg-stroke)",
          title = "",
          sub = "",
          badge = "",
          badgeColor = "#f7a800",
          opacity = 1,
          info = "",
        }) {
          const resolvedFill = ISO_FILL_MAP[fill.toLowerCase()] || fill;
          const isDarkFill = resolvedFill.toLowerCase() === "#103250";
          const textPrimary = isDarkFill ? "#ffffff" : "#103250";
          const textSecondary = isDarkFill ? "rgba(255,255,255,0.82)" : "rgba(16,50,80,0.8)";
          const ribColor = isDarkFill ? "rgba(255,255,255,0.28)" : "rgba(16,50,80,0.28)";
          const resolvedBadge = ISO_BADGE_MAP[badgeColor.toLowerCase()] || badgeColor;
          const badgeTextColor = resolvedBadge.toLowerCase() === "#f7a800" ? "#103250" : "#ffffff";
          const topPts = `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
          const leftPts = `${cx - rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + h} ${cx - rx},${cy + h}`;
          const rightPts = `${cx},${cy + ry} ${cx + rx},${cy} ${cx + rx},${cy + h} ${cx},${cy + ry + h}`;
          // Costillas verticales del contenedor sobre la cara izquierda y derecha
          const ribs = [0.25, 0.5, 0.75]
            .map((t) => {
              const lx = cx - rx * (1 - t);
              const ly = cy + ry * t;
              const rxp = cx + rx * t;
              const ryp = cy + ry * (1 - t);
              return `
                <line x1="${lx}" y1="${ly + 3}" x2="${lx}" y2="${ly + h - 3}" stroke="${ribColor}" stroke-width="1.4" />
                <line x1="${rxp}" y1="${ryp + 3}" x2="${rxp}" y2="${ryp + h - 3}" stroke="${ribColor}" stroke-width="1.4" />
              `;
            })
            .join("");

          return `
          <g class="iso-node" data-node-id="${id}" data-info="${info.replace(/"/g, "&quot;")}" style="opacity:${opacity};">
            <!-- Sombra proyectada -->
            <polygon points="${cx},${cy - ry + h + 6} ${cx + rx + 4},${cy + h + 6} ${cx},${cy + ry + h + 7} ${cx - rx - 4},${cy + h + 6}"
                     fill="rgba(16,50,80,0.12)" />
            <!-- Cara izquierda -->
            <polygon points="${leftPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${leftPts}" fill="rgba(16,50,80,0.12)" pointer-events="none" />
            <!-- Cara derecha -->
            <polygon points="${rightPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${rightPts}" fill="rgba(16,50,80,0.22)" pointer-events="none" />
            ${ribs}
            <!-- Tapa superior -->
            <polygon points="${topPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${cx},${cy - ry + 6} ${cx + rx - 10},${cy} ${cx},${cy + ry - 6} ${cx - rx + 10},${cy}"
                     fill="none" stroke="${ribColor}" stroke-width="1.2" stroke-dasharray="4 3" />
            ${title ? `<text x="${cx}" y="${cy - 1}" text-anchor="middle" font-size="12" font-weight="800" fill="${textPrimary}">${title}</text>` : ""}
            ${sub ? `<text x="${cx}" y="${cy + 13}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${textSecondary}">${sub}</text>` : ""}
            ${
              badge
                ? `
              <g transform="translate(${cx + rx - 20}, ${cy - ry - 6})">
                <rect x="-26" y="-11" width="56" height="20" rx="10" fill="${resolvedBadge}" stroke="${stroke}" stroke-width="1.5" />
                <text x="2" y="3" text-anchor="middle" font-family="monospace" font-size="9.5" font-weight="800" fill="${badgeTextColor}">${badge}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },

        // Dibuja un agente de IA isométrico 3D (tres caras, sombra, trazo y núcleo de razonamiento)
        agent({
          id = "",
          cx,
          cy,
          rx = 54,
          ry = 30,
          h = 24,
          fill = "#f7a800",
          stroke = "var(--svg-stroke)",
          title = "",
          sub = "",
          badge = "",
          badgeColor = "#103250",
          opacity = 1,
          info = "",
        }) {
          const resolvedFill = ISO_FILL_MAP[fill.toLowerCase()] || fill;
          const isDarkFill = resolvedFill.toLowerCase() === "#103250";
          const textPrimary = isDarkFill ? "#ffffff" : "#103250";
          const textSecondary = isDarkFill ? "rgba(255,255,255,0.84)" : "rgba(16,50,80,0.82)";
          const resolvedBadge = ISO_BADGE_MAP[badgeColor.toLowerCase()] || badgeColor;
          const badgeTextColor = resolvedBadge.toLowerCase() === "#f7a800" ? "#103250" : "#ffffff";
          const topPts = `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
          const leftPts = `${cx - rx},${cy} ${cx},${cy + ry} ${cx},${cy + ry + h} ${cx - rx},${cy + h}`;
          const rightPts = `${cx},${cy + ry} ${cx + rx},${cy} ${cx + rx},${cy + h} ${cx},${cy + ry + h}`;

          return `
          <g class="iso-node" data-node-id="${id}" data-info="${info.replace(/"/g, "&quot;")}" style="opacity:${opacity};">
            <!-- Sombra proyectada -->
            <polygon points="${cx},${cy - ry + h + 6} ${cx + rx + 3},${cy + h + 6} ${cx},${cy + ry + h + 7} ${cx - rx - 3},${cy + h + 6}"
                     fill="rgba(16,50,80,0.12)" />
            <!-- Cara izquierda -->
            <polygon points="${leftPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${leftPts}" fill="rgba(16,50,80,0.12)" pointer-events="none" />
            <!-- Cara derecha -->
            <polygon points="${rightPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <polygon points="${rightPts}" fill="rgba(16,50,80,0.22)" pointer-events="none" />
            <!-- Tapa superior -->
            <polygon points="${topPts}" fill="${resolvedFill}" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round" />
            <!-- Corona/antena de agente IA -->
            <line x1="${cx}" y1="${cy - ry}" x2="${cx}" y2="${cy - ry - 11}" stroke="${stroke}" stroke-width="1.8" />
            <circle cx="${cx}" cy="${cy - ry - 14}" r="4.2" fill="${isDarkFill ? "#f7a800" : "#103250"}" stroke="${stroke}" stroke-width="1.5" />
            <!-- Visor interno -->
            <rect x="${cx - 14}" y="${cy - ry + 8}" width="28" height="7" rx="3.5" fill="${isDarkFill ? "#ffffff" : "#103250"}" />
            <circle cx="${cx - 6}" cy="${cy - ry + 11.5}" r="1.6" fill="${isDarkFill ? "#103250" : "#f7a800"}" />
            <circle cx="${cx + 6}" cy="${cy - ry + 11.5}" r="1.6" fill="${isDarkFill ? "#103250" : "#f7a800"}" />
            ${title ? `<text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="12" font-weight="800" fill="${textPrimary}">${title}</text>` : ""}
            ${sub ? `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${textSecondary}">${sub}</text>` : ""}
            ${
              badge
                ? `
              <g transform="translate(${cx + rx - 18}, ${cy - ry - 6})">
                <rect x="-26" y="-11" width="56" height="20" rx="10" fill="${resolvedBadge}" stroke="${stroke}" stroke-width="1.5" />
                <text x="2" y="3" text-anchor="middle" font-family="monospace" font-size="9.5" font-weight="800" fill="${badgeTextColor}">${badge}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },

        // Dibuja el recipiente isométrico de Memoria de Trabajo que se llena por capas apiladas
        // con línea horizontal punteada "LÍMITE HUMANO" y badge opcional de desborde ("COLAPSO")
        vessel({
          id = "working-memory-vessel",
          cx = 395,
          cy = 258,
          rx = 74,
          ry = 34,
          capacity = 144,
          layers = [],
          limit = 118,
          overflowLabel = "",
          caption = "Memoria de Trabajo",
          info = "Recipiente de memoria de trabajo humana: capacidad limitada para sostener carga intrínseca, pertinente y ajena.",
        }) {
          const stroke = "var(--svg-stroke)";
          const baseY = cy;
          const topY = baseY - capacity;
          const limitY = baseY - limit;
          const totalH = layers.reduce((acc, l) => acc + (l.h || 0), 0);
          const isOverflow = totalH > limit;

          // Sombra en el suelo
          const shadowPts = `${cx},${baseY - ry + 8} ${cx + rx + 5},${baseY + 8} ${cx},${baseY + ry + 9} ${cx - rx - 5},${baseY + 8}`;
          // Base del recipiente (caras traseras translúcidas)
          const backLeftPts = `${cx - rx},${topY} ${cx},${topY - ry} ${cx},${baseY - ry} ${cx - rx},${baseY}`;
          const backRightPts = `${cx},${topY - ry} ${cx + rx},${topY} ${cx + rx},${baseY} ${cx},${baseY - ry}`;
          const floorPts = `${cx},${baseY - ry} ${cx + rx},${baseY} ${cx},${baseY + ry} ${cx - rx},${baseY}`;

          // Capas apiladas de abajo hacia arriba (tres caras isométricas por capa)
          let curBottom = baseY;
          const layersSvg = layers
            .map((layer) => {
              const h = Math.max(4, layer.h || 0);
              const layerTopY = curBottom - h;
              const lTop = `${cx},${layerTopY - ry} ${cx + rx},${layerTopY} ${cx},${layerTopY + ry} ${cx - rx},${layerTopY}`;
              const lLeft = `${cx - rx},${layerTopY} ${cx},${layerTopY + ry} ${cx},${curBottom + ry} ${cx - rx},${curBottom}`;
              const lRight = `${cx},${layerTopY + ry} ${cx + rx},${layerTopY} ${cx + rx},${curBottom} ${cx},${curBottom + ry}`;
              const rawFill = (layer.fill || "#a9c5e8").toLowerCase();
              const isDark = rawFill === "#103250";
              const txtCol = isDark ? "#ffffff" : "#103250";
              const subCol = isDark ? "rgba(255,255,255,0.85)" : "rgba(16,50,80,0.82)";
              const showOnTop = layer.topLabel !== false;
              const midFaceY = layerTopY + ry + h * 0.5;
              curBottom = layerTopY;

              return `
                <g class="iso-node" data-info="${(layer.info || layer.title || "").replace(/"/g, "&quot;")}">
                  <polygon points="${lLeft}" fill="${layer.fill}" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" />
                  <polygon points="${lLeft}" fill="rgba(16,50,80,0.12)" pointer-events="none" />
                  <polygon points="${lRight}" fill="${layer.fill}" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" />
                  <polygon points="${lRight}" fill="rgba(16,50,80,0.22)" pointer-events="none" />
                  <polygon points="${lTop}" fill="${layer.fill}" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" />
                  ${
                    layer.sideLabel && h >= 14
                      ? `<text x="${cx - rx * 0.48}" y="${midFaceY - 2}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${txtCol}">${layer.sideLabel}</text>`
                      : ""
                  }
                  ${
                    layer.rightLabel && h >= 14
                      ? `<text x="${cx + rx * 0.48}" y="${midFaceY - 2}" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" fill="${subCol}">${layer.rightLabel}</text>`
                      : ""
                  }
                  ${
                    showOnTop && layer.title
                      ? `<text x="${cx}" y="${layerTopY - 2}" text-anchor="middle" font-size="11" font-weight="800" fill="${txtCol}">${layer.title}</text>`
                      : ""
                  }
                  ${
                    showOnTop && layer.sub
                      ? `<text x="${cx}" y="${layerTopY + 11}" text-anchor="middle" font-size="9.2" font-weight="600" fill="${subCol}">${layer.sub}</text>`
                      : ""
                  }
                </g>
              `;
            })
            .join("");

          // Paredes frontales transparentes del recipiente (borde superior e inferior)
          const frontLeftEdge = `M ${cx - rx} ${topY} L ${cx - rx} ${baseY} L ${cx} ${baseY + ry} L ${cx} ${topY + ry}`;
          const frontRightEdge = `M ${cx} ${topY + ry} L ${cx} ${baseY + ry} L ${cx + rx} ${baseY} L ${cx + rx} ${topY}`;
          const rimPts = `${cx},${topY - ry} ${cx + rx},${topY} ${cx},${topY + ry} ${cx - rx},${topY}`;

          return `
          <g class="iso-node" data-node-id="${id}" data-info="${info.replace(/"/g, "&quot;")}">
            <!-- Sombra proyectada -->
            <polygon points="${shadowPts}" fill="rgba(16,50,80,0.11)" />
            <!-- Caras traseras del recipiente -->
            <polygon points="${backLeftPts}" fill="rgba(16,50,80,0.04)" stroke="${stroke}" stroke-width="1.3" stroke-dasharray="3 3" />
            <polygon points="${backRightPts}" fill="rgba(16,50,80,0.07)" stroke="${stroke}" stroke-width="1.3" stroke-dasharray="3 3" />
            <!-- Fondo interior -->
            <polygon points="${floorPts}" fill="#ffffff" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" />
            <!-- Capas apiladas -->
            ${layersSvg}
            <!-- Borde frontal translúcido del recipiente -->
            <path d="${frontLeftEdge}" fill="rgba(255,255,255,0.14)" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" pointer-events="none" />
            <path d="${frontRightEdge}" fill="rgba(16,50,80,0.05)" stroke="${stroke}" stroke-width="1.6" stroke-linejoin="round" pointer-events="none" />
            <polygon points="${rimPts}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round" pointer-events="none" />
            <!-- Línea horizontal punteada de LÍMITE HUMANO -->
            <line x1="${cx - rx - 24}" y1="${limitY}" x2="${cx + rx + 24}" y2="${limitY}"
                  stroke="${isOverflow ? "#f7a800" : "#103250"}" stroke-width="2.4" stroke-dasharray="6 4" />
            <g transform="translate(${cx - rx - 26}, ${limitY - 11})">
              <rect x="-82" y="0" width="80" height="20" rx="6" fill="${isOverflow ? "#f7a800" : "#103250"}" stroke="${stroke}" stroke-width="1.3" />
              <text x="-42" y="13.5" text-anchor="middle" font-family="monospace" font-size="8.5" font-weight="800" fill="${isOverflow ? "#103250" : "#ffffff"}">LÍMITE HUMANO</text>
            </g>
            ${
              overflowLabel
                ? `
              <g transform="translate(${cx + rx - 10}, ${Math.min(topY - 12, curBottom - ry - 12)})">
                <rect x="-38" y="-11" width="76" height="21" rx="10" fill="#f7a800" stroke="${stroke}" stroke-width="1.5" />
                <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="10" font-weight="800" fill="#103250">${overflowLabel}</text>
              </g>
            `
                : ""
            }
            ${
              caption
                ? `
              <g transform="translate(${cx}, ${baseY + ry + 20})">
                <rect x="-72" y="-11" width="144" height="21" rx="10" fill="var(--pill-bg)" stroke="${stroke}" stroke-width="1.5" />
                <text x="0" y="3" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" fill="var(--ink)">${caption}</text>
              </g>
            `
                : ""
            }
          </g>
        `;
        },
      };
