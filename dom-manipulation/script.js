// Default quotes (only used if localStorage is empty)
let quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Code every day.", category: "Programming" },
  { text: "Stay curious.", category: "Learning" }
];

// Save to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load from localStorage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
    return;
  }

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];
  document.getElementById("quoteDisplay").innerHTML = ${quote.text} [${quote.category}];
}

// Filter quotes by category
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "No quotes in this category.";
    return;
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = ${quote.text} [${quote.category}];
}

// Populate filter dropdown with categories
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  select.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Restore saved category from localStorage
function restoreCategoryFilter() {
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    document.getElementById("categoryFilter").value = saved;
    filterQuotes();
  }
}

// Add a quote from the form
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories();
    filterQuotes();
    document.getElementById("quoteDisplay").innerHTML = New quote added: ${quoteText} [${quoteCategory}];
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both quote and category.");
  }
}

// Create quote form dynamically
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

// Export quotes to JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        showSyncNotice("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Failed to parse JSON.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// ✅✅✅ TASK 3 REQUIRED FUNCTION
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();

    // Convert server posts to quote format
    const serverQuotes = data.map(post => ({
      text: post.title,
      category: "Server"
    }));

    // Conflict resolution: replace local data
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();
    showSyncNotice("Quotes synced from server (local data replaced).");
  } catch (error) {
    console.error("Fetch failed:", error);
    showSyncNotice("Failed to fetch quotes from server.", true);
  }
}

// Show sync/import messages
function showSyncNotice(message, isError = false) {
  const notice = document.getElementById("syncNotice");
  notice.textContent = message;
  notice.style.color = isError ? 'red' : 'green';
  setTimeout(() => {
    notice.textContent = "";
  }, 4000);
}

// Run everything on page load
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();
  restoreCategoryFilter();
  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
};