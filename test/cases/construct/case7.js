jsql.repo()

    .namedQuery('someQuery1', function () {

        return jsql.query("@sql select * from " +
            "@sql user")
            .append("@sql where query = test repo");
    })

    .namedQuery('someQuery2', function () {

        return jsql.query("@sql" +
            "@sql select * from user")
            .append("@sql where query = test repo");
    })

    .namedQuery('someQuery3', function () {

        return jsql.query("@sql select * from user" +
            "@sql")
            .append("@sql where query = test repo")
            .append("@sql and id in (?,?,?)")
    });

jsql.get("someQuery3")