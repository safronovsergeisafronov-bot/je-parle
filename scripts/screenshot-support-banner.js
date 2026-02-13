const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    try {
        // Set viewport
        await page.setViewport({ width: 1280, height: 800 });
        
        // Navigate to localhost
        console.log('Navigating to http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
        
        console.log('Page loaded, scrolling to y=900...');
        
        // Scroll to approximately y=900
        await page.evaluate(() => {
            window.scrollTo(0, 900);
        });
        
        // Wait a moment for scroll to complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create directory if it doesn't exist
        const outputDir = '/private/tmp/claude-501/-Users-sergejsafronov-Documents-French-Super-je-parle/697e3322-9e75-4fee-a34e-7134c43d7fa2/scratchpad';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPath = path.join(outputDir, 'support-banner-3.png');
        
        // Take screenshot
        await page.screenshot({ path: outputPath });
        
        console.log(`Screenshot saved to ${outputPath}`);
        
    } finally {
        await browser.close();
    }
}

main().catch(console.error);
