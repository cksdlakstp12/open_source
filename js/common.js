var isLimitedCheckbox = document.getElementById('is-limited')
var isLimitedNumInput = document.getElementById('is-limited-num-input')
var isLimitedAlerter = document.getElementById('is-limited-alerter')

window.onload = function () {
  document.getElementsByTagName('body')[0].classList.remove('preload')
}
isLimitedCheckbox.onchange = function () {
  if (isLimitedCheckbox.checked) {
    document.getElementById('is-limited-wrapper').style = "background-color: #fff;"
  } else {
    document.getElementById('is-limited-wrapper').style = "background-color: rgba(0, 0, 0, 0);"
  }
}
isLimitedNumInput.onchange = function () {
  if (isLimitedNumInput.value < 12) {
    isLimitedAlerter.innerHTML = '12자리 이상!'
  } else {
    isLimitedAlerter.innerHTML = '글자수 제한'
  }
}

// 이 밑은 돌아올 수 없는 강입니다. 그래도 보시겠습니까?

function umfinder (value) {
  if (value === '엄' || value === '응') {document.getElementById('supersecret-document').style.display = 'block'}
}

function joonsikfinder (value) { 
  var bodyEle = document.getElementsByTagName('body')[0]
  var titleIdentifiers = document.getElementsByClassName('title-identifier')
  if (value === '엄준식') {
    bodyEle.className = ''
    titleIdentifiers[0].innerHTML = '엄준식'	
    titleIdentifiers[1].innerHTML = '엄준식을'
  } else if (value === '손진웅') {
    bodyEle.className = ''	
    titleIdentifiers[0].innerHTML = '손진웅'	
    titleIdentifiers[1].innerHTML = '손진웅을'
  } else {
    bodyEle.className = ''
    titleIdentifiers[0].innerHTML = '악질 직업'
    titleIdentifiers[1].innerHTML = '악질 직업을'
  }
}

var checkboxLabelers = document.getElementsByClassName('checkboxlabeler-input')
for (checkboxLabeler in checkboxLabelers) {
  checkboxLabeler.onchange = function () {
    if (checkboxLabeler.checked) {
    } else {
    }
  }
}

