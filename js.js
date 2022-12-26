let notesList = document.querySelector(".notes__list ul");
let landingMessage = document.querySelector(".landing");
let buttons = document.querySelector(".notes__view-buttons");
let noteSection = document.querySelector(".notes__view-body");
let currrentNote;

let notes = [];

function listNotes() {
  getNotesFromLocalStorage();
  notesList.innerHTML = "";

  notes.forEach((ele, index) => {
    notesList.innerHTML += `<li data-index=${index}>
    <h3>${ele.title}</h3>
    <p>
    ${ele.body}
    </p>
    <span> ${ele.date}</span>
  </li>`;
  });

  document.querySelectorAll("li").forEach((ele) => {
    ele.addEventListener("click", () => {
      removeActiveClass();
      ele.classList.add("active-note");
      landingMessage.classList.add("hide");
      viewNote(ele.dataset.index);
      currrentNote = ele.dataset.index;
    });
  });
}

listNotes();

function removeActiveClass() {
  document.querySelectorAll("li").forEach((ele) => {
    ele.classList.remove("active-note");
  });
}

function viewNote(noteIndex) {
  let note = notes[noteIndex];
  buttons.classList.remove("hide");
  noteSection.innerHTML = "";

  noteSection.innerHTML = `
   <h2 id="notehead" contenteditable="true">${note.title}</h2>
  <p id="notebody" contenteditable="true">
   ${note.body}
  </p>`;
}
function addNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function getNotesFromLocalStorage() {
  notes = JSON.parse(localStorage.getItem("notes")) || [
    {
      title: "welcome",
      body: "your note will appear here and you can edit it...",
      date: "date will be here",
      test: true,
    },
  ];
}

window.save.onclick = () => {
  notes[currrentNote].title = notehead.innerText;
  notes[currrentNote].body = notebody.innerText;
  addNotesToLocalStorage();
  listNotes();
  document.querySelectorAll("li")[currrentNote].classList.add("active-note");
};

window.delete.onclick = () => {
  notes.splice(currrentNote, 1);
  addNotesToLocalStorage();
  listNotes();
  noteSection.innerHTML = "";
  landingMessage.classList.remove("hide");
  buttons.classList.add("hide");
};
window.cancel.onclick = () => {
  viewNote(currrentNote);
};

window.addnote.onclick = () => {
  document.querySelector(".form").id = "";
  let overlay = document.querySelector(".overlay");
  overlay.classList.remove("hide");
  overlay.addEventListener("click", () => {
    document.querySelector(".form").id = "hide-form";
    overlay.classList.add("hide");
  });
};

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    // this.date = Date.now();
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  }
}

function newNote(e) {
  e.preventDefault();
  let newNoteTitle = document.querySelector("input[name=title]");
  let newNoteBody = document.querySelector("textarea[name=body]");
  let myNewNote = new Note(newNoteTitle.value, newNoteBody.value);
  if (notes[0]) {
    if (notes[0].test) {
      notes.splice(0, 1);
    }
  }
  notes.push(myNewNote);
  addNotesToLocalStorage();
  listNotes();
  newNoteTitle.value = "";
  newNoteBody.value = "";
  document.querySelector(".form").id = "hide-form";
  document.querySelector(".overlay").classList.add("hide");
}
