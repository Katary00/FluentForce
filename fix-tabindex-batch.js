#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Mapping completo según SecuenciaTabIndex.md - elementos 71-94
const tabIndexCorrections = [
  // Correcciones de la sección "See FluentForce in Action" (elementos 54-70)
  {
    search:
      "tabIndex={45}>\n                      🎬 See FluentForce in Action",
    replace:
      "tabIndex={54}>\n                      🎬 See FluentForce in Action",
  },
  {
    search: "tabIndex={46}>\n                      Watch real students improve",
    replace:
      "tabIndex={55}>\n                      Watch real students improve",
  },

  // Correcciones de juegos en video section (elementos 56-70)
  {
    search:
      'tabIndex={47}\n                        role="button"\n                        aria-label="Vocabulary game',
    replace:
      'tabIndex={56}\n                        role="button"\n                        aria-label="Vocabulary game',
  },
  {
    search:
      "tabIndex={47}\n                        >\n                          Vocabulary",
    replace:
      "tabIndex={57}\n                        >\n                          Vocabulary",
  },
  {
    search:
      "tabIndex={48}\n                        >\n                          Master Complex Terms",
    replace:
      "tabIndex={58}\n                        >\n                          Master Complex Terms",
  },

  {
    search:
      'tabIndex={49}\n                        role="button"\n                        aria-label="Listening game',
    replace:
      'tabIndex={59}\n                        role="button"\n                        aria-label="Listening game',
  },
  {
    search:
      "tabIndex={51}\n                        >\n                          Listening",
    replace:
      "tabIndex={60}\n                        >\n                          Listening",
  },
  {
    search:
      "tabIndex={50}\n                        >\n                          Academic Lectures",
    replace:
      "tabIndex={61}\n                        >\n                          Academic Lectures",
  },

  {
    search:
      'tabIndex={51}\n                        role="button"\n                        aria-label="Grammar game',
    replace:
      'tabIndex={62}\n                        role="button"\n                        aria-label="Grammar game',
  },
  {
    search:
      "tabIndex={53}\n                        >\n                          Grammar",
    replace:
      "tabIndex={63}\n                        >\n                          Grammar",
  },
  {
    search:
      "tabIndex={52}\n                        >\n                          Advanced Structures",
    replace:
      "tabIndex={64}\n                        >\n                          Advanced Structures",
  },

  {
    search:
      'tabIndex={53}\n                        role="button"\n                        aria-label="Reading game',
    replace:
      'tabIndex={65}\n                        role="button"\n                        aria-label="Reading game',
  },
  {
    search:
      "tabIndex={55}\n                        >\n                          Reading",
    replace:
      "tabIndex={66}\n                        >\n                          Reading",
  },
  {
    search:
      "tabIndex={54}\n                        >\n                          Complex Texts",
    replace:
      "tabIndex={67}\n                        >\n                          Complex Texts",
  },

  {
    search:
      'tabIndex={55}\n                        role="button"\n                        aria-label="Writing game',
    replace:
      'tabIndex={68}\n                        role="button"\n                        aria-label="Writing game',
  },
  {
    search:
      "tabIndex={57}\n                        >\n                          Writing",
    replace:
      "tabIndex={69}\n                        >\n                          Writing",
  },
  {
    search:
      "tabIndex={56}\n                        >\n                          Academic Essays",
    replace:
      "tabIndex={70}\n                        >\n                          Academic Essays",
  },

  // Features section (elementos 71-82)
  {
    search:
      "tabIndex={57}\n            >\n              🎯 Why 95% of Our Students",
    replace:
      "tabIndex={71}\n            >\n              🎯 Why 95% of Our Students",
  },
  {
    search:
      "tabIndex={58}\n            >\n              Unlike traditional language apps",
    replace:
      "tabIndex={72}\n            >\n              Unlike traditional language apps",
  },
  {
    search:
      "tabIndex={59}\n                  >\n                    🎮 5 Addictive Learning Games",
    replace:
      "tabIndex={73}\n                  >\n                    🎮 5 Addictive Learning Games",
  },
  {
    search:
      "tabIndex={60}\n                  >\n                    <strong>Academic Vocabulary Challenge:",
    replace:
      "tabIndex={74}\n                  >\n                    <strong>Academic Vocabulary Challenge:",
  },
  {
    search: "tabIndex={61}>\n                      <strong>Listening Lab:",
    replace: "tabIndex={75}>\n                      <strong>Listening Lab:",
  },
  {
    search: "tabIndex={62}>\n                      <strong>Grammar Quest:",
    replace: "tabIndex={76}>\n                      <strong>Grammar Quest:",
  },
  {
    search: "tabIndex={63}>\n                      <strong>Reading Expedition:",
    replace:
      "tabIndex={77}>\n                      <strong>Reading Expedition:",
  },
  {
    search: "tabIndex={64}>\n                      <strong>Writing Workshop:",
    replace: "tabIndex={78}>\n                      <strong>Writing Workshop:",
  },
  {
    search:
      "tabIndex={65}\n                  >\n                    <CheckCircle",
    replace:
      "tabIndex={79}\n                  >\n                    <CheckCircle",
  },
  {
    search:
      "tabIndex={65}\n                    >\n                      Proven by 10,000+ students",
    replace:
      "tabIndex={80}\n                    >\n                      Proven by 10,000+ students",
  },
  { search: "tabIndex={66}", replace: "tabIndex={81}" },
];

// Aplicar todas las correcciones
tabIndexCorrections.forEach((correction, index) => {
  if (content.includes(correction.search)) {
    content = content.replace(correction.search, correction.replace);
    console.log(
      `✅ Corrección ${index + 1} aplicada: ${correction.search.substring(
        0,
        30
      )}...`
    );
  } else {
    console.log(
      `⚠️  Corrección ${index + 1} no encontrada: ${correction.search.substring(
        0,
        30
      )}...`
    );
  }
});

fs.writeFileSync(filePath, content);
console.log("\n🎉 Correcciones sistemáticas aplicadas para elementos 54-82");
console.log("📝 Progreso: 82 de 94 elementos corregidos");
console.log("⏭️  Faltan: elementos 83-94 (estadísticas y footer)");
