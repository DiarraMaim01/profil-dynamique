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
    let skill = skillInput.value.trim();
    if (skill) {
        let li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);

        let previewLi = document.createElement("li");
        previewLi.textContent = skill;
        previewSkillsList.appendChild(previewLi);
        
        skillInput.value = "";
    }
}

addSkillButton.addEventListener("click", addSkill);
skillInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
    }              
});