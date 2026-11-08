import { getAllAuthors as getAllAuthorsFromDb, getAuthorById, createAuthor } from '../models/authors.js';

const getAllAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthorsFromDb();
        return res.status(200).json(authors);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to retrieve authors.' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const author = await getAuthorById(requestedId);
        if (!autor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createAuthorHandler = async (req, res) => {
    try {
        const { id, firstName, lastName, birthDate } = req.body;

        if (!id || !firstName || !lastName || !birthDate) {
            return res.status(400).json({ message: 'id, firstName, lastName, and birthDate are required' });
        }

        if (await getAuthorById(id)) {
            return res.status(400).json({ message: 'An author with that id already exists' });
        }

        const author = await createAuthor({ id, firstName, lastName, birthDate });
        return res.status(201).json(author);
    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({ message: 'Unable to create author' });
    }
};

export { getAllAuthors, getAuthorByIdHandler, createAuthorHandler };