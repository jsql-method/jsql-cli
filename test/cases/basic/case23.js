jsql.select("@sql SELECT EMP_ID, NAME FROM EMPLOYEE_TBL WHERE EMP_ID = '0000'")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

