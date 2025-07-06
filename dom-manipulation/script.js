// 1. The quotes array (required structure)
let quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Code every day.", category: "Programming" },
  { text: "Stay curious.", category: "Learning" }
];

// 2. Function to display a random quote using innerHTML
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = ${quote.text} [${quote.category}];
}

// 3. Event listener on the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// 4. Function to add a new quote to the array and update the DOM
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("quoteDisplay").innerHTML = New quote added: ${quoteText} [${quoteCategory}];
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both quote and category fields.");
  }
}

// 5. Required: Create the add quote form dynamically using DOM methods
function createAddQuoteForm() {
  const formContainer = document.getElementById("addQuoteFormContainer");

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

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
}

// 6. Initialize on page load
window.onload = function () {
  createAddQuoteForm();
};