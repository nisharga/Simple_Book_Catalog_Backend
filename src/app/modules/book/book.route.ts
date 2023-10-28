import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookController } from './book.controller'
import { bookValidation } from './book.validation'
const router = express.Router()

router.post(
  '/',
  validateRequest(bookValidation.createBookZodSchema),
  BookController.createBook,
)

router.get('/:id', BookController.getBook)

export const BookRoutes = router
