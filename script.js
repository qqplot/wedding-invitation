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

// 5. 모바일 스와이프(터치 드래그)로 사진 넘기기 기능
document.addEventListener("DOMContentLoaded", function() {
    let startX = 0;
    let endX = 0;
    const lightboxElement = document.getElementById("lightbox");

    // (1) 모바일 화면에 손가락이 닿았을 때 위치 기억
    lightboxElement.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    // ★ (핵심 수정!) 터치한 상태로 움직일 때 브라우저 화면 스크롤/새로고침 방지
    lightboxElement.addEventListener('touchmove', (e) => {
        e.preventDefault(); 
    }, { passive: false });

    // (2) 손가락을 뗐을 때 위치 기억하고 계산
    lightboxElement.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    // (3) PC 마우스 드래그 지원 (이미지 고스트 드래그 현상 방지)
    lightboxElement.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        e.preventDefault(); 
    });

    lightboxElement.addEventListener('mouseup', (e) => {
        endX = e.clientX;
        handleSwipe();
    });

    // (4) 스와이프 방향을 계산해서 사진을 넘겨주는 함수
    function handleSwipe() {
        const threshold = 50; // 손가락을 50픽셀 이상 움직여야 스와이프로 인정
        const diffX = startX - endX;

        if (diffX > threshold) {
            // 왼쪽으로 밀었을 때 -> 다음 사진
            changeImage(1);
        } else if (diffX < -threshold) {
            // 오른쪽으로 밀었을 때 -> 이전 사진
            changeImage(-1);
        }
    }
});

// 7. 이미지 마우스 우클릭 방지
document.addEventListener('contextmenu', function(e) {
    // 클릭한 요소가 이미지(IMG)일 경우 우클릭 메뉴를 띄우지 않음
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});