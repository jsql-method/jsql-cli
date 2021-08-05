jsql.select("@sql select * from test_user where id = :id and name = :name")
    .then(function (result) {

        if (result.length > 0) {
            status = 'SUCCESS';
        }

    });
jsql.select('@sql seslecsst name foormdsa')
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
jsql.insert("@sql select * from person where id=:id")
    .param('id', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });
jsql.select("@sql select * from person where id=:id")
    .param('id', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.insert('@sql insert into ludzie (name, surname) ' +
    '@sql values ("JSQL", "Nowak")')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.insert('@sql insert into person (id, name, surname) values (890, "Zbyszek", "Nowak")')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.update('@sql update person set age=18 where id=56666')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.delete('@sql delete from car where model="KIA" and id=9')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

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

jsql.select('@sql SELECT price FROM car INNER JOIN person ON car.id=person.id')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql select * from test_user")
    .then(function (result) {

        if (result.length > 0) {
            status = 'SUCCESS';
        }


    });
jsql.select('@sql')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql  ")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.delete("@sql delete from person where age > :age")
    .param('age', 30)
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql SELECT EMP_ID, NAME FROM EMPLOYEE_TBL WHERE EMP_ID = '0000'")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE WHERE CITY = 'Seattle' ORDER BY EMP_ID")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE_TBL WHERE CITY = 'INDIANAPOLIS' ORDER BY EMP_ID asc")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql SELECT p1.ProductModelID FROM Production.Product AS p1 GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice) FROM Production.Product AS p2 WHERE p1.ProductModelID = p2.ProductModelID);")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.update("@sql UPDATE Customers SET Zip=Phone, Phone=Zip")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql SELECT * From Customers WHERE Name LIKE 'Herb%'")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select("@sql select a.name from test_user a")
    .then(function (result) {
        if (result.length > 0) {
            status = 'SUCCESS';
        }
    })
    .catch(function (error) {
    })
    .test(function () {
        resultCallback();
    });

jsql.delete("@sql delete from test_user where id = :id")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });
jsql.select("@sql select * from test_address where test_user_id = ?")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });


jsql.update("@sql update test_address set post_code = ? where id = :id")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });
jsql.insert("@sql insert into test_user values(?,?,?,?)")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });
jsql.select("@sql select name from person where id=890")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

jsql.select('@sql SELECT name FROM person')
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

var myNewQuery = jsql.query("@sql select * from user")
    .append("@sql where id = :id")
    .append("@sql and name = :name");

jsql.repo()

    .namedQuery('someQuery1', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo");
    })

    .namedQuery('someQuery2', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo");
    })

    .namedQuery('someQuery3', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo")
            .append("@sql and id in (?,?,?)")
    });

jsql.get("someQuery3");
jsql.repo()

    .namedQuery('someQuery', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo");
    });

jsql.get("someQuery");