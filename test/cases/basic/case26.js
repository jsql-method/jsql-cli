jsql.select("@sql SELECT p1.ProductModelID FROM Production.Product AS p1 GROUP BY p1.ProductModelID HAVING MAX(p1.ListPrice) >= ALL (SELECT AVG(p2.ListPrice) FROM Production.Product AS p2 WHERE p1.ProductModelID = p2.ProductModelID);")
    .then(function (result) {
        resultCallback('SUCCESS');
    })
    .catch(function (error) {
        console.error(error);
        resultCallback('FAILED');
    });

