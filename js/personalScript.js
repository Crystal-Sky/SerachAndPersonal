//无网络时显示测试数据
function test(){
	$('#img-upload img').attr('src', 'images/a1.png'); 
	$('.user-id').attr('value','张三');
	$('#IDName').html('012');
	$('.my-sign').html('少年不知愁');

	$('#invite').html('');			
    var i=0,length=3,data;
	for(i=0;i<length;i++){
		data='<ul><li><span>李四</span></li><li><p>邀请你进入房间观影</p></li><li><input type="button" class="refuse" value="拒绝" /></li><li><input type="button" class="accept" value="同意" /></li></ul>';
		$('#invite').append(data);
	}
	$(".refuse").click(function(event){
		var da=$(this).parent().parent();
		$(da).remove();
	});
	$(".accept").click(function(event){
		var da=$(this).parent().parent();
		$(da).remove();
	});

	$('#add').html('');
	length=4;
	for(i=0;i<length;i++){
		data='<ul><li><span>王五</span></li><li><p>申请添加好友</p></li><li><input type="button" class="a_refuse" value="拒绝" /></li><li><input type="button" class="a_accept" value="同意" /></li></ul>';
		$('#add').append(data);
	}
	$(".a_refuse").click(function(event){
		var da=$(this).parent().parent();
		$(da).remove();
	});
	$(".a_accept").click(function(event){
		var da=$(this).parent().parent();
		$(da).remove();
	});

	$(".friend_wrap").html('');
	length=2;
	for(i=0;i<length;i++){				
		data='<ul><li><img src="images/a1.png" /></li><li><span>赵六</span></li><li><label>删除好友<input type="button" class="deleFriend"></label></li></ul>';
		$('.friend_wrap').append(data);
	}
	$(".deleFriend").click(function(event){
		var da=$(this).parent().parent().parent();
		$(da).remove();
	});
}
function loadX()
{
	$.ajax({
		type : "get",
		async : true,            
		url : "http://localhost:8080/textapi/user",    
		dataType : "json",        
		success : function(result_s){
			var UserDatas=result_s.data;
			$('#img-upload img').attr('src', UserDatas.avatar); 
			$('.user-id').attr('value',UserDatas.username);
			$('#IDName').html(UserDatas.userID);
			$('.my-sign').html(UserDatas.motto);

			$('#invite').html('');			
		    var i=0,length=UserDatas.invite_messages.length,data;
			for(i=0;i<length;i++){
				data='<ul><li><span>'+UserDatas.invite_messages[i].username+'</span></li><li><p>邀请你进入房间观影</p></li><li><input type="button" class="refuse" value="拒绝" /></li><li><input type="button" class="accept" value="同意" /></li></ul>';
				$('#invite').append(data);
			}
			$(".refuse").click(function(event){
				var da=$(this).parent().parent();
				$(da).remove();
			});
			$(".accept").click(function(event){
				var da=$(this).parent().parent();
				$(da).remove();
			});

			$('#add').html('');
			length=UserDatas.add_messages.length;
			for(i=0;i<length;i++){
				data='<ul><li><span>'+UserDatas.add_messages[i].username+'</span></li><li><p>申请添加好友</p></li><li><input type="button" class="a_refuse" value="拒绝" /></li><li><input type="button" class="a_accept" value="同意" /></li></ul>';
				$('#add').append(data);
			}
			$(".a_refuse").click(function(event){
				var da=$(this).parent().parent();
				$(da).remove();
			});
			$(".a_accept").click(function(event){
				var da=$(this).parent().parent();
				$(da).remove();
			});

			$(".friend_wrap").html('');
			length=UserDatas.friends_list.length;
			for(i=0;i<length;i++){				
				data='<ul><li><img src="'+UserDatas.friends_list[i].avatar+'" /></li><li><span>'+UserDatas.friends_list[i].username+'</span></li><li><label>删除好友<input type="button" class="deleFriend"></label></li></ul>';
				$('.friend_wrap').append(data);
			}
			$(".deleFriend").click(function(event){
				var da=$(this).parent().parent().parent();
				$(da).remove();
			});
		},
		error : function(errorMsg) {
			// alert("数据无法加载");
			// 无网络时显示测试数据
			test();
		}
	});
}
$(function(){
	var final='<div class="img-content"><div class="img-title"><div class="title-name">设置头像</div><a class="close"></a></div><div class="img-all"><div class="img-cut"></div><div class="spinner" style="display: none">Loading...</div></div><div class="img-show"><img src="images/2.png" align="absmiddle" class="img-one"><p>64px x 64px</p><img src="images/2.png" align="absmiddle" class="img-two"><p>128px x 128px</p><img src="images/2.png" align="absmiddle" class="img-three"><p>180px x 180px</p></div><a class="get-img"><label for="upload-file">选择图片</label></a><input type="file" class="" name="upload-file" id="upload-file" /><input id="cut-img" type="button" value="裁剪图片"><input id="set-img" type="button" value="设置头像"></div>';
	$("body").append('<div id="mask"></div>',final);
	loadX();
	$('.choose').click(function () {
		$('.choose').addClass('active');
		$('.choose > .icon').addClass('active');
		$('.mail').removeClass('active');
		$('.friends').removeClass('active');
		$('.mail > .icon').removeClass('active');
		$('.friends > .icon').removeClass('active');
		$('#line').addClass('one');
		$('#line').removeClass('two');
		$('#line').removeClass('three');
	});
	$('.mail').click(function () {
		$('.mail').addClass('active');
		$('.mail > .icon').addClass('active');
		$('.choose').removeClass('active');
		$('.friends').removeClass('active');
		$('.choose > .icon').removeClass('active');
		$('.friends > .icon').removeClass('active');
		$('#line').addClass('two');
		$('#line').removeClass('one');
		$('#line').removeClass('three');
	});
	$('.friends').click(function () {
		$('.friends').addClass('active');
		$('.friends > .icon').addClass('active');
		$('.mail').removeClass('active');
		$('.choose').removeClass('active');
		$('.mail > .icon').removeClass('active');
		$('.choose > .icon').removeClass('active');
		$('#line').addClass('three');
		$('#line').removeClass('two');
		$('#line').removeClass('one');
	});
	$('.choose').click(function () {
		$('#first').addClass('active');
		$('#second').removeClass('active');
		$('#third').removeClass('active');
	});
	$('.mail').click(function () {
		$('#first').removeClass('active');
		$('#second').addClass('active');
		$('#third').removeClass('active');
	});
	$('.friends').click(function () {
		$('#first').removeClass('active');
		$('#second').removeClass('active');
		$('#third').addClass('active');
	});
	$("#save_message").click(function(event) {
		/* Act on the event */
	});
	$("#img-upload").click(function(){
		/*初始显示最初的头像*/
		var img;
		$('.img-show').html('');
    	var im='<img src="images/2.png" align="absmiddle" class="img-one"><p>64px x 64px</p><img src="images/2.png" align="absmiddle" class="img-two"><p>128px x 128px</p><img src="images/2.png" align="absmiddle" class="img-three"><p>180px x 180px</p>';
    	$('.img-show').append(im);

	    $("#mask").slideDown("slow");
	    $(".img-content").slideDown("slow");
	    $(".close").bind("click",function(event) {
	    	/* Act on the event */
	    	/*保留原来的头像*/
	    	$(".img-content").slideUp("slow");
	    	$("#mask").slideUp("slow");
	    	/*$('.img-show').html('');
	    	var im='<img src="images/2.png" align="absmiddle" class="img-one"><p>64px x 64px</p><img src="images/2.png" align="absmiddle" class="img-two"><p>128px x 128px</p><img src="images/2.png" align="absmiddle" class="img-three"><p>180px x 180px</p>'
	    	$('.img-show').append(im);*/
	    });
	    var options =
	    {
	    	thumbBox: '.img-cut',
	    	spinner: '.spinner',
	    	imgSrc: 'images/2.png'
	    };
	    var cropper = $('.img-all').cropbox(options);
	    $('#upload-file').bind('change', function(){
	    	var reader = new FileReader();
	    	reader.onload = function(e) {
	    		options.imgSrc = e.target.result;
	    		cropper = $('.img-all').cropbox(options);
	    	};
	    	reader.readAsDataURL(this.files[0]);
	    	//this.files = [];
	    });
	    $('#cut-img').bind('click', function(){
	    	img = cropper.getDataURL();
	    	$('.img-show').html('');
	    	$('.img-show').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
	    	$('.img-show').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
	    	$('.img-show').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
	    });
	    $('#set-img').bind('click',function(event) {
	    	/* Act on the event */
	    	$('#img-upload img').attr('src', img); 
	    	$(".img-content").slideUp("slow");
	    	$("#mask").slideUp("slow");
	    });
	});	
});

