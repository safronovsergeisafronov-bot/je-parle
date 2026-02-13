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
            waitUntil: 'networkidle0'
        });

        console.log('Waiting for #why element...');
        await page.waitForSelector('#why', { timeout: 5000 });

        // Get the position of the #why element
        const whyElement = await page.$('#why');
        const boundingBox = await whyElement.boundingBox();

        console.log('Scrolling to #why section...');
        // Scroll to make the sticky card visible and centered
        // The section is 300vh tall, so we scroll to about 1/3 of the section
        await page.evaluate((top) => {
            window.scrollTo({
                top: top + 300, // Add offset to center the sticky card
                behavior: 'smooth'
            });
        }, boundingBox.y);

        // Wait for scroll animation
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Taking first screenshot (initial state)...');
        await page.screenshot({
            path: '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/2f36fdd8-c3ca-4781-955c-40121f9f5ffd/scratchpad/why-it-works.png',
            fullPage: false
        });

        console.log('Scrolling down 500px for mid-scroll state...');
        await page.evaluate(() => {
            window.scrollBy({
                top: 500,
                behavior: 'smooth'
            });
        });

        // Wait for scroll animation and any transitions
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Taking second screenshot (mid-scroll state)...');
        await page.screenshot({
            path: '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/2f36fdd8-c3ca-4781-955c-40121f9f5ffd/scratchpad/why-it-works-mid.png',
            fullPage: false
        });

        console.log('Screenshots saved successfully!');

    } catch (error) {
        console.error('Error during screenshot capture:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
