(function(){
	var oldData;
	var html = '';
	//html += '<a class="diy export" data-type="md">导出md</a>',
	//html += '<a class="diy export" data-type="km">导出km</a>',
	html += '<button class="diy input">',
	html += '导入<input type="file" id="fileInput">',
	html += '</button>',
	//html += '<button type="button" id="btn-export" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>'
	html += '<a class="diy export" data-toggle="tooltip"'+
	' data-placement="left" title="保存成功，可以导出！" data-type="json">导出JSON</a>';

	$('.editor-title').append(html);

	$('.diy').css({
		// 'height': '30px',
		// 'line-height': '30px',
		'margin-top': '0px',
		'float': 'right',
		'background-color': '#fff',
		'min-width': '60px',
		'text-decoration': 'none',
		color: '#999',
		'padding': '0 10px',
		border: 'none',
		'border-right': '1px solid #ccc'
	});
	$('.input').css({
		'overflow': 'hidden',
		'position': 'relative'
	}).find('input').css({
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: 'inline-block',
		opacity: 0
	});
	$('.export').css('cursor','pointer');//not allowed
	$('[data-toggle="tooltip"]').tooltip();
	$(document).on('mouseover', '.export', function(event) {
		//alert("on")
		$('[data-toggle="tooltip"]').tooltip();
		// 链接在hover的时候生成对应数据到链接中
		event.preventDefault();
		var $this = $(this),
				type = $this.data('type'),
				exportType;
		switch(type){
			case 'km':
				exportType = 'json';
				break;
			case 'md':
				exportType = 'markdown';
				break;
			default:
				exportType = type;
				break;
		}
		if(JSON.stringify(oldData) == JSON.stringify(editor.minder.exportJson())){
			return;
		}else{
			oldData = editor.minder.exportJson();
		}
		//$('[data-toggle="tooltip"]').tooltip();
		editor.minder.exportData(exportType).then(function(content){
			switch(exportType){
				case 'json':
					console.log($.parseJSON(content));
					break;
				default:
					console.log(content);
					break;
			}
			$this.css('cursor', 'pointer');
			content="readJSON("+content+")"
			var blob = new Blob([content]),
					url = URL.createObjectURL(blob);
			var aLink = $this[0];
			aLink.href = url;
			//aLink.download = $('#node_text1').text()+'.'+type;
			aLink.download = "data"+'.'+type;
		});
	}).on('mouseout', '.export', function(event) {
		// 鼠标移开是设置禁止点击状态，下次鼠标移入时需重新计算需要生成的文件
		event.preventDefault();
		$(this).css('cursor', 'pointer');//not-allowed
	}).on('click', '.export', function(event) {
		// 禁止点击状态下取消跳转
		var $this = $(this);
		if($this.css('cursor') == 'not-allowed'){
			event.preventDefault();
		}
	});
})();