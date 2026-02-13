const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1440, height: 900 }
    });

    const page = await browser.newPage();

    try {
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle2'
        });

        console.log('Waiting for page to load...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Finding TopicSpheres section...');
        // Find the heading containing "тишина" to locate TopicSpheres section
        const sectionElement = await page.evaluateHandle(() => {
            const headings = Array.from(document.querySelectorAll('h2, h3'));
            const targetHeading = headings.find(h => h.textContent.includes('тишина'));
            if (targetHeading) {
                // Find the parent section
                return targetHeading.closest('section') || targetHeading.parentElement;
            }
            return null;
        });

        if (sectionElement) {
            console.log('Scrolling to TopicSpheres section...');
            await page.evaluate((element) => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, sectionElement);

            console.log('Waiting for rendering...');
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Taking screenshot...');
            await page.screenshot({
                path: '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/2f36fdd8-c3ca-4781-955c-40121f9f5ffd/scratchpad/topic-spheres.png',
                fullPage: false
            });

            console.log('Screenshot saved successfully!');
        } else {
            console.error('Could not find TopicSpheres section with "тишина" text');
        }

    } catch (error) {
        console.error('Error occurred:', error.message);
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
