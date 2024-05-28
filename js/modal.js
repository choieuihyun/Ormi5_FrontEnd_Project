const modalOpenButton = document.querySelector('.modal_open_button');

const main = document.querySelector('main');
const modalContainer = document.createElement('div');
const modalPopup = document.createElement('div');
const modalPopupImage = document.createElement('img');
const modalPopupTitle = document.createElement('p');
const modalPopupText = document.createElement('p');
const modalCloseButton = document.createElement('button');

function setupModalElements() {

    modalContainer.classList.add('modal_container');
    modalPopup.classList.add('modal_popup');
    modalPopupImage.classList.add('modal_popup_image');
    modalPopupTitle.classList.add('modal_popup_title');
    modalPopupText.classList.add('modal_popup_text');
    modalCloseButton.classList.add('modal_close_button');

    main.append(modalContainer);
    modalContainer.append(modalPopup);
    modalPopup.append(modalPopupImage, modalPopupTitle, modalPopupText, modalCloseButton);

    modalPopupImage.src = "resources/modal-cat.png";
    modalPopupTitle.textContent = 'Thank you!';
    modalPopupText.textContent = 'Lorem Ipsum is simply dummy text of the printing industry.';
    modalCloseButton.textContent = 'OK! I Love HODU';

}

setupModalElements()

modalOpenButton.addEventListener('click', function () {

    modalContainer.style.display = 'block';
    modalContainer.style.top = window.scrollY + 'px'
    document.body.style.overflow = 'hidden'

});

modalCloseButton.addEventListener('click', function () {

    document.body.style.overflow = ''
    modalContainer.style.display = 'none';

});