const colorThief = new ColorThief();

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
  companyBanner.style.background = colorCodeGenerated;
}
