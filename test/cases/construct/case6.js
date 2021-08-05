var myNewQuery = jsql.query("@sql     select    *    from    user")
    .append("@sql       where id = :id")
    .append("@sql and name = :name      ")
    .append("@sql       and " +
        "@sql surname = :surname")
    .append("@sql" +
        "@sql and age = 15" +
        "@sql ")