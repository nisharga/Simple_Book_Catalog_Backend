

import { NextFunction, ErrorRequestHandler, Request, Response } from "express"
import config from "../../../config"
import { IGenericErrorMessage } from "../../interfaces/error"
import handleValidationError from "../errors/handleValidationError"
import handleCastError from "../errors/handleCastError"
import { ZodError } from "zod"
import handleZodError from "../errors/handleZodError"
import ApiError from "../errors/ApiErorr"
 


const globalErrorHandler: ErrorRequestHandler
    = (error, req: Request, res: Response, next: NextFunction) => {
 
        let statusCode = 500
        let message = 'Something went wrong!'
        let errorMessage: IGenericErrorMessage[] = []

        if (error?.name === 'ValidationError') {
            const simplifiedError = handleValidationError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error?.name === 'CastError') {
            const simplifiedError = handleCastError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ZodError) {
            const simplifiedError = handleZodError(error)
            statusCode = simplifiedError.statusCode;
            message = simplifiedError.message;
            errorMessage = simplifiedError.errorMessage;
        }

        else if (error instanceof ApiError) {
            statusCode = error?.statusCode;
            message = error.message;
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []
        }

        else if (error instanceof Error) {
            message = error?.message
            errorMessage = error?.message ?
                [
                    {
                        path: '',
                        message: error?.message
                    }
                ] : []

        }
 
        res.status(statusCode).json({
            sucess: false,
            message,
            errorMessage,
            stack: config.env !== 'production' ? error?.stack : undefined
        })
        next()
    }

export default globalErrorHandler; 