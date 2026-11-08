import {
    getAllAuthors as getAllAuthorsFromDb, getAuthorById as getAuthorByIdFromDb, createAuthor as createAuthorInDb, updateAuthor as updateAuthorInDb, deleteAuthor as deleteAuthorInDb, authorHasBooks
} from '../models/authors.js';

const hasText = (value) => {return typeof value === 'string' && value.trim() !== ''};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthorsFromDb();
        return res.status(200).json(authors);
    } catch (error) {
        console.error('GET /authors failed:', error.message);
        return res.status(500).json({ message: 'Unable to retrieve authors.' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    try {
        const author = await getAuthorByIdFromDb(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Unable to retrieve author.' });
    }
};

const createAuthorHandler = async (req, res) => {
    try {
        const { id, firstName, lastName, birthDate } = req.body ?? {};

        if (![id, firstName, lastName, birthDate].every(hasText)) {
            return res.status(400).json({
                message: 'id, firstName, lastName, and birthDate are required'
            });
        }

        if (await getAuthorByIdFromDb(id)) {
            return res.status(400).json({ message: 'An author with that id already exists' });
        }

        const author = await createAuthorInDb({ id, firstName, lastName, birthDate });
        return res.status(201).json(author);
    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({ message: 'Unable to create author.' });
    }
};

const updateAuthorHandler = async (req, res) => {
    try {
        const { firstName, lastName, birthDate } = req.body ?? {};

        if (![firstName, lastName, birthDate].every(hasText)) {
            return res.status(400).json({
                message: 'firstName, lastName, and birthDate are required'
            });
        }

        const updated = await updateAuthorInDb(req.params.id, { firstName, lastName, birthDate });
        if (!updated) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(updated);
    } catch (error) {
        console.error('PUT /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Unable to update author.' });
    }
};

const deleteAuthorHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (!(await getAuthorByIdFromDb(id))) {
            return res.status(404).json({ message: 'Author not found' });
        }

        if (await authorHasBooks(id)) {
            return res.status(409).json({
                message: 'Cannot delete an author who still has books'
            });
        }

        await deleteAuthorInDb(id);
        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Unable to delete author.' });
    }
};

export { getAllAuthors, getAuthorByIdHandler, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler };