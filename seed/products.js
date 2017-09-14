const { Product } = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://quylkuit:Nguyetheo2302@ds151820.mlab.com:51820/hsop-cart')

var productsHTML = [
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Car Service - Mechanic Auto Shop',
      title_meta: 'car-service-mechanic-auto-shop-template',
      price: 100,
      sale: 0,
      sku: '12332985',
      category: 'html',
      group: 'service',
      description: 'Car Service – Mechanic Auto Shop Template is a responsive and retina ready HTML Template best suitable for auto mechanic, car repair shop, mechanic workshop, car repair services, auto painting, auto detailing, tire or wheel shop. Car Service – Mechanic Auto Shop Template is also suitable for any small business like car rental, car wash, auto glass or for any handyman, serviceman or skilled worker like panel beater, spray painter, body builder, car dealer, motorcycle mechanic or automotive technician. The Template comes with Appointment Form, Slider Revolution jQuery plugin, 90 premium car related font based icons, 12 page templates, sticky menu, touch friendly slider and carousels, ajax contact form and more.',
      link: 'https://themeforest.net/item/car-service-mechanic-auto-shop-template/12332985',
      rate: 3,
      thumbnail: 'https://image-tf.s3.envato.com/files/143828889/_screenshots/01_carservice.__large_preview.jpg',
      image: 'https://d1a6a9r46cnyll.cloudfront.net/f5ee876b050799e2d95a67551b9a8b74ac57b9dc/687474703a2f2f7175616e746963616c6162732e636f6d2f456e7661746f2f4974656d732f436172736572766963655f48544d4c2f6465736372697074696f6e2e706e67',
      review: ''
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Hajs - Modern Multi-Purpose Landing Page',
      title_meta: 'hajs-modern-multipurpose-landing-page-template',
      price: 100,
      sale: 0,
      sku: '19532104',
      category: 'html',
      group: 'landing',
      description: 'Hajs is Modern Multi-Purpose Landing Page based on Bootstrap 4 framework. It is perect as a product / app and any kind of marketing website. It includes 6 diffrent concepts, 6 color schemes and 3 diffrent styles so it is ready to use package for everyone. Thanks to responsive design it is going to work great on any device!',
      link: 'http://preview.themeforest.net/item/hajs-modern-multipurpose-landing-page-template/full_screen_preview/19532104?_ga=1.14887798.1127364737.1488864221',
      thumbnail: 'https://image-tf.s3.envato.com/files/222724185/preview.__large_preview.jpg',
      image: 'https://d1a6a9r46cnyll.cloudfront.net/2fb2accca6eb9012e75cb28839ad479a3b4a8669/687474703a2f2f7375656c6f2e706c2f7468656d65666f726573742f6465736372697074696f6e732f68616a732f64656d6f732e6a7067',
      rate: 2,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'UniLearn - Education and Courses Template',
      title_meta: 'unilearn-education-and-courses-template',
      price: 100,
      sale: 0,
      sku: '13731004',
      category: 'html',
      group: 'education',
      description: '“UniLearn” is a flexible HTML template, suitable for a wide variety of educational websites. Its clean design, complete with “flat” graphics and copious white space, out-stands this template from others and makes it applicable for colleges, online courses, tutorial sites, personal blogs and may other businesses! This template looks great on tablets and mobile devices due to its responsive design and retina graphics. It comes loaded with various page types, wide and boxed layouts, includes unlimited color schemes, great amount of fonts, icons and more. Highest quality of code, extended and easy-to-read documentation, prompt and qualified support are the key features “UniLearn” is standing out with.',
      link: 'http://html.creaws.com/unilearn/',
      thumbnail: 'https://image-tf.s3.envato.com/files/175294473/Theme-Preview.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/175294473/Theme-Preview.__large_preview.png',
      rate: 0,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'KOSMO - Multi Purpose Responsive Bootstrap 4 Admin Dashboard ',
      title_meta: 'kosmo-multi-purpose-responsive-bootstrap-4-admin-template-ui-framework',
      price: 100,
      sale: 0,
      sku: '19506620',
      category: 'html',
      group: 'admin',
      description: 'descrKosmo is a multipurpose powerful and super flexible responsive Bootstrap 4 admin framework for modern web applications of any kind! 6 different layouts, 1000+ commented HTML pages, 1000+ components with various configurable features, 100+ plugins and extensions and many more bonuses such as the Starter kit with a set of blank pages will make your developer’s life so much easier! Kosmo is fully responsive and looks perfect on all devices including mobiles and tablets. Dozens of powerful and easy to modify and to configure components (thanks to scss/sass!) can become the foundation of your idea and can quickly turn it into reality as well as it’s ready to be integrated into your existing project.iption',
      link: 'https://themeforest.net/item/kosmo-multi-purpose-responsive-bootstrap-4-admin-template-ui-framework/19506620',
      thumbnail: '19506620',
      image: '19506620',
      rate: 4,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Restate - Different Real Estate Material Template',
      title_meta: 'restate-different-real-estate-material-template',
      price: 100,
      sale: 0,
      sku: '10675133',
      category: 'html',
      group: 'real-estate',
      description: 'Restate is beautifully crafted material design Real Estate HTML Template. We’ve designed this template with one main idea in mind – to be different and bring new experience for user when browsing the real estate site. Thanks do material design, the template is clean and simple so user will focus only on important content. Awesome animations guarantee the best experience in Real Estate templates.',
      link: 'https://themeforest.net/item/restate-different-real-estate-material-template/10675133',
      thumbnail: 'https://image-tf.s3.envato.com/files/147073914/01_banner.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/147073914/01_banner.__large_preview.png',
      rate: 0,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'BERLINER - Bootstrap HTML5 Template',
      title_meta: '135912-BERLINER-Bootstrap-HTML5-Template',
      price: 100,
      sale: 0,
      sku: '135912',
      category: 'html',
      group: 'landing',
      description: 'description',
      link: 'http://demo.themestreet.net/berliner/',
      thumbnail: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/276338/580/623/m1/fpnw/wm0/berliner1-.png?1418866515&s=e2912a76fc36215da2ba0c9bc23502a0',
      image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/276338/580/623/m1/fpnw/wm0/berliner1-.png?1418866515&s=e2912a76fc36215da2ba0c9bc23502a0',
      rate: 5,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Areen - Multipurpose Business Website Template',
      title_meta: 'areen-multipurpose-business-website-template',
      price: 100,
      sale: 0,
      sku: '18016228',
      category: 'html',
      group: 'landing',
      description: '‘Areen’ is an awesome HTML theme which has 20+ valid HTML pages with 4 unique demo home pages. It is a easy to edit, good-performance template comprising of modern & classic styled elements to fulfil all your business website requirements. Create an attractive and user friendly website quickly and easily. The bundled features will make a clean and modern design for your website.',
      link: 'https://themeforest.net/item/areen-multipurpose-business-website-template/18016228',
      thumbnail: 'https://image-tf.s3.envato.com/files/207581258/theme-preview-1-0.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/207581258/theme-preview-1-0.__large_preview.png',
      rate: 1,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Inspire. - Creative Multipurpose HTML template',
      title_meta: 'inspire-creative-multipurpose-html-template',
      price: 100,
      sale: 0,
      sku: '19460966',
      category: 'html',
      group: 'landing',
      description: 'Inspire. – Creative Multipurpose HTML template is designed especially for creative agency, multipurpose and business and those who offer business related services. Here you will get 13+ HTML pages with the easily customizable code with pixel perfect coding With 2 different home version',
      link: 'https://themeforest.net/item/inspire-creative-multipurpose-html-template/19460966',
      thumbnail: 'https://image-tf.s3.envato.com/files/221728247/Banner.__large_preview.jpg',
      image: 'https://image-tf.s3.envato.com/files/221728247/Banner.__large_preview.jpg',
      rate: 0,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Creativica - Multiple Creative HTML5 Template',
      title_meta: 'creativica-multiple-creative-html5-template',
      price: 100,
      sale: 0,
      sku: '19061883',
      category: 'html',
      group: 'ecommerce',
      description: 'Creativica is a Powerful Multiple creative Template. Only buy one template, you can Make some cool websites, Creativica come with 25 creative template, Unlimited icons, 10 Header style, 9 color skins, working contact form and template components. So what are you waiting if Creativica able to handle all the needs of the design for multiple projects.',
      link: 'http://99webpage.com/theme-review/html/creativica/shop.html',
      thumbnail: 'https://image-tf.s3.envato.com/files/220088227/theme-review.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/220088227/theme-review.__large_preview.png',
      rate: 2,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Glammy - eCommerce HTML Premium Template',
      title_meta: 'glammy-ecommerce-html-premium-template',
      price: 100,
      sale: 0,
      sku: '7241265',
      category: 'html',
      group: 'ecommerce',
      description: 'Glammy is a eCommerce Glamour and Modern HTMLWith combination of colors and beautiful images makes website more elegant, glamour, luxurious and attractive for buyers. This Template is perfect solutions for Fashion Shop, Clothes Store, Shoes Store, Kids Store and more.',
      link: 'https://themeforest.net/item/glammy-ecommerce-html-premium-template/7241265',
      thumbnail: 'https://image-tf.s3.envato.com/files/133705287/prew-image/01_prev_590x300.__large_preview.jpg',
      image: 'https://image-tf.s3.envato.com/files/133705287/prew-image/01_prev_590x300.__large_preview.jpg',
      rate: 3,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'RIVAL Creative One Page Template',
      title_meta: 'rival-creative-one-page-template',
      price: 100,
      sale: 0,
      sku: '7586143',
      category: 'html',
      group: 'landing',
      description: '',
      link: 'https://themeforest.net/item/rival-creative-one-page-template/7586143',
      thumbnail: 'https://image-tf.s3.envato.com/files/89745467/preview/preview.__large_preview.jpg',
      image: 'https://image-tf.s3.envato.com/files/89745467/preview/preview.__large_preview.jpg',
      rate: 3,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Edua - Educational HTML5 Template',
      title_meta: 'edua-educational-html5-template',
      price: 100,
      sale: 0,
      sku: '19078817',
      category: 'html',
      group: 'education',
      description: 'Edua – Educational HTML5 Template is a Modern, Creative, Responsive template suitable for Educational Institutions like Universities and Colleges, Online Courses / Online Learning and other business events. Clean, crisp and simple design that can easily be adapted and used for variety of similar niche websites. This template has 4 different home page versions with shop, blog, courses, events and other necessary pages included as well.',
      link: 'https://themeforest.net/item/edua-educational-html5-template/19078817',
      thumbnail: 'https://image-tf.s3.envato.com/files/218771378/theme-preview.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/218771378/theme-preview.__large_preview.png',
      rate: 3,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Varello Admin | Responsive Bootstrap Admin Template + Laravel 5.4 Starter Kit',
      title_meta: 'varello-admin-responsive-dark-bootstrap-admin-template-laravel-starter-kit',
      price: 100,
      sale: 0,
      sku: '17315956',
      category: 'html',
      group: 'ecommerce',
      description: 'VarelloAdmin is a fully-responsive, well-featured and highly-polished dark admin template. It includes both Static HTML and Laravel 5.4 Blade versions (includes application routes and controllers). It is a good fit for any kind of back-end application, whether it is administrative, statistical, management, CMS, dashboard, messaging, and much more. It is built for multi-purpose admin systems, and has been rigorously designed and tested to work responsively across Large/Medium Desktop, Tablet and Mobile devices, and in all modern browsers. This ensures it looks good, no matter the device you are using.',
      link: 'https://themeforest.net/item/varello-admin-responsive-dark-bootstrap-admin-template-laravel-starter-kit/17315956',
      thumbnail: 'Varello Admin | Responsive Bootstrap Admin Template + Laravel 5.4 Starter Kit',
      image: 'Varello Admin | Responsive Bootstrap Admin Template + Laravel 5.4 Starter Kit',
      rate: 3,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Hexo - Premium RealEstate HTML Template',
      title_meta: 'hexo-premium-realestate-html-template',
      price: 100,
      sale: 0,
      sku: '16692589',
      category: 'html',
      group: 'real-estate',
      description: 'Hexo Properties is a modern HTML real estate template designed for real estate agents, brokers, agencies, organizations, and so on. The HTML files and elements are easily customizable for any organization. This real estate theme is designed using high quality PSD images and latest HTML5 and CSS3 standards. There are three solid colors (Orange, Blue, Green) and 9 web pages. That’s not all, there are many more great features. For more information, visit our website http://www.digitalcenturysf.com',
      link: 'https://themeforest.net/item/hexo-premium-realestate-html-template/16692589',
      thumbnail: 'https://image-tf.s3.envato.com/files/203167122/preview.__large_preview.jpg',
      image: 'https://image-tf.s3.envato.com/files/203167122/preview.__large_preview.jpg',
      rate: 3,
      review: 'review'
   }),
   new Product({
      user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
      gallery: { data: { name1: 'abc', name: 'abc' } },
      name: 'Who I am - Personal Resume and Portfoli',
      title_meta: 'who-i-am-personal-resume-and-portfolio',
      price: 100,
      sale: 0,
      sku: '9745869',
      category: 'html',
      group: 'personal',
      description: 'Who I am - is a Professional Responsive Vcard | Personal and Portfolio Resume HTML5 Template which has been built using the Twitter Bootstrap 3.3.1 framework',
      link: 'https://themeforest.net/item/who-i-am-personal-resume-and-portfolio/9745869',
      thumbnail: 'https://image-tf.s3.envato.com/files/117580303/preview3.__large_preview.png',
      image: 'https://image-tf.s3.envato.com/files/117580303/preview3.__large_preview.png',
      rate: 3,
      review: 'review'
   })  
]


