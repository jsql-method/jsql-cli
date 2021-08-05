jsql.delete('@sql      delete from ' +
    '@sql car          where     model="KIA" and id=9              ' +
    '@sql')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

