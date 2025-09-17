export const GET_BOOKS = `
  query Books($title: String) {
    books(title: $title) {
      id
      title
      author
      publishYear
    }
  }
`;

export const GET_BOOK = `
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      author
      description
      publishYear
      coverImage
    }
  }
`;
