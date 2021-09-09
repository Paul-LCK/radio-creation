const radioMainContent = document.querySelector(".radiolist-content");
const radioFooterContent = document.querySelector(".radio-footer");

fetch("https://teclead.de/recruiting/radios") //returns an response object
  .then((resp) => resp.json()) //returns json
  .then((data) => {
    //returns the data-body
    data.radios.map((radio) => {
      //iterate over array of objects
      //for each object, the radio name, frequency & img are stored within the HTML code inside a variable
      const content = `
      <div class="border-bottom">
        <div class="radio">
          <button>${radio.name}</button>
          <p class="frequency-bold">${radio.frequency}</p>
        </div>
        <div class="image-display hide-box">
        <i class="fas fa-minus-circle"></i>
          <img src="${radio.image}">
          <i class="fas fa-plus-circle"></i>
        </div>
      </div>`;

      const footerContent = `
        <div class="footer-text hide-box">
          <h5>CURRENTLY PLAYING</h5>
          <p>${radio.name}</p>
        </div>`;
      //insert each div into the radiolist-content and footer class
      radioMainContent.insertAdjacentHTML("beforeend", content);
      radioFooterContent.insertAdjacentHTML("beforeend", footerContent);
    });
    const buttons = document.querySelectorAll("button");
    transformComponent(buttons);
  });

// function for transforming the component on click event
const transformComponent = (nodeArray) => {
  const arr = Array.from(nodeArray); //transform nodearr into an arr, so that map works
  let lastClicked = "h"; // assign random value so that img div will be shown upon first click
  let counter = 0;
  arr.map((button) => {
    button.addEventListener("click", (event) => {
      hideDivs(); //append hide-class to all divs before removing it from one specific div
      const imgDiv = button.parentNode.parentNode.lastElementChild; //return div with image
      // check if the same button was clicked 2 consecutive times in a row
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 == 0) {
        imgDiv.classList.add("hide-box");
      } else {
        imgDiv.classList.remove("hide-box");
      }

      const footerDiv = Array.from(
        document.querySelector(".radio-footer").children
      ); //returns all hidden footer divs
      footerDiv.map((div) => {
        //iterate over each footer div
        if (div.lastElementChild.innerHTML === event.currentTarget.innerHTML) {
          //check which button out of the 4 footer divs matches the button of the current event to show only that div
          div.classList.remove("hide-box"); //
        }
      });
      // after footer-div is shown, check if the same button was clicked twice
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 == 0) {
        footerDiv.forEach((footer) => {
          footer.classList.add("hide-box");
        });
      }
      lastClicked = event.currentTarget.innerHTML;
      counter += 1;
    });
  });
};

const hideDivs = () => {
  const footerDiv = Array.from(
    document.querySelector(".radio-footer").children
  );
  // console.log(footerDiv);
  const imgDivs = Array.from(
    document.querySelector(".radiolist-content").children
  );
  imgDivs.map((imgDiv) => {
    imgDiv.children[1].classList.add("hide-box");
  });
  footerDiv.map((element) => {
    //iterate over each footer div
    element.classList.add("hide-box");
  });
};
