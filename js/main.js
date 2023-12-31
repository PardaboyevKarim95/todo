let elForm = document.querySelector(".js-form");
let elInp = document.querySelector(".js-inp");
let elList = document.querySelector(".js-list");
let elSpanAll = document.querySelector(".span-all");
let elSpanDone = document.querySelector(".span-done");
let elSpanNotDone = document.querySelector(".span-not-done");
let elSpandeletedOnes = document.querySelector(".span-deleted-ones");
let elwrapper = document.querySelector(".wrapper");
let eltitle = document.querySelector(".title");
const eldark = document.querySelector(".button-dark");

console.log(local());
eldark.addEventListener("click", () => {
  local();
});
function local() {
  let mon = JSON.parse(localStorage.getItem("mone"));

  localStorage.setItem("mone", JSON.stringify(!mon));

  if (!mon) {
    document.body.style.backgroundColor = "#333";

    eldark.style.backgroundColor = "#fff";
    eldark.style.color = "#333";
    eltitle.classList.add("text-light");
  } else {
    document.body.style.backgroundColor = "#fff";
    eldark.style.backgroundColor = "#333";
    eldark.style.color = "#fff";
    eltitle.classList.remove("text-light");
  }
}
console.log(local());
let localarr = JSON.parse(localStorage.getItem("karim"));

let arr = localarr ? localarr : [];

let deletarr = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inputValue = elInp.value;

  arr.push({
    id: arr.length ? arr.at(-1).id + 1 : 1,
    text: inputValue,
    isconpleate: false,
  });

  elInp.value = "";

  renderTodes(arr, elList);
  localStorage.setItem("karim", JSON.stringify(arr));
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".dellet-btn")) {
    let delletId = evt.target.dataset.todoid;
    let arrDelletId = arr.findIndex((item) => item.id == delletId);

    let deletedOnes = arr.splice(arrDelletId, 1);

    deletarr.push(deletedOnes[0]);
    elSpandeletedOnes.textContent = deletarr.length;

    renderTodes(arr, elList);
    elSpanAll.textContent = arr.length;
    // localStorage.setItem("karim", JSON.stringify(arr));
  }

  if (evt.target.matches(".edit-btn")) {
    let editId = evt.target.dataset.todoid;
    let arrDelletId = arr.find((item) => item.id == editId);
    let a = prompt();
    if (a !== null) {
      arrDelletId.text = a;
    }
    renderTodes(arr, elList);
    // localStorage.setItem("karim", JSON.stringify(arr));
  }
  if (evt.target.matches(".inp-checked")) {
    let checkId = evt.target.dataset.todoid;
    let inpchecitem = arr.find((item) => item.id == checkId);

    inpchecitem.isconpleate = !inpchecitem.isconpleate;

    renderTodes(arr, elList);
    // localStorage.setItem("karim", JSON.stringify(arr));
  }
  localStorage.setItem("karim", JSON.stringify(arr));
});
elwrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".deleted-ones")) {
    renderTodes(deletarr, elList);
  }
  if (evt.target.matches(".btn-not-done")) {
    const trueArray = arr.filter((item) => {
      return !item.isconpleate;
    });
    renderTodes(trueArray, elList);
  }
  if (evt.target.matches(".btn-done")) {
    const trueArray = arr.filter((item) => {
      return item.isconpleate;
    });
    renderTodes(trueArray, elList);
  }
  if (evt.target.matches(".btn-all")) {
    renderTodes(arr, elList);
  }
});

function renderTodes(array, node) {
  elSpanAll.textContent = arr.length;
  elSpanDone.textContent = arr.filter((item) => item.isconpleate).length;
  elSpanNotDone.textContent = arr.filter((item) => !item.isconpleate).length;

  node.innerHTML = "";
  array.forEach((item) => {
    let newli = document.createElement("li");
    let newInput = document.createElement("input");
    let newSpan = document.createElement("span");
    let btnEdit = document.createElement("button");
    let btnDellet = document.createElement("button");

    newInput.type = "checkbox";
    newSpan.textContent = item.text;
    btnDellet.textContent = "dellet";
    btnEdit.textContent = "edit";

    newli.setAttribute("class", "list-group-item d-flex align-items-center ");
    newInput.setAttribute("class", "form-check-input me-2 inp-checked");
    newSpan.setAttribute("class", "flex-grow-1");
    btnEdit.setAttribute("class", "btn btn-info me-2 edit-btn");
    btnDellet.setAttribute("class", "btn btn-primary dellet-btn");
    if (item.isconpleate) {
      newInput.checked = true;
      newSpan.classList.add("text-decoration-line-through");
      if (newSpan.matches(".text-decoration-line-through")) {
        newSpan.classList.add("text-danger");
      }
    }
    btnEdit.dataset.todoid = item.id;
    btnDellet.dataset.todoid = item.id;
    newInput.dataset.todoid = item.id;

    newli.append(newInput, newSpan, btnEdit, btnDellet);
    node.appendChild(newli);
  });
}
renderTodes(arr, elList);
