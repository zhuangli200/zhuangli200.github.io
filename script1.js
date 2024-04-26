// JavaScript source code

/*manual input*/
//登记Gallery需要的信息，依次为文件夹名字，图片数量，图片格式，图片是横/竖版
let galleryList = ["WF 11 jpg vertical", "JJ 6 jpeg horizontal", "C2D 2 png vertical", "NAR1 12 png vertical"];

/*翻页功能*/
function openTab(event, tabName) {
    // 获取所有标签页内容元素
    var tabContent = document.getElementsByClassName("box4");
    // 隐藏所有标签页内容，并重置gallery状态
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].scrollTop = 0; //重置滚动条
        if(tabName != "tab5"){
            let i;
            let pic_set = document.getElementsByClassName("pic_set");
            for(i = 0; i < pic_set.length; i++){
                pic_set[i].children[0].style.display = "none";
            }
        }
    }
    // 显示当前选中标签页内容，如果是gallery则显示第一张图片
    document.getElementById(tabName).style.display = "block";
    if(tabName == "tab5"){
        let i;
        let pic_set = document.getElementsByClassName("pic_set");
        for(i = 0; i < pic_set.length; i++){
            pic_set[i].children[0].style.display = "block";
        }
    }
    // 移除所有标签页选项卡的 active 类
    var tabs = document.getElementsByClassName("active");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    //移除指向时亮起的float标签
    event.currentTarget.className -= " float";
    // 添加 active 类到当前选中标签页选项卡
    event.currentTarget.className += " active";
}
/*菜单栏高亮特效*/
//鼠标指向选项时
function slideon(event){       
    if(!event.currentTarget.classList.contains("active")){event.currentTarget.className += " float";}
}
//鼠标移开时
function slideout(event){
    if(!event.currentTarget.classList.contains("active")){event.currentTarget.className -= "float";}
}

/*gallery(tab5)展示特效
    1.gallery页面show时展示第一张图
    2.每隔若干秒切换下一张图(把上一张设为hidden，下一张设为block)，鼠标moveon触发，moveout停止并切换回初始状态
    3.gallery页面hidden时回到初始状态*/
//更新图片
var timer;
function galleryshow(setName, i){
    let picset = document.getElementById(setName).children;
    if(i == picset.length){
        i = 0;
    }
    console.log(i);
    timer = setTimeout(picgonext, 1000, picset, i);
}
function picgonext(picset, i){
    if(i == 0){
        picset[picset.length-1].style.display = "none";
    }
    else{
        picset[i-1].style.display = "none";
    }
    picset[i].style.display = "block";
}
//重置循环状态
function galleryhidden(setName){
    clearTimeout(timer);
    let picset = document.getElementById(setName).children;
    picset[0].style.display = "block";
    let i;
    for(i=1;i<picset.length;i++){
        picset[i].style.display = "none";
    }
}

//网页加载时，遍历指定文件夹，为其中每个对象创建一个块级元素
function elementCreator(){
    let setList = []; 
    let galleryContainer = document.getElementsByClassName("gallery")[0];
    for(let i=0; i<galleryList.length; i++){
        var splitList = galleryList[i].split(' ');
        var dir = splitList[0];
        var count = splitList[1];
        var suf = splitList[2];
        var align = splitList[3];
        let divElement = document.createElement('div');
        divElement.id = "set" + i.toString();
        divElement.className = "gallery_container_" + align + " pic_set";
        divElement.onmouseleave = function(){
            galleryhidden.call(this, divElement.id);
        };
        //console.log(divElement.className);
        galleryContainer.appendChild(divElement);
        setList.push(divElement);
        for(let j=0; j<count; j++){
            let imgElement = document.createElement('img');
            imgElement.src ='Gallery/' + dir + '/' + (j+1).toString() + '.' + suf;
            imgElement.className = "gallery_sliderpic fade";
            imgElement.onmouseover = function(){
                galleryshow.call(this, setList[i].id, j+1);
            };
            //console.log(imgElement.onmouseover);
            setList[i].appendChild(imgElement);
        }
    }
}
