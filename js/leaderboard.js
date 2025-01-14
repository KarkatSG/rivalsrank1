// leaderboard.js
const urlParams = new URLSearchParams(window.location.search);
const hero = urlParams.get("hero");

document.getElementById("hero-name").textContent = `${hero.replace("-", " ")} Leaderboard`;

const API_URL = "https://bqffurypbsbmcuvlsmll.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZmZ1cnlwYnNibWN1dmxzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MjQ2MTQsImV4cCI6MjA1MjMwMDYxNH0.QQKl807jEVhOhlCzItIu_Z240LI9mFU0-h0TOFBTTis";

async function fetchLeaderboard(hero) {
  const response = await fetch(`${API_URL}?character_name=eq.${hero}`, {
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`
    }
  });
  const data = await response.json();
  return data;
}

function renderLeaderboard(data) {
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = ""; // Clear previous data

  data.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.rank}</td>
      <td>${entry.player_name}</td>
      <td>${entry.rank_name}</td>
      <td>${entry.score}</td>
    `;
    tbody.appendChild(row);
  });
}

// Fetch and render the leaderboard
fetchLeaderboard(hero).then(renderLeaderboard).catch((error) => {
  console.error("Error fetching leaderboard:", error);
});
