// Sección 1 de la ponencia
const SECTION_01 = {
          id: "mod-01",
          title: "01. Contexto y Evolución",
          color: "sand",
          open: true,
          lessons: [
            {
  slug: "slide-3b-anatomia-monolito",
  slideNum: "3b",
  title: "Anatomía de un monolito: cómo funciona por dentro",
  subtitle:
    "Una petición real recorre un solo proceso, una sola base de datos y un solo despliegue.",
  duration: "5 min",
  level: "01 · Monolito",
  kpis: [
    [
      { label: "PROCESOS", val: "1", status: "good" },
      { label: "ARTEFACTO", val: "1 app.jar", status: "good" },
      { label: "LATENCIA TOTAL", val: "~45 ms", status: "good" },
      { label: "PUNTO DE ENTRADA", val: "1 puerto", status: "" },
    ],
    [
      { label: "COMUNICACIÓN", val: "Llamada a función", status: "good" },
      { label: "COSTO POR SALTO", val: "~0.01 ms", status: "good" },
      { label: "RED ENTRE MÓDULOS", val: "Ninguna", status: "good" },
      { label: "DEPURACIÓN", val: "1 solo stack", status: "good" },
    ],
    [
      { label: "BASE DE DATOS", val: "1 compartida", status: "" },
      { label: "TRANSACCIÓN", val: "ACID única", status: "good" },
      { label: "SI FALLA EL PAGO", val: "ROLLBACK total", status: "good" },
      { label: "CONSISTENCIA", val: "Inmediata", status: "good" },
    ],
    [
      { label: "CAMBIO", val: "1 línea en Pagos", status: "" },
      { label: "BUILD", val: "12 min (todo)", status: "alert" },
      { label: "DESPLIEGUE", val: "Todo o nada", status: "alert" },
      { label: "RIESGO", val: "Afecta a todos", status: "alert" },
    ],
    [
      { label: "ESCALADO", val: "Clonar todo", status: "alert" },
      { label: "CUELLO REAL", val: "Solo Pagos", status: "" },
      { label: "BD COMPARTIDA", val: "92% CPU", status: "alert" },
      { label: "EQUIPOS", val: "Se pisan", status: "alert" },
    ],
  ],
  checklist: [
    "Seguir una petición de punta a punta dentro de un solo proceso",
    "Entender por qué los módulos se llaman como funciones, sin red",
    "Ver cómo una transacción ACID protege pedido, pago y stock",
    "Explicar por qué un cambio pequeño obliga a desplegar todo",
    "Identificar cuándo el monolito deja de ser la mejor opción",
  ],
  steps: [
    {
      short: "1. Entrada",
      title: "Una petición entra a un solo programa",
      body: `<p>Un usuario hace una compra: <code>POST /pedidos</code>. La petición llega a <strong>una sola aplicación</strong>, un único proceso con todo el código del negocio compilado junto.</p>
             <p>No hay otros servidores que consultar: esa aplicación habla con <strong>una sola base de datos</strong> y responde.</p>`,
      calloutTitle: "Idea clave",
      callout:
        "Monolito = un proceso, un artefacto, una base de datos. Todo el sistema vive en el mismo lugar.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 48, text: "POST /pedidos · 1 solo servidor", width: 240 })}
        ${ISO.peoplePlatform({ cx: 150, cy: 215, count: 4, caption: "Usuarios" })}
        ${ISO.block({ id: "mono-1", cx: 395, cy: 185, rx: 78, ry: 43, h: 28, fill: "#e7c697", title: "Monolito", sub: "1 proceso · 1 artefacto", badge: "app.jar", badgeColor: "#1d1b18", info: "Toda la lógica del negocio empaquetada y ejecutándose en un único proceso." })}
        ${ISO.cylinder({ id: "db-1", cx: 650, cy: 150, rx: 40, ry: 18, h: 44, fill: "#b9a6e3", label: "1 base de datos", info: "Una sola base de datos relacional con todas las tablas." })}
        ${ISO.flow({ id: "f3m-1a", d: "M 225 205 L 322 190", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3m-1b", d: "M 472 175 L 608 158", type: "request", bidirectional: true })}
      `,
    },
    {
      short: "2. Módulos",
      title: "Por dentro: módulos que se llaman como funciones",
      body: `<p>Dentro del proceso hay módulos separados por código: <strong>Usuarios, Catálogo, Pedidos y Pagos</strong>. Cuando Pedidos necesita validar un usuario, simplemente <strong>llama a una función</strong> en la misma memoria.</p>
             <p>No hay red, ni serialización, ni timeouts entre módulos: cada salto cuesta microsegundos.</p>`,
      calloutTitle: "Por qué es rápido y simple",
      callout:
        "Una llamada a función no puede perderse en la red. Si algo falla, el error aparece en un solo stack trace.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 28, text: "llamadas a función en memoria · ~0.01 ms", width: 290, accent: true })}
        ${ISO.block({ id: "mono-body", cx: 395, cy: 185, rx: 250, ry: 120, h: 14, fill: "#efe5d8", info: "El proceso del monolito: todos los módulos comparten memoria y ciclo de vida." })}
        ${ISO.block({ id: "m-usr", cx: 395, cy: 125, rx: 44, ry: 24, h: 16, fill: "#a9c5e8", title: "Usuarios", sub: "auth", info: "Módulo de usuarios y autenticación." })}
        ${ISO.block({ id: "m-cat", cx: 305, cy: 185, rx: 44, ry: 24, h: 16, fill: "#8fc4a8", title: "Catálogo", sub: "productos", info: "Módulo de catálogo y stock." })}
        ${ISO.block({ id: "m-ped", cx: 485, cy: 185, rx: 44, ry: 24, h: 16, fill: "#e7c697", title: "Pedidos", sub: "carrito", info: "Módulo que orquesta la compra llamando a los demás." })}
        ${ISO.block({ id: "m-pag", cx: 395, cy: 245, rx: 44, ry: 24, h: 16, fill: "#b9a6e3", title: "Pagos", sub: "cobro", info: "Módulo de cobro." })}
        ${ISO.flow({ id: "f3m-2a", d: "M 465 160 L 430 140", type: "request" })}
        ${ISO.flow({ id: "f3m-2b", d: "M 441 185 L 349 185", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3m-2c", d: "M 462 210 L 428 232", type: "response" })}
      `,
    },
    {
      short: "3. Transacción",
      title: "Una base de datos, una transacción",
      body: `<p>Como todos los módulos comparten la misma base de datos, crear un pedido, cobrar y descontar stock puede ocurrir en <strong>una sola transacción ACID</strong>.</p>
             <p>Si el pago falla, la base de datos hace <code>ROLLBACK</code> de todo: no queda ningún pedido a medias.</p>`,
      calloutTitle: "La gran ventaja",
      callout:
        "La consistencia es inmediata y gratuita: no hace falta coordinar servicios ni compensar errores a mano.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 62, text: "BEGIN → pedido + pago + stock → COMMIT", width: 300 })}
        ${ISO.block({ id: "mono-3", cx: 215, cy: 190, rx: 70, ry: 39, h: 24, fill: "#e7c697", title: "Monolito", sub: "Pedidos + Pagos + Stock", info: "Un único proceso ejecuta toda la operación." })}
        ${ISO.cylinder({ id: "db-3", cx: 600, cy: 150, rx: 42, ry: 19, h: 46, fill: "#b9a6e3", label: "BD única · ACID", badge: "ACID", badgeColor: "#1f6f4a", info: "Una base de datos con transacciones atómicas sobre todas las tablas." })}
        ${ISO.flow({ id: "f3m-3a", d: "M 288 178 L 555 160", type: "request", bidirectional: true })}
        ${ISO.pill({ x: 395, y: 300, text: "si el pago falla → ROLLBACK de todo", width: 270, accent: true })}
      `,
    },
    {
      short: "4. Despliegue",
      title: "Se construye y se despliega como una sola pieza",
      body: `<p>Todo el código se compila en <strong>un único artefacto</strong>. Si cambias una línea en Pagos, hay que volver a construir y desplegar <strong>todo el sistema</strong>.</p>
             <p>Es simple con un equipo pequeño, pero cada despliegue arriesga a los demás módulos.</p>`,
      calloutTitle: "El costo del acoplamiento",
      callout:
        "Un error en un módulo menor puede tumbar todo el proceso, porque comparten memoria y ciclo de vida.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 48, text: "1 línea cambiada en Pagos", width: 230, accent: true })}
        ${ISO.peoplePlatform({ cx: 150, cy: 215, count: 3, caption: "Equipo único" })}
        ${ISO.block({ id: "build-4", cx: 390, cy: 185, rx: 64, ry: 35, h: 24, fill: "#a9c5e8", title: "Build único", sub: "compila TODO", badge: "12 min", badgeColor: "#b84a27", info: "Se recompila y prueba el sistema completo, aunque cambió una sola línea." })}
        ${ISO.block({ id: "deploy-4", cx: 640, cy: 185, rx: 66, ry: 36, h: 24, fill: "#e8a47c", title: "Redeploy total", sub: "todo el sistema", badge: "TODO", badgeColor: "#c8332b", info: "Se reemplaza el artefacto entero: o funciona todo, o falla todo." })}
        ${ISO.flow({ id: "f3m-4a", d: "M 225 205 L 330 192", type: "request" })}
        ${ISO.flow({ id: "f3m-4b", d: "M 454 185 L 574 185", type: "error" })}
      `,
    },
    {
      short: "5. Escalado",
      title: "Cómo escala y dónde empieza a doler",
      body: `<p>Para soportar más tráfico se <strong>clona el monolito completo</strong> detrás de un balanceador. Funciona, pero si solo Pagos está saturado, igual duplicas todo lo demás.</p>
             <p>Además, todas las copias siguen usando <strong>la misma base de datos</strong>, que se vuelve el cuello de botella. Y muchos equipos tocando el mismo código empiezan a pisarse.</p>`,
      calloutTitle: "¿Cuándo conviene?",
      callout:
        "Para un producto nuevo y un equipo pequeño, el monolito suele ser la opción más simple. Los problemas aparecen con la escala y el tamaño del equipo.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 38, text: "escalar = clonar todo", width: 200, accent: true })}
        ${ISO.block({ id: "lb-5", cx: 140, cy: 190, rx: 54, ry: 30, h: 20, fill: "#e7c697", title: "Balanceador", sub: "reparte tráfico", info: "Distribuye las peticiones entre las copias del monolito." })}
        ${ISO.block({ id: "c-1", cx: 390, cy: 100, rx: 56, ry: 30, h: 18, fill: "#e7c697", title: "Monolito", sub: "copia completa", info: "Copia 1 del sistema entero." })}
        ${ISO.block({ id: "c-2", cx: 390, cy: 190, rx: 56, ry: 30, h: 18, fill: "#e7c697", title: "Monolito", sub: "copia completa", info: "Copia 2 del sistema entero." })}
        ${ISO.block({ id: "c-3", cx: 390, cy: 280, rx: 56, ry: 30, h: 18, fill: "#e7c697", title: "Monolito", sub: "copia completa", info: "Copia 3 del sistema entero." })}
        ${ISO.cylinder({ id: "db-5", cx: 655, cy: 170, rx: 38, ry: 17, h: 42, fill: "#b9a6e3", label: "1 sola BD", badge: "92%", badgeColor: "#c8332b", info: "Todas las copias comparten la misma base de datos: es el cuello de botella." })}
        ${ISO.flow({ id: "f3m-5a", d: "M 192 175 L 338 108", type: "request" })}
        ${ISO.flow({ id: "f3m-5b", d: "M 195 190 L 336 190", type: "request" })}
        ${ISO.flow({ id: "f3m-5c", d: "M 192 205 L 338 272", type: "request" })}
        ${ISO.flow({ id: "f3m-5d", d: "M 446 108 L 615 160", type: "error" })}
        ${ISO.flow({ id: "f3m-5e", d: "M 446 190 L 615 175", type: "error" })}
        ${ISO.flow({ id: "f3m-5f", d: "M 446 272 L 615 195", type: "error" })}
      `,
    },
  ],
},
{
  slug: "slide-3c-anatomia-microservicios",
  slideNum: "3c",
  title: "Anatomía de microservicios: cómo funciona paso a paso",
  subtitle:
    "Los shoppers entran por un API Gateway que enruta las peticiones hacia Users, Catalog, Orders y Payments.",
  duration: "5 min",
  level: "01 · Microservicios",
  kpis: [
    [
      { label: "CLIENTES", val: "shoppers", status: "" },
      { label: "ENTRADA ÚNICA", val: "API Gateway", status: "good" },
      { label: "SERVICIOS", val: "4 nodos", status: "good" },
      { label: "SALTO INICIAL", val: "~15 ms", status: "good" },
    ],
    [
      { label: "RUTA 1", val: "Gateway → Users", status: "good" },
      { label: "RUTA 2", val: "Gateway → Catalog", status: "good" },
      { label: "PROTOCOLO", val: "HTTP / gRPC", status: "" },
      { label: "LATENCIA RED", val: "~20 ms/salto", status: "good" },
    ],
    [
      { label: "RUTA 3", val: "Gateway → Orders", status: "good" },
      { label: "RUTA 4", val: "Gateway → Payments", status: "good" },
      { label: "DESPLIEGUE", val: "Independiente", status: "good" },
      { label: "ESCALADO", val: "Por servicio", status: "good" },
    ],
    [
      { label: "PERSISTENCIA", val: "one database", status: "alert" },
      { label: "CONEXIONES BD", val: "4 servicios → 1 BD", status: "alert" },
      { label: "ACOPLAMIENTO", val: "En datos", status: "alert" },
      { label: "SALTOS TOTALES", val: "~95 ms", status: "" },
    ],
    [
      { label: "FALLO EN", val: "Payments (503)", status: "alert" },
      { label: "TIMEOUT", val: "3.0 s en cascada", status: "alert" },
      { label: "REINTENTOS", val: "×3 tráfico", status: "alert" },
      { label: "ESTADO", val: "failed request", status: "alert" },
    ],
  ],
  checklist: [
    "Recibir el tráfico de shoppers en un único API Gateway",
    "Enrutar peticiones por red hacia Users y Catalog",
    "Procesar la compra en servicios separados de Orders y Payments",
    "Observar cómo los 4 servicios consultan la base de datos (one database)",
    "Identificar qué ocurre cuando falla una petición en la red (failed request)",
  ],
  steps: [
    {
      short: "1. API Gateway",
      title: "Los shoppers entran por un único API Gateway",
      body: `<p>En lugar de hablar con un solo bloque monolítico, los <strong>shoppers</strong> envían su petición al <strong>API Gateway</strong>, que actúa como la puerta de entrada del ecosistema.</p>
             <p>Detrás del Gateway viven cuatro microservicios independientes en procesos separados: <strong>Users, Catalog, Orders y Payments</strong>, junto a la capa de datos (<strong>one database</strong>).</p>`,
      calloutTitle: "Puerta de entrada única",
      callout:
        "El cliente externo (shoppers) no conoce la topología interna: solo conversa con el API Gateway.",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 190, cy: 235, count: 12, caption: "shoppers" })}
        ${ISO.block({
          id: "ms-gw",
          cx: 310,
          cy: 185,
          rx: 52,
          ry: 29,
          h: 22,
          fill: "#f7a800",
          title: "API Gateway",
          sub: "router",
          icon: '<path d="M2 4h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" fill="none" stroke="#103250" stroke-width="1.8" stroke-linecap="round"/><circle cx="2" cy="4" r="2" fill="#103250"/><circle cx="18" cy="16" r="2" fill="#103250"/>',
          info: "Punto único de entrada que autentica, filtra y enruta las peticiones de los shoppers.",
        })}
        ${ISO.block({
          id: "ms-users",
          cx: 295,
          cy: 72,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Users",
          opacity: 0.55,
          icon: '<circle cx="10" cy="5" r="3.2" fill="none" stroke="#103250" stroke-width="1.6"/><path d="M4 15c1.5-3 10.5-3 12 0" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round"/>',
          info: "Microservicio de perfiles, sesiones y cuentas de usuario.",
        })}
        ${ISO.block({
          id: "ms-catalog",
          cx: 395,
          cy: 118,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#f7a800",
          title: "Catalog",
          opacity: 0.55,
          icon: '<polygon points="10,2 18,6 10,10 2,6" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,10 10,14 18,10" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,14 10,18 18,14" fill="none" stroke="#103250" stroke-width="1.5"/>',
          info: "Microservicio de catálogo de productos, precios y disponibilidad.",
        })}
        ${ISO.block({
          id: "ms-orders",
          cx: 495,
          cy: 164,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Orders",
          opacity: 0.55,
          icon: '<circle cx="7" cy="16" r="1.5" fill="#103250"/><circle cx="15" cy="16" r="1.5" fill="#103250"/><path d="M2 3h3l2.2 9h8.8l2-6H6" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
          info: "Microservicio de creación y seguimiento de órdenes de compra.",
        })}
        ${ISO.block({
          id: "ms-payments",
          cx: 595,
          cy: 210,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#103250",
          title: "Payments",
          opacity: 0.55,
          icon: '<rect x="2" y="4" width="16" height="11" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/><line x1="2" y1="8" x2="18" y2="8" stroke="#ffffff" stroke-width="1.6"/>',
          info: "Microservicio de procesamiento de cobros y tarjetas.",
        })}
        ${ISO.cylinder({
          id: "ms-db",
          cx: 575,
          cy: 68,
          rx: 38,
          ry: 17,
          h: 40,
          fill: "#103250",
          label: "one database",
          opacity: 0.55,
          info: "Base de datos a la que se conectan los servicios mediante llamadas de red.",
        })}
        ${ISO.flow({ id: "f3c-1", d: "M 248 214 L 278 198", type: "request", bidirectional: true })}
      `,
    },
    {
      short: "2. Users y Catalog",
      title: "El API Gateway consulta Users y Catalog por red",
      body: `<p>Para mostrar la tienda y validar la sesión del comprador, el <strong>API Gateway</strong> dispara peticiones de red independientes hacia <strong>Users</strong> (por el canal izquierdo) y hacia <strong>Catalog</strong> (en diagonal central).</p>
             <p>A diferencia del monolito, cada línea negra del diagrama es un <strong>salto de red real</strong> con serialización JSON/gRPC de ida (<em>request</em>) y vuelta (<em>response</em>).</p>`,
      calloutTitle: "Desacoplamiento de consulta",
      callout:
        "Users y Catalog son procesos separados: puedes actualizar el catálogo sin reiniciar ni tocar el servicio de usuarios.",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 190, cy: 235, count: 12, caption: "shoppers" })}
        ${ISO.block({
          id: "ms-gw",
          cx: 310,
          cy: 185,
          rx: 52,
          ry: 29,
          h: 22,
          fill: "#f7a800",
          title: "API Gateway",
          icon: '<path d="M2 4h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" fill="none" stroke="#103250" stroke-width="1.8" stroke-linecap="round"/><circle cx="2" cy="4" r="2" fill="#103250"/><circle cx="18" cy="16" r="2" fill="#103250"/>',
          info: "Enruta en paralelo las consultas hacia Users y Catalog.",
        })}
        ${ISO.block({
          id: "ms-users",
          cx: 295,
          cy: 72,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Users",
          badge: "20 ms",
          badgeColor: "#103250",
          icon: '<circle cx="10" cy="5" r="3.2" fill="none" stroke="#103250" stroke-width="1.6"/><path d="M4 15c1.5-3 10.5-3 12 0" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round"/>',
          info: "Valida identidad y permisos del shopper.",
        })}
        ${ISO.block({
          id: "ms-catalog",
          cx: 395,
          cy: 118,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#f7a800",
          title: "Catalog",
          badge: "18 ms",
          badgeColor: "#103250",
          icon: '<polygon points="10,2 18,6 10,10 2,6" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,10 10,14 18,10" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,14 10,18 18,14" fill="none" stroke="#103250" stroke-width="1.5"/>',
          info: "Devuelve precios y stock de los artículos.",
        })}
        ${ISO.block({
          id: "ms-orders",
          cx: 495,
          cy: 164,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Orders",
          opacity: 0.4,
          icon: '<circle cx="7" cy="16" r="1.5" fill="#103250"/><circle cx="15" cy="16" r="1.5" fill="#103250"/><path d="M2 3h3l2.2 9h8.8l2-6H6" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
          info: "Microservicio de órdenes.",
        })}
        ${ISO.block({
          id: "ms-payments",
          cx: 595,
          cy: 210,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#103250",
          title: "Payments",
          opacity: 0.4,
          icon: '<rect x="2" y="4" width="16" height="11" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/><line x1="2" y1="8" x2="18" y2="8" stroke="#ffffff" stroke-width="1.6"/>',
          info: "Microservicio de pagos.",
        })}
        ${ISO.cylinder({
          id: "ms-db",
          cx: 575,
          cy: 68,
          rx: 38,
          ry: 17,
          h: 40,
          fill: "#103250",
          label: "one database",
          opacity: 0.45,
          info: "Base de datos.",
        })}
        ${ISO.flow({ id: "f3c-2a", d: "M 248 214 L 278 198", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-2b", d: "M 266 172 L 185 132 L 262 94", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-2c", d: "M 336 164 L 368 142", type: "request", bidirectional: true })}
      `,
    },
    {
      short: "3. Orders y Payments",
      title: "Checkout distribuido: Orders y Payments en servicios propios",
      body: `<p>Cuando el shopper confirma su pedido, el <strong>API Gateway</strong> coordina las llamadas por el ramal inferior hacia <strong>Orders</strong> (para registrar el carrito) y hacia <strong>Payments</strong> (para ejecutar el cobro con tarjeta).</p>
             <p>Cada servicio vive en su propio contenedor y puede <strong>escalar por separado</strong> si el tráfico de pedidos o pagos sube en horas pico.</p>`,
      calloutTitle: "Autonomía por dominio",
      callout:
        "Un equipo es dueño de Orders y otro de Payments: cada uno compila, prueba y despliega su servicio a su propio ritmo.",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 190, cy: 235, count: 12, caption: "shoppers" })}
        ${ISO.block({
          id: "ms-gw",
          cx: 310,
          cy: 185,
          rx: 52,
          ry: 29,
          h: 22,
          fill: "#f7a800",
          title: "API Gateway",
          icon: '<path d="M2 4h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" fill="none" stroke="#103250" stroke-width="1.8" stroke-linecap="round"/><circle cx="2" cy="4" r="2" fill="#103250"/><circle cx="18" cy="16" r="2" fill="#103250"/>',
          info: "Distribuye las peticiones hacia Orders y Payments.",
        })}
        ${ISO.block({
          id: "ms-users",
          cx: 295,
          cy: 72,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Users",
          opacity: 0.45,
          icon: '<circle cx="10" cy="5" r="3.2" fill="none" stroke="#103250" stroke-width="1.6"/><path d="M4 15c1.5-3 10.5-3 12 0" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round"/>',
          info: "Microservicio de usuarios.",
        })}
        ${ISO.block({
          id: "ms-catalog",
          cx: 395,
          cy: 118,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#f7a800",
          title: "Catalog",
          opacity: 0.45,
          icon: '<polygon points="10,2 18,6 10,10 2,6" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,10 10,14 18,10" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,14 10,18 18,14" fill="none" stroke="#103250" stroke-width="1.5"/>',
          info: "Microservicio de catálogo.",
        })}
        ${ISO.block({
          id: "ms-orders",
          cx: 495,
          cy: 164,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Orders",
          badge: "2→4 inst",
          badgeColor: "#103250",
          icon: '<circle cx="7" cy="16" r="1.5" fill="#103250"/><circle cx="15" cy="16" r="1.5" fill="#103250"/><path d="M2 3h3l2.2 9h8.8l2-6H6" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
          info: "Crea la orden de compra y escala horizontalmente según la demanda.",
        })}
        ${ISO.block({
          id: "ms-payments",
          cx: 595,
          cy: 210,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#103250",
          title: "Payments",
          badge: "22 ms",
          badgeColor: "#f7a800",
          icon: '<rect x="2" y="4" width="16" height="11" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/><line x1="2" y1="8" x2="18" y2="8" stroke="#ffffff" stroke-width="1.6"/>',
          info: "Autoriza y liquida el pago de la orden.",
        })}
        ${ISO.cylinder({
          id: "ms-db",
          cx: 575,
          cy: 68,
          rx: 38,
          ry: 17,
          h: 40,
          fill: "#103250",
          label: "one database",
          opacity: 0.45,
          info: "Base de datos.",
        })}
        ${ISO.flow({ id: "f3c-3a", d: "M 248 214 L 278 198", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-3b", d: "M 342 204 L 372 222 L 458 184", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-3c", d: "M 342 204 L 465 278 L 558 232", type: "request", bidirectional: true })}
      `,
    },
    {
      short: "4. Flujo Completo + BD",
      title: "El circuito completo: los 4 microservicios y la base de datos",
      body: `<p>Tal como muestra la arquitectura de referencia, las peticiones de los <strong>shoppers</strong> atraviesan el <strong>API Gateway</strong> hacia <strong>Users, Catalog, Orders y Payments</strong>, y cada uno abre conexiones por red hacia la base de datos (<strong>one database</strong>).</p>
             <p>Observa cómo los paquetes de ida (<em>request</em>) y vuelta (<em>response</em>) viajan simultáneamente por todas las rutas del sistema.</p>`,
      calloutTitle: "De llamadas en memoria a llamadas en red",
      callout:
        "Lo que antes era una llamada a función de 0.01 ms dentro del monolito ahora son múltiples saltos de red entre el Gateway, los 4 servicios y la base de datos.",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 190, cy: 235, count: 12, caption: "shoppers" })}
        ${ISO.block({
          id: "ms-gw",
          cx: 310,
          cy: 185,
          rx: 52,
          ry: 29,
          h: 22,
          fill: "#f7a800",
          title: "API Gateway",
          icon: '<path d="M2 4h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" fill="none" stroke="#103250" stroke-width="1.8" stroke-linecap="round"/><circle cx="2" cy="4" r="2" fill="#103250"/><circle cx="18" cy="16" r="2" fill="#103250"/>',
          info: "API Gateway enrutando tráfico hacia los 4 microservicios.",
        })}
        ${ISO.block({
          id: "ms-users",
          cx: 295,
          cy: 72,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Users",
          icon: '<circle cx="10" cy="5" r="3.2" fill="none" stroke="#103250" stroke-width="1.6"/><path d="M4 15c1.5-3 10.5-3 12 0" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round"/>',
          info: "Users consultando y actualizando datos de usuario.",
        })}
        ${ISO.block({
          id: "ms-catalog",
          cx: 395,
          cy: 118,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#f7a800",
          title: "Catalog",
          icon: '<polygon points="10,2 18,6 10,10 2,6" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,10 10,14 18,10" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,14 10,18 18,14" fill="none" stroke="#103250" stroke-width="1.5"/>',
          info: "Catalog leyendo productos desde la base de datos.",
        })}
        ${ISO.block({
          id: "ms-orders",
          cx: 495,
          cy: 164,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Orders",
          icon: '<circle cx="7" cy="16" r="1.5" fill="#103250"/><circle cx="15" cy="16" r="1.5" fill="#103250"/><path d="M2 3h3l2.2 9h8.8l2-6H6" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
          info: "Orders guardando el pedido en la base de datos.",
        })}
        ${ISO.block({
          id: "ms-payments",
          cx: 595,
          cy: 210,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#103250",
          title: "Payments",
          icon: '<rect x="2" y="4" width="16" height="11" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/><line x1="2" y1="8" x2="18" y2="8" stroke="#ffffff" stroke-width="1.6"/>',
          info: "Payments registrando la transacción de pago.",
        })}
        ${ISO.cylinder({
          id: "ms-db",
          cx: 575,
          cy: 68,
          rx: 38,
          ry: 17,
          h: 40,
          fill: "#103250",
          label: "one database",
          info: "Base de datos compartida por las rutas de Users, Catalog, Orders y Payments.",
        })}
        ${ISO.flow({ id: "f3c-4a", d: "M 248 214 L 278 198", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4b", d: "M 266 172 L 185 132 L 262 94", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4c", d: "M 336 164 L 368 142", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4d", d: "M 342 204 L 372 222 L 458 184", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4e", d: "M 342 204 L 465 278 L 558 232", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4f", d: "M 338 56 L 420 18 L 535 66", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4g", d: "M 518 60 L 436 102", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4h", d: "M 595 112 L 620 124 L 538 152", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3c-4i", d: "M 595 112 L 710 165 L 638 198", type: "response", bidirectional: true })}
      `,
    },
    {
      short: "5. Fallos (Romper)",
      title: "Los problemas: caída de Payments, timeouts y acoplamiento en BD",
      body: `<p>Al distribuir el sistema aparecen los fallos reales de red (<em>failed request</em>): si <strong>Payments</strong> se cae o la base de datos se satura, el <strong>API Gateway</strong> y <strong>Orders</strong> se quedan esperando hasta agotar el <strong>timeout de 3 s</strong>.</p>
             <p>Los reintentos automáticos multiplican el tráfico <strong>×3</strong> sobre el servicio caído, la latencia sube de <strong>100 ms a 600 ms</strong> con cada salto extra y los datos entre <strong>Orders</strong> y el stock pueden quedar inconsistentes.</p>`,
      calloutTitle: "El costo de distribuir",
      callout:
        "En microservicios, la red es falible: necesitas Circuit Breakers, bases de datos desacopladas por servicio y compensación de transacciones (Sagas).",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 190, cy: 235, count: 12, caption: "shoppers" })}
        ${ISO.block({
          id: "ms-gw",
          cx: 310,
          cy: 185,
          rx: 52,
          ry: 29,
          h: 22,
          fill: "#f7a800",
          title: "API Gateway",
          badge: "TIMEOUT 3s",
          badgeColor: "#103250",
          icon: '<path d="M2 4h10a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h10" fill="none" stroke="#103250" stroke-width="1.8" stroke-linecap="round"/><circle cx="2" cy="4" r="2" fill="#103250"/><circle cx="18" cy="16" r="2" fill="#103250"/>',
          info: "El API Gateway acumula peticiones retenidas esperando a Payments.",
        })}
        ${ISO.block({
          id: "ms-users",
          cx: 295,
          cy: 72,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Users",
          icon: '<circle cx="10" cy="5" r="3.2" fill="none" stroke="#103250" stroke-width="1.6"/><path d="M4 15c1.5-3 10.5-3 12 0" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round"/>',
          info: "Users operativo.",
        })}
        ${ISO.block({
          id: "ms-catalog",
          cx: 395,
          cy: 118,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#f7a800",
          title: "Catalog",
          icon: '<polygon points="10,2 18,6 10,10 2,6" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,10 10,14 18,10" fill="none" stroke="#103250" stroke-width="1.5"/><polyline points="2,14 10,18 18,14" fill="none" stroke="#103250" stroke-width="1.5"/>',
          info: "Catalog con stock desincronizado respecto a Orders.",
        })}
        ${ISO.block({
          id: "ms-orders",
          cx: 495,
          cy: 164,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#ffffff",
          title: "Orders",
          badge: "RETRY ×3",
          badgeColor: "#f7a800",
          icon: '<circle cx="7" cy="16" r="1.5" fill="#103250"/><circle cx="15" cy="16" r="1.5" fill="#103250"/><path d="M2 3h3l2.2 9h8.8l2-6H6" fill="none" stroke="#103250" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
          info: "Orders reintenta×3 y queda en estado inconsistente frente al inventario.",
        })}
        ${ISO.block({
          id: "ms-payments",
          cx: 595,
          cy: 210,
          rx: 50,
          ry: 27,
          h: 20,
          fill: "#103250",
          title: "Payments",
          badge: "503 CAÍDO",
          badgeColor: "#f7a800",
          icon: '<rect x="2" y="4" width="16" height="11" rx="2" fill="none" stroke="#ffffff" stroke-width="1.6"/><line x1="2" y1="8" x2="18" y2="8" stroke="#ffffff" stroke-width="1.6"/>',
          info: "Payments caído: provoca fallo en cascada y tormenta de reintentos.",
        })}
        ${ISO.cylinder({
          id: "ms-db",
          cx: 575,
          cy: 68,
          rx: 38,
          ry: 17,
          h: 40,
          fill: "#103250",
          label: "one database",
          badge: "600 ms",
          badgeColor: "#f7a800",
          info: "Cuello de botella e inconsistencia de datos al fallar la operación a mitad de camino.",
        })}
        ${ISO.flow({ id: "f3c-5a", d: "M 248 214 L 278 198", type: "error", dur: "1.1s" })}
        ${ISO.flow({ id: "f3c-5b", d: "M 342 204 L 372 222 L 458 184", type: "error", dur: "0.9s" })}
        ${ISO.flow({ id: "f3c-5c", d: "M 342 204 L 465 278 L 558 232", type: "error", dur: "0.8s" })}
        ${ISO.flow({ id: "f3c-5d", d: "M 595 112 L 710 165 L 638 198", type: "error", dur: "1.0s" })}
        ${ISO.flow({ id: "f3c-5e", d: "M 595 112 L 620 124 L 538 152", type: "error", dur: "1.2s" })}
      `,
    },
  ],
},
{
  slug: "slide-3d-microservicios-hoy-agentes",
  slideNum: "3d",
  title: "Microservicios hoy: agentes de IA que razonan y ejecutan en contenedores",
  subtitle:
    "De la intención en lenguaje natural al despliegue y operación continua mediante agentes autónomos y sandboxes.",
  duration: "6 min",
  level: "01 · Agentes + Contenedores",
  kpis: [
    [
      { label: "ENTRADA", val: "Prompt + Specs", status: "good" },
      { label: "CONTRATO", val: "OpenAPI / JSON", status: "good" },
      { label: "TIEMPO SPEC", val: "ej. 5 min", status: "" },
      { label: "ROL HUMANO", val: "Define reglas", status: "good" },
    ],
    [
      { label: "CICLO AGENTE", val: "Obs → Plan → Act", status: "good" },
      { label: "HERRAMIENTAS", val: "bash · git · APIs", status: "" },
      { label: "GENERACIÓN", val: "ej. 35 seg", status: "good" },
      { label: "REPOSITORIO", val: "Contexto vivo", status: "good" },
    ],
    [
      { label: "ARTEFACTO", val: "Dockerfile + K8s", status: "good" },
      { label: "EJECUCIÓN", val: "Sandbox micro-VM", status: "good" },
      { label: "PRUEBAS", val: "ej. 42/42 OK", status: "good" },
      { label: "AISLAMIENTO", val: "Hardware", status: "good" },
    ],
    [
      { label: "ENTREGA", val: "PR automático", status: "good" },
      { label: "PIPELINE", val: "CI + Golden Path", status: "good" },
      { label: "DESPLIEGUE", val: "ej. 4 min", status: "good" },
      { label: "DESTINO", val: "Clúster Prod", status: "" },
    ],
    [
      { label: "OPERACIÓN", val: "Agente SRE 24/7", status: "good" },
      { label: "ESCALADO", val: "Auto + Parches", status: "good" },
      { label: "DIAGNÓSTICO", val: "ej. < 1 min", status: "good" },
      { label: "DECISIÓN", val: "Human-in-the-loop", status: "good" },
    ],
    [
      { label: "TOPOLOGÍA", val: "1 Agente / Servicio", status: "good" },
      { label: "COORDINACIÓN", val: "Por contratos", status: "good" },
      { label: "MODELO", val: "Swarm modular", status: "" },
      { label: "PROPIEDAD", val: "Servicio + Cont.", status: "good" },
    ],
  ],
  checklist: [
    "Traducir una intención en lenguaje natural a specs y contratos de API",
    "Seguir el bucle observar → planificar → actuar con herramientas reales",
    "Construir y probar el contenedor generado dentro de una micro-VM aislada",
    "Promover el código del sandbox a producción por un Golden Path con CI",
    "Operar continuamente con agentes SRE manteniendo aprobación humana",
    "Coordinar múltiples agentes por contrato (un agente por microservicio)",
  ],
  steps: [
    {
      short: "1. Intención",
      title: "Intención: lenguaje natural, specs y contratos de API",
      body: `<p>Hoy la creación de un microservicio no arranca escribiendo boilerplate a mano: el desarrollador expresa la intención en lenguaje natural —por ejemplo, <code>"crea el servicio de Pagos con estas reglas"</code>—.</p>
             <p>Junto a la intención entrega las <strong>especificaciones de negocio</strong> y el <strong>contrato de API</strong> (OpenAPI/JSON Schema) que fija las fronteras con el resto del sistema.</p>`,
      calloutTitle: "Especificación como fuente de verdad",
      callout:
        "Cuanto más preciso es el contrato inicial (ej. endpoints, códigos de error y límites de timeout), menos margen de ambigüedad tiene el agente.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 34, text: '"Crea el servicio de Pagos con estas reglas"', width: 310, accent: true })}
        ${ISO.peoplePlatform({ cx: 155, cy: 215, count: 4, caption: "Desarrollador" })}
        ${ISO.block({
          id: "m3d-specs",
          cx: 410,
          cy: 135,
          rx: 68,
          ry: 35,
          h: 22,
          fill: "#ffffff",
          title: "Specs de Negocio",
          sub: "reglas + casos borde",
          badge: "SPEC",
          badgeColor: "#103250",
          info: "Documento de requisitos funcionales, invariantes y criterios de aceptación.",
        })}
        ${ISO.block({
          id: "m3d-contract",
          cx: 410,
          cy: 240,
          rx: 68,
          ry: 35,
          h: 22,
          fill: "#f7a800",
          title: "Contrato API",
          sub: "OpenAPI / JSON Schema",
          badge: "v1.0",
          badgeColor: "#103250",
          info: "Contrato formal que define entradas, salidas y eventos esperados del servicio de Pagos.",
        })}
        ${ISO.agent({
          id: "m3d-agent1",
          cx: 645,
          cy: 188,
          rx: 56,
          ry: 31,
          h: 24,
          fill: "#103250",
          title: "Agente IA",
          sub: "en espera de specs",
          badge: "LISTO",
          badgeColor: "#f7a800",
          info: "Agente de ingeniería listo para consumir las especificaciones y planificar el servicio.",
        })}
        ${ISO.flow({ id: "f3d-1a", d: "M 225 198 L 342 146", type: "request" })}
        ${ISO.flow({ id: "f3d-1b", d: "M 225 225 L 342 242", type: "request" })}
        ${ISO.flow({ id: "f3d-1c", d: "M 478 148 L 590 176", type: "response" })}
        ${ISO.flow({ id: "f3d-1d", d: "M 478 232 L 590 202", type: "response" })}
      `,
    },
    {
      short: "2. El agente razona",
      title: "Bucle observar → planificar → actuar con herramientas",
      body: `<p>El agente entra en su bucle de razonamiento: <strong>observa</strong> el repositorio existente, <strong>planifica</strong> la arquitectura del servicio de Pagos y <strong>actúa</strong> generando código y pruebas.</p>
             <p>Para lograrlo invoca herramientas reales como <code>bash</code>, <code>git</code> y <code>APIs</code> internas, iterando sobre los errores de compilación hasta cumplir el contrato.</p>`,
      calloutTitle: "Razonamiento con ejecución real",
      callout:
        "A diferencia de un autocompletado simple, el agente ejecuta comandos (ej. 6–10 iteraciones en ~35 seg) y corrige su propio código con el feedback de la terminal.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 30, text: "Bucle: Observar → Planificar → Actuar", width: 280, accent: true })}
        ${ISO.cylinder({
          id: "m3d-repo",
          cx: 155,
          cy: 155,
          rx: 42,
          ry: 18,
          h: 44,
          fill: "#103250",
          label: "Repositorio Git",
          info: "Código base, librerías compartidas y contratos de los demás microservicios.",
        })}
        ${ISO.agent({
          id: "m3d-agent2",
          cx: 395,
          cy: 185,
          rx: 66,
          ry: 36,
          h: 26,
          fill: "#f7a800",
          title: "Agente Razona",
          sub: "Obs · Plan · Act",
          badge: "LOOP",
          badgeColor: "#103250",
          info: "Motor agéntico que lee el contexto, diseña módulos y escribe código de Pagos.",
        })}
        ${ISO.block({
          id: "m3d-tool-bash",
          cx: 645,
          cy: 95,
          rx: 56,
          ry: 28,
          h: 18,
          fill: "#ffffff",
          title: "bash / CLI",
          sub: "compila y ejecuta",
          info: "Herramienta de terminal para correr linters, builds y pruebas unitarias.",
        })}
        ${ISO.block({
          id: "m3d-tool-git",
          cx: 645,
          cy: 185,
          rx: 56,
          ry: 28,
          h: 18,
          fill: "#ffffff",
          title: "git",
          sub: "ramas y commits",
          info: "Control de versiones para crear ramas aisladas y consultar historial.",
        })}
        ${ISO.block({
          id: "m3d-tool-apis",
          cx: 645,
          cy: 275,
          rx: 56,
          ry: 28,
          h: 18,
          fill: "#103250",
          title: "APIs / Schemas",
          sub: "valida contratos",
          info: "Consulta esquemas de servicios vecinos (Orders, Users) para respetar interfaces.",
        })}
        ${ISO.flow({ id: "f3d-2a", d: "M 198 175 L 328 185", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-2b", d: "M 462 168 L 588 106", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-2c", d: "M 462 185 L 588 185", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-2d", d: "M 462 204 L 588 264", type: "response", bidirectional: true })}
      `,
    },
    {
      short: "3. Contenedor IA",
      title: "Contenedor creado por la IA y validado en sandbox",
      body: `<p>El agente no solo escribe el código de negocio: genera el <code>Dockerfile</code>, los manifiestos de despliegue y construye la <strong>imagen del contenedor</strong>.</p>
             <p>Antes de tocar ningún entorno compartido, levanta el contenedor dentro de un <strong>sandbox aislado (micro-VM)</strong> donde ejecuta la suite completa de pruebas sin riesgo para el host.</p>`,
      calloutTitle: "Aislamiento antes de confiar",
      callout:
        "Ejecutar código recién generado en una micro-VM desechable permite probar migraciones, puertos y dependencias (ej. 42 pruebas) de forma segura.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 30, text: "Dockerfile + Manifiestos → Imagen → Micro-VM Sandbox", width: 350 })}
        ${ISO.agent({
          id: "m3d-agent3",
          cx: 155,
          cy: 185,
          rx: 56,
          ry: 31,
          h: 24,
          fill: "#f7a800",
          title: "Agente IA",
          sub: "genera infra",
          info: "Genera Dockerfile, manifiestos YAML y scripts de prueba.",
        })}
        ${ISO.block({
          id: "m3d-docker",
          cx: 375,
          cy: 185,
          rx: 60,
          ry: 33,
          h: 22,
          fill: "#ffffff",
          title: "Dockerfile + K8s",
          sub: "build de imagen",
          badge: "OCI",
          badgeColor: "#103250",
          info: "Definición reproducible del contenedor y sus límites de CPU/RAM.",
        })}
        ${ISO.block({
          id: "m3d-sandbox-frame",
          cx: 620,
          cy: 185,
          rx: 112,
          ry: 62,
          h: 12,
          fill: "#ffffff",
          info: "Frontera de aislamiento por hardware (micro-VM Sandbox).",
        })}
        ${ISO.container({
          id: "m3d-cont3",
          cx: 620,
          cy: 175,
          rx: 60,
          ry: 32,
          h: 32,
          fill: "#103250",
          title: "Pagos:v1",
          sub: "Sandbox micro-VM",
          badge: "TESTS OK",
          badgeColor: "#f7a800",
          info: "Contenedor del servicio de Pagos corriendo pruebas de integración en aislamiento.",
        })}
        ${ISO.flow({ id: "f3d-3a", d: "M 212 185 L 314 185", type: "request" })}
        ${ISO.flow({ id: "f3d-3b", d: "M 436 185 L 555 180", type: "response", bidirectional: true })}
      `,
    },
    {
      short: "4. A producción",
      title: "Del sandbox a producción por un Golden Path",
      body: `<p>Con las pruebas en verde dentro del sandbox, el agente abre un <strong>Pull Request automático</strong> con el código, el Dockerfile y la evidencia de ejecución.</p>
             <p>El pipeline de <strong>CI</strong> valida seguridad y políticas, y la <strong>Plataforma Interna (Golden Path)</strong> empaqueta y despliega el contenedor hacia el <strong>clúster de producción</strong>.</p>`,
      calloutTitle: "Camino pavimentado (Golden Path)",
      callout:
        "El agente nunca despliega a mano en producción: siempre pasa por PR, CI automatizado y los guardrails de la plataforma interna (ej. ~4 min end-to-end).",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 32, text: "Sandbox → PR Automático → CI → Golden Path → Clúster", width: 355, accent: true })}
        ${ISO.container({
          id: "m3d-sbx4",
          cx: 120,
          cy: 195,
          rx: 50,
          ry: 27,
          h: 26,
          fill: "#103250",
          title: "Sandbox",
          sub: "verificado",
          info: "Contenedor probado en entorno aislado.",
        })}
        ${ISO.block({
          id: "m3d-pr4",
          cx: 295,
          cy: 195,
          rx: 52,
          ry: 29,
          h: 20,
          fill: "#ffffff",
          title: "PR + CI",
          sub: "scan & tests",
          badge: "PASS",
          badgeColor: "#103250",
          info: "Pull Request automático validado por integración continua y escaneo de vulnerabilidades.",
        })}
        ${ISO.block({
          id: "m3d-idp4",
          cx: 485,
          cy: 195,
          rx: 60,
          ry: 33,
          h: 22,
          fill: "#f7a800",
          title: "Golden Path",
          sub: "Plataforma IDP",
          badge: "IDP",
          badgeColor: "#103250",
          info: "Plantilla corporativa que inyecta observabilidad, mTLS, secretos y políticas IAM.",
        })}
        ${ISO.container({
          id: "m3d-prod4",
          cx: 675,
          cy: 195,
          rx: 56,
          ry: 30,
          h: 30,
          fill: "#103250",
          title: "Clúster Prod",
          sub: "Pagos live",
          badge: "LIVE",
          badgeColor: "#f7a800",
          info: "Microservicio desplegado y recibiendo tráfico real en el clúster.",
        })}
        ${ISO.flow({ id: "f3d-4a", d: "M 172 195 L 242 195", type: "request" })}
        ${ISO.flow({ id: "f3d-4b", d: "M 348 195 L 424 195", type: "request" })}
        ${ISO.flow({ id: "f3d-4c", d: "M 546 195 L 618 195", type: "response" })}
      `,
    },
    {
      short: "5. Gestión continua",
      title: "Agentes de operación vigilan, diagnostican y el humano aprueba",
      body: `<p>Una vez en producción, <strong>agentes de operación (SRE)</strong> observan trazas, logs y latencias en tiempo real: ajustan el escalado de contenedores y diagnostican incidentes en segundos.</p>
             <p>Cuando detectan una anomalía, proponen un parche o rollback con evidencia, pero el <strong>ingeniero humano conserva el botón de aprobación</strong>.</p>`,
      calloutTitle: "Autonomía supervisada",
      callout:
        "El agente reduce el tiempo de diagnóstico (ej. < 1 min), mientras la aprobación humana protege cambios de alto impacto en producción.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 30, text: "Telemetría → Diagnóstico IA → Propuesta → Aprobación Humana", width: 380 })}
        ${ISO.container({
          id: "m3d-prod5",
          cx: 155,
          cy: 190,
          rx: 58,
          ry: 31,
          h: 32,
          fill: "#103250",
          title: "Pagos (Prod)",
          sub: "métricas + logs",
          badge: "p99↑",
          badgeColor: "#f7a800",
          info: "Contenedor en producción emitiendo telemetría y alertas de latencia.",
        })}
        ${ISO.agent({
          id: "m3d-ops5",
          cx: 410,
          cy: 185,
          rx: 64,
          ry: 35,
          h: 26,
          fill: "#f7a800",
          title: "Agente Ops",
          sub: "escala + diagnostica",
          badge: "FIX PR",
          badgeColor: "#103250",
          info: "Analiza trazas, identifica la causa raíz y redacta la mitigación o escalado.",
        })}
        ${ISO.peoplePlatform({ cx: 650, cy: 195, count: 3, caption: "Humano Aprueba" })}
        ${ISO.flow({ id: "f3d-5a", d: "M 215 178 L 345 178", type: "request" })}
        ${ISO.flow({ id: "f3d-5b", d: "M 476 185 L 578 195", type: "request" })}
        ${ISO.flow({ id: "f3d-5c", d: "M 578 215 L 476 210 L 215 210", type: "response" })}
      `,
    },
    {
      short: "6. Un agente / servicio",
      title: "Un agente por microservicio coordinados por contratos",
      body: `<p>El modelo escala a toda la arquitectura: cada microservicio (<strong>Users, Orders, Pagos</strong>) tiene <strong>su propio agente dueño de su código y su contenedor</strong>, trabajando como un enjambre (<em>swarm</em>).</p>
             <p>No se pisan ni comparten estado interno: se coordinan mediante un <strong>bus de contratos y eventos</strong> que valida cada frontera entre dominios.</p>`,
      calloutTitle: "Swarm con fronteras claras",
      callout:
        "Un agente por dominio mantiene el contexto pequeño y enfocado; el contrato compartido evita que un cambio local rompa al vecino.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 26, text: "Coordinación por Contratos (Swarm de Servicios)", width: 325, accent: true })}
        ${ISO.agent({
          id: "m3d-ag-usr",
          cx: 175,
          cy: 108,
          rx: 48,
          ry: 25,
          h: 18,
          fill: "#f7a800",
          title: "Agente Users",
          sub: "dueño dominio",
          info: "Agente responsable del ciclo de vida del servicio Users.",
        })}
        ${ISO.container({
          id: "m3d-co-usr",
          cx: 175,
          cy: 235,
          rx: 50,
          ry: 26,
          h: 24,
          fill: "#103250",
          title: "Cont. Users",
          sub: "aislado",
          info: "Contenedor independiente del servicio Users.",
        })}
        ${ISO.agent({
          id: "m3d-ag-ord",
          cx: 395,
          cy: 108,
          rx: 48,
          ry: 25,
          h: 18,
          fill: "#f7a800",
          title: "Agente Orders",
          sub: "dueño dominio",
          info: "Agente responsable del ciclo de vida del servicio Orders.",
        })}
        ${ISO.container({
          id: "m3d-co-ord",
          cx: 395,
          cy: 235,
          rx: 50,
          ry: 26,
          h: 24,
          fill: "#103250",
          title: "Cont. Orders",
          sub: "aislado",
          info: "Contenedor independiente del servicio Orders.",
        })}
        ${ISO.agent({
          id: "m3d-ag-pay",
          cx: 615,
          cy: 108,
          rx: 48,
          ry: 25,
          h: 18,
          fill: "#f7a800",
          title: "Agente Pagos",
          sub: "dueño dominio",
          info: "Agente responsable del ciclo de vida del servicio Pagos.",
        })}
        ${ISO.container({
          id: "m3d-co-pay",
          cx: 615,
          cy: 235,
          rx: 50,
          ry: 26,
          h: 24,
          fill: "#103250",
          title: "Cont. Pagos",
          sub: "aislado",
          info: "Contenedor independiente del servicio Pagos.",
        })}
        ${ISO.flow({ id: "f3d-6a", d: "M 175 152 L 175 206", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6b", d: "M 395 152 L 395 206", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6c", d: "M 615 152 L 615 206", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6d", d: "M 225 108 L 345 108", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6e", d: "M 445 108 L 565 108", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6f", d: "M 226 235 L 344 235", type: "response", bidirectional: true })}
        ${ISO.flow({ id: "f3d-6g", d: "M 446 235 L 564 235", type: "response", bidirectional: true })}
      `,
    },
  ],
},
{
  slug: "slide-3e-problemas-revision-carga-cognitiva",
  slideNum: "3e",
  title: "Los problemas actuales: revisión de código y carga cognitiva",
  subtitle:
    "Qué se rompe cuando los agentes producen microservicios más rápido de lo que las personas pueden revisarlos.",
  duration: "5 min",
  level: "01 · Cuello Humano",
  kpis: [
    [
      { label: "GENERACIÓN IA", val: "ej. 25 seg", status: "good" },
      { label: "REVISIÓN HUMANA", val: "ej. 30 min", status: "alert" },
      { label: "COLA DE PRS", val: "ej. N × 4 PRs", status: "alert" },
      { label: "CUELLO BOTELLA", val: "Revisor", status: "alert" },
    ],
    [
      { label: "VISTA REVISOR IA", val: "Solo el diff", status: "alert" },
      { label: "CONTRATOS RED", val: "Sin verificar", status: "alert" },
      { label: "SEÑAL ENGAÑOSA", val: "Sin hallazgos", status: "alert" },
      { label: "RIESGO", val: "Falsa seguridad", status: "alert" },
    ],
    [
      { label: "CONTRATOS", val: "Rotos en prod", status: "alert" },
      { label: "ALUCINACIÓN", val: "Campo inventado", status: "alert" },
      { label: "DEPENDENCIAS", val: "Desactualizadas", status: "alert" },
      { label: "DETECCIÓN", val: "Solo al integrar", status: "alert" },
    ],
    [
      { label: "DEVS CON FATIGA", val: "94%", status: "alert" },
      { label: "CAMBIOS / DÍA", val: "47 contextos", status: "alert" },
      { label: "CARGA AJENA", val: "K8s · YAML · IAM", status: "alert" },
      { label: "LÍMITE HUMANO", val: "Desbordado", status: "alert" },
    ],
    [
      { label: "REVISORES", val: "Subagentes + Bug", status: "good" },
      { label: "MEMORIA", val: "review.md", status: "good" },
      { label: "CARGA AJENA", val: "Golden Paths", status: "good" },
      { label: "CONTROL", val: "Aprobación crítica", status: "good" },
    ],
  ],
  checklist: [
    "Medir la asimetría entre generar en segundos y revisar en 30 minutos",
    "Reconocer la falsa seguridad de una revisión limitada solo al diff",
    "Detectar fallos de integración: contratos rotos y parámetros alucinados",
    "Visualizar cómo la carga ajena y 47 cambios/día desbordan al equipo (94 % fatiga)",
    "Aplicar mitigación: subagentes, evidencia reproducible, review.md y Golden Paths",
  ],
  steps: [
    {
      short: "1. Avalancha PRs",
      title: "Avalancha de código: segundos para generar, 30 min para revisar",
      body: `<p>Un agente produce un Pull Request completo en <strong>segundos</strong> (ej. 25 s), pero auditarlo con rigor toma <strong>30 minutos</strong> por servicio.</p>
             <p>Cuando multiplicas esa velocidad por <strong>N microservicios</strong>, los PRs se apilan frente a un mismo equipo humano que se convierte en el cuello de botella.</p>`,
      calloutTitle: "Asimetría de velocidad",
      callout:
        "Generar más rápido (ej. 70× más velocidad de escritura) no acelera la entrega si la capacidad de revisión humana permanece fija.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 28, text: "Generación: segundos (ej. 25 s) vs. Revisión: 30 min × N servicios", width: 420, accent: true })}
        ${ISO.agent({
          id: "m3e-ag1a",
          cx: 135,
          cy: 110,
          rx: 46,
          ry: 24,
          h: 18,
          fill: "#f7a800",
          title: "Agente 1",
          sub: "Users",
          info: "Genera PRs de Users en segundos.",
        })}
        ${ISO.agent({
          id: "m3e-ag1b",
          cx: 135,
          cy: 190,
          rx: 46,
          ry: 24,
          h: 18,
          fill: "#f7a800",
          title: "Agente 2",
          sub: "Orders",
          info: "Genera PRs de Orders en segundos.",
        })}
        ${ISO.agent({
          id: "m3e-ag1c",
          cx: 135,
          cy: 270,
          rx: 46,
          ry: 24,
          h: 18,
          fill: "#f7a800",
          title: "Agente N",
          sub: "Pagos",
          info: "Genera PRs de Pagos en segundos.",
        })}
        ${ISO.block({
          id: "m3e-pr1",
          cx: 395,
          cy: 235,
          rx: 64,
          ry: 32,
          h: 18,
          fill: "#ffffff",
          title: "PR #101 · #102",
          sub: "en cola",
          info: "Cola creciente de Pull Requests esperando auditoría.",
        })}
        ${ISO.block({
          id: "m3e-pr2",
          cx: 395,
          cy: 185,
          rx: 64,
          ry: 32,
          h: 18,
          fill: "#ffffff",
          title: "PR #103 · #104",
          sub: "en cola",
          info: "Más cambios acumulados de múltiples repositorios.",
        })}
        ${ISO.block({
          id: "m3e-pr3",
          cx: 395,
          cy: 135,
          rx: 64,
          ry: 32,
          h: 18,
          fill: "#103250",
          title: "Avalancha PRs",
          sub: "ej. 30 min c/u",
          badge: "×N PRs",
          badgeColor: "#f7a800",
          info: "Saturación de la cola de revisión humana.",
        })}
        ${ISO.peoplePlatform({ cx: 650, cy: 195, count: 4, caption: "Revisor Saturado" })}
        ${ISO.flow({ id: "f3e-1a", d: "M 182 115 L 330 140", type: "error", dur: "0.9s" })}
        ${ISO.flow({ id: "f3e-1b", d: "M 182 190 L 330 185", type: "error", dur: "0.8s" })}
        ${ISO.flow({ id: "f3e-1c", d: "M 182 265 L 330 232", type: "error", dur: "1.0s" })}
        ${ISO.flow({ id: "f3e-1d", d: "M 460 188 L 575 198", type: "error", dur: "2.8s" })}
      `,
    },
    {
      short: "2. Diff superficial",
      title: "Revisión superficial: solo el diff y la falsa seguridad",
      body: `<p>Para aliviar la cola, se delega la revisión a un agente que inspecciona <strong>solo el diff local</strong> del archivo modificado, sin ver los contratos de los demás servicios.</p>
             <p>El revisor responde <code>"Sin hallazgos"</code> y aprueba el cambio, creando una peligrosa <strong>falsa seguridad</strong>: que la IA no reporte errores no significa que el sistema esté limpio.</p>`,
      calloutTitle: "Trampa de visibilidad",
      callout:
        '"Sin hallazgos" en un diff aislado solo confirma sintaxis local; los bugs sistémicos viven entre servicios, fuera de esa ventana.',
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 28, text: '"Sin hallazgos" ≠ código limpio (ceguera de contratos)', width: 355, accent: true })}
        ${ISO.block({
          id: "m3e-diff2",
          cx: 165,
          cy: 185,
          rx: 62,
          ry: 34,
          h: 22,
          fill: "#ffffff",
          title: "Solo el Diff",
          sub: "+42 / -8 líneas",
          badge: "LOCAL",
          badgeColor: "#103250",
          info: "Fragmento parcial de código sin contexto de otros microservicios.",
        })}
        ${ISO.agent({
          id: "m3e-rev2",
          cx: 410,
          cy: 185,
          rx: 64,
          ry: 35,
          h: 24,
          fill: "#f7a800",
          title: "Revisor IA",
          sub: "mira solo el diff",
          badge: "OK FALSO",
          badgeColor: "#103250",
          info: "Aprueba el PR al no ver errores locales, generando falsa seguridad.",
        })}
        ${ISO.block({
          id: "m3e-blind2a",
          cx: 645,
          cy: 115,
          rx: 56,
          ry: 28,
          h: 18,
          fill: "#103250",
          title: "Contratos Vecinos",
          sub: "fuera de vista",
          opacity: 0.45,
          info: "Contratos de Orders e Inventario invisibles para la revisión basada solo en diff.",
        })}
        ${ISO.block({
          id: "m3e-blind2b",
          cx: 645,
          cy: 250,
          rx: 56,
          ry: 28,
          h: 18,
          fill: "#103250",
          title: "Efectos en Red",
          sub: "no evaluados",
          opacity: 0.45,
          info: "Retrys, timeouts y versiones de esquema que el revisor no inspecciona.",
        })}
        ${ISO.flow({ id: "f3e-2a", d: "M 228 185 L 344 185", type: "request", bidirectional: true })}
        ${ISO.flow({ id: "f3e-2b", d: "M 476 165 L 588 122", active: false })}
        ${ISO.flow({ id: "f3e-2c", d: "M 476 205 L 588 242", active: false })}
      `,
    },
    {
      short: "3. Fallos integración",
      title: "Fallos entre servicios que solo aparecen al integrar",
      body: `<p>Al desplegar los contenedores juntos estallan los errores invisibles en el diff: <strong>contratos rotos</strong> entre <code>Orders</code> y <code>Pagos</code>, <strong>parámetros inventados por alucinación</strong> (ej. <code>tax_rate_v2</code>) y <strong>dependencias desactualizadas</strong>.</p>
             <p>Cada servicio pasó sus pruebas unitarias locales, pero la integración real falla en cadena.</p>`,
      calloutTitle: "El bug vive en las costuras",
      callout:
        "Un parámetro alucinado o una librería desactualizada (ej. SDK v1 vs v2) puede compilar perfecto en local y tumbar el flujo completo en integración.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 28, text: "Fallo al integrar: contratos rotos · parámetro alucinado · SDK viejo", width: 410, accent: true })}
        ${ISO.container({
          id: "m3e-ord3",
          cx: 165,
          cy: 185,
          rx: 58,
          ry: 31,
          h: 28,
          fill: "#ffffff",
          title: "Cont. Orders",
          sub: "envía tax_rate_v2",
          badge: "ALUCINA",
          badgeColor: "#f7a800",
          info: "El agente inventó un campo que Pagos no espera.",
        })}
        ${ISO.block({
          id: "m3e-crash3",
          cx: 395,
          cy: 185,
          rx: 62,
          ry: 34,
          h: 22,
          fill: "#f7a800",
          title: "Contrato Roto",
          sub: "HTTP 400 / 500",
          badge: "FALLO",
          badgeColor: "#103250",
          info: "Desajuste de esquema entre microservicios que solo brota en integración.",
        })}
        ${ISO.container({
          id: "m3e-pay3",
          cx: 625,
          cy: 130,
          rx: 58,
          ry: 31,
          h: 28,
          fill: "#103250",
          title: "Cont. Pagos",
          sub: "espera tax_pct",
          badge: "400 ERR",
          badgeColor: "#f7a800",
          info: "Rechaza la petición por incompatibilidad de contrato.",
        })}
        ${ISO.cylinder({
          id: "m3e-dep3",
          cx: 625,
          cy: 245,
          rx: 42,
          ry: 18,
          h: 36,
          fill: "#103250",
          label: "SDK v1 (viejo)",
          badge: "CVE",
          badgeColor: "#f7a800",
          info: "Dependencia desactualizada generada por datos de entrenamiento antiguos.",
        })}
        ${ISO.flow({ id: "f3e-3a", d: "M 225 185 L 332 185", type: "error", dur: "1.0s" })}
        ${ISO.flow({ id: "f3e-3b", d: "M 458 170 L 566 140", type: "error", dur: "1.0s" })}
        ${ISO.flow({ id: "f3e-3c", d: "M 458 202 L 580 250", type: "error", dur: "1.2s" })}
      `,
    },
    {
      short: "4. Sobrecarga cognitiva",
      title: "Sobrecarga cognitiva: carga ajena y 47 cambios de contexto al día",
      body: `<p>Sobre la <strong>carga intrínseca</strong> y la <strong>carga pertinente</strong> del negocio se apila una enorme torre de <strong>carga AJENA</strong>: Dockerfiles, YAML de Kubernetes, prompts, permisos IAM y auditoría constante de PRs de IA.</p>
             <p>Con <strong>47 cambios de contexto al día</strong> entre herramientas, el <strong>94 % de los desarrolladores reporta fatiga</strong> y el equipo supera el <strong>Límite Cognitivo Humano</strong>.</p>`,
      calloutTitle: "Límite humano desbordado",
      callout:
        "94 % de fatiga y 47 cambios de contexto diarios: la memoria de trabajo colapsa por la carga ajena, dejando sin espacio la lógica del negocio.",
      renderSvg: () => `
        ${ISO.peoplePlatform({ cx: 155, cy: 235, count: 6, caption: "94% Fatiga · 47/día" })}
        ${ISO.block({
          id: "m3e-int4",
          cx: 455,
          cy: 258,
          rx: 78,
          ry: 36,
          h: 16,
          fill: "#ffffff",
          title: "Carga Intrínseca",
          sub: "lógica técnica",
          info: "Complejidad natural del software.",
        })}
        ${ISO.block({
          id: "m3e-per4",
          cx: 455,
          cy: 214,
          rx: 78,
          ry: 36,
          h: 16,
          fill: "#103250",
          title: "Carga Pertinente",
          sub: "negocio asfixiado",
          info: "Espacio mental para reglas de negocio comprimido por la sobrecarga.",
        })}
        ${ISO.block({
          id: "m3e-aje4",
          cx: 455,
          cy: 126,
          rx: 84,
          ry: 42,
          h: 52,
          fill: "#f7a800",
          title: "CARGA AJENA",
          sub: "Dockerfile · K8s YAML · Prompts · IAM",
          badge: "DESBORDADO",
          badgeColor: "#103250",
          info: "Fricción operativa, revisión masiva de código IA y saltos constantes entre herramientas.",
        })}
        <line x1="310" y1="158" x2="625" y2="158" stroke="#103250" stroke-width="2.6" stroke-dasharray="6 4" />
        <text x="632" y="162" font-family="monospace" font-size="11" font-weight="800" fill="#103250">LÍMITE HUMANO</text>
        ${ISO.flow({ id: "f3e-4a", d: "M 230 212 L 370 156", type: "error", dur: "1.0s" })}
        ${ISO.flow({ id: "f3e-4b", d: "M 230 232 L 376 220", type: "error", dur: "1.3s" })}
      `,
    },
    {
      short: "5. Mitigación",
      title: "Mitigación: subagentes revisores, evidencia, review.md y Golden Paths",
      body: `<p>La salida no es prohibir los agentes, sino rediseñar el sistema de gobierno: <strong>subagentes revisores por especialidad</strong> (contratos, seguridad, rendimiento) que entregan <strong>evidencia reproducible simulando el bug</strong>.</p>
             <p>Los hallazgos persisten en <code>review.md</code>, los <strong>Golden Paths</strong> absorben la carga ajena (Docker/K8s/IAM) y el humano interviene solo en los <strong>puntos de aprobación críticos</strong>.</p>`,
      calloutTitle: "Gobierno sostenible",
      callout:
        "Subagentes con pruebas reproducibles + memoria en review.md + Golden Paths reducen drásticamente el ruido (ej. −70 % carga ajena) y devuelven el foco al ingeniero.",
      renderSvg: () => `
        ${ISO.pill({ x: 395, y: 26, text: "Subagentes + Evidencia Bug + review.md + Golden Paths → Humano", width: 415, accent: true })}
        ${ISO.agent({
          id: "m3e-sub5a",
          cx: 145,
          cy: 112,
          rx: 50,
          ry: 26,
          h: 18,
          fill: "#f7a800",
          title: "Subag. Contratos",
          sub: "simula el bug",
          info: "Revisa contratos entre servicios y adjunta prueba reproducible si falla.",
        })}
        ${ISO.agent({
          id: "m3e-sub5b",
          cx: 145,
          cy: 225,
          rx: 50,
          ry: 26,
          h: 18,
          fill: "#f7a800",
          title: "Subag. Seguridad",
          sub: "evidencia real",
          info: "Audita dependencias, permisos y vulnerabilidades en el sandbox.",
        })}
        ${ISO.cylinder({
          id: "m3e-mem5",
          cx: 395,
          cy: 98,
          rx: 42,
          ry: 18,
          h: 38,
          fill: "#103250",
          label: "review.md",
          badge: "MEMORIA",
          badgeColor: "#f7a800",
          info: "Memoria compartida de hallazgos, reglas aprendidas y evidencia reproducible.",
        })}
        ${ISO.block({
          id: "m3e-gp5",
          cx: 395,
          cy: 235,
          rx: 66,
          ry: 34,
          h: 22,
          fill: "#ffffff",
          title: "Golden Paths",
          sub: "baja carga ajena",
          badge: "IDP",
          badgeColor: "#103250",
          info: "Abstrae Dockerfiles, YAML de Kubernetes y permisos repetitivos.",
        })}
        ${ISO.peoplePlatform({ cx: 650, cy: 175, count: 4, caption: "Aprobación Crítica" })}
        ${ISO.flow({ id: "f3e-5a", d: "M 196 112 L 350 112", type: "request" })}
        ${ISO.flow({ id: "f3e-5b", d: "M 196 228 L 328 235", type: "request" })}
        ${ISO.flow({ id: "f3e-5c", d: "M 438 118 L 578 162", type: "response" })}
        ${ISO.flow({ id: "f3e-5d", d: "M 462 228 L 578 192", type: "response" })}
      `,
    },
  ],
},

          ],
        };
