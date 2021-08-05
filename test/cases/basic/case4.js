jsql.delete("@sql delete from test_user where id = :id")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });