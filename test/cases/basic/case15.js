jsql.insert('@sql insert into person (id, name, surname) values (890, "Zbyszek", "Nowak")')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

