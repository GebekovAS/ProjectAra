var request;
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
//Получаю все индексы
function getAllIndex(host) {	  
  request=getXmlHttp();
  request.open("GET",host,true);
  request.onreadystatechange=function () {
    if (( request.readyState == 4 ) & ( request.status==200 )) {
      servers.updateAll(request.responseText);
    }
  };
  request.send();
  setTimeout('getAllIndex("'+host+'")',1000);
}
