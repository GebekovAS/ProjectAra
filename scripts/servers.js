var servers = function(){ // {{{
	function createAttr(titleText){ // {{{
		var attr = document.createElement('tr');
		attr.setAttribute('class', 'attrs');

		var title = document.createElement('td');
		title.appendChild(document.createTextNode(titleText));
		var value = document.createElement('td');
		value.appendChild(document.createTextNode(''));

		attr.appendChild(title);
		attr.appendChild(value);
		attr.value = value;

		return attr;
	} // }}}

	function createSubtable(attrs){ // {{{
		var subtable = document.createElement('table')
		subtable.attrs = {};
		for(var id in attrs){
			var tr = createAttr(attrs[id]);
			subtable.appendChild(tr);
			subtable.attrs[id] = tr;
		}
		return subtable;
	} // }}}

	return {
		all: {},

		createNew: function(name, attrStruct, subtabStruct){ // {{{
			var server = document.createElement('div');
			server.setAttribute('class', 'server');
			this.all[name] = server;

			var title = document.createElement('div');
			title.setAttribute('class', 'title');
			title.appendChild(document.createTextNode(name))

			var content = document.createElement('table');
			content.setAttribute('class', 'content');

			content.attrs = {};
			var attrs = {'addr': 'Адрес хоста: ', 'cpu': 'Нагрузка на ЦП: ', 'mem': 'Загрузка памяти: ', 'procs': 'Количество процессов: ', 'ping': 'Пинг: '};
			for(var attrName in attrs){
				var attr = createAttr(attrs[attrName]);
				content.attrs[attrName] = attr;
				content.appendChild(attr);
			}

			content.subtables = {};
      var tabStruct = {};
      for(var disk in subtabStruct){
        tabStruct[disk] = 'Состояние диска [' + disk + '] ';
      }
			var subtable = createSubtable(tabStruct);
			subtable.setAttribute('class', 'subtable');
			var subtableBoxTR = document.createElement('tr');
			var subtableBoxTD = document.createElement('td');
			subtableBoxTD.setAttribute('colspan', '2');
			subtableBoxTD.appendChild(subtable);
			subtableBoxTR.appendChild(subtableBoxTD);
			content.appendChild(subtableBoxTR);
			content.subtables['disks'] = subtable
			
			server.appendChild(title);
			server.t = title;
			server.appendChild(content);
			server.content = content;
			document.getElementById('servers').appendChild(server);
			return server;
		}, // }}}

		updateServer: function(name, attrs, subtables){ // {{{
			var server = this.all[name];
      if(server.content.attrs.ping.value.firstChild.data == attrs.ping){
        server.t.style.background = 'red';
      }
      else{
        server.t.style.background = '#bfb';
      }
			// Обновление атрибутов.
			for(var attrName in attrs){
				server.content.attrs[attrName].value.firstChild.data = attrs[attrName];
			}
			// Обновление таблиц.
			for(var subtableName in subtables){
				var subtable = subtables[subtableName];
				for(var attr in subtable){
					var arAB=subtable[attr].split(' / ');
					var a=0;
 					a=1*arAB[0];
					var b=0;
					b=1*arAB[1];
					var r=Math.round(((a-b)*100)/a);
					var clr='#bfb';
					if (r>70) clr='#fbb';
					var innerString='<div style="width:'+r+'%; height:100%; background:'+clr+'; text-align:center">'+r+'%</div> ';
					server.content.subtables[subtableName].attrs[attr].value.innerHTML = innerString +subtable[attr];
				}
			}
		}, // }}}

    updateAll: function(data){ // {{{
      data = JSON.parse(data)
      for(var host in data){
        if(this.all[host] === undefined){
          this.createNew(host, data[host][0], data[host][1].disks);
        }
        this.updateServer(host, data[host][0], data[host][1])
      }
    } // }}}
	};
}(); // }}}
