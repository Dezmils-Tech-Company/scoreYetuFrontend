export const mockSchools = [
  {
    id: 1,
    name: "Kisumu High School",
    location: "Kisumu City",
    photo: "https://via.placeholder.com/150",
    teams: [
      {
        name: "Football Team",
        players: ["John Otieno", "Peter Onyango", "Sam Okoth"],
        coach: "Coach Ouma"
      },
      {
        name: "Basketball Team",
        players: ["Mary Achieng", "Lucy Atieno"],
        coach: "Coach Akinyi"
      }
    ],
    gallery: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200"
    ],
    recentEvents: [
      { name: "County Football Finals", date: "Dec 2025" },
      { name: "Regional Basketball Tournament", date: "Nov 2025" }
    ],
    upcomingEvents: [
      { name: "National Athletics Meet", date: "Feb 2026" },
      { name: "Inter-School Rugby Cup", date: "Mar 2026" }
    ],
    vulnerabilities: [
      "Limited training equipment",
      "Inadequate funding for travel",
      "Poor nutrition support for athletes"
    ],
    challenges: [
      "Balancing academics and sports",
      "Lack of professional medical staff",
      "Difficulty in scouting opportunities"
    ]
  }
];
