jsql.select("@sql SELECT EMP_ID, NAME " +
    "@sql " +
    "@sql " +
    "@sql FROM EMPLOYEE_TBL " +
    "@sql          " +
    "@sql WHERE         EMP_ID = '0000'           ")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

