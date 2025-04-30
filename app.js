
const ratingBox = document.querySelector(".rating-box");
const thankYouBox = document.querySelector(".thankYou-box");

const circles = document.querySelectorAll(".circle");
const submitButton = document.querySelector(".btn");

const ratingDigit = document.querySelector(".rating-digit");


submitButton.disabled = true;

submitButton.addEventListener("click", () => {
    ratingBox.classList.toggle("non-active");
    thankYouBox.classList.toggle("non-active");
});


circles.forEach((circle) => {

    circle.addEventListener("click", () => {

        resetCircleSelection();
        circle.classList.add("active");

        ratingDigit.textContent = circle.dataset.rating;
        submitButton.disabled = false;
        //Switch to aria-checked="true" for selected circle, and "false" for the rest
        updateAriaChecked(circle.dataset.rating);

    });

});


const resetCircleSelection = () => {
    circles.forEach((circle) => {
        circle.classList.remove("active");

    });
};


circles.forEach((circle) => {
    circle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();  // Prevent scrolling with space
            resetCircleSelection();
            circle.click();
        }
    })
});


function updateAriaChecked(selectedRating) {
    circles.forEach(circle => {
        circle.setAttribute("aria-checked", circle.dataset.rating === selectedRating);
    });
}


/*Trap focus, so the user can only focus on elements in the app using Tab or Tab + Shift, so he does not tab out of the app*/

const focusableElementsString = `
  a[href], area[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), button:not([disabled]),
  [tabindex]:not([tabindex="-1"])`;

const container = document.querySelector('main.container');

function trapFocus(element) {

    element.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
        if (!isTabPressed) return;

        const focusableElements = element.querySelectorAll(focusableElementsString);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];


        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

trapFocus(container);







