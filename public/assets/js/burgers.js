// function to ensure the DOM is fully loaded before the following handlers are attached...
$(function() {

	$('.create-form').on('submit', function(event) {
		event.preventDefault();
		var newBurger = {
			name: $('#burg').val().trim()
		};
		// send POST rqst...
		$.ajax('/api/burgers', {
			type: 'POST',
			data: newBurger
		}).then(function() {
			console.log('created a new burger...');
			location.reload();
		})
	});

	$('.change-devoured').on('click', function(event) {
		var id = $(this).data('id');
		var newDevour = $(this).data('newdevour');

		var newDevourState = {
			devoured: newDevour
		};

		// send the put request to update...
		$.ajax('/api/burgers/' + id, {
			type: 'PUT',
			data: newDevourState
		}).then(function() {
			console.log('changed devoured to' + newDevour);
			location.reload();
		})
	});
});