SELECT
  u.id,
  u.email,
  u.firstName,
  u.lastName,
  u.nickName,
  u.phone

FROM Users AS u

WHERE
  u.id IS NOT NULL
  {filterByEqualEmail}
  {filterByEqualPhone}
  {filterByLikeFirstName}
  {filterByLikeLastName}
  {filterByLikeNickName}

LIMIT 1
