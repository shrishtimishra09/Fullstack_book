import { fetchGraphQL } from "./graphql";
export const addBook = async (bookData) => {
  const { title, author, description = "", publishYear, coverImage = "" } = bookData;

  const mutation = `
    mutation CreateBook(
      $title: String!
      $author: String!
      $description: String!
      $publishYear: Int!
      $coverImage: String
    ) {
      createBook(
        title: $title
        author: $author
        description: $description
        publishYear: $publishYear
        coverImage: $coverImage
      ) {
        book {
          id
          title
          author
          description
          publishYear
          coverImage
        }
      }
    }
  `;

  const variables = { title, author, description, publishYear: Number(publishYear), coverImage };

  try {
    const data = await fetchGraphQL(mutation, variables);
    return data.createBook.book;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBook = async (id, updatedData) => {
  const mutation = `
    mutation UpdateBook(
      $id: ID!
      $title: String
      $author: String
      $description: String
      $publishYear: Int
      $coverImage: String
    ) {
      updateBook(
        id: $id
        title: $title
        author: $author
        description: $description
        publishYear: $publishYear
        coverImage: $coverImage
      ) {
        book {
          id
          title
          author
          description
          publishYear
          coverImage
        }
      }
    }
  `;

  const variables = { id, ...updatedData, publishYear: updatedData.publishYear ? Number(updatedData.publishYear) : undefined };

  try {
    const data = await fetchGraphQL(mutation, variables);
    return data.updateBook.book;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  const mutation = `
    mutation DeleteBook($id: ID!) {
      deleteBook(id: $id) {
        ok
      }
    }
  `;

  const variables = { id };

  try {
    const data = await fetchGraphQL(mutation, variables);
    return data.deleteBook.ok; 
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
