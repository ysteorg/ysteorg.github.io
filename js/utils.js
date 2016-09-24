function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;  
  }
}

function shuffleArray(idArrays) {
  for (var i = idArrays.length; i > 0; --i) {
    var j = Math.floor(Math.random() * i);
    var swap = idArrays[i - 1];
    idArrays[i - 1] = idArrays[j];
    idArrays[j] = swap;;
  }
  return idArrays;
}

function randSample(idArrays, seed, num) {
  idArrays = shuffleArray(idArrays);
  if (num >= idArrays.length) {
    return idArrays;
  } else {
    return idArrays.slice(0, num);
  }
}
