/* Download SVG */
function downloadSVG(id) {
  const svg = document.getElementById(id).outerHTML;
  const blob = new Blob([svg.toString()]);
  const element = document.createElement("a");
  element.download = `logo_${id}.svg`;
  element.href = window.URL.createObjectURL(blob);
  element.click();
  element.remove();
}

/* Fitty !!! */
fitty('.fittext');

/* Handle the dark/light toggle button */
const sun = document.querySelector(".feather-sun");
const moon = document.querySelector(".feather-moon");
sun.classList.toggle("hidden");

function toggleDarkMode(){
  document.body.classList.toggle("dark");
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  thematisation();
}

/* Handle the theming pantone color of the year */
/* theming preference is saved locally*/

async function applyTheme(year){
  //Get the root for changing CSS vars
  const root = document.querySelector('html');

  //Get the output element
  const output = document.getElementById('theme');

  //Save the value in localStorage
  localStorage.theme = year;
  //Get the data from my json file
  let resp = await fetch('/pantone-color-of-the-year.json');
  let data = await resp.json();
  //Get the specific data for the input value
  let coloroftheyear = data.filter(obj => {
      return obj.year === year;
  });
  //Show the year and the color name selected under the range slider
  output.value = `${year} ${coloroftheyear[0].name}`;
  root.style.setProperty('--pantoned1',coloroftheyear[0].pantonedHex[5]);
  root.style.setProperty('--pantoned2',coloroftheyear[0].pantonedHex[4]);
  root.style.setProperty('--pantoned3',coloroftheyear[0].pantonedHex[3]);
  root.style.setProperty('--pantoned4',coloroftheyear[0].pantonedHex[2]);
  root.style.setProperty('--pantoned5',coloroftheyear[0].pantonedHex[1]);
  root.style.setProperty('--pantoned6',coloroftheyear[0].pantonedHex[0]);

  //Recalculate the contrast
  displayContrast();
}

//Thematisation des logos
async function thematisation() {
  //Get the data from my json file
  let resp = await fetch('/pantone-color-of-the-year.json');
  let data = await resp.json();
  //Grab the logos
  const cont = document.getElementById("logoThemise");
  const logos = cont.querySelectorAll("svg");
  //Check if this is dark mode
  const dark = document.body.classList.contains('dark');
  //Change the colors
  for(let i=0;i<logos.length;i++){
    logos[i].querySelectorAll(".logotype").forEach(letter => {
      if(dark){
        letter.style = `fill:${data[i].pantonedHex[5]};`;
      }
      else{
        letter.style = `fill:${data[i].pantonedHex[0]};`;
      }
    });
    logos[i].querySelectorAll(".bottomleft").forEach(letter => {
      if(dark){
        letter.style = `fill:${data[i].pantonedHex[5]};`;
      }
      else{
        letter.style = `fill:${data[i].pantonedHex[0]};`;
      }
    });
    logos[i].querySelectorAll(".bottomright").forEach(letter => {
      if(dark){
        letter.style = `fill:${data[i].pantonedHex[4]};`;
      }
      else{
        letter.style = `fill:${data[i].pantonedHex[1]};`;
      }
    });
    logos[i].querySelectorAll(".topleft").forEach(letter => {
      if(dark){
        letter.style = `fill:${data[i].pantonedHex[4]};`;
      }
      else{
        letter.style = `fill:${data[i].pantonedHex[1]};`;
      }
    });
    logos[i].querySelectorAll(".topright").forEach(letter => {
      if(dark){
        letter.style = `fill:${data[i].pantonedHex[3]};`;
      }
      else{
        letter.style = `fill:${data[i].pantonedHex[2]};`;
      }
    });
  }
}
thematisation();


function handleThemingMobile(but){
  //Get the input/output
  const input = but.getAttribute("year");
  //Apply Theming
  applyTheme(input);
  //Close dropdown
  toggleThemeMenu();
}

function handleThemingDesktop(){
  //Get the input/output
  const input = document.getElementById('pantone-color-year').value;
  //Apply Theming
  applyTheme(input);
}

function setSlider(year){
  //Get the slider element and change the input
  const handle = document.getElementById('pantone-color-year');
  handle.value = year;
}

function toggleThemeMenu(){
  const themeMenu = document.getElementById('themeMenu');
  themeMenu.classList.toggle("hidden");
}

/* Convert rgb to Hex color */
function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
/* Convert Hex to rgb color */
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/* Calculate luminance for a rgb color */
function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/* Calculate the contrast ratio with luminance */
function contrastLuminance(l1,l2) {
  return(l1 < l2 ? (l2+0.05)/(l1+0.05) : (l1+0.05)/(l2+0.05));
}

/* Calculate the contrast ration between 2 hex colors */
function contrastRatio(hex1,hex2) {
  let rgb1 = hexToRgb(hex1);
  let rgb2 = hexToRgb(hex2);
  let lum1 = luminance(rgb1.r,rgb1.g,rgb1.b);
  let lum2 = luminance(rgb2.r,rgb2.g,rgb2.b);
  
  return(contrastLuminance(lum1,lum2));
}

function displayContrast() {
  const contrast1 = document.getElementById("contrast1");
  const contrast2 = document.getElementById("contrast2");
  const contrast3 = document.getElementById("contrast3");

  let val1 = contrastRatio(getComputedStyle(document.documentElement).getPropertyValue('--pantoned6'),getComputedStyle(document.documentElement).getPropertyValue('--pantoned1'));
  let val2 = contrastRatio(getComputedStyle(document.documentElement).getPropertyValue('--pantoned5'),getComputedStyle(document.documentElement).getPropertyValue('--pantoned2'));
  let val3 = contrastRatio(getComputedStyle(document.documentElement).getPropertyValue('--pantoned3'),getComputedStyle(document.documentElement).getPropertyValue('--pantoned6'));

  contrast1.value = Math.round(val1 * 10)/10;
  contrast2.value = Math.round(val2 * 10)/10;
  contrast3.value = Math.round(val3 * 10)/10;
}
displayContrast();

/* Hover effect for colors */
function hoverColorMatrix() {
  const colorMatrix = document.getElementById("colorMatrix");
  const children = [...colorMatrix.childNodes];
  for(let i=1;i<children.length;i+=2){
    if(i<12){
      children[i].textContent = `pantoned${(i+1)/2}`;
      children[i].addEventListener("mouseenter",(event) => {
        event.target.textContent = RGBToHex(getComputedStyle(event.target).backgroundColor);
      });
      children[i].addEventListener("mouseleave",(event) => {
        event.target.textContent = `pantoned${(i+1)/2}`;
      });
    }
    else{
      children[i].textContent = `neutral${(i-11)/2}`;
      children[i].addEventListener("mouseenter",(event) => {
        event.target.textContent = RGBToHex(getComputedStyle(event.target).backgroundColor);
      });
      children[i].addEventListener("mouseleave",(event) => {
        event.target.textContent = `neutral${(i+1)/2}`;
      });
    }    
  }
}
hoverColorMatrix();

if (!('theme' in localStorage))  {
  applyTheme(2022);
} else {
  applyTheme(localStorage.theme);
  setSlider(localStorage.theme);
}

