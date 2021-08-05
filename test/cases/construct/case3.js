jsql.repo()

    .namedQuery('someQuery', function () {

        return jsql.query("@sql select * from user")
            .append("@sql where query = test repo");
    });

jsql.get("someQuery")