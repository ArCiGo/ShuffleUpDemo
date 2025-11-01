#!/bin/bash

# Run Cypress and capture exit code
cypress run
CYPRESS_EXIT_CODE=$?

# Always generate reports regardless of test results
echo ""
echo "Generating reports..."
npm run merge:junit
npm run merge:mochawesome  
npm run generate:html

echo ""
if [ $CYPRESS_EXIT_CODE -eq 0 ]; then
    echo "✓ All tests passed and reports generated"
else
    echo "✗ Tests failed but reports were generated"
fi

# Exit with original Cypress exit code to fail CI/CD if tests failed
exit $CYPRESS_EXIT_CODE