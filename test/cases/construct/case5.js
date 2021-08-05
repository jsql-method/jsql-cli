var myNewQuery = jsql.query("@sql SELECT p1.ProductModelID     " +
    "@sql" +
    "@sql     " +
    "@sql FROM Production.Product AS p1" +
    "@sql    GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice)")
    .append("@sql      FROM   Production.Product AS   p2")
    .append("@sql WHERE   p1.ProductModelID =   p2.ProductModelID)  ")