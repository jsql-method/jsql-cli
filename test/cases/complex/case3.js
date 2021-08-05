jsql.select("@sql select * from test_user where id = :id and name = :name")
    .then(function (result) {

        if (result.length > 0) {
            status = 'SUCCESS';
        }

    });

jsql.select("@sql SELECT EMP_ID, NAME " +
    "@sql" +
    "@sql" +
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

jsql.delete("@sql" +
    "@sql delete from person where age > :age" +
    "@sql")
    .param(' age ', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });
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




jsql.insert('@sql select * from person where id=:id and name=:name')
    .params({
        id: '5',
        name: 'Tomek'
    })
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

var myNewQuery = jsql.query("@sql     select    *    from    user")
    .append("@sql       where id = :id")
    .append("@sql and name = :name      ")
    .append("@sql       and " +
        "@sql surname = :surname")
    .append("@sql" +
        "@sql and age = 15" +
        "@sql ")

jsql.get("someQuery3");
jsql.repo()

    .namedQuery('someQuery', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo");
    });

jsql.get("someQuery");