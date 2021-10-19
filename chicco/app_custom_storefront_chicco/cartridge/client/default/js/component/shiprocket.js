$(document).ready(function () {

    $(document).on('submit', '.check-service-ability', function (e) {
        e.preventDefault();
        var actionURL =  $(this).attr('action');
        var pinCode = $('.pincode-service-ability').val();
        var responseContainer = '.estimated-delievery-response';
        $('.error-response').empty();
        $('.error-response').addClass('d-none');
        //$(responseContainer).empty();
        if ($('.pincode-service-ability').hasClass('is-invalid')) {
            $('.invalid-feedback').show();
            return;
        } else {
            $('.invalid-feedback').hide();
        }
        $.spinner().start();
        $.ajax({
            url: actionURL,
            type: 'GET',
            dataType: 'json',
            data: 'pinCode=' + pinCode,
            success: function (data) {
                $.spinner().stop();
                if (data.error) {
                    $('.error-response').empty();
                    $('.error-response').removeClass('d-none');
                    $('.error-response').append(data.errorMsg);
                } else {
                    $(responseContainer).empty();
                    console.log(data.response.etd);
                    $(responseContainer).html(window.Resources.ESTIMATED_DELIEVERY + ' <strong>' + data.response.etd + '</strong>');
                }
            },
            error: function (err) {
                $.spinner().stop();
            }
        });
    });
});
