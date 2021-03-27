SELECT
  count(u.id) AS total

FROM Users AS u

WHERE
  u.id IS NOT NULL
  {filterByEqualEmail}
  {filterByEqualPhone}
  {filterByLikeFirstName}
  {filterByLikeLastName}
  {filterByLikeNickName}
