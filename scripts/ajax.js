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
  //������� ��� �������
  function getAllIndex(host,resData) {	  
	  request=getXmlHttp();
	  var server_url=host+resData;
	  request.open("GET",server_url,true);
	  request.onreadystatechange=function () {
		  if (( request.readyState == 4 ) & ( request.status==200 )) {
			updateAllTables(request.responseText);
		}
	  };
	request.send();
		setTimeout('getAllIndex("'+host+','+resData+'")',10000);
	}	
  
  //������� ��� ������
  function updateAllTables(indexList) {
	  for (var i=0; i<indexList.length;i++){
		alert(indexList[i]);
	  }
  }



  