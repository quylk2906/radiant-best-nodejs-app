var shopConfig = {
    alertTimer: false,
    isLockedAll: false
}
var shopController = {
    init: () => {
        shopController.registerEvents()
    },
    registerEvents: () => {
        $(document).on('click', '.add-to-cart', function(e) {
            var $this = $(this)
            e.preventDefault();
            var _id = $this.data('id');
            var parameters = {
                id: _id
            };
            $.ajax({
                url: '/shop/add-to-cart',
                type: 'post',
                // async: false,
                // contentType: "application/json",
                data: parameters,
                dataType: 'json',
                success: function(response) {
                    var items = response.items
                    var html = ""
                    $.each(items, function(index, item) {
                        html += "<div class='top-cart-item clearfix'>" + "<div class='top-cart-item-image'>" + "<a href='#'><img src='" + item.item.thumbnail + "' alt='" + item.item.name + "' /></a>" + "</div>" + "<div class='top-cart-item-desc'>" + "<a href='/shop/shop-detail/id=" + item.item._id + "'>" + (item.item.name).slice(0, 18) + "</a>" + "<span class='top-cart-item-price'>$ " + item.price + "</span>" + "<span class='top-cart-item-quantity'> x" + item.qty + "</span>" + "</div>" + "</div>"
                    })
                    $('#top-cart-trigger').empty().append("<i class='icon-shopping-cart'></i><span>" + response.totalQty + "</span>")
                    $('.top-checkout-price').text('$ ' + response.totalPrice)
                    shopController.addToCartEffect()
                    $('#cart-ajax').empty().append(html)
                },
                error: function() {
                    console.log('Something wrong')
                }
            })
        });
        $('.remove').on('click', function(e) {
            e.preventDefault()
            var btn = $(this).parent().parent();
            var _id = $(this).data('id');
            $.ajax({
                type: "post",
                dataType: 'json',
                url: "/shop/delete-item/" + _id,
                data: {},
                success: function(response) {
                    var totalRemain = response.totalPrice;
                    console.log("Delete Successful")
                    btn.css("background-color", "#4DAF7C ");
                    btn.fadeOut(400, function() {
                        btn.remove();
                    });
                    $('.color').text(totalRemain);
                    var html = ""
                    $.each(response.items, function(index, item) {
                        html += "<div class='top-cart-item clearfix'>" + "<div class='top-cart-item-image'>" + "<a href='#'><img src='" + item.item.thumbnail + "' alt='" + item.item.name + "' /></a>" + "</div>" + "<div class='top-cart-item-desc'>" + "<a href='/shop/shop-detail/id=" + item.item._id + "'>" + (item.item.name).slice(0, 18) + "</a>" + "<span class='top-cart-item-price'>$ " + item.price + "</span>" + "<span class='top-cart-item-quantity'> x" + item.qty + "</span>" + "</div>" + "</div>"
                    })
                    $('#top-cart-trigger').find('span').text(response.totalQty)
                    $('.top-checkout-price').text('$ ' + response.totalPrice)
                    $('#cart-ajax').empty().append(html)

                },
                error: function() {
                    console.log("Delete Failed")
                }
            });
        })
        $('.item-quick-view').click(function() {
            var $this = $(this)
            $.ajax({
                url: '/shop/get-item',
                type: 'post',
                data: {
                    id: $this.data('id')
                },
                dataType: 'json',
                success: function(response) {
                    console.log(response)
                    console.log(response.name)
                    // var items = response.items
                    // var html = ""
                    var star = ""
                    for (var i = 1; i <= response.rate; i++) {
                        star += "<i class='icon-star3'></i>"
                    }
                    var html = "<div class='ajax-modal-title'>" + "<h2>" + response.name + "</h2>" + "</div>" + "<div class='product modal-padding clearfix'>" + 
                    "<div class='col_half nobottommargin'>"
                    +"<div class='product-image'>"
                    +"<div class='slide' style='width: 345px; margin-right: 0px; float: left; display: block;'>"
                    +"<a href='"+response.thumbnail+"' title='Pink Printed Dress - Front View'><img src='"+response.thumbnail+"' alt='"+response.name+"' draggable='false'></a>"
                    +"</div>"
                    +"</div>"
                    +"<br><br><a class='button nomargin' href='"+response.link+"'>" + "Demo" + "</a>"
                    +"</div>" + 
                    "<div class='col_half nobottommargin col_last product-desc'>" + "<div class='product-price'><ins>" + response.price + " VND</ins>" + "</div>" + "<div class='product-rating'>" + star + "<i class='icon-star-empty'>" + "</i>" + "</div>" + "<div class='clear'>" + "</div>" + "<div class='line'>" + "</div>" + "<form class='cart nobottommargin clearfix' enctype='multipart/form-data' method='post'>" + "<div class='quantity clearfix spinner1'>" + "<input type='button' value='-' class='minus'>" + "<input type='text' name='quantity' value='1' class='qty spinner-input' />" + "<input type='button' value='+' class='plus'>" + "</div>" + "<a class='add-to-cart button nomargin' data-id='" + response._id + "' href='shop/add-to-cart/'>" + "Add to cart" + "</a>" + "</form>" + "<div class='clear'>" + "</div>" + "<div class='line'>" + "</div>" + "<p>" + response.description + "</p>" + "<ul class='iconlist'>" + "<li>" + "<i class='icon-caret-right'>" + "</i>" + "Dynamic Color Options" + "</li>" + "<li>" + "<i class='icon-caret-right'>" + "</i>" + "Lots of Size Options" + "</li>" + "<li>" + "<i class='icon-caret-right'>" + "</i>" + "30-Day Return Policy" + "</li>" + "</ul>" + "<div class='panel panel-default product-meta nobottommargin'>" + "<div class='panel-body'>" + "<span class='sku_wrapper' itemprop='productID'>" + "SKU:" + "<span class='sku'>" + response.sku + "</span>" + "</span>" + "<span class='posted_in'>" + "Category:" + "<a href='/shop/category/" + response.category + "' rel='tag'> " + response.category + "</a>" + "." + "</span>" + "<span class='tagged_as'>" + "Tags:" + "<a href='http://dante.swiftideas.net/product-tag/barena/' rel='tag'>" + "Barena" + "</a>" + "," + "<a href='http://dante.swiftideas.net/product-tag/blazers/' rel='tag'>" + "Blazers" + "</a>" + "," + "<a href='http://dante.swiftideas.net/product-tag/tailoring/' rel='tag'>" + "Tailoring" + "</a>" + "," + "<a href='http://dante.swiftideas.net/product-tag/unconstructed/' rel='tag'>" + "Unconstructed" + "</a>" + "." + "</span>" + "</div>" + "</div>" + "</div>" + "</div>" + "<div class='modal-footer'>" + "<button class='btn btn-default nomargin' data-dismiss='modal' type='button'>" + "Close" + "</button>"
                    $('.shop-quick-view-ajax ').empty().append(html)
                    $('#modal-quick-view').modal('show')
                    shopController.initSpinner()
                    // shopController.registerEvents()
                },
                error: function() {
                    console.log('Something wrong')
                }
            })
            // $('#modal-quick-view').modal('show')
        })
    },
    addToCartEffect: () => {
        if (shopConfig.isLockedAll) {
            return false;
        } else {
            shopConfig.isLockedAll = true;
            $(".add-to-cart").addClass("locked");
        }
        $(".qv-alert").addClass("active");
        shopConfig.alertTimer = setInterval(function(e) {
            if (shopConfig.alertTimer !== null) {
                clearTimeout(shopConfig.alertTimer);
                shopConfig.alertTimer = null;
            }
            $(".qv-alert").removeClass("active");
            shopConfig.isLockedAll = false;
            $(".add-to-cart").removeClass("locked");
        }, 2000);
    },
    initSpinner: () => {
        $('.spinner1').spinner();
    }
}
shopController.init()