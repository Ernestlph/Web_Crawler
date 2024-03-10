const { argv } = require('node:process');
const { crawlPage } = require('./crawl');


// for the main fucntion, If the number of CLI arguments is less than 1, print an error and exit.
//If the number of CLI arguments is more than 1, print an error and exit.
//If we have exactly one CLI argument, it's the "baseURL", so print some kind of message letting the user know the crawler is starting at that baseURL
async function main() {
    if (argv.length < 3) {
        console.log("Error: No URL provided");
        process.exit(1);
    }
    if (argv.length > 3) {
        console.log("Error: Too many arguments provided");
        process.exit(1);
    }
    if (argv.length === 3) {
        console.log(`Crawler started at ${argv[2]}`);
    }
    const baseURL = argv[2];

    let pages = {}
    pages = await crawlPage(baseURL, baseURL, pages)
    //const entries = Object.entries(pages)


    //for (const [key, value] of entries) {
    //    console.log(`This is part of main: ${key}: ${value}`)
    // }
    console.log(pages)

}

main()

