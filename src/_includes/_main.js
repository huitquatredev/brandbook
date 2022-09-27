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
}

/* Handle the theming pantone color of the year */
/* theming preference is saved locally*/

async function applyTheme(year){
  let h,s,l,h1,h2,h3,s1,s2,s3,l1,l2,l3,a,b,hsl;
  let m=20;

  //Get the root for changing CSS vars
  const root = document.querySelector('html');

  //Get the output element
  const output = document.querySelector('output');

  //Get the SVGs
  // THEMED LIGHT
  const svgThemedLight = document.querySelector("#themed--light");
  const svgThemedLightText = svgThemedLight.querySelectorAll("path.logotext");
  const svgThemedLightRectBot = svgThemedLight.querySelectorAll("rect.rect--bot");
  const svgThemedLightRectTop = svgThemedLight.querySelectorAll("rect.rect--top");
  const svgThemedLightRectBig = svgThemedLight.querySelectorAll("rect.rect--big");

  // THEMED DARK
  const svgThemedDark = document.querySelector("#themed--dark");
  const svgThemedDarkText = svgThemedDark.querySelectorAll("path.logotext");
  const svgThemedDarkRectBot = svgThemedDark.querySelectorAll("rect.rect--bot");
  const svgThemedDarkRectTop = svgThemedDark.querySelectorAll("rect.rect--top");
  const svgThemedDarkRectBig = svgThemedDark.querySelectorAll("rect.rect--big");

  // LARGE THEMED DARK
  const svgLargeThemedDark = document.querySelector("#large-themed--dark");
  const svgLargeThemedDarkText = svgLargeThemedDark.querySelectorAll("path.logotext");
  const svgLargeThemedDarkRectBot = svgLargeThemedDark.querySelectorAll("rect.rect--bot");
  const svgLargeThemedDarkRectTop = svgLargeThemedDark.querySelectorAll("rect.rect--top");
  const svgLargeThemedDarkRectBig = svgLargeThemedDark.querySelectorAll("rect.rect--big");

  // THEMED LIGHT
  const svgLargeThemedLight = document.querySelector("#large-themed--light");
  const svgLargeThemedLightText = svgLargeThemedLight.querySelectorAll("path.logotext");
  const svgLargeThemedLightRectBot = svgLargeThemedLight.querySelectorAll("rect.rect--bot");
  const svgLargeThemedLightRectTop = svgLargeThemedLight.querySelectorAll("rect.rect--top");
  const svgLargeThemedLightRectBig = svgLargeThemedLight.querySelectorAll("rect.rect--big");

  //Save the value in localStorage
  localStorage.theme = year;
  //Get the data from my json file
  let resp = await fetch('/pantone-color-of-the-year.json');
  let data = await resp.json();
  //Get the specific data for the input value
  let coloroftheyear = data.colors.filter(obj => {
      return obj.year === year;
  });
  if(coloroftheyear.length === 1){  
    //Ensure a sufficient contrast on each color
    root.style.setProperty('--onPantone',coloroftheyear[0].contrastPantone);
    root.style.setProperty('--onDarktone',coloroftheyear[0].contrastDark);
    root.style.setProperty('--onLightone',coloroftheyear[0].contrastLight);
    //Show the year and the color name selected under the range slider
    output.value = `${year} ${coloroftheyear[0].name}`;
    /*
    Calcul the l1, l2 and l3 values, with l1 the darkest color to l3 the lightest.
    If there is room, it will try to put pantone color in l2 but it can put it on l3 or l1 depending on the values.
    l1, l2 and l3 are equally apart from each other in term of lightness.
    */
    h = coloroftheyear[0].hue;
    s = Number(coloroftheyear[0].saturation.slice(0,-1));
    l = Number(coloroftheyear[0].lightness.slice(0,-1));
    //On the light side...
    if(l>50){
      a = (l - m)/2;
      b = (l - m)/3;
      //Too close from the edge...
      //Pantone color will be the lightest color
      if( (l+a) > (100-m) ){
        l3 = l; s3 = s;
        l2 = l - b; s2 = s / 2;
        l1 = l - 2 * b; s1 = s / 3;
      }
      //In the middle enough...
      //Pantone color will be the middle color
      else{
        l3 = l + a; s3 = s;
        l2 = l; s2 = s;
        l1 = l - a; s1 = s;
      }
    }
    //On the dark side...
    else{
      a = (100 - m - l)/2;
      b = (100 - m - l)/3;
      //Too close from the edge...
      //Pantone color will be the darkest color
      if((l-a) < m){
        l3 = l + 2 * b; s3 = s / 3;
        l2 = l + b; s2 = s / 2;
        l1 = l; s1 = s;
      }
      //In the middle enough...
      //Pantone color will be in the middle color
      else{
        l3 = l + a; s3 = s;
        l2 = l; s2 = s;
        l1 = l - a; s1 = s;
      }
    }
    //make darktone darker
    l1 = l1 * 0.5;
    l1 = l1 + "%";
    l2 = l2 + "%";
    l3 = l3 + "%";
    s1 = s1 + "%";
    s2 = s2 + "%";
    s3 = s3 + "%";
    hsl = 'hsl('+h+' '+s1+' '+l1+')';
    root.style.setProperty('--color-darktone',hsl);
    svgLargeThemedLightText.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectBot.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedLightText.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedLightRectBot.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedDark.setAttribute("style",`background-color:${hsl}`);
    svgLargeThemedDark.setAttribute("style",`background-color:${hsl}`);
    hsl = 'hsl('+h+' '+s2+' '+l2+')';
    root.style.setProperty('--color-pantone',hsl);
    svgThemedLightRectBig.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectBig.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    hsl = 'hsl('+h+' '+s3+' '+l3+')';
    root.style.setProperty('--color-lightone',hsl);
    svgThemedLightRectTop.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectTop.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    root.style.setProperty('--color-lghtgrey1','hsl('+h+' 20% 95%)');
    svgThemedDarkRectBot.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 20% 95%)`);
    });
    svgLargeThemedDarkRectBot.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 20% 95%)`);
    });
    svgThemedDarkText.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 20% 95%)`);
    });
    svgLargeThemedDarkText.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 20% 95%)`);
    });
    svgThemedLight.setAttribute("style",`background-color:hsl(${h} 20% 95%)`);
    svgLargeThemedLight.setAttribute("style",`background-color:hsl(${h} 20% 95%)`);
    root.style.setProperty('--color-lghtgrey2','hsl('+h+' 30% 80%)');
    svgThemedDarkRectBig.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 30% 80%)`);
    });
    svgLargeThemedDarkRectBig.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 30% 80%)`);
    });
    root.style.setProperty('--color-lghtgrey3','hsl('+h+' 40% 70%)');
    svgThemedDarkRectTop.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 40% 70%)`);
    });
    svgLargeThemedDarkRectTop.forEach(path =>{
      path.setAttribute('fill',`hsl(${h} 40% 70%)`);
    });
  }
  else{
    /*
    We have 2 colors (3 in the future ?). The third one will be calculated using a mean for each param.
    */

    s = Number(coloroftheyear[0].saturation.slice(0,-1));
    l = Number(coloroftheyear[0].lightness.slice(0,-1));
    h1 = coloroftheyear[0].hue;
    h2 = coloroftheyear[1].hue;
    h3 = (Number(h1) + Number(h2))/ 2;

    s1 = coloroftheyear[0].saturation;
    s2 = coloroftheyear[1].saturation;
    a = Number(s1.slice(0,-1));
    b = Number(s2.slice(0,-1));
    s3 = (a + b) / 2;
    s3 = s3 + '%';

    l1 = coloroftheyear[0].lightness;
    l2 = coloroftheyear[1].lightness;
    a = Number(l1.slice(0,-1));
    b = Number(l2.slice(0,-1));
    l3 = (a + b) / 2;
    //make darktone darker
    l3 = l3 * 0.35;
    l3 = l3 + '%';
    

    hsl = 'hsl('+h1+' '+s1+' '+l1+')';
    root.style.setProperty('--color-lightone',hsl);
    svgThemedLightRectTop.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectTop.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    root.style.setProperty('--color-lghtgrey1','hsl('+h2+' 20% 95%)');
    svgThemedDarkRectBot.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 20% 95%)`);
    });
    svgLargeThemedDarkRectBot.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 20% 95%)`);
    });
    svgThemedDarkText.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 20% 95%)`);
    });
    svgLargeThemedDarkText.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 20% 95%)`);
    });
    svgThemedLight.setAttribute("style",`background-color:hsl(${h2} 20% 95%)`);
    svgLargeThemedLight.setAttribute("style",`background-color:hsl(${h2} 20% 95%)`);
    root.style.setProperty('--color-lghtgrey2','hsl('+h2+' 30% 80%)');
    svgThemedDarkRectBig.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 30% 80%)`);
    });
    svgLargeThemedDarkRectBig.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 30% 80%)`);
    });
    root.style.setProperty('--color-lghtgrey3','hsl('+h2+' 40% 70%)');
    svgThemedDarkRectTop.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 40% 70%)`);
    });
    svgLargeThemedDarkRectTop.forEach(path =>{
      path.setAttribute('fill',`hsl(${h2} 40% 70%)`);
    });
    hsl = 'hsl('+h2+' '+s2+' '+l2+')';
    root.style.setProperty('--color-pantone',hsl);
    svgThemedLightRectBig.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectBig.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    hsl = 'hsl('+h3+' '+s3+' '+l3+')';
    root.style.setProperty('--color-darktone',hsl);
    svgLargeThemedLightText.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgLargeThemedLightRectBot.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedLightText.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedLightRectBot.forEach(path =>{
      path.setAttribute('fill',hsl);
    });
    svgThemedDark.setAttribute("style",`background-color:${hsl}`);
    svgLargeThemedDark.setAttribute("style",`background-color:${hsl}`);
    
    //Show the year and the color name selected under the range slider
    output.value = `${year} ${coloroftheyear[0].name} & ${coloroftheyear[1].name}`;        
    //Ensure a sufficient contrast on each color
    root.style.setProperty('--onPantone',coloroftheyear[1].contrastPantone);
    root.style.setProperty('--onDarktone','#FFF');
    root.style.setProperty('--onLightone',coloroftheyear[1].contrastLight);

  }
  pan1.addEventListener("mouseenter", event => {
    pan1.textContent = RGBToHex(getComputedStyle(pan1).backgroundColor);
  });
  pan1.addEventListener("mouseleave",event => {
    pan1.textContent = "pantoned1";
  });
  pan2.addEventListener("mouseenter", event => {
    pan2.textContent = RGBToHex(getComputedStyle(pan2).backgroundColor);
  });
  pan2.addEventListener("mouseleave",event => {
    pan2.textContent = "pantoned2";
  });
  pan3.addEventListener("mouseenter", event => {
    pan3.textContent = RGBToHex(getComputedStyle(pan3).backgroundColor);
  });
  pan3.addEventListener("mouseleave",event => {
    pan3.textContent = "pantoned3";
  });
  pan4.addEventListener("mouseenter", event => {
    pan4.textContent = RGBToHex(getComputedStyle(pan4).backgroundColor);
  });
  pan4.addEventListener("mouseleave",event => {
    pan4.textContent = "pantoned4";
  });
  pan5.addEventListener("mouseenter", event => {
    pan5.textContent = RGBToHex(getComputedStyle(pan5).backgroundColor);
  });
  pan5.addEventListener("mouseleave",event => {
    pan5.textContent = "pantoned5";
  });
  pan6.addEventListener("mouseenter", event => {
    pan6.textContent = RGBToHex(getComputedStyle(pan6).backgroundColor);
  });
  pan6.addEventListener("mouseleave",event => {
    pan6.textContent = "pantoned6";
  });

  neu1.addEventListener("mouseenter", event => {
    neu1.textContent = RGBToHex(getComputedStyle(neu1).backgroundColor);
  });
  neu1.addEventListener("mouseleave",event => {
    neu1.textContent = "neutral1";
  });
  neu2.addEventListener("mouseenter", event => {
    neu2.textContent = RGBToHex(getComputedStyle(neu2).backgroundColor);
  });
  neu2.addEventListener("mouseleave",event => {
    neu2.textContent = "neutral2";
  });
  neu3.addEventListener("mouseenter", event => {
    neu3.textContent = RGBToHex(getComputedStyle(neu3).backgroundColor);
  });
  neu3.addEventListener("mouseleave",event => {
    neu3.textContent = "neutral3";
  });
  neu4.addEventListener("mouseenter", event => {
    neu4.textContent = RGBToHex(getComputedStyle(neu4).backgroundColor);
  });
  neu4.addEventListener("mouseleave",event => {
    neu4.textContent = "neutral4";
  });
  neu5.addEventListener("mouseenter", event => {
    neu5.textContent = RGBToHex(getComputedStyle(neu5).backgroundColor);
  });
  neu5.addEventListener("mouseleave",event => {
    neu5.textContent = "neutral5";
  });
  neu6.addEventListener("mouseenter", event => {
    neu6.textContent = RGBToHex(getComputedStyle(neu6).backgroundColor);
  });
  neu6.addEventListener("mouseleave",event => {
    neu6.textContent = "neutral6";
  });
}

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
const pan1 = document.getElementById("pan1");
const pan2 = document.getElementById("pan2");
const pan3 = document.getElementById("pan3");
const pan4 = document.getElementById("pan4");
const pan5 = document.getElementById("pan5");
const pan6 = document.getElementById("pan6");

const neu1 = document.getElementById("neu1");
const neu2 = document.getElementById("neu2");
const neu3 = document.getElementById("neu3");
const neu4 = document.getElementById("neu4");
const neu5 = document.getElementById("neu5");
const neu6 = document.getElementById("neu6");

pan1.textContent = "pantoned1";
pan2.textContent = "pantoned2";
pan3.textContent = "pantoned3";
pan4.textContent = "pantoned4";
pan5.textContent = "pantoned5";
pan6.textContent = "pantoned6";
neu1.textContent = "neutral1";
neu2.textContent = "neutral2";
neu3.textContent = "neutral3";
neu4.textContent = "neutral4";
neu5.textContent = "neutral5";
neu6.textContent = "neutral6";

if (!('theme' in localStorage))  {
  applyTheme(2022);
} else {
  applyTheme(localStorage.theme);
  setSlider(localStorage.theme);
}

