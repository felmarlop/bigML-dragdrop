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
	    	check_states();
	    	document.getElementById('fileid').style.display= 'none';
	        document.getElementById('upload').style.opacity = '0.8';
	        document.getElementById('load').style.display = 'block';
	    },
	    complete: function(xhr){
	    	if(xhr.status != 200){
	    		$('#error').html('');
	    		document.getElementById('fileid').style.display= 'block';
		        document.getElementById('upload').style.opacity = '1';
		        document.getElementById('load').style.display = 'none';
		        $('#error').addClass('error');
	    		if(xhr.status == 201){
	    			$('#error').append('File not allowed');
	    		}else{
			        $('#error').append('Server error code: '+xhr.status);
	    		}
	    	}
	    },
	    success: function(data) {
	    	document.getElementById("upload").className = "upload";
	    	window.location.href=this.url+'file/'+data['pk'];
        },
        error : function(xhr,errmsg,err) {
            $('#error').html("Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a>"); // add the error to the dom
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
        	setTimeout(check_states(), 900);
        }else if(result['state_dataset'] == 'false'){
        	document.getElementById('logosource').style.display = 'none';
        	document.getElementById('logodataset').style.display = 'inline';
        	document.getElementById('logosourcev').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Building your dataset</span>');
        	setTimeout(check_states(), 900);
        }else if(result['state_model'] == 'false'){
        	document.getElementById('logosource').style.display = 'none';
        	document.getElementById('logodataset').style.display = 'none';
        	document.getElementById('logomodel').style.display = 'inline';
        	document.getElementById('logosourcev').style.display = 'inline';
        	document.getElementById('logodatasetv').style.display = 'inline';
        	$('.upl').replaceWith('<span class="upl"> Building your model</span>');
        	setTimeout(check_states(), 900);
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