jsql.select("@sql SELECT * From Customers WHERE Name LIKE 'Herb%'")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

