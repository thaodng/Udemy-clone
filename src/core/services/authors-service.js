import User from '../../models/User';
import authors from '../../mocks/authors.json'

const dataAuthors = authors.map(author => new User(author));

const getAuthors = () => {
  if (dataAuthors) {
    return {
      status: 200,
      authors: dataAuthors
    };
  } else {
    return {
      status: 404,
      errorString: 'Database not found!'
    }
  }
};


const getAuthorsByName = (name) => {
  return dataAuthors.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
};



export { getAuthors, getAuthorsByName };