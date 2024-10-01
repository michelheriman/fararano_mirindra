function back_changer (id_, asset, n) {
    // this function aims to change the background image of element
    let node = document.querySelectorAll(id_);
    node[n].style.backgroundImage = asset;
}

back_changer("#main_d",
        "url(./assets/farmer.jpg)",
    0);

document.querySelector('iframe').addEventListener('load', function() {
    // Access the iframe's window and reinitialize Swiper
    var iframeWindow = this.contentWindow;
    iframeWindow.swiper.update(); // Update the Swiper instance
});