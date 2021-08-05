let assert = require('assert');
const parserMock = require("../parser-testing/parserMock");
const fs = require("fs");

describe('JSQL CLI parser', function () {

    describe('#parse basic and construct', function () {

        it('should match queries in case 1', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case1.js', 'utf8'));
            assert(matches.has('@sql select * from test_user where id = :id and name = :name'));
        });

        it('should match queries in case 2', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case2.js', 'utf8'));
            assert(matches.has('@sql select * from test_user'));
        });

        it('should match queries in case 3', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case3.js', 'utf8'));
            assert(matches.has('@sql select a.name from test_user a'));
        });

        it('should match queries in case 4', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case4.js', 'utf8'));
            assert(matches.has('@sql delete from test_user where id = :id'));
        });

        it('should match queries in case 5', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case5.js', 'utf8'));
            assert(matches.has('@sql select * from test_address where test_user_id = ?'));
        });

        it('should match queries in case 6', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case6.js', 'utf8'));
            assert(matches.has('@sql update test_address set post_code = ? where id = :id'));
        });

        it('should match queries in case 7', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case7.js', 'utf8'));
            assert(matches.has("@sql insert into test_user values(?,?,?,?)"));
        });

        it('should match queries in case 8', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case8.js', 'utf8'));
            assert(matches.has("@sql select name from person where id=890"));
        });

        it('should match queries in case 9', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case9.js', 'utf8'));
            assert(matches.has("@sql SELECT name FROM person"));
        });

        it('should match queries in case 10', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case10.js', 'utf8'));
            assert(matches.has("@sql seslecsst name foormdsa"));
        });

        it('should match queries in case 11', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case11.js', 'utf8'));
            assert(matches.has('@sql select * from person where id=:id and name=:name'));
        });

        it('should match queries in case 12', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case12.js', 'utf8'));
            assert(matches.has('@sql select * from person where id=:id'));
        });

        it('should match queries in case 13', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case13.js', 'utf8'));
            assert(matches.has('@sql select * from person where id=:id'));
        });

        it('should match queries in case 14', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case14.js', 'utf8'));
            assert(matches.has('@sql insert into ludzie (name, surname) values ("JSQL", "Nowak")'));
        });

        it('should match queries in case 15', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case15.js', 'utf8'));
            assert(matches.has('@sql insert into person (id, name, surname) values (890, "Zbyszek", "Nowak")'));
        });

        it('should match queries in case 16', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case16.js', 'utf8'));
            assert(matches.has('@sql update person set age=18 where id=56666'));
        });

        it('should match queries in case 17', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case17.js', 'utf8'));
            assert(matches.has('@sql delete from car where model="KIA" and id=9'));
        });

        it('should match queries in case 18', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case18.js', 'utf8'));
            assert(matches.size === 3);
            assert(matches.has('@sql insert   into car'));
            assert(matches.has('@sql  (id, model) values'));
            assert(matches.has('@sql  (9, "KIA")'));
        });

        it('should match queries in case 19', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case19.js', 'utf8'));
            assert(matches.has('@sql SELECT price FROM car INNER JOIN person ON car.id=person.id'));
        });

        it('should match queries in case 20', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case20.js', 'utf8'));
            assert(matches.size === 0);
        });

        it('should match queries in case 21', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case21.js', 'utf8'));
            assert(matches.size === 0);
        });

        it('should match queries in case 22', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case22.js', 'utf8'));
            assert(matches.has('@sql delete from person where age > :age'));
        });

        it('should match queries in case 23', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case23.js', 'utf8'));
            assert(matches.has("@sql SELECT EMP_ID, NAME FROM EMPLOYEE_TBL WHERE EMP_ID = '0000'"));
        });

        it('should match queries in case 24', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case24.js', 'utf8'));
            assert(matches.has("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE WHERE CITY = 'Seattle' ORDER BY EMP_ID"));
        });

        it('should match queries in case 25', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case25.js', 'utf8'));
            assert(matches.has("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE_TBL WHERE CITY = 'INDIANAPOLIS' ORDER BY EMP_ID asc"));
        });

        it('should match queries in case 26', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case26.js', 'utf8'));
            assert(matches.has("@sql SELECT p1.ProductModelID FROM Production.Product AS p1 GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice) FROM Production.Product AS p2 WHERE p1.ProductModelID = p2.ProductModelID);"));
        });

        it('should match queries in case 27', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case27.js', 'utf8'));
            assert(matches.has("@sql UPDATE Customers SET Zip=Phone, Phone=Zip"));
        });

        it('should match queries in case 28', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case28.js', 'utf8'));
            assert(matches.has("@sql SELECT * From Customers WHERE Name LIKE 'Herb%'"));
        });

        it('should match queries in case 29', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case29.js', 'utf8'));
            assert(matches.size === 2);
            assert(matches.has("@sql      delete from"));
            assert(matches.has("@sql car          where     model=\"KIA\" and id=9"));
        });

        it('should match queries in case 30', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case30.js', 'utf8'));
            assert(matches.size === 3);
            assert(matches.has("@sql SELECT EMP_ID, NAME"));
            assert(matches.has("@sql FROM EMPLOYEE_TBL"));
            assert(matches.has("@sql WHERE         EMP_ID = \'0000\'"));
        });

        it('should match queries in case 31', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case31.js', 'utf8'));
            assert(matches.size === 5);
            assert(matches.has("@sql           SELE"));
            assert(matches.has("@sql CT EMP_ID, LAST_N"));
            assert(matches.has("@sql AME FROM EMPLOYEE WHE"));
            assert(matches.has("@sql RE CITY = \'Seattle\' ORD"));
            assert(matches.has("@sql ER BY EMP_ID"));
        });

        it('should match queries in case 32', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/basic/case32.js', 'utf8'));
            assert(matches.has('@sql delete from person where age > :age'));
        });

        it('should match queries in construct 1', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case1.js', 'utf8'));
            assert(matches.size === 3);
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where id = :id"));
            assert(matches.has("@sql and name = :name"));
        });

        it('should match queries in construct 2', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case2.js', 'utf8'));
            assert(matches.size === 3);
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where query = test repo"));
            assert(matches.has("@sql and id in (?,?,?)"));
        });

        it('should match queries in construct 3', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case3.js', 'utf8'));
            assert(matches.size === 2);
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where query = test repo"));
        });

        it('should match queries in construct 4', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case4.js', 'utf8'));
            assert(matches.size === 5);
            assert(matches.has("@sql UPDATE car"));
            assert(matches.has("@sql  SET model=:model"));
            assert(matches.has("@sql WHERE"));
            assert(matches.has("@sql id = :id"));
            assert(matches.has("@sql AND model = :model"));
        });


        it('should match queries in construct 5', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case5.js', 'utf8'));
            assert(matches.size === 5);
            assert(matches.has("@sql SELECT p1.ProductModelID"));
            assert(matches.has("@sql FROM Production.Product AS p1"));
            assert(matches.has("@sql    GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice)"));
            assert(matches.has("@sql      FROM   Production.Product AS   p2"));
            assert(matches.has("@sql WHERE   p1.ProductModelID =   p2.ProductModelID)"));
        });


        it('should match queries in construct 6', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case6.js', 'utf8'));
            assert(matches.size === 6);
            assert(matches.has("@sql     select    *    from    user"));
            assert(matches.has("@sql       where id = :id"));
            assert(matches.has("@sql and name = :name"));
            assert(matches.has("@sql       and"));
            assert(matches.has("@sql surname = :surname"));
            assert(matches.has("@sql and age = 15"));
        });

        it('should match queries in construct 7', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case7.js', 'utf8'));
            assert(matches.size === 5);
            assert(matches.has("@sql select * from"));
            assert(matches.has("@sql user"));
            assert(matches.has("@sql where query = test repo"));
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql and id in (?,?,?)"));
        });

        it('should match queries in construct 8', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/construct/case8.js', 'utf8'));
            assert(matches.size === 5);
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where"));
            assert(matches.has("@sql query = test repo"));
            assert(matches.has("@sql where query = test repo"));
            assert(matches.has("@sql and id in (?,?,?)"));
        });

    });

    describe('#parse complex', function () {

        it('should match queries in complex 1', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/complex/case1.js', 'utf8'));
            assert(matches.size === 33);

            assert(matches.has("@sql select * from test_user where id = :id and name = :name"));
            assert(matches.has("@sql seslecsst name foormdsa"));
            assert(matches.has("@sql select * from person where id=:id and name=:name"));
            assert(matches.has("@sql select * from person where id=:id"));
            assert(matches.has("@sql insert into ludzie (name, surname)"));
            assert(matches.has("@sql values (\"JSQL\", \"Nowak\")"));
            assert(matches.has("@sql insert into person (id, name, surname) values (890, \"Zbyszek\", \"Nowak\")"));
            assert(matches.has("@sql update person set age=18 where id=56666"));
            assert(matches.has("@sql delete from car where model=\"KIA\" and id=9"));
            assert(matches.has("@sql insert   into car"));
            assert(matches.has("@sql  (id, model) values"));
            assert(matches.has("@sql  (9, \"KIA\")"));
            assert(matches.has("@sql SELECT price FROM car INNER JOIN person ON car.id=person.id"));
            assert(matches.has("@sql select * from test_user"));
            assert(matches.has("@sql delete from person where age > :age"));
            assert(matches.has("@sql SELECT EMP_ID, NAME FROM EMPLOYEE_TBL WHERE EMP_ID = '0000'"));
            assert(matches.has("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE WHERE CITY = 'Seattle' ORDER BY EMP_ID"));
            assert(matches.has("@sql SELECT EMP_ID, LAST_NAME FROM EMPLOYEE_TBL WHERE CITY = 'INDIANAPOLIS' ORDER BY EMP_ID asc"));
            assert(matches.has("@sql SELECT p1.ProductModelID FROM Production.Product AS p1 GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice) FROM Production.Product AS p2 WHERE p1.ProductModelID = p2.ProductModelID);"));
            assert(matches.has("@sql UPDATE Customers SET Zip=Phone, Phone=Zip"));
            assert(matches.has("@sql SELECT * From Customers WHERE Name LIKE 'Herb%'"));
            assert(matches.has("@sql select a.name from test_user a"));
            assert(matches.has("@sql delete from test_user where id = :id"));
            assert(matches.has("@sql select * from test_address where test_user_id = ?"));
            assert(matches.has("@sql update test_address set post_code = ? where id = :id"));
            assert(matches.has("@sql insert into test_user values(?,?,?,?)"));
            assert(matches.has("@sql select name from person where id=890"));
            assert(matches.has("@sql SELECT name FROM person"));
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where id = :id"));
            assert(matches.has("@sql and name = :name"));
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where query = test repo"));
            assert(matches.has("@sql and id in (?,?,?)"));
        });

        it('should match queries in complex 2', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/complex/case2.js', 'utf8'));
            assert(matches.size === 8);

            assert(matches.has("@sql insert into person (id, name, surname, age) values (nextval('person_id_seq'), :name, :surname, :age)"));
            assert(matches.has("@sql insert into car (id, price, year, model) values (nextval('car_id_seq'), ?, ?, ?)"));
            assert(matches.has("@sql update person set salary = 4000 where age > :age"));
            assert(matches.has("@sql update car set type = ?"));
            assert(matches.has("@sql select * from person where age > :ageMin and age < :ageMax limit 1"));
            assert(matches.has("@sql select id, price from car"));
            assert(matches.has("@sql delete from person where age > 30"));
            assert(matches.has("@sql delete from car where price <> :price"));

        });

        it('should match queries in complex 3', function () {
            let matches = parserMock.parseText(fs.readFileSync('test/cases/complex/case3.js', 'utf8'));
            assert(matches.size === 21);

            assert(matches.has("@sql select * from test_user where id = :id and name = :name"));
            assert(matches.has("@sql SELECT EMP_ID, NAME"));
            assert(matches.has("@sql FROM EMPLOYEE_TBL"));
            assert(matches.has("@sql WHERE         EMP_ID = \'0000\'"));
            assert(matches.has("@sql           SELE"));
            assert(matches.has("@sql CT EMP_ID, LAST_N"));
            assert(matches.has("@sql AME FROM EMPLOYEE WHE"));
            assert(matches.has("@sql RE CITY = \'Seattle\' ORD"));
            assert(matches.has("@sql ER BY EMP_ID"));
            assert(matches.has("@sql delete from person where age > :age"));
            assert(matches.has("@sql      delete from"));
            assert(matches.has("@sql car          where     model=\"KIA\" and id=9"));
            assert(matches.has("@sql select * from person where id=:id and name=:name"));
            assert(matches.has("@sql     select    *    from    user"));
            assert(matches.has("@sql       where id = :id"));
            assert(matches.has("@sql and name = :name"));
            assert(matches.has("@sql       and"));
            assert(matches.has("@sql surname = :surname"));
            assert(matches.has("@sql and age = 15"));
            assert(matches.has("@sql select * from user"));
            assert(matches.has("@sql where query = test repo"));

        });

        describe('#parse extreme', function () {

            it('should match queries in extreme 1', function () {
                let matches = parserMock.parseText(fs.readFileSync('test/cases/extreme/case1.js', 'utf8'));
                assert(matches.size === 5);

                assert(matches.has('@sql select color from car where id = ?'));
                assert(matches.has('@sql select price from car'));
                assert(matches.has('@sql select model from car'));
                assert(matches.has('@sql select name from car'));
                assert(matches.has('@sql where id = :id'));

            });

            it('should match queries in extreme 2', function () {
                let matches = parserMock.parseText(fs.readFileSync('test/cases/extreme/case2.js', 'utf8'));
                assert(matches.size === 8);

                assert(matches.has('@sql insert into person (id, name, surname, age) values (nextval(\'person_id_seq\'), :name, :surname, :age)'));
                assert(matches.has('@sql insert into car (id, price, year, model) values (nextval(\'car_id_seq\'), ?, ?, ?)'));
                assert(matches.has('@sql select * from person where age > :ageMin and age < :ageMax limit 1'));
                assert(matches.has('@sql update person set salary = 4000 where age > :age'));
                assert(matches.has('@sql delete from car where price <> :price'));
                assert(matches.has('@sql delete from person where age > 30'));
                assert(matches.has('@sql select id, price from car'));
                assert(matches.has('@sql update car set type = ?'));

            });

        });

        describe('#parse html', function () {

            it('should match queries in html 1', function () {
                let matches = parserMock.parseText(fs.readFileSync('test/cases/html/case1.vue', 'utf8'));
                assert(matches.size === 1);

                assert(matches.has("@sql insert into person (id, name, surname, age) values (nextval('person_id_seq'), :name, :surname, :age)"));

            });

        });

    });

});