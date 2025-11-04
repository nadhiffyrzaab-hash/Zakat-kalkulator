
var inputGram = document.getElementById('emas-gram');  
var tombol = document.getElementById('hitung');         
var hasil = document.getElementById('hasil');           
var historyList = document.getElementById('history');  


var hargaEmasRupiah = 1100000;


function muatHistory() {
  let data = localStorage.getItem('zakatHistory');
  if (!data) return; 

  let riwayat = JSON.parse(data);
  historyList.innerHTML = ''; 

  
  riwayat.forEach(function(item) {
    let li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}


function simpanHistory(text) {
  let data = localStorage.getItem('zakatHistory');
  let riwayat = data ? JSON.parse(data) : [];


  riwayat.unshift(text);

 
  if (riwayat.length > 10) riwayat.pop();

  
  localStorage.setItem('zakatHistory', JSON.stringify(riwayat));

  
  muatHistory();
}


tombol.addEventListener('click', function() {
  var emas = parseFloat(inputGram.value);
  var nisab = 85;

  
  if (isNaN(emas) || emas <= 0) {
    hasil.textContent = "Masukkan jumlah emas yang valid!";
    return;
  }

  
  if (emas < nisab) {
    hasil.textContent = "Belum wajib zakat (emas kurang dari 85 gram)";
    simpanHistory(`Emas: ${emas} gram → Belum wajib zakat`);
  } else {
    
    var zakatGram = emas * 0.025;
    var zakatRupiah = zakatGram * hargaEmasRupiah;

    hasil.textContent =
      `Wajib zakat ${zakatGram.toFixed(2)} gram = Rp ${zakatRupiah.toLocaleString('id-ID')}`;
    simpanHistory(`Emas: ${emas}g → Zakat: ${zakatGram.toFixed(2)}g (Rp ${zakatRupiah.toLocaleString('id-ID')})`);
  }

  
  inputGram.value = '';
});

muatHistory();
