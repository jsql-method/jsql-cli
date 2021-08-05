jsql.insert("@sql insert into test_user values(?,?,?,?)")
    .then(function (result) {
    })
    .catch(function (error) {
    })
    .test(function () {
    });
