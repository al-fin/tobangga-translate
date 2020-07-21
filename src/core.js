export function translate(lang = "id", text = "") {
  let result = text;
  if (lang === "id") {
    // id : indonesian langauge
    const wordlist = [
      {
        pattern: /salamtos/gi,
        meaning: "tobangga",
      },
    ];
    const pattern = /[/\s-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/g;
    const pattern_end = /[a-z|A-Z]$/g;
    const cleanup = /[/\s-!$%^&*()_+|~=`{}\[\]:";'<>?,.]tos/g;

    // add suffix tos
    result = result.replace(pattern, function (a, b) {
      return `tos${result[b]}`;
    });
    result = result.replace(pattern_end, function (a, b) {
      return `${result[b]}tos`;
    });

    // cleanup
    result = result.replace(cleanup, function (a, b) {
      console.log(b);
      return result[b];
    });

    // translate words
    wordlist.forEach((word) => {
      result = result.replace(word.pattern, word.meaning);
    });
  } else if (lang === "to") {
    // to : tobangga language

    const wordlist = [
      {
        pattern: /tobanga|tobangga/gi,
        meaning: "salam",
      },
    ];
    const pattern = /tos[/\s-!$%^&*()_+|~=`{}\[\]:";'<>?,.]|tos$/g;

    // translate words
    wordlist.forEach((word) => {
      result = result.replace(word.pattern, word.meaning);
    });

    // remove tos
    result = result.replace(pattern, function (a, b) {
      return result[b + 3] || "";
    });
  }
  return result;
}
