SELECT
  u.id,

  CAST(AES_DECRYPT(u.email, :encryptedKey) AS char) email,
  CAST(AES_DECRYPT(u.firstName, :encryptedKey) AS char) firstName,
  CAST(AES_DECRYPT(u.lastName, :encryptedKey) AS char) lastName,
  CAST(AES_DECRYPT(u.nickName, :encryptedKey) AS char) nickName,
  CAST(AES_DECRYPT(u.phone, :encryptedKey) AS char) phone,

  b.colorCode,
  ou.organizationId,
  p.title AS position,
  u.startedAt,
  u.totalEarnedPoint,
  ur.code AS roleCode,
  ur.priority AS priority,

  CONCAT(:baseImageUrl, u.image) AS imageUrl,
  CONCAT(:baseImageUrl, REPLACE(u.image, '.', '_t.')) AS imageUrl,
  CONCAT(:baseImageUrl, b.frontImage) AS badgeFrontImage,
  CONCAT(:baseImageUrl, b.backImageLong) AS badgeBackImageLong,
  CONCAT(:baseImageUrl, b.backImageShort) AS badgeBackImageShort,

  IF(u.gender = 'male', 'Male', 'Female') AS gender,
  TIMESTAMPDIFF(YEAR, DATE_FORMAT(u.startedAt, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) AS yearsOfExperience


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

LIMIT 1
