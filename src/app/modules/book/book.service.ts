import { IBook } from "./book.interface"
import { Book } from "./book.model"

const createBook = async ( userDetails: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(userDetails)
  return newBook
}

const getBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id}).exec()
  return book;
}


// const createJwt = (email: any): any => {
//   const jwttoken = jwt.sign({ data: email }, config.secret, {
//     expiresIn: 60 * 60,
//   })
//   return jwttoken
// }
// const getAllUser = async (
//   filters: ISingleUserFilterRequest,
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<ISingleUser[]>> => {
//   const { searchTerm, ...filtersData } = filters

//   const andConditions = []

//   if (searchTerm) {
//     andConditions.push({
//       $or: SearchableFields.map((field: any) => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     })
//   }
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     })
//   }

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions)

//   const sortConditions: { [key: string]: SortOrder } = {}

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder
//   }

//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {}

//   const result = await SingleUser.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit)

//   const total = await SingleUser.countDocuments()

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   }
// }

// const updateUser = async (
//   id: string,
//   payload: Partial<ISingleUser>,
// ): Promise<ISingleUser | null> => {
//   const result = await SingleUser.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   })
//   return result
// }

// const deleteUser = async (id: string): Promise<ISingleUser | null> => {
//   const result = await SingleUser.findByIdAndDelete(id)
//   return result
// }

export const BookService = {
    createBook,
    getBook
}
