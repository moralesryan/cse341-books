import {
    getAllBooks, getBookById, createBook as createBookInDb, updateBook as updateBookInDb, deleteBook as deleteBookInDb
} from "../models/books.js";
import { getAuthorById } from "../models/authors.js";

const hasText = (value) => typeof value === 'string' && value.trim() !== '';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    try {
        const { id, authorId, title, publicationDate } = req.body ?? {};

        if (![id, authorId, title, publicationDate].every(hasText)) {
            return res.status(400).json({
                message: 'id, authorId, title, and publicationDate are required'
            });
        }

        if (await getBookById(id)) {
            return res.status(400).json({ message: 'A book with that id already exists' });
        }

        if (!(await getAuthorById(authorId))) {
            return res.status(400).json({ message: 'authorId does not match an existing author' });
        }

        const book = await createBookInDb({ id, authorId, title, publicationDate });
        return res.status(201).json(book);
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Unable to create book.' });
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const { authorId, title, publicationDate } = req.body ?? {};

        if (![authorId, title, publicationDate].every(hasText)) {
            return res.status(400).json({
                message: 'authorId, title, and publicationDate are required'
            });
        }

        if (!(await getAuthorById(authorId))) {
            return res.status(400).json({ message: 'authorId does not match an existing author' });
        }

        const updated = await updateBookInDb(req.params.id, { authorId, title, publicationDate });
        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(updated);
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Unable to update book.' });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const deleted = await deleteBookInDb(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Unable to delete book.' });
    }
};


export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };