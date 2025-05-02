'use strict';

export const data = [
  {
    question: "What is the capital of France?",
    options: [
      "A) Paris", 
      "B) London", 
      "C) Rome", 
      "D) Berlin"
    ],
    answer: "A) Paris",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "A) William Shakespeare", 
      "B) Charles Dickens", 
      "C) Jane Austen", 
      "D) Mark Twain"
    ],
    answer: "A) William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: [
      "A) H2O", 
      "B) CO2", 
      "C) O2", 
      "D) NaCl"
    ],
    answer: "A) H2O",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      "A) Mars", 
      "B) Venus", 
      "C) Jupiter", 
      "D) Saturn"
    ],
    answer: "A) Mars",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: [
      "A) Mount Everest", 
      "B) K2", 
      "C) Kangchenjunga", 
      "D) Lhotse"
    ],
    answer: "A) Mount Everest",
  },
  {
    question: "How many continents are there on Earth?",
    options: [
      "A) 5", 
      "B) 6", 
      "C) 7", 
      "D) 8"
    ],
    answer: "C) 7",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "A) Leonardo da Vinci", 
      "B) Vincent van Gogh", 
      "C) Pablo Picasso", 
      "D) Claude Monet"
    ],
    answer: "A) Leonardo da Vinci",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "A) Atlantic Ocean", 
      "B) Indian Ocean", 
      "C) Arctic Ocean", 
      "D) Pacific Ocean"
    ],
    answer: "D) Pacific Ocean",
  },
  {
    question: "What is the square root of 64?",
    options: [
      "A) 6", 
      "B) 7", 
      "C) 8", 
      "D) 9"
    ],
    answer: "C) 8",
  },
  {
    question: "Which country is famous for the Great Wall?",
    options: [
      "A) China", 
      "B) India", 
      "C) Japan", 
      "D) Russia"
    ],
    answer: "A) China",
  },
];




// var KEYWORDS = [
//   'multipleOf',
//   'maximum',
//   'exclusiveMaximum',
//   'minimum',
//   'exclusiveMinimum',
//   'maxLength',
//   'minLength',
//   'pattern',
//   'additionalItems',
//   'maxItems',
//   'minItems',
//   'uniqueItems',
//   'maxProperties',
//   'minProperties',
//   'required',
//   'additionalProperties',
//   'enum',
//   'format',
//   'const'
// ];

// module.exports = function (metaSchema, keywordsJsonPointers) {
//   for (var i=0; i<keywordsJsonPointers.length; i++) {
//     metaSchema = JSON.parse(JSON.stringify(metaSchema));
//     var segments = keywordsJsonPointers[i].split('/');
//     var keywords = metaSchema;
//     var j;
//     for (j=1; j<segments.length; j++)
//       keywords = keywords[segments[j]];

//     for (j=0; j<KEYWORDS.length; j++) {
//       var key = KEYWORDS[j];
//       var schema = keywords[key];
//       if (schema) {
//         keywords[key] = {
//           anyOf: [
//             schema,
//             { $ref: 'https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#' }
//           ]
//         };
//       }
//     }
//   }

//   return metaSchema;
// };