// var done = 0;
// for (var i = 0; i < productsHTML.length; i++) {
//     productsHTML[i].save(function(err, result) {
//       console.log(result);
//         done++;
//         if (done === productsHTML.length) {
//             exit();
//         }
//     });
// }

// function exit(){
//    mongoose.disconnect()
// }

// var pro = Product({
//    user_id: mongoose.Types.ObjectId("58e3cf347c50320858173a64"),
//    name: 'Who I am - Personal Resume and Portfoli',
//    gallery: { data: { name1: 'abc', name: 'abc' } },
//    title_meta: 'who-i-am-personal-resume-and-portfolio',
//    price: 100,
//    sale: 0,
//    sku: '9745869',
//    category: 'html',
//    group: 'personal',
//    description: 'Who I am - is a Professional Responsive Vcard | Personal and Portfolio Resume HTML5 Template which has been built using the Twitter Bootstrap 3.3.1 framework',
//    link: 'https://themeforest.net/item/who-i-am-personal-resume-and-portfolio/9745869',
//    thumbnail: 'https://image-tf.s3.envato.com/files/117580303/preview3.__large_preview.png',
//    image: 'https://image-tf.s3.envato.com/files/117580303/preview3.__large_preview.png',
//    rate: 3,
//    review: 'review'
// })

// pro.save((err, doc) => {
//    if (err) {  return console.log("con cac, co loi roi")}
//       console.log(pro)
// })
// 
var myStr = "abc xyz..."
console.log(myStr.slice(0, 3) + "...")