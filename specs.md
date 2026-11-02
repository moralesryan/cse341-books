# Books API Spec

## Purpose
Create a basic web service that returns book data

## Data Model
Book fields:
- id: string (required)
- author: string (required)
- title: string (required)
- publicationDate: string in YYYY-MM-DD format (for example, "2021-08-17") (required)

## Endpoimts
1. GET / books
- Returns a list of books
- Response status: 200 on success

2. GET/ books / :id
- Returns a specific book
- Response status: 200 on success
- If id not matching: 404