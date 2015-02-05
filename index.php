﻿<html>
<head>
<style>
	.root_area {
		position:absolute; 
		width:250px; 
		background:#999999;
	}
	.name_area {
		top:10px; 
		width:230px; 
		background:#bbffbb; 
		margin: 10px auto; 
		text-align:center; 
		text-valign:center; 
		padding:5px; 
		font-family:Arial; 
		font-size:14;
	}
	.table_area {
		top:30px; 
		width:240px; 
		height:100%; 
		background:#dddddd; 
		margin: 10px auto; 
		text-align:center; 
		text-valign:center;
	}
	
	.table_style{
		font-family:Arial; 
		font-size:10;
	}
</style>

<script type=text/javascript>
		function callBackfunc(item,i,arr) {
			
		}

		function newInfoCart(x,y,hostName, hostAdress,cpuUsed,memUsed,processCount,diskName,diskState) {
			var root_area=document.createElement('div');
			var name_area=document.createElement('div');
			var table_area=document.createElement('div');
			var table=document.createElement('table');			
			
			root_area.className ='root_area';
			name_area.className ='name_area';
			table_area.className ='table_area';
			table.className ='table_style';
			
			root_area.style.left=x;
			root_area.style.top=y;
			name_area.innerHTML=hostName;
			
			//Формирование информации из массива дисков
			var diskInfoFormat='';			
			for (var i=0; i<diskState.length; i++) {
				diskInfoFormat+='<tr>'+
				'<td>Состояние Диска ' + diskName[i]+'</td>'+
				'<td>'+diskState[i]+'</td>'+
				'</tr> ';
			}
			
			table.innerHTML='<tr>'+
				'<td>Адрес хоста:</td>'+
				'<td>'+hostAdress+'</td>'+
				'</tr> '+
				'<tr>'+
				'<td>Нагрузка на ЦП:</td>'+
				'<td>'+cpuUsed+'</td>'+
				'</tr>'+
				'<tr>'+
				'<td>Загрузка памяти:</td>'+
				'<td>'+memUsed+'</td>'+
				'</tr>'+	
				'<tr>'+
				'<td>Количество процессов:</td>'+
				'<td>'+processCount+'</td>'+
				'</tr>	'+	diskInfoFormat;
			
			table_area.appendChild(table);			
			root_area.appendChild(name_area);	
			root_area.appendChild(table_area);		
			
			document.body.appendChild(root_area);
			
		}
</script>
</head>
<body>
 <div class="root_area"> 
	<div class="name_area">GebekovAS-PC</div> 
	<div class="table_area"> 
		<table class="table_style">
			<tr>
				<td>Адрес хоста:</td>
				<td>192.168.1.101</td>
			</tr> 

			<tr>
				<td>Нагрузка на ЦП:</td>
				<td>100%</td>
			</tr>
	
			<tr>
				<td>Загрузка памяти:</td>
				<td>100%</td>
			</tr>
	
			<tr>
				<td>Количество процессов:</td>
				<td>123</td>
			</tr>	
			
			<tr>
				<td>Состояние Диска С:</td>
				<td>156200/12153</td>
			</tr> 
			
			<tr>
				<td>Состояние Диска  D:</td>
				<td>156200/12153</td>
			</tr> 
	
		</table>
	</div>
  </div>
 
 
 <script>
	newInfoCart('500px','500px','GebekovAS-Test','hostAdress','cpuUsed','memUsed','processCount',['A:','B:','C:', 'F:'],['10/10','20/20','30/30','50/50']);
 </script>
</body>
</html>