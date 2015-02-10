	var allViews={};
	
	//Метод обновляет значнеие заголовка параметра
	function setNewCaption(propertyText) {
		this.Caption.firstChild.data=propertyText;
		return;
	}
	
	//метод обновляет значение параметра
	function setNewValue(propertyText) {
		this.Value.firstChild.data=propertyText;
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
		var value = document.createElement('td');
		value.appendChild(document.createTextNode(''));
		
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
		
		cView.appendChild(title);
		cView.Caption = title;
		cView.appendChild(content);
		cView.content = content;
		
		document.getElementById('servers').appendChild(cView);
			
		return cView;		
	}
	
	//Обновление всех значений
	function viewUpdater(data) {
		data = JSON.parse(data)
		for(var host in data){
			if(allViews[host] === undefined){
				this.createSubView(host, data[host]);
			}

		}
	}