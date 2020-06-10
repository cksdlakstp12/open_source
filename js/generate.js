var totalBehavior = []

for (i = 0; i < behaviors.length; i++) {
  totalBehavior = totalBehavior.concat(behaviors[i])
}

function generate(varName, targetID) {
  if (isLimitedCheckbox.checked && isLimitedNumInput.value >= 12) {
    result = 'N'.repeat(isLimitedNumInput.value + 2)
    while (result.length > isLimitedNumInput.value) {
      result = generateResult(varName)
    }
  } else {
    result = generateResult(varName)
  }

  document.getElementById(targetID).innerHTML = result
}

function generateResult(varName) {
  var result = ''

  if (Math.random() < 0.5 && varName === '손진웅') {
    var sonjinwungArray = ['리버스투블럭장인', '준구실명먹이기장인', '싸커킥장인', '티베깅하고준구톱에썰리는', '데드하드맨날씹히는', '히오스판자창시자', '욕은필터링하면서야메때는안하는']
    var randomSonjinwung = sonjinwungArray[Math.floor(Math.random() * sonjinwungArray.length)]
    return randomSonjinwung + varName
  }

  if (Math.random() < 0.8) { /* 일반 장소 처리 */
    var randomDetailLocation = locations[0][Math.floor(Math.random() * locations[0].length)]
    var randomDetailJob = jobs[Math.floor(Math.random() * jobs.length)]
    var randomDetailBehavior = totalBehavior[Math.floor(Math.random() * totalBehavior.length)]
    // debug: console.log(randomDetailLocation, randomDetailBehavior, randomDetailJob)

    if (behaviors[0].indexOf(randomDetailBehavior) >= 0) {
      result = generateSpecificCase(1, [randomDetailLocation, randomDetailBehavior, randomDetailJob, varName])
    } else if (behaviors[1].indexOf(randomDetailBehavior) >= 0) {
      result = generateSpecificCase(2, [randomDetailLocation, randomDetailBehavior, randomDetailJob, varName])
    }
  } else {
    var randomDetailLocation = locations[1][Math.floor(Math.random() * locations[1].length)]
    // 여기서 문제가 발생한다면 특별한 위치 변수를 제대로 정의하지 않은것.
    // debug: console.log('specificLocations', specificLocations[randomDetailLocation], randomDetailLocation)
    result = generateSpecificCase(3, [randomDetailLocation, specificLocations[randomDetailLocation], varName])

  }
  //debug: console.log(randomDetailLocation, randomDetailBehavior, randomDetailJob, result)

  return result
}

/*CASE 1 : params = [randomDetailLocation, randomDetailBehavior, randomDetailJob, varName] 
  CASE 2 : params = [randomDetailLocation, randomDetailJob, varName] 
*/
function generateSpecificCase(caseCode, params) {
  if (caseCode === 1) {
    var randomObject = objects[Math.floor(Math.random() * objects.length)]
    return params[0] + randomObject + params[1] + params[2] + params[3]
  } else if (caseCode === 2) {
    return params[0] + params[1] + params[2] + params[3]
  } else if (caseCode === 3) {
    return params[0] + params[1] + params[2]
  } else {
    return undefined
  }
}

function debug(a, b) {
  for (i = 0; i < 100; i++) {
    generate(a, b)
  }
}