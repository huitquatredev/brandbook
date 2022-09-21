const filters = require('./src/filters.js');
const format = require('date-fns/format');
const fs = require('fs');
const eleventyPluginFeathericons = require('eleventy-plugin-feathericons');
const Image = require("@11ty/eleventy-img");

let getSvgContent = function (file,id) {
  let relativeFilePath = `./src/assets/images/${file}.svg`;
  let data = fs.readFileSync(relativeFilePath, 
  function(err, contents) {
     if (err) return err
     return contents
  });

  return data.toString('utf8').replace('toInject',id);
}

async function imageShortcode(id,picClasses,classes, src, alt, sizes = "100vw") {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [300, 600, 1200],
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: '_site/assets/images',
    urlPath: '/assets/images',
  });

  let lowsrc = metadata.jpeg[0];

  return `<picture id="${id}" class="${picClasses}">
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        class="${classes}">
    </picture>`;
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
  eleventyConfig.addNunjucksAsyncFilter('jsmin', filters.jsmin);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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