var myNewQuery = jsql.query("@sql select * from user")
    .append("@sql where id = :id")
    .append("@sql and name = :name")