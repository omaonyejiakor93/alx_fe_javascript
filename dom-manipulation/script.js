let quotes = [
  { text: "Stay positive", category: "Motivation" },
  { text: "Code every day", category: "Programming" }
];

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  document.getElementById('quoteDisplay').innerHTML = ${quote.text} [${quote.category}];
}

document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;
  if (text && category) {
    quotes.push({ text, category });
    document.getElementById('quoteDisplay').innerHTML = New quote added: ${text} [${category}];
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  }
}