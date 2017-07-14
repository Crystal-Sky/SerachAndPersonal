// F:\DreamweaverProjects\实战记录\sell
// text：无网络时添加测试数据
function text()
{
	$(".grid").html('<li class="grid-sizer"></li>');
	var length=3;
	for(i=0;i<length;i++){
		var html='<li><figure class="url_event" data-url="http://www.runoob.com/"><img src="images/thumb/40.png" /><figcaption><h3>夏目友人帐</h3><p>简介：从小就能看见妖怪的少年夏目贵志。自从他从祖母玲子那里继承了与妖怪成为主从并将其名字书写在上的契约书“友人帐”以来……</p></figcaption></figure></li>';
		$(".grid").append(html);	    						
	}	    					
	$('.url_event').bind("click",function(event) {
		var url=$(this).attr('data-url');
		$('#input-text').val('');
		window.location.href=url;
	});
	new CBPGridGallery( document.getElementById( 'grid-gallery' ) );

	$("#friend").html('');
	for(i=0;i<length;i++){
		var html='<section class="friend-wrap"><div><img src="images/a1.png" /></div><div><span>叶修</span></div><div><label>加为好友<input type="button" class="add_btn"></label></div><div class="clear"> </div></section>';
		$("#friend").append(html);	    						
	}    					
	$(".add_btn").click(function(event){
		//var da=$(this).parent().parent().parent();
		$('#add_f').slideDown("slow");
		$(".close").bind("click",function(event) {
			$("#add_f").slideUp("slow");
			$('.add_mess').val('');
		});
		$('#close').bind("click",function(event) {
			$("#add_f").slideUp("slow");
			$('.add_mess').val('');
		});
		$('#sent').bind("click",function(event) {
			$("#add_f").slideUp("slow");
			var text=$('.add_mess').val();
			$('.add_mess').val('');
			// 发送好友请求
		});
	});
}
function loadX()
{
	$(".all-show").css('display','block');
	$.ajax({
		type : "get",
		async : true,            
		url : "http://localhost:8080/textapi/search/movies",    
		dataType : "json",        
		success : function(result_s){
			var UserDatas=result_s.data;
			var length=UserDatas.length;
			var i;
			$(".grid").html('<li class="grid-sizer"></li>');
			for(i=0;i<length;i++){
				var html='<li><figure class="url_event" data-url="'+UserDatas[i].url+'"><img src="'+UserDatas[i].avatar+'" /><figcaption><h3>'+UserDatas[i].movie_name+'</h3><p>'+UserDatas[i].Introduction+'</p></figcaption></figure></li>';
				$(".grid").append(html);	    						
			}	    					
			$('.url_event').bind("click",function(event) {
				var url=$(this).attr('data-url');
				$('#input-text').val('');
				window.location.href=url;
			});
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		},
		error : function(errorMsg) {			
			// alert("数据无法加载");			
		}
	});
	$.ajax({
		type : "get",
		async : true,            
		url : "http://localhost:8080/textapi/search/friends",    
		dataType : "json",        
		success : function(result_s){
			var UserDatas=result_s.data;
			var length=UserDatas.length;
			var i;
			$("#friend").html('');
			for(i=0;i<length;i++){
				var html='<section class="friend-wrap"><div><img src="'+UserDatas[i].avatar+'" /></div><div><span>'+UserDatas[i].user_name+'</span></div><div><label>加为好友<input type="button" class="add_btn"></label></div><div class="clear"> </div></section>';
				$("#friend").append(html);	    						
			}    					
			$(".add_btn").click(function(event){
				//var da=$(this).parent().parent().parent();
				$('#add_f').slideDown("slow");
				$(".close").bind("click",function(event) {
					$("#add_f").slideUp("slow");
					$('.add_mess').val('');
				});
				$('#close').bind("click",function(event) {
					$("#add_f").slideUp("slow");
					$('.add_mess').val('');
				});
				$('#sent').bind("click",function(event) {
					$("#add_f").slideUp("slow");
					var text=$('.add_mess').val();
					$('.add_mess').val('');
					// 发送好友请求
				});
			});
		},
		error : function(errorMsg) {
			// alert("数据无法加载");
			text();
		}
	});
}
$( function() {
	//初始化下拉框
	var html='';
    $("#friend").html(html);
    $(".grid").html(html);   
	new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
	var drop=$( '#cd-dropdown' ).dropdown( {
		gutter : 3,
		delay : 100,
		slidingIn : 100
	} );
	
	//监听搜索框的回车事件
	$("#input-text").keydown(function(event) {    
	    if (event.keyCode == 13) { 
	    	$(".all-show").css('display','block'); 	  
	    	var result=$("#select-box span").html();	    	
	    	var j=result.indexOf("电影");
	    	if(j==-1){//选择了“好友”
        		var searchText1=$('#input-text').val();
        		if(searchText1!==""){
        			$.ajax({
        				type : "get",
        				async : true,            
        				url : "http://localhost:8080/textapi/search/friends",    
        				dataType : "json",        
        				success : function(result_s){
        					var UserDatas=result_s.data;
        					var length=UserDatas.length;
        					var i;
        					$("#friend").html('');
        					for(i=0;i<length;i++){
        						var html='<section class="friend-wrap"><div><img src="'+UserDatas[i].avatar+'" /></div><div><span>'+UserDatas[i].user_name+'</span></div><div><label>加为好友<input type="button" class="add_btn"></label></div><div class="clear"> </div></section>';
        						$("#friend").append(html);	    						
        					}
        					$(".add_btn").click(function(event){
        						//var da=$(this).parent().parent().parent();
        						$('#add_f').slideDown("slow");
        						$(".close").bind("click",function(event) {
        							$("#add_f").slideUp("slow");
        							$('.add_mess').val('');
        						});
        						$('#close').bind("click",function(event) {
        							$("#add_f").slideUp("slow");
        							$('.add_mess').val('');
        						});
        						$('#sent').bind("click",function(event) {
        							$("#add_f").slideUp("slow");
        							var text=$('.add_mess').val();
        							$('.add_mess').val('');
        							// 发送好友请求
        						});
        					});

        				},
        				error : function(errorMsg) {
        					// alert("数据无法加载");
        				}
        			});         			
        		}else{
        			loadX();
        			// var html2='';
        			// $("#friend").html(html2); 
        		}

	    	}else{//选择了“电影”
	    		var searchText2=$('#input-text').val();
	    		if(searchText2!==""){
	    			/*$.get('http://api.bin.com/qsonhs.aspx?q='+searchText,function(d){
						var d=d.AS.Results[0].Suggests;
						var html='';
						for(var i=0;i<d.lenght;i++){
							html+='<li>'+d[i].Txt+'</li>';
						}
						$("#search-result").html(html);
						$('#search-suggest').show().css({
							top:$("#search-form").offset().top+$("#search-form").height()+10,
							left:$("#search-form").offset().left,
							position:'absolute'
						});
	    			},'json');
	    			*/
	    			$.ajax({
	    				type : "get",
	    				async : true,            
	    				url : "http://localhost:8080/textapi/search/movies",    
	    				dataType : "json",        
	    				success : function(result_s){
	    					var UserDatas=result_s.data;
	    					var length=UserDatas.length;
	    					var i;
	    					$(".grid").html('<li class="grid-sizer"></li>');
	    					for(i=0;i<length;i++){
	    						var html='<li><figure class="url_event" data-url="'+UserDatas[i].url+'"><img src="'+UserDatas[i].avatar+'" /><figcaption><h3>'+UserDatas[i].movie_name+'</h3><p>'+UserDatas[i].Introduction+'</p></figcaption></figure></li>';
	    						$(".grid").append(html);	    						
	    					}	    					
	    					$('.url_event').bind("click",function(event) {
	    						var url=$(this).attr('data-url');
	    						$('#input-text').val('');
	    						window.location.href=url;
	    					});
	    					new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
	    				},
	    				error : function(errorMsg) {
	    					// alert("数据无法加载");
	    				}
	    			});		
	    		}else{
	    			loadX();
	    			// var html4='<li class="grid-sizer"></li>';
	    			// $(".grid").html(html4);   
	    			// new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
	    		}
	    	} 
			//alert("成功了帅哥");    
		}    
	});	
	//鼠标点击了搜索图标后的操作
	$("#post-btn").click(function(){
		$(".all-show").css('display','block'); 	  
    	var result=$("#select-box span").html();	    	
    	var j=result.indexOf("电影");
    	if(j==-1){//选择了“好友”
    		var searchText1=$('#input-text').val();
    		if(searchText1!==""){
    			$.ajax({
    				type : "get",
    				async : true,            
    				url : "http://localhost:8080/textapi/search/friends",    
    				dataType : "json",        
    				success : function(result_s){
    					var UserDatas=result_s.data;
    					var length=UserDatas.length;
    					var i;
    					$("#friend").html('');
    					for(i=0;i<length;i++){
    						var html='<section class="friend-wrap"><div><img src="'+UserDatas[i].avatar+'" /></div><div><span>'+UserDatas[i].user_name+'</span></div><div><label>加为好友<input type="button" class="add_btn"></label></div><div class="clear"> </div></section>';
    						$("#friend").append(html);	    						
    					}    					
    					$(".add_btn").click(function(event){
    						//var da=$(this).parent().parent().parent();
    						$('#add_f').slideDown("slow");
    						$(".close").bind("click",function(event) {
    							$("#add_f").slideUp("slow");
    							$('.add_mess').val('');
    						});
    						$('#close').bind("click",function(event) {
    							$("#add_f").slideUp("slow");
    							$('.add_mess').val('');
    						});
    						$('#sent').bind("click",function(event) {
    							$("#add_f").slideUp("slow");
    							var text=$('.add_mess').val();
    							$('.add_mess').val('');
    							// 发送好友请求
    						});
    					});
    				},
    				error : function(errorMsg) {
    					// alert("数据无法加载");
    				}
    			});         			
    		}else{
    			loadX();
    			// var html2='';
    			// $("#friend").html(html2); 
    		}
    	}else{//选择了“电影”
    		var searchText=$('#input-text').val();
    		if(searchText!==""){
    			/*$.get('http://api.bin.com/qsonhs.aspx?q='+searchText,function(d){
					var d=d.AS.Results[0].Suggests;
					var html='';
					for(var i=0;i<d.lenght;i++){
						html+='<li>'+d[i].Txt+'</li>';
					}
					$("#search-result").html(html);
					$('#search-suggest').show().css({
						top:$("#search-form").offset().top+$("#search-form").height()+10,
						left:$("#search-form").offset().left,
						position:'absolute'
					});
    			},'json');
    			*/
    			$.ajax({
    				type : "get",
    				async : true,            
    				url : "http://localhost:8080/textapi/search/movies",    
    				dataType : "json",        
    				success : function(result_s){
    					var UserDatas=result_s.data;
    					var length=UserDatas.length;
    					var i;
    					$(".grid").html('<li class="grid-sizer"></li>');
    					for(i=0;i<length;i++){
    						var html='<li><figure class="url_event" data-url="'+UserDatas[i].url+'"><img src="'+UserDatas[i].avatar+'" /><figcaption><h3>'+UserDatas[i].movie_name+'</h3><p>'+UserDatas[i].Introduction+'</p></figcaption></figure></li>';
    						$(".grid").append(html);	    						
    					}
    					$('.url_event').bind("click",function(event) {
    						var url=$(this).attr('data-url');
    						$('#input-text').val('');
    						window.location.href=url;
    					});
    					new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
    				},
    				error : function(errorMsg) {
    					// alert("数据无法加载");
    				}
    			});		    					
    		}else{
    			loadX();
    			// var html3='<li class="grid-sizer"></li>';
    			// $(".grid").html(html3);   
    			// new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
    		}    			
    		
    	}
		//alert("成功了帅哥2");  
	});
	//点击空白页面时，收回下拉框
	$(document).bind('click', function() {		
		if(drop.opened){
			drop.close();
		}
	});
	// 推荐内容
	loadX();
});
