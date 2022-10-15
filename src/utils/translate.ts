// import {myLang, otherLang} from "../../public/script.js";

const TRANSLATE_API = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=";

const translate = async (text: string) => {
     const response = await fetch(TRANSLATE_API + text);
     const data = await response.json();
     return data[0][0][0];
}

const sanitizeText = (text: string) => {
     return text.replace(/(\r\n|\n|\r)/gm, "");
}

const desanitizeText = (text: string) => {
     const links = text.match(/(https?:\/\/[^\s]+)/g);
     if (links) {
          links.forEach(link => {
               text = text.replace(link, `<a href="${link}" target="_blank">${link}</a>`);
          });
     }
     return text;
}

export { translate, sanitizeText, desanitizeText };