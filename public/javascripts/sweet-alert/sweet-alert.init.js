
///**
//* Theme: Quylk Admin Template
//* Author: Coderthemes
//* SweetAlert - 
//* Usage: $.SweetAlert.methodname
//*/

//!function($) {
//    "use strict";

//    var SweetAlert = function() {};

//    //examples 
//    SweetAlert.prototype.init = function () {
//       //var oTable = $('#example').dataTable();
//       //Warning Message
//       $('.sa-warning').click(function () {
//          var $this = $(this);
//          var id = $this.closest('tr').find('.IDuser').text();
          
//          //$('#example tbody tr').click(function () {
            
//          //});

//          swal({
//             title: "Are you sure?",
//             text: "This imaginary file move to trash!",
//             type: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#F64747",
//             confirmButtonText: "Yes, delete it!",
//             closeOnConfirm: false
//          }, function (isConfirm) {
//             if (!isConfirm) return;
//             $.ajax({
//                type: "POST",
//                dataType: 'json',
//                //url: "/User/DeleteUser",
//                data: { id: id },
//                success: function () {
//                   swal("Done!", "It was succesfully deleted!", "success");
//                   oTable.fnDeleteRow($this);
//                },
//                error: function () {
//                   swal("Done!", "It was succesfully deleted!", "success");
//                   //oTable.fnDeleteRow($this);
//                }
//             });
//          });
//       });
//    }
//    //init
//    $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
//}(window.jQuery),

////initializing 
//function($) {
//    "use strict";
//    $.SweetAlert.init()
//}(window.jQuery);