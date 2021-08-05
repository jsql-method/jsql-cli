jsql.insert('@sql insert into ludzie (name, surname) values ("JSQL", "Nowak")')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

