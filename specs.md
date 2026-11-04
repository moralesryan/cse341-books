# Books API Spec

## Purpose
Create a basic web service that returns book data

## Data Model
MongoDB databaese: cse341-books-db
MongoDB collection: books

Book object:
- id: string (required)
- author: string (required)
- title: string (required)
- publicationDate: string in YYYY-MM-DD format (for example, "2021-08-17") (required)

## Endpoimts
1. GET / books
- Returns a list of books
- Response status: 200 on success
- If id doesn't match: 404 error
- Example of a succesful request:
[
    {
        "id": 1, 
        "author": "Neil L. Andersen"
        "title": "The Divine Gift of Forgiveness"
        "publicationDate": "2019-11-06"
    }
]

2. GET/ books / :id
- Returns a specific book from the books list
- Response status: 200 on success
- If id doesn't match: 404 error
- Example of a succesful request:
{
    "id": 1, 
    "author": "Neil L. Andersen",
    "title": "The Divine Gift of Forgiveness",
    "publicationDate": "2019-11-06"
}
- Error example:
{
    "message": "Book not found, please try again later."
}

## Error Handling
- Don't return stack traces to clients

## Implementation Notes
- Use a MongoDB collection named `books`.
- Seed the collection with the book documents needed for testing
- Use environment variables for MongoDB connection


