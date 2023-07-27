
  const clickableItems = document.querySelectorAll(".clickable-item");
  const inputBoxesContainer = document.getElementById("input-boxes-container");
  const componentsContainer = document.getElementById("components-container");
  let remainingComponents = Array.from(clickableItems);

  clickableItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.getAttribute("data-title");
      if(title === "Image") {
        //inputbox for image input
        handleImageInput(title);
        toggleComponent(title, true);
      }else{
        toggleInputBox(title);
      toggleComponent(title, true);
      }
      
        // updatePreview();
    });
  });

  //function for handling image input

  function handleImageInput(title) {
    const inputBox = createImageInputBox(title);
    const existingInputBox = document.getElementById(`input-box-${title}`);
    if (existingInputBox) {
      existingInputBox.remove();
    } else {
      inputBoxesContainer.appendChild(inputBox);
    }

    const visibleInputBoxes = inputBoxesContainer.querySelectorAll(".input-box");
    if(visibleInputBoxes.length === 3) {
      componentsContainer.style.display = "none";
    }
    else if (visibleInputBoxes.length > 0) {
      componentsContainer.before(inputBoxesContainer);
    } else {
      componentsContainer.after(inputBoxesContainer);
    }

  }

 

  function getImage() {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");

    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        const imageUrl = reader.result;
        imagePreview.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" class="w-full h-auto rounded-md">`;
        // imagePreview.classList.remove("hidden");
      });

      reader.readAsDataURL(file);
    }
  }


  function toggleInputBox(title) {
    let placeHolder ="";
    if(title === "Heading") {
      placeHolder = "Dashboard";
    } else if (title === "Description") {
      placeHolder = "Write your thoughts here...";
    }
    const inputBox = createInputBox(title,placeHolder);
    const existingInputBox = document.getElementById(`input-box-${title}`);
    if (existingInputBox) {
      existingInputBox.remove();
    } else {
      inputBoxesContainer.appendChild(inputBox);
    }

    const visibleInputBoxes = inputBoxesContainer.querySelectorAll(".input-box");
    if(visibleInputBoxes.length === 3) {
      componentsContainer.style.display = "none";
    }
    else if (visibleInputBoxes.length > 0) {
      componentsContainer.before(inputBoxesContainer);
    } else {
      componentsContainer.after(inputBoxesContainer);
    }

  }

  function toggleComponent(title, hide) {
    const componentToToggle = document.querySelector(
      `[data-title="${title}"]`
    );
    if (componentToToggle) {
      if (hide) {
        componentToToggle.style.display = "none";
        remainingComponents = remainingComponents.filter(
          (item) => item.getAttribute("data-title") !== title
        );
        if (remainingComponents.length === 1) {
          remainingComponents[0].classList.add("md:w-full");
          remainingComponents[0].classList.remove("md:w-1/3");
        } else if (remainingComponents.length === 2) {
          remainingComponents.forEach((component) => {
            component.classList.add("md:w-1/2");
            component.classList.remove("md:w-1/3");
          });
        }
      } else {
        componentToToggle.style.display = "block";
        remainingComponents.push(componentToToggle);
        if(remainingComponents.length===2) {
          remainingComponents.forEach((component) => {
            component.classList.remove("md:w-1/3", "md:w-full");
            component.classList.add("md:w-1/2");
          });
        }
        else if (remainingComponents.length === 3) {
          remainingComponents.forEach((component) => {
            component.classList.remove("md:w-1/2", "md:w-full");
            component.classList.add("md:w-1/3");
          });
        }
        else if (remainingComponents.length === 1) {
          remainingComponents[0].classList.add("md:w-full");
          remainingComponents[0].classList.remove("md:w-1/3");
        }
      }
    }
  }

  function createImageInputBox(title) {
    const inputBox = document.createElement("div");
    inputBox.setAttribute("id", `input-box-${title}`);
    inputBox.classList.add("input-box", "mt-4");
    // inputBox.style.backgroundColor = color;
    inputBox.innerHTML = `
      <fieldset class="border border-gray-400 rounded-lg relative p-4">
        <legend class="text-sm border rounded-lg p-2 bg-gray-300 font-semibold mb-2">Poster Image
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class=" w-10 h-10  absolute top-0 right-0 " onclick="removeInputBox('${title}')">
            <path fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"/>
        </svg>
        </legend>
        
        <div class="flex items-center justify-center w-full"
              ondragover="handleDragOver(event)" 
              ondrop="handleDrop(event)" 
              ondragenter="handleDragEnter(event)" 
              ondragleave="handleDragLeave(event)"
        
        >
          <label for="imageInput" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white ">
              <div
              
              class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="imageInput" type="file" oninput="getImage()" class="hidden" />
          </label>
        </div> 

      </fieldset>
    `;
    return inputBox;
  }
{/* <input type="file" id="imageInput" oninput="getImage()"  class="w-full border rounded-lg p-2" ></input> */}
  
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

function handleDragEnter(event) {
  event.target.classList.add("bg-gray-100");
}

function handleDragLeave(event) {
  event.target.classList.remove("bg-gray-100");
}

function handleDrop(event) {

  
    const imagePreview = document.getElementById("imagePreview");

  

  event.preventDefault();
  event.target.classList.remove("bg-gray-100");
  
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const imageUrl = reader.result;
      imagePreview.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" class="w-full h-auto rounded-md">`;
      // imagePreview.classList.remove("hidden");
    });
    reader.readAsDataURL(file);
  } else {
    alert("Please drop an image file.");
  }
}


