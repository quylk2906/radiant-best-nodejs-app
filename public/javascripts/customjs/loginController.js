var loginConfig = {
    alertTimer: false,
    isLockedAll: false
}
var loginController = {
    init: () => {
        loginController.registerEvents()
    },
    registerEvents: () => {
        $("input[name=login_form_email]").keyup(function () {
            var $this = $(this)
            var isEmail = loginController.checkValidEmail($this.val())
            if ($this.val().length < 10){
                $this.parent().find('span').removeClass('hide').text("Email too short")
            } else if (!isEmail) {
                $this.parent().find('span').removeClass('hide').text("Email is invalid")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });

        $("input[name=register_form_fullname]").keyup(function () {
            var $this = $(this)
            if ($this.val().length < 10){
                $this.parent().find('span').removeClass('hide').text("Name required at least 10 character")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });

        $("input[name=register_form_email]").keyup(function () {
            var $this = $(this)
            var isEmail = loginController.checkValidEmail($this.val())
            if ($this.val().length < 10){
                $this.parent().find('span').removeClass('hide').text("Email too short")
            } else if (!isEmail) {
                $this.parent().find('span').removeClass('hide').text("Email is invalid")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });

        $("input[name=register_form_password]").keyup(function () {
            var $this = $(this)
            if ($this.val().length < 6){
                $this.parent().find('span').removeClass('hide').text("Pass is too weakly")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });

        $("input[name=register_form_confirm_password]").keyup(function () {
            var $this = $(this)
            var main_password = $("input[name=register_form_password]").val()
            if ($this.val() !== main_password){
                $this.parent().find('span').removeClass('hide').text("Password is no match")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });

        $("input[name=register_form_phone]").keyup(function () {
            var $this = $(this)
            if ($this.val().length < 10){
                $this.parent().find('span').removeClass('hide').text("Phone required at least 10 character")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });
    },

    checkValidEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
loginController.init()