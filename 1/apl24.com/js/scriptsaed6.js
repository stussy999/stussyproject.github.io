$(document).on("click",'a.form-popup', function (event) {
	$('.fba-button').click();

	return false;
});
$(document).ready(function() {
	$('.phone_us').mask('(000) 000-0000');

	$('input.datepicker-here').datepicker({
		  minDate: new Date()
	});

	$('[data-fancybox="crm-form"]').fancybox();

	$(document).on("click",'.crm-submit', function (event) {
		var form_data = $('form[id=crm-form]').serialize();
		var ready_to_post = true;
		$('form[id=crm-form] .required').each(function() {
			if($(this).val() == ''){
				ready_to_post = false;
				$(this).css('border', '1px solid rgb(255 42 42 / 50%)');
			}
		});

		if(ready_to_post == true){
			$.ajax({
				type: 'POST',
				url: "/include/post_to_crm.php",
				data: form_data,
				success: function(data) {
					if (!data.error){
						content = 'Thank you. You have scheduled service call appointment. Our technician will call you 15 minutes before arrival.';
						//instance.hideLoading(current);
                        //instance.setContent(current, content);
                        //instance.update();
						$.fancybox.getInstance().setContent( $.fancybox.getInstance().current, content );
					}
					else {
						content = 'Error. ' + data.error.error;
						//instance.hideLoading(current);
                        //instance.setContent(current, content);
                        //instance.update();
						$.fancybox.getInstance().setContent( $.fancybox.getInstance().current, content );
					}
				},
				dataType: "json"
			});
		}

		return false;
	});

	$(document).on("click",'.contacts-submit', function (event) {
		var form_data = $('form[id=contacts-form]').serialize();
		var ready_to_post = true;
		$('form[id=contacts-form] .required').each(function() {
			if($(this).val() == ''){
				ready_to_post = false;
				$(this).css('border', '1px solid rgb(255 42 42 / 50%)');
			}
		});

		if(ready_to_post == true){
			$.ajax({
				type: 'POST',
				url: "/include/contact_form_request.php",
				data: form_data,
				success: function(data) {
					if (!data.error){
						content = 'Your message was submitted successfully. We will respond to you as soon as possible.';
						$.fancybox.open('<div class="message"><h2>Thank you!</h2><p>' + content + '</p></div>');
					}
					else {
						//12312313
					}
				},
				dataType: "json"
			});
		}

		return false;
	});
});
$ = jQuery.noConflict();