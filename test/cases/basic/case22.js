jsql.delete("@sql delete from person where age > :age")
    .param('age', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

