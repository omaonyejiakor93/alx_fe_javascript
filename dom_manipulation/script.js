let quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Stay curious.", category: "Learning" },
];

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  document.getElementById('quoteDisplay').textContent = ${quote.text} [${quote.category}];
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;
  if (text && category) {
    quotes.push({ text, category });
    alert('Quote added!');
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both quote and category.");
  }
}