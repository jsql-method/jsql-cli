jsql.update("@sql update test_address set post_code = ? where id = :id")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });