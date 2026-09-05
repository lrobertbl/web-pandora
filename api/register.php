<?php
// Registro de cuenta - L2J Mobius
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
    
    $username = $conn->real_escape_string($data['username']);
    $password = $data['password'];
    $email = $conn->real_escape_string($data['email']);
    
    // Validaciones
    if (strlen($username) < 4 || strlen($username) > 16) {
        echo json_encode(['success' => false, 'message' => 'El usuario debe tener entre 4 y 16 caracteres']);
        exit;
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
        exit;
    }
    
    // Verificar si el usuario ya existe
    $checkUser = "SELECT login FROM accounts WHERE login = '$username'";
    $result = $conn->query($checkUser);
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
        exit;
    }
    
    // Verificar si el email ya existe
    $checkEmail = "SELECT email FROM accounts WHERE email = '$email'";
    $result = $conn->query($checkEmail);
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'El email ya está registrado']);
        exit;
    }
    
    // Encriptar contraseña (L2J usa SHA1, pero verifica si tu servidor usa otro método)
    $hashedPassword = sha1($password);
    
    // Insertar nueva cuenta
    $insertAccount = "INSERT INTO accounts (login, password, email, accessLevel) 
                     VALUES ('$username', '$hashedPassword', '$email', 0)";
    
    if ($conn->query($insertAccount)) {
        echo json_encode(['success' => true, 'message' => 'Cuenta creada exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al crear la cuenta: ' . $conn->error]);
    }
    
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
