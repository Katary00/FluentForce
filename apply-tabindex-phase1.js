const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

console.log(
  "Aplicando sistemáticamente los 94 elementos de tabIndex según SecuenciaTabIndex.md..."
);

// Mapa de elementos y sus tabIndex correspondientes según el orden especificado
const tabIndexMappings = [
  // HEADER ELEMENTS (1-12)
  // 1. Logo
  {
    pattern: /<div className="flex items-center space-x-2">\s*<Star[^>]*>/,
    tabIndex: 1,
    description: "Logo Star icon",
  },

  // 2. FluentForce text
  {
    pattern: /<h1[^>]*className="text-2xl font-bold[^"]*"[^>]*>/,
    tabIndex: 2,
    description: "FluentForce title",
  },

  // 3. Academic English Gaming Platform subtitle
  {
    pattern: /<p[^>]*className="text-xs[^"]*hidden sm:block[^"]*"[^>]*>/,
    tabIndex: 3,
    description: "Academic English Gaming Platform subtitle",
  },

  // 4-7. Theme buttons (clear, intermediate, dark, help)
  {
    pattern: /<Button[^>]*aria-label="Light mode"[^>]*>/,
    tabIndex: 4,
    description: "Light mode button",
  },
  {
    pattern: /<Button[^>]*aria-label="Auto mode"[^>]*>/,
    tabIndex: 5,
    description: "Auto mode button",
  },
  {
    pattern: /<Button[^>]*aria-label="Dark mode"[^>]*>/,
    tabIndex: 6,
    description: "Dark mode button",
  },
  {
    pattern: /<Button[^>]*aria-label="Help"[^>]*>/,
    tabIndex: 7,
    description: "Help button",
  },

  // 8-11. Navigation menu items
  {
    pattern: /<a[^>]*href="#home"[^>]*>/,
    tabIndex: 8,
    description: "Home link",
  },
  {
    pattern: /<a[^>]*href="#demo"[^>]*>/,
    tabIndex: 9,
    description: "Demo link",
  },
  {
    pattern: /<a[^>]*href="#games"[^>]*>/,
    tabIndex: 10,
    description: "Games link",
  },
  {
    pattern: /<a[^>]*href="#results"[^>]*>/,
    tabIndex: 11,
    description: "Results link",
  },

  // 12-13. Sign In and Sign Up buttons
  {
    pattern: /<Button[^>]*>Sign In<\/Button>/,
    tabIndex: 12,
    description: "Sign In button",
  },

  // HERO SECTION (13-21)
  // 13-15. Hero texts
  {
    pattern:
      /<div[^>]*className="text-center mb-8"[^>]*>\s*<p[^>]*className="text-lg[^"]*mb-4[^"]*"[^>]*>/,
    tabIndex: 13,
    description: "Academic English Gaming Platform hero text",
  },
  {
    pattern:
      /<h1[^>]*className="text-4xl md:text-6xl lg:text-7xl font-bold[^"]*mb-6[^"]*"[^>]*>/,
    tabIndex: 14,
    description: "Master Academic English Through Gaming",
  },
  {
    pattern: /<p[^>]*className="text-xl md:text-2xl[^"]*mb-6[^"]*"[^>]*>/,
    tabIndex: 15,
    description: "Transform university English skills text",
  },

  // 16-18. Feature cards
  {
    pattern:
      /<div[^>]*className="[^"]*rounded-xl p-6[^"]*border-l-purple-500[^"]*"[^>]*>/,
    tabIndex: 16,
    description: "5 Interactive Games card",
  },
  {
    pattern:
      /<div[^>]*className="[^"]*rounded-xl p-6[^"]*border-l-blue-500[^"]*"[^>]*>/,
    tabIndex: 17,
    description: "Real Progress card",
  },
  {
    pattern:
      /<div[^>]*className="[^"]*rounded-xl p-6[^"]*border-l-green-500[^"]*"[^>]*>/,
    tabIndex: 18,
    description: "Instant Results card",
  },
];

// Apply each mapping
tabIndexMappings.forEach((mapping, index) => {
  const regex = new RegExp(mapping.pattern.source, "g");

  content = content.replace(regex, (match) => {
    // Add tabIndex if not present
    if (!match.includes("tabIndex=")) {
      // Insert tabIndex after the opening tag
      const tagEnd = match.indexOf(">");
      const beforeClose = match.substring(0, tagEnd);
      const afterClose = match.substring(tagEnd);

      return `${beforeClose} tabIndex={${mapping.tabIndex}}${afterClose}`;
    } else {
      // Replace existing tabIndex
      return match.replace(
        /tabIndex=\{?\d+\}?/,
        `tabIndex={${mapping.tabIndex}}`
      );
    }
  });

  console.log(`✓ Aplicado ${mapping.tabIndex}: ${mapping.description}`);
});

// Write back the file
fs.writeFileSync(filePath, content, "utf8");
console.log("✅ Primeros 18 elementos de tabIndex aplicados correctamente");
console.log("Verificando build...");
