jsql.select('@sql SELECT price FROM car INNER JOIN person ON car.id=person.id')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

