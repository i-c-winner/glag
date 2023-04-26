function getRandomText(number: number) {
  let result       = '';
  const words        = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const max_position = words.length - 1;
  for( let i = 0; i < number; ++i ) {
    const position = Math.floor ( Math.random() * max_position );
    result= result + words.substring(position, position + 1);
  }
  return result;
}

export default getRandomText
