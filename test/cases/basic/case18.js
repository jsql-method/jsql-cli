jsql.insert('@sql insert   into car' +
    '@sql  (id, model) values' +
    '@sql  (9, "KIA")')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

