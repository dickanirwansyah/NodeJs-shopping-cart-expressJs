var Product = require('../models/product');
var mongoose = require('mongoose');

//buka koneksi
mongoose.connect('mongodb://localhost:27017/development');

var products = [
    new Product({
    imagePath: 'https://www.satubaju.com/img/edixztor/img_iscums/792/55792_l.jpg',
    title: 'Baju Adidas',
    description: 'Baju Adidas',
    price: 55000
    }),

    new Product({ 
        imagePath: 'http://d2pa5gi5n2e1an.cloudfront.net/global/images/product/mobilephones/Apple_iPhone_6/Apple_iPhone_6_L_1.jpg',
        title: 'Iphone 5G',
        description: 'Iphone 5g is the good smartphone',
        price: 110000
    })
];

var berakhir = 0;
for (var i=0; i < products.length; i++){
    products[i].save(function(err, result){
        berakhir++;
        if(berakhir === products.length){
            tutupKoneksi();
        }
    });
}

//tutup koneksi
function tutupKoneksi(){
    mongoose.disconnect();
}
