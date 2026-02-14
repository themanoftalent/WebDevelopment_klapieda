const videos = [
  {
    id: 1,
    title: "Big Buck Bunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://source.unsplash.com/300x200/?nature,forest"
  },
  {
    id: 2,
    title: "Sintel",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "https://source.unsplash.com/300x200/?nature,water"
  },
  {
    id: 3,
    title: "Tears of Steel",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://source.unsplash.com/300x200/?city,night"
  }
];

const videoGrid = document.getElementById('video-grid');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');

function renderVideos(list) {
  videoGrid.innerHTML = '';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}">
      <h3>${video.title}</h3>
    `;
    card.addEventListener('click', () => {
      window.location.href = `video.html?id=${video.id}`;
    });
    videoGrid.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = videos.filter(v => v.title.toLowerCase().includes(query));
  renderVideos(filtered);
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

renderVideos(videos);
