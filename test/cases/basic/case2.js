jsql.select("@sql select * from test_user")
    .then(function (result) {

        if(result.length > 0){
            status = 'SUCCESS';
        }


    });
