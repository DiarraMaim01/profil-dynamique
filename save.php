<?php

// 1) Récupération 
$nom  = trim($_POST['nom'] ?? '');
$bio  = trim($_POST['bio'] ?? '');
$theme = trim($_POST['theme'] ?? '');
$skills = $_POST['skills'] ?? [];                   
$skills = array_map('trim', is_array($skills) ? $skills : []);
$skills = array_filter($skills, fn($s) => $s !== ''); 
$photo = trim($_POST['photo'] ?? '');

// 2) Validations 
$erreurs = [];
if ($nom === '') $erreurs[] = "Le nom est obligatoire.";
if ($theme && !preg_match('/^#([0-9a-fA-F]{3}){1,2}$/', $theme)) $erreurs[] = "Couleur invalide.";
if ($photo && !filter_var($photo, FILTER_VALIDATE_URL)) $erreurs[] = "URL de photo invalide.";

if (!empty($erreurs)) {
    // Afficher les erreurs proprement
   echo "❌ " . implode(" — ", array_map('htmlspecialchars', $erreurs));
  exit;
}


// 3) Structure des données 
$data = [
    'nom'    => $nom,
    'bio'    => $bio,          
    'theme'  => $theme,
    'competences' => array_values($skills),
    'photo'  => $photo,
    'date'   => date('Y-m-d H:i:s'),
];

// 4) Sauvegarde
$file = 'data.json';
$existingData = [];

if (file_exists($file)) {
    $existingData = json_decode(file_get_contents($file), true) ?? [];
}
$existingData[] = $data;

// JSON  ; LOCK_EX pour éviter conflits
file_put_contents(
    $file,
    json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

// 5) Retour utilisateur
echo " Profil sauvegardé avec succès ! Merci " . htmlspecialchars($nom);

?>
