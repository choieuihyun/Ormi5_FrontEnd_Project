const showMoreButton = document.querySelector('.show-more-button');
const imageList = document.querySelector('.image-list-container');
const addressText = document.querySelector('.map-address-text');
const roadAddressText = document.querySelector('.map-road-address-text');

let pageNumber = 1;
let limitNumber = 6;

async function fetchImages(page, limit) {
    try {

        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const images = await response.json(); // json();도 비동기처리라 await 필요.
        console.log(images);
        addImageList(images);

    } catch (error) {
        console.log(error);
    }

}

function deleteImageList(page, limit) {

    for (let i = 0; i < limit; i++) {
        imageList.removeChild(imageList.lastChild);
    }

}

function addImageList(images) {

    images.forEach(image => {
        // 이게 innerHTML보다 성능이 좋다.
        imageList.insertAdjacentHTML('beforeend',
            `<li class="image-item"><img src="${image.download_url}" alt=""></li>`);
    });

}

// limit의 default는 30.
fetchImages(pageNumber, limitNumber);

showMoreButton.addEventListener('click', () => {

    if (showMoreButton.textContent === "Show more") {

        if (pageNumber < 3)
            fetchImages(pageNumber += 1, limitNumber);

        if (pageNumber === 3)
            showMoreButton.textContent = 'hide';

    } else {

        deleteImageList(pageNumber -= 1, limitNumber)

        if (pageNumber === 1) {
            showMoreButton.textContent = 'Show more';
        }

    }

});

const hoverButton = document.querySelector('.hover-button');
hoverButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





