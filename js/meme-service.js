'use strict'

var gImags = createImgs();
var gTopKeys=getTopKeys();





function getSortedKeys(){
    return gTopKeys.slice();
}


function getTopKeys(){
    var topKeys = {};
    var keys=[];
    gImags.forEach(img => {
        img.keyWords.forEach(keyWord => {
            if(!topKeys[`${keyWord}`]) topKeys[`${keyWord}`] = 1;
            else topKeys[`${keyWord}`]++;                
        });
    });
    var i=0;

    for(var key in topKeys){
        var arr=[`${key}`,`${topKeys[key]}`];
        keys.push(arr);
    }

    return keys;
}








function getImgs() {
    return gImags
}

function createImgs() {
    var imgs = [];

    imgs.push(createImg(1, 'meme-imgs (square)/1', ['stupid', 'president', 'funny']))
    imgs.push(createImg(2, 'meme-imgs (square)/2', ['animals', 'dogs', 'sweet']))
    imgs.push(createImg(3, 'meme-imgs (square)/3', ['animals', 'dogs', 'sweet', 'baby']))
    imgs.push(createImg(4, 'meme-imgs (square)/4', ['animals', 'sweet', 'cat']))
    imgs.push(createImg(5, 'meme-imgs (square)/5', ['sweet', 'baby']))
    imgs.push(createImg(6, 'meme-imgs (square)/6', ['funny', 'man']))
    imgs.push(createImg(7, 'meme-imgs (square)/7', ['sweet', 'baby']))
    imgs.push(createImg(8, 'meme-imgs (square)/8', ['funny', 'movie']))
    imgs.push(createImg(9, 'meme-imgs (square)/9', ['sweet', 'baby', 'funny']))
    imgs.push(createImg(10, 'meme-imgs (square)/10', ['president', 'funny']))
    imgs.push(createImg(11, 'meme-imgs (square)/11', ['kiss', 'sport']))
    imgs.push(createImg(12, 'meme-imgs (square)/12', ['funny', 'tv']))
    imgs.push(createImg(13, 'meme-imgs (square)/13', ['movie', 'funny']))
    imgs.push(createImg(14, 'meme-imgs (square)/14', ['movie', 'matrix']))
    imgs.push(createImg(15, 'meme-imgs (square)/15', ['movie', 'boromir']))
    imgs.push(createImg(16, 'meme-imgs (square)/16', ['movie', 'star trek']))
    imgs.push(createImg(17, 'meme-imgs (square)/17', ['president', 'evil']))
    imgs.push(createImg(18, 'meme-imgs (square)/18', ['movie', 'funny']))

    return imgs;

}


function createImg(id, url, keyWords) {
    return {
        id,
        url,
        keyWords
    };
}