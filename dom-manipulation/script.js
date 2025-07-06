let quotes = [
  { text: "Believe in yourself!", category: "Motivation" },
  { text: "Code every day.", category: "Programming" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const saved = localStorage.getItem('quotes');
  if (saved) quotes = JSON.parse(saved);
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

// Populate categories
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  select.innerHTML = <option value="all">All Categories</option>;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Restore last selected filter
function restoreCategoryFilter() {
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    document.getElementById("categoryFilter").value = saved;
    filterQuotes();
  }
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    filterQuotes();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

// Create add-quote form
function createAddQuoteForm() {
  const container = document.getElementById("addQuoteFormContainer");

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.id = "newQuoteText";
  input1.placeholder = "Enter a new quote";

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.id = "newQuoteCategory";
  input2.placeholder = "Enter quote category";

  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.onclick = addQuote;

  container.appendChild(input1);
  container.appendChild(input2);
  container.appendChild(button);
}

// Import from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        filterQuotes();
        showSyncNotice("Quotes imported.");
      } else {
        alert("Invalid format.");
      }
    } catch (err) {
      alert("Error reading JSON.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Export to JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "quotes.json";
  link.click();
}

✅✅✅ TASK 3 REQUIREMENT: Fetch + Post + Await + Headers + Conflict Resolution
async function fetchQuotesFromServer() {
  try {
    // Fetch new quotes (GET)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();

    const serverQuotes = data.map(post => ({
      text: post.title,
      category: "Server"
    }));

    // Conflict resolution: server replaces local
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();
    showSyncNotice("Fetched quotes from server");

    // Send (POST) local quotes to mock server
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quotes)
    });

    showSyncNotice("Posted local quotes to server");
  } catch (err) {
    console.error("Sync error:", err);
    showSyncNotice("Server sync failed", true);
  }
}

// Feedback message box
function showSyncNotice(message, isError = false) {
  const div = document.getElementById("syncNotice");
  div.textContent = message;
  div.style.color = isError ? "red" : "green";
  setTimeout(() => {
    div.textContent = "";
  }, 4000);
}

// Initialize app
window.onload = function () {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();
  restoreCategoryFilter();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
};

function syncQuotes() {
  fetchQuotesFromServer(); // Call the main function inside
}