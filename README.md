### Radical_bookshelf

The design was made to closely resemble [this figma project](https://www.figma.com/file/njAFSP4TeuSzrU2hTdvUm3/Dev-Challenge?type=design&node-id=0-1&mode=design).

The idea of the system is using external APIs to get book list(in this example NY Times Booklist) and to use Google Books to fill in any gaps in the data. When the user acceses the frontend, all the results come straight from the API, and if they decide to perform any action on the books, for example favouriting or rating, the book will get added to the database. This ensures the booklist is always the latest possible one, whilst still maintaining user preferences and ratings.

The systems backend is made in Laravel, and the frontend is a one page solution in React. There is a general layout on the site which every page follows, thus component reusability was very important.
