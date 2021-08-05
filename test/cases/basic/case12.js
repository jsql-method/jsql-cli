jsql.insert("@sql select * from person where id=:id")
    .param('id', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });
