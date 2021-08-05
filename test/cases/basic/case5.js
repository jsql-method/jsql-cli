jsql.select("@sql select * from test_address where test_user_id = ?")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });


