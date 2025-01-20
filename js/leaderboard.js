async function fetchLeaderboard(hero) {
  try {
    const { data, error } = await supabase
      .from("leaderboards")
      .select("*")
      .eq("character_name", hero)
      .order("rank", { ascending: true }); // Ensures data is sorted by rank

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error fetching leaderboard:", err);
    return [];
  }
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
const urlParams = new URLSearchParams(window.location.search);
const hero = urlParams.get("hero");

document.getElementById("hero-name").textContent = `${hero.replace("-", " ")} Leaderboard`;

fetchLeaderboard(hero).then(renderLeaderboard).catch((error) => {
  console.error("Error rendering leaderboard:", error);
});
