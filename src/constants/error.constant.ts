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
  PERMISSION: {
    PERMISSION_NOT_FOUND: {
      message: 'Permission not found. <Ref: AU51>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'AU51',
    },
  },
  TASK: {
    TASK_NOT_FOUND: {
      message: 'Task not found. <Ref: TA1>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA1',
    },
    ASSIGNEE_NOT_EXISTS: {
      message: 'Assignee not exists. <Ref: TA2>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA2',
    },
    ASSIGNER_NOT_EXISTS: {
      message: 'Assigner not exists. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA3',
    }
  },
  DOCUMENT: {
    DOCUMENT_NOT_FOUND: {
      message: 'Document not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA4',
    }
  },
  BOOK: {
    BOOK_NOT_FOUND: {
      message: 'Book not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA7',
    }
  },
  CLASS: {
    CLASS_NOT_FOUND: {
      message: 'Class not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    }
  },
  QUIZ: {
    QUIZ_NOT_FOUND: {
      message: 'Quiz not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    },
    EXERCISE_EXISTEDS: {
      message: 'Existing exercises are using this quiz. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    },
    QUESTION_NEED: {
      message: 'Question IDs are required. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    },
    QUESTION_NOT_FOUND: {
      message: 'Question not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    },
  },
  EXERCISE: {
    EXERCISE_NOT_FOUND: {
      message: 'Quiz not found. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA6',
    },
    ASSIGNER_NOT_EXISTS: {
      message: 'Assigner not exists. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA3',
    },
    CLASS_NOT_EXISTS: {
      message: 'Assigner not exists. <Ref: TA3>',
      statusCode: HttpStatus.NOT_FOUND,
      errorCode: 'TA3',
    }
  }
};
