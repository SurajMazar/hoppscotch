import { HttpStatus } from '@nestjs/common';
export type AuthError = {
    message: string;
    statusCode: HttpStatus;
};
