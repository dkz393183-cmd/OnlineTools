// Navegação entre ferramentas
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        
        // Atualizar botões
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Atualizar seções
        document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
        document.getElementById(tool).classList.add('active');
    });
});

// Gerador de QR Code
function generateQR() {
    const text = document.getElementById('qr-input').value;
    const result = document.getElementById('qr-result');
    
    if (!text) {
        result.innerHTML = '<p style="color: red;">Por favor, digite algo!</p>';
        return;
    }
    
    // Usando API gratuita para gerar QR Code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    
    result.innerHTML = `
        <img src="${qrUrl}" alt="QR Code">
        <p style="margin-top: 10px;">QR Code gerado com sucesso!</p>
        <a href="${qrUrl}" download="qrcode.png" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Baixar QR Code</a>
    `;
}

// Conversor de Moedas
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;
    const result = document.getElementById('conversion-result');
    
    if (!amount || amount <= 0) {
        result.innerHTML = '<p style="color: red;">Digite um valor válido!</p>';
        return;
    }
    
    result.innerHTML = '<p>Carregando...</p>';
    
    try {
        // Usando API gratuita de câmbio
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        
        result.innerHTML = `
            <div class="result-text">
                ${amount} ${from} = ${converted} ${to}
            </div>
            <p style="margin-top: 10px; color: #666;">Taxa: 1 ${from} = ${rate.toFixed(4)} ${to}</p>
        `;
    } catch (error) {
        result.innerHTML = '<p style="color: red;">Erro ao converter. Tente novamente.</p>';
    }
}

// Calculadora de Média
function calculateAverage() {
    const grade1 = parseFloat(document.getElementById('grade1').value) || 0;
    const grade2 = parseFloat(document.getElementById('grade2').value) || 0;
    const grade3 = parseFloat(document.getElementById('grade3').value) || 0;
    const grade4 = parseFloat(document.getElementById('grade4').value) || 0;
    const result = document.getElementById('average-result');
    
    const average = ((grade1 + grade2 + grade3 + grade4) / 4).toFixed(2);
    const status = average >= 7 ? 'approved' : 'failed';
    const statusText = average >= 7 ? 'Aprovado! 🎉' : 'Reprovado 😔';
    
    result.innerHTML = `
        <div class="result-text">
            Média: ${average}
        </div>
        <div class="status ${status}">
            ${statusText}
        </div>
    `;
}

// Permitir Enter nos inputs
document.getElementById('qr-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});

document.getElementById('amount')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});
