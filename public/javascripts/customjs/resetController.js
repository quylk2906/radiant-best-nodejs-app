var resetConfig = {
    alertTimer: false,
    isLockedAll: false
}
var resetController = {
    init: () => {
        resetController.registerEvents()
    },
    registerEvents: () => {
        $("input[name=reset_form_email]").keyup(function() {
            var $this = $(this)
            var isEmail = resetController.checkValidEmail($this.val())
            if ($this.val().length < 10) {
                $this.parent().find('span').removeClass('hide').text("Email too short")
            } else if (!isEmail) {
                $this.parent().find('span').removeClass('hide').text("Email is invalid")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });
        $("input[name=confirm_newpwd_form]").keyup(function() {
            var $this = $(this)
            var main_password = $("input[name=newpwd_form]").val()
            if ($this.val() !== main_password) {
                $this.parent().find('span').removeClass('hide').text("Password is no match")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });
        $("input[name=newpwd_form]").keyup(function() {
            var $this = $(this)
            if ($this.val().length < 6) {
                $this.parent().find('span').removeClass('hide').text("Pass is too weakly")
            } else {
                $this.parent().find('span').addClass('hide')
            }
        });
        $('#change-password').on('click', (e) => {
            $this = $(this)
            var new_pwd = $("input[name=newpwd_form]").val() == undefined ? "" : $("input[name=newpwd_form]").val()
            var confirm_newpwd = $("input[name=confirm_newpwd_form]").val() == undefined ? "" : $("input[name=confirm_newpwd_form]").val()
            var parameters = {
                new_pwd: $("input[name=newpwd_form]").val(),
                code: $("input[name=checkcode_form_email]").val()
            }
            if ((new_pwd != confirm_newpwd) || new_pwd == "" || confirm_newpwd == "") {
                $this.click(SEMICOLON.widget.notifications({
                    'data-notify-type': 'error',
                    'data-notify-msg': '<i class=icon-remove-sign></i> Input incorrect. Please Try Again!'
                }))
            } else {
                console.log(parameters)
                $.ajax({
                    url: '/users/change-password-code',
                    type: 'post',
                    data: parameters,
                    dataType: 'json',
                    success: function(response) {
                        console.log(response)
                        if (response.status) {
                            console.log(response.message)
                            // $this.click(function() {
                            //     $.magnificPopup.close();
                            //     // return false;
                            // })
                            $this.click(SEMICOLON.widget.notifications({
                                'data-notify-type': 'success',
                                'data-notify-msg': '<i class=icon-ok-sign></i> '+ response.message
                            }))
                        } else {
                            console.log(response.message)
                        }
                    },
                    error: function() {
                        alert("Something wrong. Contact to us !!!")
                    }
                })
            }
        })
        $('#Modal1').click(function(e) {
            $this = $(this)
            var parameters = {
                code: $("input[name=checkcode_form_email]").val()
            }
            $.ajax({
                url: '/users/check-code',
                type: 'post',
                data: parameters,
                dataType: 'json',
                success: function(response) {
                    if (response.status) {
                        $('#Modal2').trigger("click")
                    } else {
                        $this.click(SEMICOLON.widget.notifications({
                            'data-notify-type': 'error',
                            'data-notify-msg': '<i class=icon-remove-sign></i> '+response.message
                        }))
                    }
                },
                error: function() {
                    alert("Something wrong. Contact to us !!!")
                }
            })
            // $('#Modal2').trigger("click")
            // e.preventDefault()
        })
        // <a href="#" class="btn btn-info" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i> Welcome to Canvas Demo!" onclick="SEMICOLON.widget.notifications(this); return false;">Show Info</a>
        //                 <a href="#" class="btn btn-danger" data-notify-type="error" data-notify-msg="<i class=icon-remove-sign></i> Incorrect Input. Please Try Again!" onclick="SEMICOLON.widget.notifications(this); return false;">Show Error</a>
        //                 <a href="#" class="btn btn-success" data-notify-type="success" data-notify-msg="<i class=icon-ok-sign></i> Message Sent Successfully!" onclick="SEMICOLON.widget.notifications(this); return false;">Show Success</a>
        //                 <a href="#" class="btn btn-warning" data-notify-type="warning" data-notify-msg="<i class=icon-warning-sign></i> Don't try to be too Smart!" onclick="SEMICOLON.widget.notifications(this); return false;">Show Warning</a>
    },
    checkValidEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
resetController.init()