

jsql.select("@sql select * from test_user where id = :id and name = :name")
    .then(function (result) {

        if(result.length > 0){
            status = 'SUCCESS';
        }

    });

