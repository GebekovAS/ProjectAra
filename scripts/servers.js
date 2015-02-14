	var allViews={};
	
	//Метод обновляет значнеие заголовка параметра
	function setNewCaption(propertyText) {
		this.Caption.innerHTML=propertyText;
		return;
	}
	
	//метод обновляет значение параметра
	function setNewValue(propertyText) {
		this.Value.innerHTML=propertyText;
		return;
	}
	
	//Метод возвращает прогресс бар для значений
	function getProgressBar (vl) {
		var arAB=vl.split('/');
		var a=0;
		a=1*arAB[0];
		var b=0;
		b=1*arAB[1];
		var r=Math.round(((a-b)*100)/a);
		var clr='#bfb';
		if (r>70) clr='#fbb';
		return '<div style="width:'+r+'%; height:100%; background:'+clr+'; text-align:center">'+r+'%</div> ';
	}
 
	
	//Метод создает элемент
	function createSubItem() {
		var trEl = document.createElement('tr');
		trEl.setAttribute('class', 'attrs');	
		
		var title = document.createElement('td');
		title.appendChild(document.createTextNode(''));
		title.setAttribute('class', 'titleTD');
		var value = document.createElement('td');
		value.appendChild(document.createTextNode(''));
		value.setAttribute('class', 'valueTD');
		
		trEl.appendChild(title);
		trEl.appendChild(value);
		trEl.Caption=title;
		trEl.Value=value;	
		return trEl;
	}	
	
	//Метод создает новую область отображения свойств устройства
	function createSubView(name,items) {  
		var cView=document.createElement('div');		
		cView.setAttribute('class', 'server');
		allViews[name]=cView;
		
		var title = document.createElement('div');
			title.setAttribute('class', 'title');
			title.appendChild(document.createTextNode(name));
			
		var content = document.createElement('table');
			content.setAttribute('class', 'content');
		
		content.items = {};
		
		for (var itemsName in items) {			
			
					
			if (items[itemsName].type=="cpu_title") {
				title.firstChild.data=items[itemsName].value;		
			} else {
				var newSubItem = createSubItem();	
				newSubItem.newCaption=setNewCaption;
				newSubItem.newValue=setNewValue;
				content.items[itemsName]=newSubItem;
				content.appendChild(newSubItem);
			
				var aT=items[itemsName].title;
				var aV=items[itemsName].value;			

				if (items[itemsName].type=="disk_status") aV=getProgressBar(aV)+aV;	
				newSubItem.newCaption(aT);
				newSubItem.newValue(aV);
			}			
		}
		
		cView.appendChild(title);
		cView.Caption = title;
		cView.appendChild(content);
		cView.content = content;
		
		var cTable=document.createElement('table');
		cTable.setAttribute('class', 'tables');
		var cTr=document.createElement('tr');
		var cTd=document.createElement('td');
		cTd.appendChild(cView);
		cTr.appendChild(cTd);
		cTable.appendChild(cTr);
		cTr=document.createElement('tr');
		cTd=document.createElement('td');
		
		cTd.setAttribute('style', 'background:url(img/service_shadow.png) no-repeat; background-size: 100%; -moz-background-size: 100%; height:35px;');
		//cTd.innerHTML='<center><img style="margin-top:-2px; width:80%;" src="img/service_shadow.png"\></center>';
		cTr.appendChild(cTd);
		cTable.appendChild(cTr);
		
		document.getElementById('servers').appendChild(cTable);
			
		return cView;		
	}
	
	//Метод обновляет данные элементов указанного области
	function updateAll(name,attrs) {		
		for(var item in attrs) {
			if (allViews[name].content.items[item] === undefined) {} else {
				var vl=attrs[item].value;
				
				if (attrs[item].type=="ping")
					if(allViews[name].content.items[item].Value.innerHTML == attrs[item].value){
						allViews[name].Caption.style.background = '#f29f8e';
					}
					else{
						allViews[name].Caption.style.background = '#c0ffc0';
					}
				
				if (attrs[item].type=="disk_status") vl=getProgressBar(vl)+vl;	
				
				allViews[name].content.items[item].Value.innerHTML=vl;
			}			
		}		
	}
	
	//Обновление всех значений
	function viewUpdater(data) {
		data = JSON.parse(data)
		for(var host in data){
			if(allViews[host] === undefined){
				this.createSubView(host, data[host]);
			} else {
				updateAll(host,data[host]);
			}

		}
	}