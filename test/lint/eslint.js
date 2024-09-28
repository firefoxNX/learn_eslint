/*
 * Copyright 2024, CompanyName, Inc.  All rights reserved.
 */
const { ESLint } = require("eslint");

// Array of paths to lint
const paths = [
  '**/*.js'
];

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(overrideConfig) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig,
    fix: true,
  });
}

// Lint the specified files and return the results
async function lintAndFix(eslint, filePaths) {
  const results = await eslint.lintFiles(filePaths);

  // Apply automatic fixes and output fixed code
  await ESLint.outputFixes(results);

  return results;
}

// Log results to console if there are any problems
function outputLintingResults(results) {
  // Identify the number of problems found
  const problems = results.reduce(
    (acc, result) => acc + result.errorCount + result.warningCount,
    0,
  );

  if (problems > 0) {
    console.log("Linting errors found!");
    console.log(results);
  } else {
    console.log("No linting errors found.");
  }
  return results;
}

async function lintFiles(filePaths) {
  const eslint = createESLintInstance();
  const results = await lintAndFix(eslint, filePaths);
  return outputLintingResults(results);
}

// Run the linting process
lintFiles(paths);
