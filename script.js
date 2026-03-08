// 1. 갤러리 자동 로딩 및 클릭 기능
let totalImages = 0; // 총 사진 개수
let currentImageIndex = 1; // 현재 팝업에서 보고 있는 사진 번호
const folderPath = 'images/'; 
const extension = '.jpg'; 

document.addEventListener("DOMContentLoaded", function() {
    const galleryGrid = document.getElementById('auto-gallery');
    let loadIndex = 1;

    function loadNextImage() {
        const imgElement = new Image();
        imgElement.src = folderPath + loadIndex + extension;

        imgElement.onload = function() {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.appendChild(imgElement);
            
            // ★ 클릭하면 팝업 열리는 기능 추가 ★
            const clickIndex = loadIndex; 
            div.onclick = function() { openLightbox(clickIndex); };
            
            galleryGrid.appendChild(div);
            
            totalImages = loadIndex; // 로딩 성공할 때마다 총 개수 업데이트
            loadIndex++; 
            loadNextImage(); 
        };

        imgElement.onerror = function() {
            if (loadIndex === 1) {
                galleryGrid.style.display = 'block';
                galleryGrid.innerHTML = '<p style="color:#999; font-size:0.9rem;">images 폴더에 1.jpg를 넣어주세요.</p>';
            }
        };
    }

    loadNextImage();
});

// 2. 계좌번호 복사 기능
function copyAccount(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        alert("복사를 지원하지 않는 브라우저입니다. 직접 선택해서 복사해주세요.");
    });
}

// 3. 라이트박스(이미지 팝업) 제어 기능
function openLightbox(index) {
    currentImageIndex = index;
    document.getElementById("lightbox").style.display = "block";
    updateLightboxImage();
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(step) {
    currentImageIndex += step;
    // 마지막 사진에서 다음을 누르면 첫 사진으로, 첫 사진에서 이전을 누르면 마지막 사진으로
    if (currentImageIndex > totalImages) { currentImageIndex = 1; }
    if (currentImageIndex < 1) { currentImageIndex = totalImages; }
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById("lightbox-img");
    img.src = folderPath + currentImageIndex + extension;
}

// 4. 아코디언(접기/펴기) 토글 기능
function toggleAccordion(id) {
    const panel = document.getElementById(id);
    
    // 열려있으면 닫고, 닫혀있으면 엽니다.
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}