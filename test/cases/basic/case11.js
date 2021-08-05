jsql.insert('@sql select * from person where id=:id and name=:name')
    .params({
        id: '5',
        name: 'Tomek'
    })
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });
