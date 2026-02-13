const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

        console.log('Waiting 3 seconds for page load...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Finding and scrolling to Спеццена section...');
        const scrollInfo = await page.evaluate(() => {
            // Find the element with "Спеццена" text (it's in a span)
            const spans = document.querySelectorAll('span');
            let target = null;

            for (const span of spans) {
                // Looking for the exact text "Спеццена" in a span
                if (span.textContent.trim() === 'Спеццена') {
                    target = span.closest('div.rounded-2xl');
                    if (target) break;
                }
            }

            if (target) {
                // Get the parent container that has both cards
                const parent = target.parentElement;

                // Get the position of this parent
                const rect = parent.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetScrollPos = scrollTop + rect.top - 100; // 100px from top for some padding

                // Scroll to the calculated position
                window.scrollTo({ top: targetScrollPos, behavior: 'auto' });

                return { found: true, scrollPos: targetScrollPos };
            }
            return { found: false, scrollPos: 0 };
        });

        const found = scrollInfo.found;

        console.log('Found pricing section:', found);

        if (!found) {
            throw new Error('Could not find pricing section with "Спеццена" text');
        }

        // Wait longer for scroll to complete and any animations
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check scroll position
        const scrollY = await page.evaluate(() => window.scrollY);
        console.log('Current scroll position:', scrollY);

        const screenshotPath = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/e64b55a9-b14f-41da-a0ca-84f54e3963bb/scratchpad/pricing-cards-v2.png';

        console.log(`Taking viewport screenshot and saving to ${screenshotPath}...`);
        await page.screenshot({
            path: screenshotPath,
            type: 'png'
        });

        console.log('Screenshot saved successfully!');

    } finally {
        await browser.close();
    }
}

main().catch(console.error);
