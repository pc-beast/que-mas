const TRANSLATE_API = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=";

const translate = async (text: string) => {
  const response = await fetch(TRANSLATE_API + text);
  const data = await response.json();
  return data[0][0][0];
}

export {translate};