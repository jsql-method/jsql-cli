jsql.repo()

    .namedQuery('someQuery1', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where " +
                "@sql query = test repo");
    })

    .namedQuery('someQuery2', function () {

        return jsql.query("@sql select * from user")
            .append("@sql" +
                "@sql where query = test repo");
    })

    .namedQuery('someQuery3', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo")
            .append("@sql and id in (?,?,?)" +
                "@sql")
    });

jsql.get("someQuery3")