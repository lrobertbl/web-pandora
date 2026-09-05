<?php
// Creación de personaje - L2J Mobius
header('Content-Type: application/json');

// Configuración de la base de datos
$host = 'localhost';
$user = 'root';
$pass = ''; // Sin contraseña según tu config
$dbname = 'l2jmobiusinterlude';

// Conexión a la base de datos
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit;
}

// Procesar la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $charName = $conn->real_escape_string($data['charName']);
    $charRace = $conn->real_escape_string($data['charRace']);
    $charClass = $conn->real_escape_string($data['charClass']);
    $charGender = $conn->real_escape_string($data['charGender']);
    $charHairStyle = $conn->real_escape_string($data['charHairStyle']);
    $charHairColor = $conn->real_escape_string($data['charHairColor']);
    $charFace = $conn->real_escape_string($data['charFace']);
    
    // Obtener nombre de cuenta (en producción esto vendría de sesión)
    $accountName = $conn->real_escape_string($data['accountName']);
    
    // Validaciones
    if (strlen($charName) < 3 || strlen($charName) > 16) {
        echo json_encode(['success' => false, 'message' => 'El nombre debe tener entre 3 y 16 caracteres']);
        exit;
    }
    
    // Verificar si el personaje ya existe
    $checkChar = "SELECT char_name FROM characters WHERE char_name = '$charName'";
    $result = $conn->query($checkChar);
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'El nombre de personaje ya existe']);
        exit;
    }
    
    // Obtener el siguiente charId disponible
    $maxCharId = "SELECT MAX(charId) as max_id FROM characters";
    $result = $conn->query($maxCharId);
    $row = $result->fetch_assoc();
    $newCharId = $row['max_id'] + 1;
    
    // Posición inicial (Giran)
    $x = 82698;
    $y = 148638;
    $z = -3473;
    
    // Stats iniciales
    $maxHp = 390;
    $curHp = 390;
    $maxCp = 450;
    $curCp = 450;
    $maxMp = 200;
    $curMp = 200;
    
    // Insertar nuevo personaje
    $insertChar = "INSERT INTO characters 
                  (account_name, charId, char_name, level, face, hairStyle, hairColor, sex, 
                   race, classid, base_class, x, y, z, maxHp, curHp, maxCp, curCp, maxMp, curMp, 
                   accesslevel, online, deletetime, char_slot, newbie) 
                  VALUES 
                  ('$accountName', $newCharId, '$charName', 1, $charFace, $charHairStyle, 
                   $charHairColor, $charGender, $charRace, $charClass, $charClass, 
                   $x, $y, $z, $maxHp, $curHp, $maxCp, $curCp, $maxMp, $curMp, 
                   0, 0, 0, 0, 1)";
    
    if ($conn->query($insertChar)) {
        echo json_encode(['success' => true, 'message' => 'Personaje creado exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear el personaje: ' . $conn->error]);
    }
    
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
