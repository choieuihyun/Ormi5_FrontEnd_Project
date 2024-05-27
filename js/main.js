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




/* 지도 ajax */

var mapContainer = document.querySelector('.map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                '</div>';

            roadAddressText.textContent = !!result[0].road_address ? '도로명주소 : ' + result[0].road_address.address_name : '';
            addressText.textContent = !!result[0].address ? '지번 주소 : ' + result[0].address.address_name : '';

            // 마커를 클릭한 위치에 표시
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }
}



const hoverButton = document.querySelector('.hover-button');
hoverButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





