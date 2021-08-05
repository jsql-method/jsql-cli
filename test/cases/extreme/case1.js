    jsql.repo()
        .namedQuery('getCarPrice', '   @sql select price from car');
    jsql.repo()
        .namedQuery('getCarName', function(id) {
            var query = jsql.query('@sql select name from car ');
            if(id){
                query.append('@sql where id = :id');
            }
            return query;

        });
    jsql.set('getCarColor', '@sql select color from car where id = ?');
    jsql.set('getCarModel', function(id){
        var query = jsql.query('@sql select model from car ');
        if(id){
            query.append('@sql where id = :id');
        }
        return query;
    });
    var query1 = jsql.get('getCarPrice');
    var query2 = jsql.get('getCarName');
    var query3 = jsql.get('getCarName', true);
    var query4 = jsql.get('getCarColor');
    var query5 = jsql.get('getCarModel', true);
    console.log('query1',query1);
    console.log('query2',query2);
    console.log('query3',query3);
    console.log('query4',query4);
    console.log('query5',query5);
    jsql.select(query1).then(function (result) {
        console.log(result);
        resultCallback('SUCCESS');
    })
        .catch(function (error) {
            console.error(error);
            resultCallback('FAILED');
        });
    jsql.select(query2).then(function (result) {
        console.log(result);
        resultCallback('SUCCESS');
    })
        .catch(function (error) {
            console.error(error);
            resultCallback('FAILED');
        });
    jsql.select(query3).then(function (result) {
        console.log(result);
        resultCallback('SUCCESS');
    })
        .catch(function (error) {
            console.error(error);
            resultCallback('FAILED');
        });
    jsql.select(query4).then(function (result) {
        console.log(result);
        resultCallback('SUCCESS');
    })
        .catch(function (error) {
            console.error(error);
            resultCallback('FAILED');
        })