/**
 * 注文取引開始サンプル
 * @ignore
 */

const tttsapi = require('../');

const transactions = new tttsapi.service.transaction.PlaceOrder({
    endpoint: 'https://example.com'
});

transactions.start({
    expires: new Date(),
    sellerId: '',
    passportToken: ''
}).then((result) => {
    console.log(result);
});;

