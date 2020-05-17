SELECT
  count(u.id)

FROM Users AS u
LEFT JOIN Positions p ON p.id = u.positionId
LEFT JOIN OrganizationUsers ou ON ou.userId = u.id
LEFT JOIN UserRoles ur ON ur.id = u.roleId

WHERE
  u.id IS NOT NULL
  {filterByEqualEmail}
  {filterByEqualPhone}
  {filterByLikeFirstName}
  {filterByLikeLastName}
  {filterByLikeNickName}

  {filterByRoleId}
  {filterByPositions}
  {filterByGender}
  {filterByStatus}
