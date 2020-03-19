window.onload = function() {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function() {
        document.body.style.background = randColor();
    });
};

function randColor() {
    var hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    return '#' + (function co(lor) {
        return (lor += hex[Math.floor(Math.random() * 16)]) && (lor.length == 6)
            ? lor
            : co(lor);
    })('');
}
