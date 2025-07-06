// Initial quotes array
let quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Code every day.", category: "Programming" },
  { text: "Stay curious.", category: "Learning" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Display a random quote using innerHTML
function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  document.getElementById("quoteDisplay").innerHTML = ${quote.text} [${quote.category}];
}

// Add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Save to localStorage
    document.getElementById("quoteDisplay").innerHTML = New quote added: ${quoteText} [${quoteCategory}];
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both quote and category.");
  }
}

// Create the Add Quote form dynamically
function createAddQuoteForm() {
  const container = document.getElementById("addQuoteFormContainer");

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
}

// Export quotes to JSON
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format.');
      }
    } catch (error) {
      alert('Error parsing JSON.');
    }
  };

  reader.readAsText(event.target.files[0]);
}

// Initialize everything on page load
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
};