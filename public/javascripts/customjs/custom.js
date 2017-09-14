jQuery(function($) {
    "use strict";
     var alertTimer, isLockedAll = false;
    $('body').on('click', '.add-to-cart', function(e) {
       
        e.preventDefault();
        if (isLockedAll) {
            return false;
        } else {
            isLockedAll = true;
            $(".add-to-cart").addClass("locked");
        }

        $(".qv-alert").addClass("active");
        alertTimer = setInterval(function(e) {
            if (alertTimer !== null) {
                clearTimeout(alertTimer);
                alertTimer = null;
            }
            $(".qv-alert").removeClass("active");
            isLockedAll = false;
            $(".add-to-cart").removeClass("locked");
        }, 2000);
    });
}); /*end ready*/ /*end*/