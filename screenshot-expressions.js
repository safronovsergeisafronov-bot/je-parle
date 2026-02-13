const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        console.log('Waiting for page to load...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Finding Expressions section...');
        // Find the section containing "Поймёшь ли" (accounting for nbsp and regular spaces)
        const expressionsSection = await page.evaluate(() => {
            const headings = Array.from(document.querySelectorAll('h2, h3'));
            const targetHeading = headings.find(h => {
                const text = h.textContent.replace(/\s+/g, ' ').trim();
                return text.includes('Поймёшь ли');
            });

            if (targetHeading) {
                const section = targetHeading.closest('section');
                if (section) {
                    const rect = section.getBoundingClientRect();
                    return {
                        found: true,
                        top: rect.top + window.scrollY,
                        height: rect.height
                    };
                }
            }
            return { found: false };
        });

        if (!expressionsSection.found) {
            console.error('Could not find Expressions section with "Поймёшь ли ты"');
            return;
        }

        console.log('Scrolling to Expressions section...');
        // Scroll to center the section in viewport
        await page.evaluate((top, height) => {
            const centerOffset = (window.innerHeight - height) / 2;
            window.scrollTo({
                top: Math.max(0, top - centerOffset),
                behavior: 'smooth'
            });
        }, expressionsSection.top, expressionsSection.height);

        console.log('Waiting for animations and elements to render...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const screenshotPath = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/2f36fdd8-c3ca-4781-955c-40121f9f5ffd/scratchpad/expressions.png';

        console.log(`Taking screenshot to ${screenshotPath}...`);
        await page.screenshot({
            path: screenshotPath,
            fullPage: false
        });

        console.log('Screenshot saved successfully!');

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
