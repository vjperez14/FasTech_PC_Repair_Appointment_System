var cropper,input,image,file_height;
function init_crop(){var c=document.getElementById("profile_original");image=document.getElementById("image");input=document.getElementById("input_profile");var d=$(".alert");input.addEventListener("change",function(a){$("#div_cropper_loading").show();a=a.target.files;if(a&&0<a.length&&(file=a[0],check_image_size(file),FileReader)){var b=new FileReader;b.onload=function(a){image.src=b.result;d.hide()};b.readAsDataURL(file)}""!=input.value&&setTimeout(function(){open_crop()},500)});document.getElementById("btn_crop").addEventListener("click",
function(){var a=unixtime();if(cropper){$("#btn_crop").attr("disabled",!0);var b=cropper.getCroppedCanvas({minWidth:80,minHeight:80,maxWidth:1200,maxHeight:1200,imageSmoothingEnabled:!0,imageSmoothingQuality:"high",fillColor:"#FFFFFF"});var f=c.src;c.src=b.toDataURL();d.removeClass("info_good info_error");"undefined"==typeof b.toBlob?(alert("This browser does not support image cropping."),$("#btn_crop").attr("disabled",!1)):b.toBlob(function(b){var e=new FormData;e.append("avatar",b);e.append("opid",
opid);e.append("console",is_console);e.append("auto",auto);e.append("unique",a);$.ajax("../addons/cropper/ajax/upload.php",{method:"POST",data:e,processData:!1,contentType:!1,xhr:function(){var a=new XMLHttpRequest;a.upload.onprogress=function(a){};return a},success:function(b){try{eval(b)}catch(g){return do_alert(0,"System sent an invalid response.  <div class='info_white'>"+b.replace(/['"]+/g,"")+"</div>"),$("#btn_crop").attr("disabled",!1),!1}1==parseInt(json_data.status)?location.href="settings.php?action=success&console="+
is_console+"&auto="+auto+"&"+a:2==parseInt(json_data.status)?location.href="interface_op_pics.php?action=success&opid="+opid+"&"+a:(d.show().addClass("info_error").text(json_data.error),$("#btn_crop").attr("disabled",!1))},error:function(){c.src=f;d.show().addClass("info_error").text("Error connecting to server.  Please try again.");$("#btn_crop").attr("disabled",!1)},complete:function(){}})},"image/jpeg",1)}})}
function check_image_size(c){var d=window.URL||window.webkitURL,a=new Image,b=d.createObjectURL(c);a.onload=function(){var a=this.width,c=this.height;d.revokeObjectURL(b);60>=a&&a==c&&$("#btn_upload_original").trigger("click")};a.src=b;return!0}
function open_crop(){cropper=new Cropper(image,{aspectRatio:1,viewMode:1,preview:".preview",zoomOnWheel:!1});image.src.match(/profile.png/i)&&($("#div_optional").hide(),$("#div_buttons_crop").hide(),$("#div_browser_crop").show());var c=$(document).height();$("body").css({overflow:"hidden"});$("#div_crop_wrapper").css({width:"100%",height:c}).fadeIn("fast");$("#div_crop_body").center().fadeIn("slow");$("#div_cropper_loading").hide()}
function close_crop(){cropper.destroy();cropper=null;input.value="";image.src="";$("body").css({overflow:"auto"});$("#div_crop_body").fadeOut("fast");$("#div_crop_wrapper").fadeOut("slow");$("#div_cropper_loading").hide()}function image_error(){""!=input.value&&do_alert(0,"Error loading image.  Please try again.")};