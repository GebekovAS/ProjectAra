function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function updater(request){
  var request = request.target
  if (( request.readyState == 4 ) & ( request.status==200 )) {
    servers.updateAll(request.responseText);
  }
}

setInterval(function(){
  var request=getXmlHttp();
  request.open("GET", 'test', true);
  request.onreadystatechange = updater;
  request.send();
}, 2000);
