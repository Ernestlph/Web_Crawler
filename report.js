function printReport(pages) {
    // Sort the pages object according to count in descending order
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);

    // Print the sorted pages
    sortedPages.forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`);
    });

}

module.exports = {

    printReport

}