function createInputBox(title, placeHolder) {
  const inputBox = document.createElement("div");
  inputBox.setAttribute("id", `input-box-${title}`);
  inputBox.classList.add("input-box", "mt-4", "relative"); // Add "relative" class here
  // inputBox.style.backgroundColor = color;
  inputBox.innerHTML = `
    <fieldset class="border border-gray-400 rounded-lg relative p-4">
      <legend class="text-sm border rounded-lg p-2 bg-gray-300 font-semibold mb-2">${title}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      class=" w-10 h-10  absolute top-0 right-0 " onclick="removeInputBox('${title}')">
        <path fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clip-rule="evenodd"/>
    </svg>
      </legend>

      ${
        title === "Description"
        ?`
        <textarea id="${title}" oninput="getvalue()" placeholder="${placeHolder}" class="w-full border rounded-lg p-2" rows="4"></textarea>

        <br>
          <br>
          <br>


        `:""
      }
      

      ${
        title === "Heading"
          ? `
          <input type="text" id="${title}" oninput="getvalue()" placeholder="${placeHolder}" class="w-full border rounded-lg p-2">
          <br>
          <br>
          <br>
          <!-- Positioning container here -->

          <div class="absolute bottom-0 left-0 mt-4 ml-4 mb-2 flex flex-wrap ">
              <!-- Buttons for Text Position - Top Left Corner -->
                <div class="text-left bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap" onclick="changeTextPosition('left')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block mt-1  mr-1">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd" />
                  </svg>Left
                </div>
              <div class="text-center bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap" onclick="changeTextPosition('center')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline-block mt-1  mr-1">
              <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
            </svg>
              Center
              </div>
              <div class="text-right bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap" onclick="changeTextPosition('right')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block mt-1 mr-1" >
                  <path d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.26a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" />
                  <path d="M5.273 4.5a1.25 1.25 0 00-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 11h3.47a1.318 1.318 0 00-.015-.062l-1.523-5.52a1.25 1.25 0 00-1.205-.918h-.977a.75.75 0 010-1.5h.977a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h.977a.75.75 0 010 1.5h-.977z" />
                  </svg>
              
              Right</div>
          </div>


          <!-- Positioning container here -->

          <div class="absolute bottom-0 right-0 mt-4 mr-4 mb-2 flex flex-wrap">
              <!-- Buttons for Text Color - Top Right Corner -->
              <div class="text-black bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap " onclick="changeTextColor('blue')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block mt-1  mr-1">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd" />
                  </svg>
                  Blue
              </div>
              <div class="text-black bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap" onclick="changeTextColor('black')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 inline-block mt-1 mr-1">
                  <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                </svg>
              
              Black</div>
              <div class="text-black bg-white border border-grey-500 rounded px-2 py-1 cursor-pointer flex flex-wrap" onclick="changeTextColor('green')">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 inline-block mt-1 mr-1" >
                  <path d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.26a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" />
                  <path d="M5.273 4.5a1.25 1.25 0 00-1.205.918l-1.523 5.52c-.006.02-.01.041-.015.062H6a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h3.438a1 1 0 00.86-.49l.606-1.02A1 1 0 0114 11h3.47a1.318 1.318 0 00-.015-.062l-1.523-5.52a1.25 1.25 0 00-1.205-.918h-.977a.75.75 0 010-1.5h.977a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h.977a.75.75 0 010 1.5h-.977z" />
                  </svg>
            
              Green</div>
          </div>`
          : ''
      }

    </fieldset>
  `;

  return inputBox;
}


  function changeTextPosition( position) {
    const input = document.getElementById("headingPreview");
    if (input) {
      input.style.textAlign = position;
    }
  }

  function changeTextColor( color) {
    const input = document.getElementById("headingPreview");
    if (input) {
      input.style.color = color;
    }
  }


  function removeInputBox(title) {
    const inputBoxToRemove = document.getElementById(`input-box-${title}`);

    if (inputBoxToRemove) {
      inputBoxToRemove.remove();
      toggleComponent(title, false);
      if (inputBoxesContainer.querySelectorAll(".input-box").length <3) {
        componentsContainer.style.display = "block";
      }
    }
  }

 
  
  function downloadAsImage() {
    const downloadButton = document.querySelector('.mt-4');

    downloadButton.style.display = 'none';
  
    const previewContainer = document.getElementById("preview-container");
  
    domtoimage.toPng(previewContainer)
      .then(function (dataUrl) {
        
        downloadButton.style.display = 'block';
  
        
        const anchor = document.createElement("a");
        anchor.download = "preview.png"; 
        anchor.href = dataUrl; 
        anchor.click(); 
      })
      .catch(function (error) {
        console.error('Error during image conversion: ', error);
      });
  }

  function getvalue() {
    
    if(document.getElementById("Heading").value){
        var x = document.getElementById("Heading").value;
        document.getElementById("headingPreview").innerHTML = x;
    }else{
        document.getElementById("headingPreview").innerHTML = "";
    }

    if(document.getElementById("Description").value){
        var y = document.getElementById("Description").value;
        document.getElementById("descriptionPreview").innerHTML = y;
    }else{
        document.getElementById("descriptionPreview").innerHTML = "";
    }

     
  }


