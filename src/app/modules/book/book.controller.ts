import { Request, RequestHandler, Response } from "express"
import catchAsync from "../../middlewares/catchAsync"
import { BookService } from "./book.service"
import httpStatus  from 'http-status';
import sendResponse from "../../middlewares/sendResponse";
import { IBook } from "./book.interface";



const createBook: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const { ...bookData } = req.body  
      const result = await BookService.createBook(bookData)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
      })
    },
  )
  
  const getBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await BookService.getBook(id)
  
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book information Retrived Successfully',
      data: result,
    })
  })

  export const BookController = {
    createBook,
    getBook
  }