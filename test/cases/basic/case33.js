jsql.selectOne('@sql select count(1) as count from account where email = :email and MD5(password) = :password group by id')
    .params(user)