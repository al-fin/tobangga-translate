export function translate(lang = "id", text = "") {
  let output = text;
  if (lang === "id") {
    // id : indonesian langauge
    const wordlist = [
      {
        pattern: /salam/gi,
        meaning: "tobangga",
      },
    ];
    const pattern = /[/\s-!$%^&*()_+|~=`{}\[\]:";'<>?,.]/g;
    const pattern_end = /[a-z|A-Z]$/g;
    const cleanup = /[/\s-!$%^&*()_+|~=`{}\[\]:";'<>?,.]tos/g;

    // translate words
    wordlist.forEach((word) => {
      output = output.replace(word.pattern, word.meaning);
    });

    // add suffix tos
    output = output.replace(pattern, function (a, b) {
      return `tos${output[b]}`;
    });
    output = output.replace(pattern_end, function (a, b) {
      return `${output[b]}tos`;
    });

    // cleanup
    output = output.replace(cleanup, function (a, b) {
      console.log(b);
      return output[b] || output[b];
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
      output = output.replace(word.pattern, word.meaning);
    });

    // remove tos
    output = output.replace(pattern, function (a, b) {
      return output[b + 3] || "";
    });
  }
  return output;
}
