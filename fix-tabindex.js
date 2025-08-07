const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Correcciones sistemáticas de tabIndex para cumplir con los 94 elementos especificados
const corrections = [
  // Video controls (elementos 47-50)
  { old: "tabIndex={47}", new: "tabIndex={47}" }, // Video element ya está bien
  // Corrección de duplicados en juegos
  {
    old: "tabIndex={49}\n                        >\n                          Listening",
    new: "tabIndex={50}\n                        >\n                          Listening",
  },
  {
    old: "tabIndex={51}\n                        >\n                          Grammar",
    new: "tabIndex={52}\n                        >\n                          Grammar",
  },
  {
    old: "tabIndex={53}\n                        >\n                          Reading",
    new: "tabIndex={54}\n                        >\n                          Reading",
  },
  {
    old: "tabIndex={55}\n                        >\n                          Writing",
    new: "tabIndex={56}\n                        >\n                          Writing",
  },

  // Continuar con las siguientes correcciones según el SecuenciaTabIndex.md
  { old: "tabIndex={50}", new: "tabIndex={51}" }, // Academic Lectures
  { old: "tabIndex={52}", new: "tabIndex={53}" }, // Advanced Structures
  { old: "tabIndex={54}", new: "tabIndex={55}" }, // Complex Texts
  { old: "tabIndex={56}", new: "tabIndex={57}" }, // Academic Essays
];

corrections.forEach((correction) => {
  content = content.replace(correction.old, correction.new);
});

fs.writeFileSync(filePath, content);
console.log("Correcciones aplicadas exitosamente");
