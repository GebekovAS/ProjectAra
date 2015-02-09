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
			
			newSubItem.newCaption(items[itemsName].title);
			newSubItem.newValue(items[itemsName].value);
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