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
		all: [],

		createNew: function(name){ // {{{
			var server = document.createElement('div');
			server.setAttribute('class', 'server');
			this.all[name] = server;

			var title = document.createElement('div');
			title.setAttribute('class', 'title');
			title.appendChild(document.createTextNode(name))

			var content = document.createElement('table');
			content.setAttribute('class', 'content');

			content.attrs = {};
			var attrs = {'addr': 'Адрес хоста: ', 'cpu': 'Нагрузка на ЦП: ', 'mem': 'Загрузка памяти: ', 'procs': 'Количество процессов: '};
			for(var attrName in attrs){
				var attr = createAttr(attrs[attrName]);
				content.attrs[attrName] = attr;
				content.appendChild(attr);
			}

			content.subtables = {};
			var subtable = createSubtable({'A': 'Состояние диска A: ', 'B': 'Состояние диска B: '});
			subtable.setAttribute('class', 'subtable');
			var subtableBoxTR = document.createElement('tr');
			var subtableBoxTD = document.createElement('td');
			subtableBoxTD.setAttribute('colspan', '2');
			subtableBoxTD.appendChild(subtable);
			subtableBoxTR.appendChild(subtableBoxTD);
			content.appendChild(subtableBoxTR);
			content.subtables['disks'] = subtable
			
			server.appendChild(title);
			server.appendChild(content);
			server.content = content;
			document.getElementById('servers').appendChild(server);
			return server;
		}, // }}}

		updateServer: function(name, attrs, subtables){ // {{{
			var server = this.all[name];
			// Обновление атрибутов.
			for(var attrName in attrs){
				server.content.attrs[attrName].value.firstChild.data = attrs[attrName];
			}
			// Обновление таблиц.
			for(var subtableName in subtables){
				var subtable = subtables[subtableName];
				for(var attr in subtable){
					server.content.subtables[subtableName].attrs[attr].value.firstChild.data = subtable[attr]
				}
			}
		}, // }}}

    updateAll: function(data){
      data = JSON.parse(data)
      for(var host in data){
        this.updateServer(host, data[host][0], data[host][1])
      }
    }
	};
}(); // }}}

servers.createNew('Host A');
servers.createNew('Host B');
