const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')



test('normalizeURL', () => {
    expect(normalizeURL('https://www.example.com/path/')).toBe('example.com/path')
    expect(normalizeURL('http://www.example.com/path/')).toBe('example.com/path')
    expect(normalizeURL('https://www.example.com/path')).toBe('example.com/path')
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
    expect(normalizeURL('https://BLOG.boot.dev/path')).toBe('blog.boot.dev/path')
    expect(normalizeURL('http://BLOG.boot.dev/path')).toBe('blog.boot.dev/path')
})

test(`getURLsFromHTML`, () => {
    const htmlBody = `
    <html>
        <body>
            <a href="https://www.example.com/path/">
                <a href="https://www.example.com/path/page1">
                    <a href="https://www.example.com/path/page2">
                        <a href="https://www.example.com/path/page3">
                        </a>
                    </a>
                </a>
            </a>
        </body>
    </html>
    `
    expect(getURLsFromHTML(htmlBody)).toEqual([
        'example.com/path',
        'example.com/path/page1',
        'example.com/path/page2',
        'example.com/path/page3',
    ])


})


