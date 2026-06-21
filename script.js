const noteInput = document.getElementById("noteInput");
const addbtn = document.getElementById("addbtn");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

// Local Storage se notes load karo
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Note count update
function updateCount() {
  noteCount.innerHTML = `Total Notes: ${notes.length}`;
}

// Note display karne ka function
function showNote(noteObj) {
  const div = document.createElement("div");
  div.classList.add("note");

  const p = document.createElement("p");
  p.innerText = noteObj.text;

  const time = document.createElement("small");
  time.innerText = noteObj.date;
  time.classList.add("note-time");

  const deletebtn = document.createElement("button");
  deletebtn.innerText = "Delete";

  deletebtn.addEventListener("click", function () {
    // Page se remove
    div.remove();

    // Array se remove
    notes = notes.filter(function (item) {
      return item.text !== noteObj.text;
    });

    // Local Storage update
    localStorage.setItem("notes", JSON.stringify(notes));

    // Count update
    updateCount();
  });

  div.appendChild(p);
  div.appendChild(time);
  div.appendChild(deletebtn);

  notesContainer.appendChild(div);
}

// Page load par notes dikhao
notes.forEach(function (note) {
  showNote(note);
});

// Initial count
updateCount();

// Add Button
addbtn.addEventListener("click", function () {
  const note = noteInput.value.trim();

  if (note === "") {
    alert("Please enter your note");
    return;
  }

  const noteObj = {
    text: note,
    date: new Date().toLocaleString(),
  };

  notes.push(noteObj);

  // Local Storage save
  localStorage.setItem("notes", JSON.stringify(notes));

  showNote(noteObj);
  updateCount();

  noteInput.value = "";
});
