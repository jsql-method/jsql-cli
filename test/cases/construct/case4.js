var myNewQuery = jsql.query('@sql UPDATE car' +
    '@sql  SET model=:model')
    .append("@sql WHERE " +
        "@sql id = :id")
    .append('@sql AND model = :model')