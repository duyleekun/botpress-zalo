export function sanitizeUserId(userId) {
  return userId.replace(/zalo:/gi, '')
}
