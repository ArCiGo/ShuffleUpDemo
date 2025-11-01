// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

// Attach screenshots and videos to Mochawesome report on test failure
Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const testTitle = test.title;
        const suiteName = runnable.parent?.title || '';
        const specName = Cypress.spec.name;
        
        // Get configured retry count (initial + retries = total attempts)
        const retries = Cypress.config('retries') as number || 0;
        const totalAttempts = retries + 1; // Initial attempt + retries
        
        // Initialize context array
        (test as any).context = (test as any).context || [];
        
        // Add context for each screenshot
        const baseScreenshotName = `${suiteName} -- ${testTitle} (failed)`;
        
        // First attempt screenshot (no suffix)
        const screenshotPath1 = `../../screenshots/${specName}/${baseScreenshotName}.png`;
        (test as any).context.push({
            title: '📸 Screenshot (Attempt 1)',
            value: screenshotPath1
        });
        
        // Retry attempt screenshots (with "attempt N" suffix)
        for (let i = 1; i < totalAttempts; i++) {
            const retryScreenshotName = `${baseScreenshotName} (attempt ${i + 1})`;
            const screenshotPath = `../../screenshots/${specName}/${retryScreenshotName}.png`;
            (test as any).context.push({
                title: `📸 Screenshot (Attempt ${i + 1})`,
                value: screenshotPath
            });
        }
        
        // Add video
        const videoPath = `../../videos/${specName}.mp4`;
        (test as any).context.push({
            title: '🎥 Video Recording',
            value: videoPath
        });
        
        console.log(`✓ Added ${totalAttempts} screenshot(s) and video to context for: ${testTitle}`);
    }
});