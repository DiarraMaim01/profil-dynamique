<?php
// 1) Récupération "brute" (nettoyée), mais SANS nl2br ni htmlspecialchars
$nom  = trim($_POST['nom'] ?? '');
$bio  = trim($_POST['bio'] ?? '');
$theme = trim($_POST['theme'] ?? '');
$competences = trim($_POST['competences'] ?? ''); // pour l’instant c’est une chaîne
$photo = trim($_POST['photo'] ?? '');

// 2) Validations simples
$erreurs = [];
if ($nom === '') $erreurs[] = "Le nom est obligatoire.";
if ($theme && !preg_match('/^#([0-9a-fA-F]{3}){1,2}$/', $theme)) $erreurs[] = "Couleur invalide.";
if ($photo && !filter_var($photo, FILTER_VALIDATE_URL)) $erreurs[] = "URL de photo invalide.";

if (!empty($erreurs)) {
    // Affiche les erreurs proprement (échappées) puis stoppe
    foreach ($erreurs as $e) {
        echo "<p style='color:red;'>".htmlspecialchars($e)."</p>";
    }
    exit;
}

// 3) Structure des données (tu peux garder competences en string pour l’instant)
$data = [
    'nom'    => $nom,
    'bio'    => $bio,           // texte brut (on échappera à l’affichage)
    'theme'  => $theme,
    'competences' => $competences, // plus tard: tableau ["HTML","CSS","JS"]
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

// JSON joli + sans échapper les accents ; LOCK_EX pour éviter conflits
file_put_contents(
    $file,
    json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

// 5) Retour utilisateur (ici on échappe pour l’affichage)
echo "<h3>Profil sauvegardé avec succès !</h3>";
echo "<p>Merci ".htmlspecialchars($nom)."</p>";
?>
