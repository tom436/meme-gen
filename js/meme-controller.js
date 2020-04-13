var gKeysIndex = 3;

var gfonts = [' Impact', ' Georgia', ' Palatino Linotype', ' Times New Roman', ' Comic Sans MS', ' Arial']

function onInit() {

    renderGallery(getImgs())
    renderTopKeys()
    renderFonts()


}
function onTypeSearch() {
    var res = document.querySelector('.search')
    onSearch(res.value)
}
function onShowGallery() {
    document.querySelector('.gallery').style.display = 'flex'
    document.querySelector('.actions').style.display = 'flex'
}

function onShowMems() {
    hideGallery()
}
function hideGallery() {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.actions').style.display = 'none'
}
function start() {
    document.querySelector(".welcome").style.display = 'none'
    onShowGallery()
}
function renderFonts() {
    var htmlMap = gfonts.map(font => {

        return `<option value='${font}'>${font}</option>`
    })

    document.querySelector('#font').innerHTML = htmlMap.join(' ');


}
function showMoreKeys() {

    if (gKeysIndex >= gTopKeys.length - 1) {

        document.querySelector('.reset').style.display = 'block';
        document.querySelector('.more').style.display = 'none';

        return
    }
    gKeysIndex += 2;

    renderTopKeys()
}
function resetKeys() {
    gKeysIndex = 3;
    renderTopKeys()
}
//eturn el.toLowerCase().indexOf(query.toLowerCase()) !== -1

function onSearch(key) {

    var res = gImags.filter(img => (img['keyWords']).join('-').toLowerCase().includes(key.toLowerCase()))

    renderGallery(res)

}

function renderTopKeys() {

    var keys = getSortedKeys()

    keys.splice(gKeysIndex)
    var elKeys = document.querySelector(".top-key");
    var strHtml = '';
    var btnSize;
    keys.forEach((key) => {
        if (key[1] >= 4) strHtml += `<li><a onclick="onSearch('${key[0]}')" class="big" href="#">${key[0]}</a></li>`
        else if (key[1] >= 2) strHtml += `<li><a onclick="onSearch('${key[0]}')" class="med" href="#">${key[0]}</a></li>`
        else strHtml += `<li><a  onclick="onSearch('${key[0]}')" class="small" href="#">${key[0]}</a></li>`
        btnSize = key[1];
    });
    if (btnSize >= 4) {
        strHtml += '<a class="more big" href="#" onclick="showMoreKeys()">...More</a>'
        strHtml += '<a class="reset big" href="#" onclick="resetKeys()">...Reset</a>'
    }
    else if (btnSize >= 2) {
        strHtml += '<a class="more med" href="#" onclick="showMoreKeys()">...More</a>'
        strHtml += '<a class="reset med" href="#" onclick="resetKeys()">...Reset</a>'
    }
    else {
        strHtml += '<a class="more small" href="#" onclick="showMoreKeys()">...More</a>'
        strHtml += '<a class="reset small" href="#" onclick="resetKeys()">...Reset</a>'
    }
    elKeys.innerHTML = strHtml;

}

function onRenderEditor(ev) {
    document.querySelector('.Meme-Editor').style.display = 'flex'
    var imgId = ev.getAttribute("data-id");
    gMeme.selectedImgId = imgId

    hideGallery()
    drawImg(imgId)
    drawFrame()
    //gCtx.beginPath()
    //gCtx.lineWidth=20;
    //gCtx.lineTo(200, 200)
    //gCtx.closePath()
    //gCtx.strokeStyle = 'red'
    //gCtx.stroke()
}



function renderGallery(imgsToShow) {
    var imgs = imgsToShow;
    var elGallery = document.querySelector(".gallery")

    var strHtmls = imgs.map(getMapHtml).join('')
    elGallery.innerHTML = strHtmls;
}

function getMapHtml(img) {

    return `<img onclick="onRenderEditor(this)" data-id="${img.id}" class="photo" src="meme-imgs-(square)/${img.id}.jpg" alt="">`
}