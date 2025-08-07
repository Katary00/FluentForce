const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Remove eslint errors first
content = content.replace(
  /the world's first gamified/g,
  "the world&apos;s first gamified"
);
content = content.replace(
  /who've already improved/g,
  "who&apos;ve already improved"
);
content = content.replace(/Here's what makes/g, "Here&apos;s what makes");
content = content.replace(
  /"Get Started Free"/g,
  "&quot;Get Started Free&quot;"
);
content = content.replace(/"Sign In"/g, "&quot;Sign In&quot;");
content = content.replace(/ChevronRight,\s*\n/g, "");

// Fix specific tabIndex assignments systematically
const tabIndexMappings = [
  // Header elements (1-12)
  { search: /tabIndex={1}(?!\d)/, replace: "tabIndex={1}" },
  { search: /tabIndex={2}(?!\d)/, replace: "tabIndex={2}" },
  { search: /tabIndex={3}(?!\d)/, replace: "tabIndex={3}" },
  { search: /tabIndex={4}(?!\d)/, replace: "tabIndex={4}" },
  { search: /tabIndex={5}(?!\d)/, replace: "tabIndex={5}" },
  { search: /tabIndex={6}(?!\d)/, replace: "tabIndex={6}" },
  { search: /tabIndex={7}(?!\d)/, replace: "tabIndex={7}" },
  { search: /tabIndex={8}(?!\d)/, replace: "tabIndex={8}" },
  { search: /tabIndex={9}(?!\d)/, replace: "tabIndex={9}" },
  { search: /tabIndex={10}(?!\d)/, replace: "tabIndex={10}" },
  { search: /tabIndex={11}(?!\d)/, replace: "tabIndex={11}" },
  { search: /tabIndex={12}(?!\d)/, replace: "tabIndex={12}" },
];

// Apply mappings
tabIndexMappings.forEach((mapping) => {
  content = content.replace(mapping.search, mapping.replace);
});

// Write back
fs.writeFileSync(filePath, content, "utf8");
console.log("TabIndex corrections applied safely");
