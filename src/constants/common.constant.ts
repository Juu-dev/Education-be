export const COMMON_CONSTANT = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  LOG_TIMESTAMP_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  RADIX_BASE: 10,
  SALT_ROUND: 10,
  COOKIE_EXPIRES_IN: 604800000, // 7 days
  SKU_PREFIX: 'SP',
  SKU_LENGTH: 9,
};

export const ListNeededMaskFields = {
  COMPLETE: [
    'password',
    'otp',
    'otpExpiredAt',
  ],
  SEMI: [],
};
