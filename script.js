
/* ===== INTRO PAGE ===== */
function nextIntro() {
introStep++;

const text = document.getElementById("introText");

if (introStep < introTexts.length) {
text.textContent = introTexts[introStep];
} else {
window.location.href = "next.html";
}
}

/* main page */
let dialogueIndex = 0;
let musicStarted = false;

const dialogueFlow = [
    { text: "This is the first placeholder dialogue.", image: "Picture1-Photoroom.png" },
    { text: "I know you were probably wondering, what the heck i've been doin this past days.", image: "Picture2-Photoroom.png" },
    { text: "Well...this is just something I made just for you.", image: "Picture3-Photoroom.png" },
    { text: "It might not be much, but know that this was made with love.", image: "Picture5-Photoroom.png" }
];

function nextDialogue() {
    const music = document.getElementById("bgMusic");
    const textEl = document.getElementById("dialogueText");
    const imgEl = document.getElementById("characterImg");
    const btn = document.getElementById("dialogueBtn");

    // ▶️ Start music ON FIRST CLICK ONLY
    if (!musicStarted && music) {
        music.volume = 0.4;
        music.play().catch(() => {});
        musicStarted = true;
    }

    // 📝 Update dialogue
    if (dialogueIndex < dialogueFlow.length) {
        textEl.textContent = dialogueFlow[dialogueIndex].text;
        imgEl.src = dialogueFlow[dialogueIndex].image;
        dialogueIndex++;
    } else {
        // Optional: go to next page
        // window.location.href = "next.html";
        btn.disabled = true;
        btn.textContent = "❤";
    }
}
// ====== ELEMENTS ======
const dialogueText = document.getElementById("dialogueText");
const dialogueBtn = document.getElementById("dialogueBtn");
const characterImg = document.getElementById("characterImg");
const music = document.getElementById("bgMusic");

// ====== MAIN FUNCTION ======
function nextDialogue() {

    // 🎵 Start music once (mobile-safe)
    if (!musicStarted && music) {
        music.volume = 0.4;
        music.play().catch(() => {});
        musicStarted = true;
    }

    dialogueIndex++;

    // 🗨 Continue dialogue
    if (dialogueIndex < dialogueFlow.length) {
        dialogueText.textContent = dialogueFlow[dialogueIndex].text;
        characterImg.src = dialogueFlow[dialogueIndex].image;

        // Change button on last dialogue
        if (dialogueIndex === dialogueFlow.length - 1) {
            dialogueBtn.textContent = "Continue";
        }
    } 
    // ➡ Go to next page
    else {
        window.location.href = "next.html";
    }
}

function goToContent() {
    document.getElementById("introPage").classList.remove("active");
    document.getElementById("contentPage").classList.add("active");
}

/* ===== NEXT PAGE TEXT ===== */
function continueText() {
document.getElementById("charText2").classList.remove("hidden");
document.getElementById("charBtn").style.display = "none";
}

let nextMusicStarted = false; // flag to prevent multiple plays

function playNextMusic() {
    const music = document.getElementById("bgMusicNext");
    if (!nextMusicStarted && music) {
        music.volume = 0.4;
        music.play().catch(() => {
            console.log("User interaction required to play music on mobile.");
        });
        nextMusicStarted = true;
    }
}

/* ===== LETTER ===== */
function openLetter() {
    document.getElementById("heartBtn").style.display = "none";
    document.getElementById("letterCover").style.display = "none"; // this removes the cover
}


/* ===== PHOTOS ===== */
let currentMedia = null;  // current image or video in viewer

