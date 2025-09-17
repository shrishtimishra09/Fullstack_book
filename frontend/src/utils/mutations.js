export const ADD_BOOK = `
  mutation AddBook(
    $title: String!, 
    $author: String!, 
    $description: String, 
    $publishYear: Int!, 
    $coverImage: String
  ) {
    createBook(
      title: $title, 
      author: $author, 
      description: $description, 
      publishYear: $publishYear, 
      coverImage: $coverImage
    ) {
      book {
        id
        title
        author
      }
    }
  }
`;

export const UPDATE_BOOK = `
  mutation UpdateBook(
    $id: ID!, 
    $title: String, 
    $author: String, 
    $description: String, 
    $publishYear: Int, 
    $coverImage: String
  ) {
    updateBook(
      id: $id, 
      title: $title, 
      author: $author, 
      description: $description, 
      publishYear: $publishYear, 
      coverImage: $coverImage
    ) {
      book {
        id
        title
        author
      }
    }
  }
`;

export const DELETE_BOOK = `
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      success
    }
  }
`;