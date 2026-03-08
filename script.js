// 1. 갤러리 자동 로딩 기능
document.addEventListener("DOMContentLoaded", function() {
    const galleryGrid = document.getElementById('auto-gallery');
    let imageIndex = 1;
    const folderPath = 'images/'; 
    const extension = '.jpg';     

    function loadNextImage() {
        const imgElement = new Image();
        imgElement.src = folderPath + imageIndex + extension;

        imgElement.onload = function() {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.appendChild(imgElement);
            galleryGrid.appendChild(div);
            
            imageIndex++; 
            loadNextImage(); 
        };

        imgElement.onerror = function() {
            if (imageIndex === 1) {
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
    
    // 계좌번호에서 이름이나 은행명 빼고 숫자만 복사되게 하려면 아래처럼 처리할 수 있지만,
    // 보통은 전체 텍스트를 복사하도록 둡니다.
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(err => {
        console.error('복사 실패:', err);
        alert("복사를 지원하지 않는 브라우저입니다. 직접 선택해서 복사해주세요.");
    });
}