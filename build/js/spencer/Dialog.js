define(function(require, exports) {

    var dialog = new $.UIkit.modal.Modal("#spencerDialog");

    function info(data) {
        $('#dialogHead').html(data.title);
        $('#dialogText').html(data.message);
        $('#dialogInteraction').html('<button class="uk-button uk-modal-close">OK</button>');
        
        dialog.show();
    }


exports.info = info;

});