const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get('id'));
const videoData = [
  {
    id: 1,
    title: "Big Buck Bunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 2,
    title: "Sintel",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: 3,
    title: "Tears of Steel",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
];

const video = document.getElementById('video-player');
const titleEl = document.getElementById('video-title');
const likeBtn = document.getElementById('like-btn');
const likeCountEl = document.getElementById('like-count');
const watchLaterBtn = document.getElementById('watch-later-btn');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');
const themeToggle = document.getElementById('theme-toggle');

if(localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

const currentVideo = videoData.find(v => v.id === videoId);
if(currentVideo){
  video.src = currentVideo.src;
  titleEl.textContent = currentVideo.title;
}

const likesKey = `likes_${videoId}`;
likeCountEl.textContent = localStorage.getItem(likesKey) || 0;

likeBtn.addEventListener('click', () => {
  let count = parseInt(localStorage.getItem(likesKey) || '0');
  count++;
  localStorage.setItem(likesKey, count);
  likeCountEl.textContent = count;
});

const watchLaterKey = 'watchLater';
watchLaterBtn.addEventListener('click', () => {
  let list = JSON.parse(localStorage.getItem(watchLaterKey) || '[]');
  if(!list.includes(videoId)){
    list.push(videoId);
    localStorage.setItem(watchLaterKey, JSON.stringify(list));
    alert('Added to Watch Later');
  }
});

const commentsKey = `comments_${videoId}`;
function loadComments() {
  const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
  commentsList.innerHTML = '';
  comments.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c;
    commentsList.appendChild(li);
  });
}
commentForm.addEventListener('submit', e => {
  e.preventDefault();
  let comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
  comments.push(commentInput.value);
  localStorage.setItem(commentsKey, JSON.stringify(comments));
  commentInput.value = '';
  loadComments();
});
loadComments();
