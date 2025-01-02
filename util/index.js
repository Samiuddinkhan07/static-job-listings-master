
import data from "./fetch.js"
const jsonData = await data();
const dataArry = jsonData;
const input = document.querySelector("#search-jobs");
const renderHTML = function (arr) {
  const divs = arr.map((elements) =>
    ` <div class="listing-card" data-card-no=${elements.id}>
              <div class="card_img">
                <img src="${elements.logo}" alt="" />
              </div>
              <div class="card-body">
                <div class="card-body-text1">${elements.company} ${elements.new === true ? "<span class='card-new-job-card'>New!</span>" : null} </div>
                <div class="card-body-text2">${elements.position}</div>
                <div class="card-body-details">
                  <span class="card-body-posted">${elements.postedAt}</span>
                  <span class="card-body-contract">${elements.contract}</span>
                  <span class="card-body-location">${elements.location}</span>
                </div>
              </div>
              <div class="card_tags">
                <span class="tag">${elements.level}</span>
                <span class="tag">${elements.role}</span>
                ${elements.languages.map((elem) => `<span class="tag">${elem}</span>`).join("")}
              </div>
            </div>`
  ).join("")
  document.querySelector(".lower-section-inner").innerHTML = divs
};

renderHTML(dataArry)


const onFilter = function (inputVal) {
  const inputTerms = inputVal.toLowerCase().split(/\s+/).filter(Boolean);
  const filterval = dataArry.filter((val) => {
    return inputTerms.every((term) =>
      val.languages.some((lang) => lang.toLowerCase().includes(term)) ||
      val.company.toLowerCase().includes(term) ||
      val.position.toLowerCase().includes(term)
    );
  });

  renderHTML(filterval)
}

const tagName = []
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const tag = e.target.value.trim();
    onFilter(tag)
    if (tag && !tagName.includes(tag)) {
      tagName.push(tag);
      tags()
    }
    e.target.value = ""
  }
})

const tags = function () {
  const container = document.querySelector("#input-values")
  container.innerHTML = "";
  const tags = [...new Set(tagName)];
  tags.forEach((elem, i) => {
    const closeIcon = document.createElement("div");
    const tagDiv = document.createElement("div");
    const mainContainer = document.createElement("div")
    tagDiv.textContent = elem;
    const img = document.createElement("img");
    img.setAttribute("src", "./images/icon-remove.svg")
    closeIcon.appendChild(img)
    closeIcon.classList.add("close_button");
    closeIcon.setAttribute("data-tag-id", i);
    tagDiv.classList.add("tag-item");
    mainContainer.classList.add("tag_container")
    mainContainer.appendChild(tagDiv)
    mainContainer.appendChild(closeIcon)
    container.appendChild(mainContainer)
    closeIcon.addEventListener("click", (e) => {
      removeTag(e)
    })
  })

}

const removeTag = (idx) => {
  const dataID = idx.target.closest(".close_button").getAttribute('data-tag-id');
  const filteredArry = tagName.filter((_, index) => index !== parseInt(dataID));
  tagName.length = 0;
  tagName.push(...filteredArry)
  tags()
  renderHTML(dataArry)
}



const clearSearch = function () {
  tagName.length = 0;
  tags()
  renderHTML(dataArry)
}

document.querySelector("#clear-search-tags").addEventListener("click", clearSearch)





