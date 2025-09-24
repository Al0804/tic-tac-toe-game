// Inisialisasi board kosong dan status game
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const cells = document.getElementsByClassName('cell');

// Fungsi untuk menangani gerakan pemain
function makeMove(index) {
    // Cek apakah cell kosong dan game masih aktif
    if (board[index] === '' && gameActive) {
        // Tempatkan X (pemain) di board dan tampilkan di cell
        board[index] = 'X';
        cells[index].textContent = 'X';
        cells[index].style.color = '#ff6b6b';

        // Cek apakah pemain menang
        if (checkWinner('X')) {
            gameActive = false; // Hentikan game
            showWinScreen('Selamat! Anda Menang!'); // Tampilkan layar kemenangan
            return;
        }

        // Cek apakah game berakhir seri (board penuh)
        if (!board.includes('')) {
            gameActive = false;
            showWinScreen('Game Seri!'); // Tampilkan layar seri
            return;
        }

        // Tunggu 500ms sebelum bot bergerak untuk efek yang lebih natural
        setTimeout(botMove, 500);
    }
}

// Fungsi untuk gerakan bot (komputer)
function botMove() {
    if (!gameActive) return; // Keluar jika game sudah tidak aktif

    // Cari semua posisi kosong yang tersedia
    let availableMoves = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    // Pilih gerakan random dari posisi yang tersedia
    let moveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    // Tempatkan O (bot) di board dan tampilkan di cell
    board[moveIndex] = 'O';
    cells[moveIndex].textContent = 'O';
    cells[moveIndex].style.color = '#8ec5fc';

    // Cek apakah bot menang
    if (checkWinner('O')) {
        gameActive = false; // Hentikan game
        showWinScreen('Anda Kalah! Bot Menang!'); // Tampilkan layar kekalahan
        return;
    }

    // Cek apakah game berakhir seri setelah gerakan bot
    if (!board.includes('')) {
        gameActive = false;
        showWinScreen('Game Seri!'); // Tampilkan layar seri
        return;
    }
}

// Fungsi untuk mengecek apakah ada pemenang
function checkWinner(player) {
    // Definisi semua kombinasi kemenangan
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom vertikal
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    // Cek apakah ada kondisi kemenangan yang terpenuhi
    return winConditions.some(condition => {
        return condition.every(index => {
            return board[index] === player;
        });
    });
}

// Fungsi untuk menampilkan layar kemenangan/kekalahan/seri
function showWinScreen(message) {
    // Sembunyikan board game
    document.getElementById('board').style.display = 'none';
    
    // Tampilkan layar kemenangan
    document.getElementById('winScreen').style.display = 'block';
    
    // Update teks pesan sesuai hasil game
    document.querySelector('.win-text').textContent = message;
}

// Fungsi untuk menampilkan halaman pesan
function showMessage() {
    document.getElementById('messagePage').style.display = 'block';
    document.getElementById('winScreen').style.display = 'none';
}

// Fungsi untuk menutup halaman pesan
function closeMessage() {
    document.getElementById('messagePage').style.display = 'none';
    location.reload(); // Reload halaman untuk restart game
}

// Fungsi untuk restart game tanpa reload halaman
function restartGame() {
    // Reset board ke kondisi awal
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Bersihkan semua cell di tampilan
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].style.color = '';
    }
    
    // Sembunyikan layar kemenangan dan tampilkan kembali board
    document.getElementById('winScreen').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
}