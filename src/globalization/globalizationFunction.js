function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default capitalizeFirstLetter;

export function capitalizeWords(str) {
  // Split the string into an array of words
  let words = str.split(" ");

  // Capitalize the first letter of each word and join them back into a string
  let capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the array back into a single string with spaces in between
  return capitalizedWords.join(" ");
}
