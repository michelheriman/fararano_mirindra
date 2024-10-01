//<section class="hero" id = "main_d_">
function back_changer (id_, asset, n) {
    // this function aims to change the background image of element
    let node = document.querySelectorAll(id_);
    node[n].style.backgroundImage = asset;
}

const raw_images = [
    {filepath : "./assets/farmer.jpg", name : "farmer_1"},
    {filepath : "./assets/cocoa.jpg", name : "cocoa 1"},
    {filepath : "./assets/prods.jpg", name : "producteur"}
]

let imgElement = document.getElementById("main_d_");
let currentIndex = 0;
const changeImage = () => {
    let random_image = Math.floor(Math.random() * raw_images.length);
    let n_image = raw_images[random_image].filepath;
//console.log(`url(${n_image})`);
    //let u = `url(${n_image})`;
    imgElement.style.backgroundImage = `url(${n_image})`;
    imgElement.style.opacity = 0.9;
    currentIndex = (currentIndex + 1) % random_image.length; // Loop back to the first image
};

// Start the image loop
setInterval(changeImage, 3500); // 3000ms = 3 seconds

// Initially display the first image
changeImage();

back_changer("#process", "url(./assets/process.png)",0);