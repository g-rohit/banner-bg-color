const colorThief = new ColorThief();
// var colorsys = require('colorsys')
// function to convert rgb to hex

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

// load show image after upload

function showMyImage(fileInput) {
  var files = fileInput.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    if (!file.type.match(imageType)) {
      continue;
    }
    var img = document.getElementById("companyProductImage");
    img.file = file;
    var reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
    console.log("image loaded");

    generateColorCode();
  }
}

// generating the colors based on the image
function generateColorCode() {
  console.log("generateColorCode:");

  let companyProductImage = document.querySelector("#companyProductImage");

  // Make sure image is finished loading
  if (companyProductImage.complete) {
    console.log("companyProductImage img");

    console.log(companyProductImage);

    setTimeout(function () {
      runColorThief(companyProductImage);
    }, 500);
  } else {
    companyProductImage.addEventListener("load", function () {
      console.log("companyProductImage img path");
      // image path:

      setTimeout(function () {
        runColorThief(companyProductImage);
      }, 500);

      console.log(companyProductImage);
    });
  }
}

function runColorThief(imgElement) {
  var imageColors = colorThief.getPalette(imgElement, 2);
  console.log("colorCodes generated");
  console.log(imageColors);

  let r = imageColors[0][0];
  let g = imageColors[0][1];
  let b = imageColors[0][2];

  var colorCodeGenerated = rgbToHex(r, g, b);

  console.log(colorCodeGenerated);

  var companyBanner = document.querySelector(".companyBanner");
  //   let createBg =   colorCodeGenerated + ' url(' + companyProductImage.src + ')' + ' ' + ' no-repeat';
  let createBg =
    "linear-gradient(180deg, rgba(" +
    r +
    "," +
    g +
    "," +
    b +
    "," +
    "0.9) 7.31%, rgba(" +
    r +
    "," +
    g +
    "," +
    b +
    "," +
    "0.5) 100%), linear-gradient(0deg," +
    "rgba(" +
    r +
    "," +
    g +
    "," +
    b +
    "," +
    "0.8), rgba(" +
    +r +
    "," +
    g +
    "," +
    b +
    "," +
    "0.8)), url(" +
    companyProductImage.src +
    ")";

  // bg image url
  // console.log(createBg);

  //   'linear-gradient(180deg, rgba(' + r + ',' + g + ', ' + b+ ',' + '0.385) 7.31%, rgba(' + r + ',' + g + ', ' + b + ') 100%), linear-gradient(0deg, rgba(' + r + ',' + g + ', ' + b + ',' + '0.4)'+ ',' + 'url(' + companyProductImage.src + ')';

  companyBanner.style.background = createBg;
  companyBanner.style.backgroundSize = "cover";
  companyBanner.style.backgroundRepeat = "no-repeat";
}

// converting rbg to HSL

function rgb2Hsl(r, g, b) {
  const RGB_MAX = 255;
  const HUE_MAX = 360;
  const SV_MAX = 100;

  if (typeof r === "object") {
    const args = r;
    r = args.r;
    g = args.g;
    b = args.b;
  }
  // It converts [0,255] format, to [0,1]
  r = r === RGB_MAX ? 1 : (r % RGB_MAX) / parseFloat(RGB_MAX);
  g = g === RGB_MAX ? 1 : (g % RGB_MAX) / parseFloat(RGB_MAX);
  b = b === RGB_MAX ? 1 : (b % RGB_MAX) / parseFloat(RGB_MAX);

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * HUE_MAX),
    s: Math.round(s * SV_MAX),
    l: Math.round(l * SV_MAX),
  };
}

// generating paltters for images
// console.log(document.querySelectorAll(".inner > img"));

console.log(
  document.querySelectorAll(".inner>img").forEach((each) => {
    // console.log(each.currentSrc);

    const img = each;

    // console.log("img: ", img);

    // Make sure image is finished loading
    if (img.complete) {
      let eachColorCode = colorThief.getColor(img);

      console.log("eachColorCode", eachColorCode);

      let r = eachColorCode[0];
      let g = eachColorCode[1];
      let b = eachColorCode[2];

      // var colorCodeGenerated = rgbToHex(r, g, b);

      // console.log(colorCodeGenerated);
      // each.style.background = `${colorCodeGenerated}80`;

      let getHSL = rgb2Hsl(r, g, b);

      console.log("getHSL", getHSL);

      let h = getHSL.h;
      let s = getHSL.s;
      let l = getHSL.l;

      l > 50 ? (l = 30) : (l = 90);

      // let color = each.style.background = `rgb(${r},${g},${b},.8)`;

      let color = (each.style.background = `hsl(${h},${s}%,${l}%)`);

      console.log("color", color);

      console.log(`1: `);
      console.log(colorThief.getColor(img));
    } else {
      img.addEventListener("load", function () {
        console.log(`2: `);
        colorThief.getColor(img);
        console.log(colorThief.getColor(img));
      });
    }
  })
);
