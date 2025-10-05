function updatePreview(inputId, previewId, property = "textContent") {
    let input = document.getElementById(inputId);
    let preview  = document.getElementById(previewId);
    input.addEventListener("input", () => {
        preview[property] = input.value;
    });
}

// previsualisation du nom
updatePreview("nom", "preview-nom");

// previsualisation de la bio
updatePreview("bio", "preview-bio");

// previsualisation de la photo
updatePreview("photo", "preview-photo", "src");

// changement de couleur instantané
let theme = document.getElementById("theme");
let preview = document.getElementsByClassName("preview-card")[0];
theme.addEventListener("input" , ()=> {
    preview.style.backgroundColor = theme.value ;

});

let addSkillButton = document.getElementById("add-skill");
let skillsList = document.getElementById("skills-list");
let skillInput = document.getElementById("skill-input");
let previewSkillsList = document.getElementById("preview-skills-list");

// Ajouter une compétence
function addSkill() {
  const skill = skillInput.value.trim();
  if (!skill) return;

  // Création du pill visuel
  const li = document.createElement("li");
  li.textContent = skill;

  // Bouton de suppression
  const removeBtn = document.createElement("span");
  removeBtn.textContent = " ×";
  removeBtn.style.cursor = "pointer";
  removeBtn.style.marginLeft = "8px";
  removeBtn.style.color = "#c62828";
  removeBtn.addEventListener("click", () => {
    li.remove();
    previewLi.remove();
    hidden.remove();
  });

  li.appendChild(removeBtn);
  skillsList.appendChild(li);

  // Aperçu
  const previewLi = document.createElement("li");
  previewLi.textContent = skill;
  previewSkillsList.appendChild(previewLi);

  // Input caché pour l’envoi
  const hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.name = "skills[]";
  hidden.value = skill;
  document.getElementById("profile-form").appendChild(hidden);

  // Reset du champ
  skillInput.value = "";
}



addSkillButton.addEventListener("click", addSkill);
skillInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
    }              
});

const form = document.getElementById("profile-form");
const saveBtn = document.getElementById("save-btn");
const saveMessage = document.getElementById("save-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // UI: état d’envoi
  saveBtn.disabled = true;
  saveMessage.textContent = "Sauvegarde...";
  saveMessage.style.color = "";

  const formData = new FormData(form);

  try {
    const res = await fetch("save.php", {
      method: "POST",
      body: formData
    });

    //  save.php renvoie TEXTE
    const text = await res.text();
    saveMessage.textContent = text;
    saveMessage.style.color = res.ok ? "green" : "red";

    if (res.ok) form.reset();

  } catch (err) {
    console.error(err);
    saveMessage.textContent = " Erreur réseau.";
    saveMessage.style.color = "red";
  } finally {
    saveBtn.disabled = false;
  }
});

