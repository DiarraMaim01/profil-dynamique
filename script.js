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
theme.addEventListener("input" , ()=> {
    document.body.style.backgroundColor = theme.value ;
});

