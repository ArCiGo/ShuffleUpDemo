import { defineConfig } from "cypress";
import * as fs from "fs";

export default defineConfig({
  video: true,
  retries: 2,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    setupNodeEvents(on, config) {
      const videosToDelete: string[] = [];

      // Collect videos from passing specs
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Check if all tests passed
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed')
          );
          
          // Mark video for deletion if no failures
          if (!failures) {
            videosToDelete.push(results.video);
          }
        }
      });

      // Delete all marked videos after all specs complete
      on('after:run', () => {
        videosToDelete.forEach((videoPath) => {
          if (fs.existsSync(videoPath)) {
            try {
              fs.unlinkSync(videoPath);
              console.log('Deleted video for passed spec:', videoPath);
            } catch (err) {
              console.error('Failed to delete video:', err);
            }
          }
        });
      });
    },
  },
});
