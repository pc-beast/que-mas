let list = [
     {
          "sbl": "en",
          "name": "English"
     },
     {
          "sbl": "hi",
          "name": "Hindi"
     },
     {
          "sbl": "ar",
          "name": "Arabic"
     },
     {
          "sbl": "hy",
          "name": "Armenian"
     },
     {
          "sbl": "az",
          "name": "Azerbaijani"
     },
     {
          "sbl": "eu",
          "name": "Basque"
     },
     {
          "sbl": "be",
          "name": "Belarusian"
     },
     {
          "sbl": "bn",
          "name": "Bengali"
     },
     {
          "sbl": "bs",
          "name": "Bosnian"
     },
     {
          "sbl": "bg",
          "name": "Bulgarian"
     },
     {
          "sbl": "ca",
          "name": "Catalan"
     },
     {
          "sbl": "es",
          "name": "Spanish"
     },
     {
          "sbl": "de",
          "name": "German"
     },
     {
          "sbl": "nl",
          "name": "Dutch"
     }
]

let ele = document.getElementById('other_language');
console.log(ele);
let ele2 = document.getElementById('my_language');
for (let i = 0; i < list.length; i++) {
     // populate select element with json.
     ele.innerHTML = ele.innerHTML +
          '<option value="' + list[i]['sbl'] + '">' + list[i]['name'] + '</option>';
     ele2.innerHTML = ele2.innerHTML +
          '<option value="' + list[i]['sbl'] + '">' + list[i]['name'] + '</option>';
}

const MyLanguage = async () => {
     try {
          const my_lang = await chrome.storage.sync.get('my_default_lang');
          let defaultLang = document?.querySelector('.my_default');
          defaultLang.textContent = my_lang.my_default_lang;
          // const other_lang = await chrome.storage.sync.get('other_default_lang');
          let element = document.querySelector("#my_language");
          element.value = my_lang.my_default_lang;

     } catch (error) {
          console.log("Error: ", error)
     }

     let element = document.querySelector("#my_language");
     element.addEventListener("change", function () {
          chrome.storage.sync.get('my_default_lang', function () {
               let userSelection = element.value;
               let defaultLang = document?.querySelector('.my_default');
               defaultLang.textContent = userSelection;
               chrome.storage.sync.set({ 'my_default_lang': userSelection })
          })
     })
}
MyLanguage()

const OtherLanguage = async () => {
     try {
          const other_lang = await chrome.storage.sync.get('other_default_lang');
          let defaultLang = document?.querySelector('.other_default');
          defaultLang.textContent = other_lang.other_default_lang;
          // const other_lang = await chrome.storage.sync.get('other_default_lang');
          let element = document.querySelector("#other_language");
          element.value = other_lang.other_default_lang;

     } catch (error) {
          console.log("Error: ", error)
     }

     let element = document.querySelector("#other_language");
     element.addEventListener("change", function () {
          chrome.storage.sync.get('other_default_lang', function () {
               let userSelection = element.value;
               chrome.storage.sync.set({ 'other_default_lang': userSelection })
               let defaultLang = document?.querySelector('.other_default');
               defaultLang.textContent = userSelection;
          })
     })
}

OtherLanguage()
// export { MyLanguage, OtherLanguage }
