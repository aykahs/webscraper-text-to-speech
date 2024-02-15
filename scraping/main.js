const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('graceful-fs');

const extractLinks = $ => $('.entry-content p a').last().attr('href')
const extractContent = $ => $('.entry-content').text();

const extractheader = $ => $('.entry-title').text();
const url = 'https://moonbunnycafe.com/kumo-desu-ga-nani-ka/kumo-desu-ga-nani-ka-chapter-1/';
// crawlTask(url);

const crawl = async url => {
    console.log(url)
    axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data); // Initialize cheerio
        const url = extractLinks($);
        let content = extractContent($);
        content = content.replace(/\t/g, '')
        content = content.replace('Previous Chapter | Project Page | Next Chapter', '')
        content = content.replace('Previous Chapter | Project Page | Next Chapter', '')
        content = content.replace('1 Prologue', '')

        console.log(content)
        let header = extractheader($);
        header = header.replace(/\,/g, '').replace(/\?/g, '').replace(/\s+/g, '').toLowerCase();
        header = '../Text/' + header + '.txt';
        fs.writeFile(header, content, 'utf8', (err) => {
            if (err) {
              console.error('Error appending to file:', err);
            } else {
              console.log('Data has been appended to the file.');
            }
          });
        if (url == undefined){
            return 'done';
        }
        crawlTask(url);
    });
};

const crawlTask = async(url) => {
  await crawl(url);
};
(async () => {
    await crawlTask(url);
})();