// ===== DEFAULT / PRELOADED PHOTOS & VIDEOS =====
const defaultMedia = [
    { src: '1.mp4', type: 'video' },
    { src: '2.jpeg', type: 'image' },
    { src: '3.jpeg', type: 'image' },
    { src: '4.jpeg', type: 'image' },
    { src: '5.jpeg', type: 'image' },
    { src: '6.jpg', type: 'image' },
    { src: '7.jpg', type: 'image' },
    { src: '8.jpg', type: 'image' },
    { src: '9.jpeg', type: 'image' },
    { src: '10.jpg', type: 'image' },
    { src: '11.jpeg', type: 'image' },
    { src: '12.jpg', type: 'image' },
    { src: '13.jpeg', type: 'image' },
    { src: '14.jpg', type: 'image' },
    { src: '15.jpg', type: 'image' },
    { src: '16.jpg', type: 'image' },
    { src: '17.jpg', type: 'image' },
    { src: '18.jpg', type: 'image' },
    { src: '19.jpeg', type: 'image' },
    { src: '20.jpeg', type: 'image' },
    { src: '21.jpeg', type: 'image' },
    { src: '22.jpeg', type: 'image' },
    { src: '23.jpeg', type: 'image' },
    { src: '24.jpeg', type: 'image' },
    { src: '25.jpeg', type: 'image' },
    { src: '26.jpeg', type: 'image' },
    { src: '27.jpeg', type: 'image' },
    { src: '28.jpeg', type: 'image' },
    { src: '29.jpeg', type: 'image' },
    { src: '30.jpeg', type: 'image' },
    { src: '31.jpeg', type: 'image' },
    { src: '32.jpeg', type: 'image' },
    { src: '33.jpg', type: 'image' },
    { src: '34.mp4', type: 'video' },
    { src: '35.jpeg', type: 'image' },
    { src: '36.jpeg', type: 'image' },
    { src: '37.jpeg', type: 'image' },
    { src: '38.jpeg', type: 'image' },
    

];

// ===== UPLOAD IMAGE BUTTON =====
function triggerUpload() {
    document.getElementById("photoInput").click();
}

const photoInput = document.getElementById("photoInput");
if (photoInput) {
    photoInput.onchange = () => {
        const file = photoInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            createPhoto(reader.result, 'image');  // user uploads are always images
            savePhotos();
        };
        reader.readAsDataURL(file);
    };
}

// ===== CREATE PHOTO/VIDEO FRAME =====
function createPhoto(src, type = 'image') {
    const grid = document.getElementById("photoGrid");

    const frame = document.createElement("div");
    frame.className = "photo-frame";

    let element;
    if (type === 'video') {
        element = document.createElement("video");
        element.src = src;
        element.controls = true;
        element.loop = true;
        element.muted = true; // allows autoplay on mobile
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.objectFit = "cover";
    } else {
        element = document.createElement("img");
        element.src = src;
    }

    frame.appendChild(element);

    // Click to view
    frame.onclick = () => openViewer(element, type);

    // Insert before "+" button
    const addButton = grid.querySelector('.add-frame');
    if (addButton) {
        grid.insertBefore(frame, addButton);
    } else {
        grid.appendChild(frame);
    }
}

// ===== VIEWER =====
function openViewer(element, type = 'image') {
    currentMedia = element;
    const viewer = document.getElementById("viewer");

    // Clear previous content
    viewer.innerHTML = `
        <button class="delete-btn" onclick="deleteCurrent()">🗑</button>
        <button class="close-btn" onclick="closeViewer()">✕</button>
    `;

    if (type === 'video') {
        const vid = document.createElement("video");
        vid.src = element.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.loop = true;
        vid.style.maxWidth = "90%";
        vid.style.maxHeight = "80%";
        viewer.appendChild(vid);
    } else {
        const img = document.createElement("img");
        img.src = element.src;
        img.style.maxWidth = "90%";
        img.style.maxHeight = "80%";
        viewer.appendChild(img);
    }

    viewer.classList.remove("hidden");
}

function closeViewer() {
    document.getElementById("viewer").classList.add("hidden");
}

function deleteCurrent() {
    if (!currentMedia) return;
    // Only allow deleting user-added images (skip default media)
    if (!defaultMedia.some(m => m.src === currentMedia.src)) {
        currentMedia.parentElement.remove();
        savePhotos();
    }
    closeViewer();
}

// ===== STORAGE =====
function savePhotos() {
    // Only save user-added images (skip default media)
    const imgs = [...document.querySelectorAll('.photo-frame img')]
        .filter(img => !defaultMedia.some(m => m.src === img.src))
        .map(img => img.src);
    localStorage.setItem('photos', JSON.stringify(imgs));
}

function loadPhotos() {
    const grid = document.getElementById("photoGrid");

    // 1️⃣ Load default media (images + videos)
    defaultMedia.forEach(m => createPhoto(m.src, m.type));

    // 2️⃣ Load user-added images from localStorage
    const saved = JSON.parse(localStorage.getItem('photos') || '[]');
    saved.forEach(src => createPhoto(src, 'image'));
}

// Load photos on page load

window.onload = loadPhotos;
