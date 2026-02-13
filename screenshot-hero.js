const puppeteer = require('puppeteer');

async function main() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1280, height: 800 }
    });

    const page = await browser.newPage();

    try {
        console.log('Loading http://localhost:3000...');
        await page.goto('http://localhost:3000', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        console.log('Waiting for page to fully load...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const outputPath = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/697e3322-9e75-4fee-a34e-7134c43d7fa2/scratchpad/hero-after.png';
        
        console.log(`Taking screenshot and saving to ${outputPath}...`);
        await page.screenshot({
            path: outputPath,
            fullPage: false
        });

        console.log('Screenshot captured successfully!');
        console.log(`Saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

main();
