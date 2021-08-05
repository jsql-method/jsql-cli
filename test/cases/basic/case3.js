jsql.select("@sql select a.name from test_user a")
    .then(function (result) {
        if(result.length > 0){
            status = 'SUCCESS';
        }
    })
    .catch(function (error) {
    })
    .test(function () {
        resultCallback();
    });

