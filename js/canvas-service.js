var gElcanvas = document.querySelector('#my-canvas')
var gCtx = gElcanvas.getContext('2d');
var gIsDownLoad=false;
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 0,
            fontSize: 30,
            font: ' Impact',
            offsetHeight: 60,
            align: 'center',
            color: 'white',
            strokeColor:'black',
            offsetWidth:gElcanvas.width/2
        },
        {
            txt: '',
            size: 0,
            fontSize: 30,
            font: ' Impact',
            offsetHeight: 440,
            align: 'center',
            color: 'white',
            strokeColor:'black',
            offsetWidth:gElcanvas.width/2
        }
    ]
}
function onDownload(elLink){
    gIsDownLoad=true
    drawImg()
    dreawText()

    const data=gElcanvas.toDataURL()
    elLink.href=data
    elLink.download='my-img.jpg'
    gIsDownLoad=false

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElcanvas.width = elContainer.offsetWidth-8
    gElcanvas.height = elContainer.offsetHeight-8
}



function drawImg() {
    var img = new Image
    img.src = getImgSrc();

    resizeCanvas()
    gCtx.drawImage(img, 0, 0,gElcanvas.width,gElcanvas.height)

}



function addText(ev) {
    updteGmeme(ev)
    //if (gMeme.lines[gMeme.selectedLineIdx].size >= 30) return

    drawImg()
    dreawText()

}
function dreawText() {

    gMeme.lines.forEach((line) => {
        gCtx.strokeStyle = line.strokeColor
        
        gCtx.font = line.fontSize+'px' + line.font;
        
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        
        gCtx.fillText(line.txt, line.offsetWidth, line.offsetHeight)
        gCtx.strokeText(line.txt, line.offsetWidth, line.offsetHeight)
        gCtx.save();
    });
    if(!gIsDownLoad) drawFrame();
}
function drawFrame(){
    gMeme.lines.forEach((line,idx)=>{
        if(idx===gMeme.selectedLineIdx){
            gCtx.beginPath();    
            gCtx.rect(10, line.offsetHeight-30, 480, 40);
            gCtx.lineWidth='2'
            gCtx.strokeStyle = 'green';
            gCtx.stroke();

        }
        else{
            gCtx.beginPath();    
            gCtx.rect(10, line.offsetHeight-30, 480, 40);
            gCtx.lineWidth='0.2'
            gCtx.strokeStyle = 'black';
            gCtx.stroke();

        }
    })
    gCtx.restore();

}
function switchBetweenLines() {
    gMeme.selectedLineIdx++;
    if(gMeme.selectedLineIdx>=gMeme.lines.length)  gMeme.selectedLineIdx=0;
    document.querySelector('.text-line-1 input').value =gMeme.lines[gMeme.selectedLineIdx].txt

    drawImg()
    dreawText()
    //update gmeme
    /*
    var temp = gMeme.lines[aIdx]
    gMeme.lines[aIdx] = gMeme.lines[bIdx]
    gMeme.lines[bIdx] = temp;

    //update gmeme line offset
    var tempOffset = gMeme.lines[aIdx].offsetHeight
    gMeme.lines[aIdx].offsetHeight = gMeme.lines[bIdx].offsetHeight
    gMeme.lines[bIdx].offsetHeight = tempOffset;

    //update row value
    var tempVal = document.querySelector('.text-line-1 input').value
    document.querySelector('.text-line-1 input').value = document.querySelector('.text-line-2 input').value
    document.querySelector('.text-line-2 input').value = tempVal

    drawImg()
    dreawText()
    */
    
}
function onChooseColor(){
    var colorInput=document.querySelector('.text-color')
    colorInput.addEventListener('input',()=>{
        var color=colorInput.value;
        gMeme.lines[gMeme.selectedLineIdx].color=color;
        drawImg()
        dreawText()
    }
    )
    
}
function onChooseStrokeColor(){
    var colorInput=document.querySelector('.stroke-color')
    colorInput.addEventListener('input',()=>{
        var color=colorInput.value;
        gMeme.lines[gMeme.selectedLineIdx].strokeColor=color;
        drawImg()
        dreawText()
    }
    )
}
function onChangeFont(){
    var fontInput=document.querySelector('#font')

    fontInput.addEventListener('input',()=>{
        
        var font=fontInput.value;
        gMeme.lines[gMeme.selectedLineIdx].font=`${font}`;
        drawImg()
        dreawText()
    }
    )

}

function onAlign(pos){
    
    align(pos)
    drawImg()
    dreawText()
}
function align(pos){
    gMeme.lines.forEach(line=>{
        if(pos==='left'){
            line.offsetWidth=0;
            line.align=pos;
        }
        else if(pos==='center'){
            line.offsetWidth=gElcanvas.width/2;
            line.align=pos;
        }
        else{
            line.offsetWidth=gElcanvas.width-3;
            line.align=pos;
        }

    
    })
}

function onMoveDown(){
    if   (gMeme.lines[gMeme.selectedLineIdx].offsetHeight>460) return

    moveDown()
    drawImg()
    dreawText()
}

function moveDown(){
    gMeme.lines[gMeme.selectedLineIdx].offsetHeight+=10;

}
function onMoveUp(){
    if   (gMeme.lines[gMeme.selectedLineIdx].offsetHeight<50) return
    moveUp()
    
    drawImg()
    dreawText()
}

function moveUp(){
    gMeme.lines[gMeme.selectedLineIdx].offsetHeight-=10;

}
function onDeleteLine(){
    deleteLine()
    drawImg()
    dreawText()
}
function deleteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}


function onIncreaseFont(){
    increaseFont()
    drawImg()
    dreawText()
}
function increaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].fontSize+=2;

}
function onDecreaseFont(){
    decreaseFont()
    drawImg()
    dreawText()
}
function decreaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].fontSize-=2;

}

function updteGmeme(ev) {
    gMeme.lines[gMeme.selectedLineIdx].txt = ev.value
    //gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].txt.length

    //gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].txt.length
}
function onAddNewLine(){
    gMeme.lines.splice(gMeme.lines.length-1,0, CreateNewLine());

    drawImg()
    dreawText()
}
function CreateNewLine() {
    return {
        txt: '',
        size: 0,
        fontSize: 30,
        font: ' Impact',
        offsetHeight: 60*gMeme.lines.length,
        align: 'center',
        color: 'white',
        strokeColor:'black',

        offsetWidth:gElcanvas.width / 2

    }
}


function getImgSrc() {

    return `meme-imgs-(square)/${gMeme.selectedImgId}.jpg`

}