//Functions on page load.
$(document).ready(function(){
	
	//Adding the none-style to the bar
	document.getElementById('load').style.display = 'none';
	//Upload function
	$('#fileid').fileupload({
		autoUpload: true,
		dataType: 'json',
		add: function (e, data) {
			$('#progress').html('');
			$('#error').html('');
			$('#error').removeClass("error");
	        document.getElementById("upload").disabled = true;
	        document.getElementById("upload").className = "uploadhover";
	        document.getElementById("bsources").style.display = 'none';
	        data.submit();
	    },
	    progressall: function (e, data, status) {
	    	var progressP = parseInt(data.loaded / data.total * 100, 10);
	    	$('#progress').append('<span class="upl">'+progressP+'% uploaded.</span>');
	    	document.getElementById('fileid').style.display= 'none';
	        document.getElementById('upload').style.opacity = '0.8';
	        document.getElementById('load').style.display = 'block';
	        check_states();
	    },
	    success: function(data) {
	    	document.getElementById("upload").className = "upload";
	    	window.location.href=this.url+'file/'+data['pk'];
        },
        error : function(xhr,errmsg,err) {
        	check_states();
        	$('#error').addClass('error');
        	document.getElementById("bsources").style.display = 'block';
        	document.getElementById('load').style.display = 'none';
            $('#error').html("Oops! We have encountered an error: "+errmsg+
                "<a href='/' style='margin-left:5px;' class='close'>&times;</a>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
});

//Check states
function check_states(){
	$.ajax({url: "/check_states/", success: function(result){
        if (result['state_source'] == 'false'){
        	document.getElementById('logosource').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Building your source</span>');
        	setTimeout(check_states(), 3000);
        }else if(result['state_source'] == 'none'){
        	return;
        }else if(result['state_dataset'] == 'false'){
        	document.getElementById('logosource').style.display = 'none';
        	document.getElementById('logodataset').style.display = 'inline';
        	document.getElementById('logosourcev').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Building your dataset</span>');
        	setTimeout(check_states(), 3000);
        }else if(result['state_model'] == 'false'){
        	document.getElementById('logosource').style.display = 'none';
        	document.getElementById('logodataset').style.display = 'none';
        	document.getElementById('logomodel').style.display = 'inline';
        	document.getElementById('logosourcev').style.display = 'inline';
        	document.getElementById('logodatasetv').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Building your model</span>');
        	setTimeout(check_states(), 3000);
        }else{
        	document.getElementById('logosource').style.display = 'none';
        	document.getElementById('logodataset').style.display = 'none';
        	document.getElementById('logomodel').style.display = 'none';
        	document.getElementById('logosourcev').style.display = 'inline';
        	document.getElementById('logodatasetv').style.display = 'inline';
        	document.getElementById('logomodelv').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Completed</span>');
        }
    }});
}