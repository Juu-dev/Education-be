import { HttpStatus } from '@nestjs/common';

/**
 * Module: Errors
 * Description: Centralized error messages and status codes for the application.
 * Example: This module contains predefined error messages and corresponding HTTP status codes
 * that can be used throughout the application to handle different error scenarios.
 *
 * Example Config Constants:
 * - To handle a duplicate user name error in the User module:
 *   Errors.USER.DUPLICATE_USERNAME
 *   - Message: 'The provided username is already in use.'
 *   - StatusCode: HttpStatus.CONFLICT
 * - To handle a common error in the application
 *   Errors.COMMON_ERROR
 *   - Message: 'Common error in the application'
 *   - StatusCode: HttpStatus.INTERNAL_SERVER_ERROR
 *
 * Example Usage:
 * - Import the Errors module: import { Errors } from '@n-constants';
 * - Access a specific error type: Errors.AUTH.FORBIDDEN
 * - Use it in a service or controller:
 *   throw new BaseException(Errors.AUTH.FORBIDDEN);
 */

export const Errors = {
  // General Errors
  TOO_MANY_REQUESTS: {
    message: 'Too many requests. <Ref: CO01>',
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
    errorCode: 'CO01',
  },
  DEFAULT: {
    message: 'An error occurred. Please try again later. <Ref: CO02>',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'CO02',
  },
  INVALID_INPUT: {
    message: 'Invalid input. Please check your input data. <Ref: CO03>',
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: 'CO03',
  },
  RESOURCE_NOT_FOUND: {
    message: 'The requested resource was not found. <Ref: CO04>',
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: 'CO04',
  },
  UPLOAD_FILE_FAILED: {
    message: 'There was an error with the uploading of the file. Please try again later. <Ref: CO05>',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 'CO05',
  },
  VALIDATION_ERROR: {
    message: 'Validation failed. Please check your input data. <Ref: CO06>',
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errorCode: 'CO06',
  },
  AUTH: {
    ROLE_NOT_PERMIT: {
      message: 'This user role is not permitted in our system! <Ref: AU01>',
      statusCode: HttpStatus.FORBIDDEN,
      errorCode: 'AU01',
    },
    FORBIDDEN: {
      message: 'Authentication error. Please try again. <Ref: AU02>',
      statusCode: HttpStatus.FORBIDDEN,
      errorCode: 'AU02',
    },
    PHONE_EXISTED: {
      message: 'This phone number already exists. <Ref: AU03>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU03',
    },
    EXPIRED_TOKEN: {
      message: 'Token has expired. <Ref: AU04>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU04',
    },
    INVALID_TOKEN: {
      message: 'Invalid token in request. <Ref: AU05>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU05',
    },
    INVALID_REFRESH_TOKEN: {
      message: 'Invalid refresh token in request. <Ref: AU06>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU06',
    },
    WRONG_CREDENTIALS: {
      message: 'Incorrect username or password. <Ref: AU07>',
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode: 'AU07',
    },
    USER_NOT_FOUND: {
      message: 'User not found. <Ref: AU08>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU08',
    },
  },
  USER: {
    USER_NOT_FOUND: {
      message: 'User not found. <Ref: AU11>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU11',
    },
    CODE_EXISTED: {
      message: 'The employee code already exists in the system. <Ref: AU12>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'AU12',
    },
  },
  ROLE: {
    INVALID_ROLE: {
      message: 'One or more of the provided role IDs are invalid. <Ref: AU31>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU31',
    },
  },
  CATEGORY: {
    INVALID_CATEGORY: {
      message: ' The provided category ID is invalid or does not exist. <Ref: CA02>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CA02',
    },
    CATEGORY_NOT_FOUND: {
      message: 'Category not found. <Ref: CA01>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CA01',
    },
    NAME_EXIST: {
      message: 'The provided category name already exists. <Ref: CA03>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'CA03',
    },
  },
  PERMISSION: {
    PERMISSION_NOT_FOUND: {
      message: 'Permission not found. <Ref: AU51>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU51',
    },
  },
  OTP: {
    OTP_NOT_MATCH: {
      message: 'Invalid OTP. Please try again. <Ref: AU21>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU21',
    },
    OTP_IS_EXPIRED: {
      message: 'The OTP you have entered has expired. Please generate a new OTP and try again. <Ref: AU22>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU22',
    },
    OTP_EXCEEDED_ATTEMPT: {
      message:
        'You have reached maximum number of attempts. Please request for new OTP and try again. <Ref: AU23>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU23',
    },
    OTP_EXCEEDED_REQUEST_LIMIT: {
      message: 'You have exceeded the maximum daily OTP request. <Ref: AU24>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'AU24',
    },
  },
  CUSTOMER: {
    CUSTOMER_NOT_FOUND: {
      message: 'Customer not found. <Ref: CU01>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CU01',
    },
    PHONE_EXISTED: {
      message: 'This phone number already exists. <Ref: CU02>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'CU02',
    },
  },
  GROUP: {
    GROUP_NOT_FOUND: {
      message: 'Group not found. <Ref: CU11>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CU11',
    },
    EXIST_GROUP: {
      message: 'Group is already exist, can not create another Group. <Ref: CU12>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CU12',
    },
  },
  TIER: {
    TIER_NOT_FOUND: {
      message: 'Tier not found. <Ref: CU21>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CU21',
    },
    EXIST_TIER: {
      message: 'Tier is already exist, can not create another Tier. <Ref: CU22>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CU21',
    },
    INVALID_TRANSACTION_RANGE: {
      message: 'Minimum transaction value must be less than maximum transaction value. <Ref: CU23>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CU23',
    },
    INVALID_DATE_RANGE: {
      message: 'Start date must be before end date. <Ref: CU24>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CU24',
    },
    OVERLAPPING_TIER: {
      message: 'The time period overlaps with an existing tier\'s applicability period. <Ref: CU25>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'CU25',
    },
  },
  WORK_SHIFT: {
    WORK_SHIFT_NOT_FOUND: {
      message: 'Work shift not found. <Ref: SW11>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'SW11',
    },
    EXIST_WORK_SHIFT: {
      message: 'Work shift is already exist, can not create another work shift. <Ref: SW12>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW12',
    },
    OVERLAP_TIME: {
      message: 'OVERLAP_TIME. <Ref: SW13>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW13',
    },
    INVALID_WORK_SHIFT: {
      message: 'Invalid work shift time. Start time must be before end time. <Ref: SW14>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW14',
    },
  },
  WORK_SCHEDULE: {
    WORK_SCHEDULE_NOT_FOUND: {
      message: 'Work schedule not found. <Ref: SW01>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'SW01',
    },
    WORK_SCHEDULE_EXISTED: {
      message: 'Work schedule is already existed. <Ref: SW02>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW02',
    },
  },
  APPOINTMENT: {
    APPOINTMENT_NOT_FOUND: {
      message: 'Appointment not found. <Ref: SW30>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'SW30',
    },
    APPOINTMENT_EXISTED: {
      message: 'Appointment is already existed. <Ref: SW31>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW31',
    },
    PARTICIPANT_NOT_AVAILABLE: {
      message: 'One or more participants are not available at the selected time. <Ref: SW32>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW32',
    },
    APPOINTMENT_SETTING_NOT_FOUND: {
      message: 'Appointment setting not found. <Ref: SW33>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'SW33',
    },
    APPOINTMENT_SETTING_EXISTED: {
      message: 'Appointment setting is already existed. <Ref: SW34>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'SW34',
    },
  },
  PLATFORM: {
    PLATFORM_NOT_FOUND: {
      message: 'Platform not found. <Ref: AU41>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU41',
    },
  },
  NOTE: {
    NOTE_NOT_FOUND: {
      message: 'Note not found. <Ref: CU31>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CU31',
    },
    CREATOR_ERROR: {
      message: 'Creator has something wrong! <Ref: CU32>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'CU32',
    },
  },
  PRODUCT: {
    CATEGORY_NOT_FOUND: {
      message: 'Product category not found. <Ref: PR01>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR01',
    },
    CANNOT_UPDATE_PARENT_CATEGORY_TO_CHILD: {
      message: 'Cannot update parent of category to its child. <Ref: PR02>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'PR02',
    },
    CATEGORY_NAME_DUPLICATED: {
      message: 'The provided category name already exists. <Ref: PR03>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'PR03',
    },
    PARENT_CATEGORY_INACTIVE: {
      message: 'The parent category is inactive. <Ref: PR04>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'PR04',
    },
    PARENT_CATEGORY_NOT_FOUND: {
      message: 'Product parent category not found. <Ref: PR05>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR05',
    },
    PRODUCT_NOT_FOUND: {
      message: 'Product not found. <Ref: PR11>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR11',
    },
    SKU_EXIST: {
      message: 'The provided SKU is already in use. <Ref: PR12>',
      statusCode: HttpStatus.CONFLICT,
      errorCode: 'PR12',
    },
    BRANCH_NOT_FOUND: {
      message: 'Branch not found. <Ref: PR13>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR13',
    },
    CUSTOMER_GROUP_NOT_FOUND: {
      message: 'Customer group not found. <Ref: PR14>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR14',
    },
    VAT_NOT_FOUND: {
      message: 'Vat not found. <Ref: PR15>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR15',
    },
    PRICE_TIME_INVALID: {
      message: 'Price time invalid. <Ref: PR16>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR16',
    },
    PRODUCT_TYPE_NOT_FOUND: {
      message: 'Product type not found. <Ref: PR17>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR17',
    },
    PRICE_OVERLAPPING: {
      message: 'Price overlapping. <Ref: PR18>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'PR18',
    },
  },
  UPLOAD:{
    FILE_NOT_FOUND: {
      message: 'File not found. <Ref: UP01>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'UP01',
    },
    FILE_TYPE_INVALID: {
      message: 'File type invalid. <Ref: UP02>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'UP02',
    },
    FILE_SIZE_INVALID: {
      message: 'File size invalid. <Ref: UP03>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'UP03',
    },
    FILE_CONTENT_INVALID: {
      message: 'File content invalid. <Ref: UP04>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'UP04',
    },
    FILE_UPLOAD_FAILED: {
      message: 'File upload failed. <Ref: UP04>',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'UP05',
    },
    FILE_EMPTY: {
      message: 'File is empty. <Ref: UP05>',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'UP06',
    }
  }
};
