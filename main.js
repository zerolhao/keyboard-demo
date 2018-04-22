// 1. 初始化数据
var keys = init().keys
var hash = init().hash

// 2. 生成键盘
// 遍历 keys，生成kbd标签
generatorKeyboard(keys, hash)

// 3. 监听用户动作
listenToUser(hash)

// 下面是私有的工具函数
// 获得localstroge
function getfromLocalStroge(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}
// 初始化键盘
function init() {
  var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ]
  var hash = {
    q: 'qq.com',
    w: 'weibo.com',
    e: 'earth.google.com',
    r: 'runoob.com',
    t: 'twitter.com',
    y: 'youtube.com',
    u: undefined,
    i: 'iconfont.com',
    o: 'outlook.live.com',
    p: 'pixiv.net',
    a: 'amazon.com'
  }
  // 取出 localStorage 中的 zzz 对应的 hash
  var hashInLocalStorage = getfromLocalStroge("zzz")
  if (hashInLocalStorage) {
    hash = hashInLocalStorage
  }
  return {
    "keys": keys,
    "hash": hash
  }
}
// 创建标签及其属性
function tag(tagName, attributes) {
  var tag = document.createElement(tagName)
  for (var key in attributes) {
    tag[key] = attributes[key]
  }
  return tag
}
// 创建图片
function createImage(domain) {
  var img = tag("img")
  if (domain) {
    img.src = "http://" + domain + "/favicon.ico"
  } else {
    img.src = "//i.loli.net/2017/12/23/5a3e65cae1975.png"
  }
  img.onerror = function() {
    this.src = "//i.loli.net/2017/12/23/5a3e65cae1975.png"
  }
  return img
}
// 创建按钮
function createBtnEdit(id) {
  var btnEdit = tag('button')
  btnEdit.textContent = "E"
  btnEdit.id = id // 添加id
  btnEdit.onclick = function(luanda) {
    //var key = this.id  // 获得id，获得当前按键标识
    var key = luanda.target.id
    var text = prompt("给我一个网址") // 获得新网址
    hash[key] = text // hash 变更

    var img2 = this.previousSibling
    img2.src = "http://" + hash[key] + "/favicon.ico"
    img2.onerror = function() {
      this.src = "//i.loli.net/2017/12/23/5a3e65cae1975.png"
    }

    // 只要hash变了，就把hash存到uuu里面
    localStorage.setItem('zzz', JSON.stringify(hash))
  }
  return btnEdit
}
// 生成键盘
function generatorKeyboard(keys, hash) {
  // 遍历 keys，生成kbd标签
  for (var i = 0; i < keys.length; i++) {
    var div = tag("div", { className: "row" }) // 创建div标签
    keyboard.appendChild(div) // 将div标签添加到id为keyborad的标签的内部

    var row = keys[i] // 将第i个数组赋值给row，第i行...
    for (var j = 0; j < row.length; j++) {
      var kbd = tag("kbd") // 创建kbd标签
      div.appendChild(kbd) // 将kbd标签添加到div内

      var span = tag("span", { className: "text", textContent: row[j] })
      //span.textContent = row[j]  // 添加内容
      kbd.appendChild(span)

      var img = createImage(hash[row[j]])
      kbd.appendChild(img)

      // 创建编辑按钮
      var btnEdit = createBtnEdit(row[j])
      kbd.appendChild(btnEdit)
    }
  }
}
// 监听用户
function listenToUser(hash) {
  document.onkeypress = function(zxvcjklfrs) {
    var checkKey = zxvcjklfrs.key // 获得你按下的键
    var domain = hash[checkKey] // 获得对应网址
    location.href = 'http://' + domain //在当前页打开
    //window.open('http://' + domain)   // 在新的标签页打开
  }
}