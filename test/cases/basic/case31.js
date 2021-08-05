jsql.select("@sql           SELE" +
    "@sql CT EMP_ID, LAST_N" +
    "@sql AME FROM EMPLOYEE WHE" +
    "@sql RE CITY = 'Seattle' ORD" +
    "@sql ER BY EMP_ID")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

