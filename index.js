// 创建初始化函数
function init() {
  var otab = document.querySelector(".tab"),
    str = "",
    id = 1; //返回文档指定的css元素，并保存
  for (var i = 0; i < 4; i++) {
    str += "<tr>";
    for (var j = 0; j < 4; j++) {
      str += '<td id="' + id++ + '"></td>';
    }
    str += "</tr>";
  }
  otab.innerHTML = str;
  randomNum();
  randomNum();
  result();
}

//创建一个任意区间的随机函数
function myRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
//随机在格子上生成一个数字
function randomNum() {
  var num = myRandom(1, 16);
  ogrid = document.getElementById(num);
  if (ogrid.innerHTML == "") {
    ogrid.innerHTML = myRandom(1, 2) * 2;
  } else {
    randomNum();
  }
}

//上键
function movetop() {
  for (var i = 1; i <= 4; i++) {
    for (var j = i; j <= i + 12; j += 4) {
      for (k = j; k > 4; k -= 4) {
        change(document.getElementById(k - 4), document.getElementById(k));
      }
    }
  }
}

//下键
function bottom() {
  for (var i = 1; i <= 4; i++) {
    for (var j = i + 12; j >= i; j -= 4) {
      for (var k = j; k < 13; k += 4) {
        change(document.getElementById(k + 4), document.getElementById(k));
      }
    }
  }
}
//左键
function left() {
  for (var i = 1; i <= 13; i += 4) {
    for (var j = i; j <= i + 3; j++) {
      for (var k = j; k > i; k--) {
        change(document.getElementById(k - 1), document.getElementById(k));
      }
    }
  }
}
//右键
function right() {
  for (var i = 1; i <= 13; i += 4) {
    for (var j = i + 4; j >= i; j--) {
      for (var k = j; k < i + 3; k++) {
        change(document.getElementById(k + 1), document.getElementById(k));
      }
    }
  }
}
//移动合并检测函数
function change(before, after) {
  //移动
  if (before.innerHTML == "" && after.innerHTML != "") {
    before.innerHTML = after.innerHTML;
    after.innerHTML = "";
  }
  //合并
  if (before.innerHTML != "" && before.innerHTML == after.innerHTML) {
    before.innerHTML *= 2;
    after.innerHTML = "";
  }
}
//改变颜色计算结果函数
function result() {
  var color = {
      "": "#fff",
      2: "#0f0",
      4: "#00ccff",
      8: "#ff9900",
      16: "#00cc66",
      32: "#ffcccc",
      64: "#ff33ff",
      128: "#0066cc",
      256: "#6633cc",
      512: "#ff0099",
      1024: "#990033",
      2048: "#6600ff",
      4096: "#cc0066",
    },
    score = 0;
  for (var i = 1; i <= 16; i++) {
    var ogrid = document.getElementById(i);
    ogrid.style.backgroundColor = color[ogrid.innerHTML];
    score += Number(ogrid.innerHTML);
  }
  document.querySelector(".score").innerHTML = score;
}

window.onload = init(); //加载完成后调用init

document.onkeydown = function (e) {
  if (/38/.test(e.keyCode)) movetop();
  if (/40/.test(e.keyCode)) bottom();
  if (/37/.test(e.keyCode)) left();
  if (/39/.test(e.keyCode)) right();
  if (/13/.test(e.keyCode)) init();
  randomNum();
  result();
};
