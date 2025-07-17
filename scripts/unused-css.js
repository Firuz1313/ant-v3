#!/usr/bin/env node

/**
 * Utility script to find potentially unused CSS classes in Tailwind CSS
 * This helps optimize bundle size by identifying classes that might not be used
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Common directories to scan for usage
const SOURCE_DIRS = ["src/**/*.{tsx,ts,jsx,js}", "*.{tsx,ts,jsx,js}"];

// Read all source files
function readSourceFiles() {
  const files = [];
  SOURCE_DIRS.forEach((pattern) => {
    const matches = glob.sync(pattern, { ignore: ["node_modules/**"] });
    matches.forEach((file) => {
      try {
        const content = fs.readFileSync(file, "utf8");
        files.push({ file, content });
      } catch (error) {
        console.warn(`Warning: Could not read ${file}:`, error.message);
      }
    });
  });
  return files;
}

// Extract class names from className attributes
function extractClassNames(content) {
  const classNames = new Set();

  // Match className="..." and className={...}
  const classNameRegex = /className\s*=\s*["'`]([^"'`]+)["'`]/g;
  const classNameTemplateRegex = /className\s*=\s*{[^}]*["'`]([^"'`]+)["'`]/g;
  const cnRegex = /cn\([^)]*["'`]([^"'`]+)["'`]/g;

  let match;

  // Standard className attributes
  while ((match = classNameRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    classes.forEach((cls) => classNames.add(cls));
  }

  // Template literal classNames
  while ((match = classNameTemplateRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    classes.forEach((cls) => classNames.add(cls));
  }

  // cn() utility function calls
  while ((match = cnRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    classes.forEach((cls) => classNames.add(cls));
  }

  return classNames;
}

// Analyze CSS classes for potential optimizations
function analyzeCSS() {
  console.log("🔍 Analyzing CSS usage in the project...\n");

  const files = readSourceFiles();
  const allClasses = new Set();
  const fileUsage = {};

  // Extract all class names
  files.forEach(({ file, content }) => {
    const classes = extractClassNames(content);
    fileUsage[file] = classes;
    classes.forEach((cls) => allClasses.add(cls));
  });

  console.log(
    `📊 Found ${allClasses.size} unique CSS classes across ${files.length} files\n`,
  );

  // Analyze class usage patterns
  const classFrequency = {};
  Object.values(fileUsage).forEach((classes) => {
    classes.forEach((cls) => {
      classFrequency[cls] = (classFrequency[cls] || 0) + 1;
    });
  });

  // Find rarely used classes
  const rareClasses = Object.entries(classFrequency)
    .filter(([, count]) => count === 1)
    .map(([cls]) => cls)
    .sort();

  console.log(`🎯 Classes used only once (${rareClasses.length}):`);
  rareClasses.slice(0, 20).forEach((cls) => {
    console.log(`  - ${cls}`);
  });
  if (rareClasses.length > 20) {
    console.log(`  ... and ${rareClasses.length - 20} more`);
  }

  // Find potential optimization opportunities
  console.log(`\n🔧 Optimization opportunities:`);

  // Look for long class strings that could be extracted
  Object.entries(fileUsage).forEach(([file, classes]) => {
    const longClasses = Array.from(classes).filter((cls) => cls.length > 30);
    if (longClasses.length > 0) {
      console.log(`📄 ${file}:`);
      longClasses.forEach((cls) => {
        console.log(`  Long class: ${cls.substring(0, 50)}...`);
      });
    }
  });

  // Animation classes analysis
  const animationClasses = Array.from(allClasses).filter((cls) =>
    cls.includes("animate-"),
  );
  console.log(`\n🎬 Animation classes found (${animationClasses.length}):`);
  animationClasses.forEach((cls) => {
    console.log(`  - ${cls} (used ${classFrequency[cls]} times)`);
  });

  // Complex utility combinations
  const complexClasses = Array.from(allClasses).filter(
    (cls) => cls.includes("/") && cls.split("/").length > 2,
  );
  console.log(`\n🧩 Complex utility classes (${complexClasses.length}):`);
  complexClasses.slice(0, 10).forEach((cls) => {
    console.log(`  - ${cls}`);
  });

  // Recommendations
  console.log(`\n💡 Recommendations:`);
  console.log(
    `  1. Consider extracting repeated class combinations into CSS components`,
  );
  console.log(`  2. Review animation classes to ensure they're all necessary`);
  console.log(`  3. Consider using CSS-in-JS for complex responsive designs`);
  console.log(
    `  4. Classes used only once might be candidates for inline styles`,
  );

  return {
    totalClasses: allClasses.size,
    totalFiles: files.length,
    rareClasses: rareClasses.length,
    animationClasses: animationClasses.length,
    complexClasses: complexClasses.length,
  };
}

// Performance tips
function performanceTips() {
  console.log(`\n⚡ Performance optimization tips:`);
  console.log(
    `  1. Use 'transform' and 'opacity' for animations (GPU-accelerated)`,
  );
  console.log(`  2. Prefer 'transition-transform' over 'transition-all'`);
  console.log(`  3. Avoid 'backdrop-blur' on multiple elements simultaneously`);
  console.log(
    `  4. Use 'will-change: transform' sparingly and remove after animation`,
  );
  console.log(
    `  5. Consider 'contain: layout style paint' for isolated components`,
  );
}

// Main execution
if (require.main === module) {
  try {
    const stats = analyzeCSS();
    performanceTips();

    console.log(`\n📈 Summary:`);
    console.log(`  - Total CSS classes: ${stats.totalClasses}`);
    console.log(`  - Files analyzed: ${stats.totalFiles}`);
    console.log(`  - Rarely used classes: ${stats.rareClasses}`);
    console.log(`  - Animation classes: ${stats.animationClasses}`);
    console.log(`  - Complex classes: ${stats.complexClasses}`);
  } catch (error) {
    console.error("Error analyzing CSS:", error);
    process.exit(1);
  }
}

module.exports = { analyzeCSS, extractClassNames };
