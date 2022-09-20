const format = require('date-fns/format');
const fs = require('fs');
const eleventyPluginFeathericons = require('eleventy-plugin-feathericons');

let getSvgContent = function (file,id) {
  let relativeFilePath = `./src/assets/images/${file}.svg`;
  let data = fs.readFileSync(relativeFilePath, 
  function(err, contents) {
     if (err) return err
     return contents
  });

  return data.toString('utf8').replace('toInject',id);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/*.ico");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");

  eleventyConfig.addPlugin(eleventyPluginFeathericons);

  eleventyConfig.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  });

  eleventyConfig.addShortcode("svg", getSvgContent);

  eleventyConfig.addGlobalData('generated', () => {
    let now = new Date();
    return new Intl.DateTimeFormat("fr",  
    {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      day:"2-digit",
      month:"2-digit",
      year:"2-digit"
    }).format(now);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  }
};