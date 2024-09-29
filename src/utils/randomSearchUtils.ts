export const randomSearchTerms: string[] = [
    'Avengers',
    'Inception',
    'The Matrix',
    'Interstellar',
    'Gladiator',
    'Titanic',
    'The Godfather',
    'Pulp Fiction',
    'The Dark Knight',
    'Fight Club',
    'Forrest Gump',
    'Jurassic Park',
    'The Shawshank Redemption',
    'The Lord of the Rings',
    'Star Wars',
    'Harry Potter',
];
  
export const getRandomSearchTerm = (): string => {
    const randomIndex = Math.floor(Math.random() * randomSearchTerms.length);
    return randomSearchTerms[randomIndex];
};