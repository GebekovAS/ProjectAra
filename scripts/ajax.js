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
  var request = request.target;
  if (( request.readyState == 4 ) & ( request.status==200 )) {
    viewUpdater(request.responseText);
  }
}

function requester(){
  var request=getXmlHttp();
  request.open("GET", 'adapter/response.txt', true);
  request.onreadystatechange = updater;
  request.send();
}
setInterval(requester, 4000);
requester();
