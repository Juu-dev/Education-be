import {getBooks} from "./read-file";

export const seedBooks = async (prisma: any) => {
    const books = getBooks();

    const createdBooks = await Promise.all(
        books.map(async (book: any) => {
            return prisma.book.create({
                data: book,
            })
        })
    )

    return createdBooks;
}
