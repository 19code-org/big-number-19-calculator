// 19 Calculator JavaScript
class Calculator19 {
    constructor() {
        this.initElements();
        this.initEventListeners();
        this.rateLimitData = this.loadRateLimitData();
        this.maxCalculations = 50; // 10 dakikada maksimum hesaplama
        this.timeWindow = 10 * 60 * 1000; // 10 dakika (milisaniye)
        this.blockDuration = 30 * 1000; // 30 saniye blok süresi
        this.countdownInterval = null;
    }

    initElements() {
        this.numberInput = document.getElementById('numberInput');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultArea = document.getElementById('resultArea');
        this.resultCard = document.getElementById('resultCard');
        this.successResult = document.getElementById('successResult');
        this.errorResult = document.getElementById('errorResult');
        this.successFormula = document.getElementById('successFormula');
        this.errorFormula = document.getElementById('errorFormula');
        this.errorRemainder = document.getElementById('errorRemainder');
        this.inputWarning = document.getElementById('inputWarning');
        this.rateLimitWarning = document.getElementById('rateLimitWarning');
        this.rateLimitCountdown = document.getElementById('rateLimitCountdown');
    }

    initEventListeners() {
        // Input alanı değişiklik kontrolü
        this.numberInput.addEventListener('input', () => {
            this.validateInput();
            this.toggleCalculateButton();
        });

        // Enter tuşu ile hesaplama
        this.numberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.calculateBtn.disabled) {
                this.calculate();
            }
        });

        // Hesapla butonu
        this.calculateBtn.addEventListener('click', () => {
            this.calculate();
        });

        // Temizle butonu
        this.clearBtn.addEventListener('click', () => {
            this.clear();
        });

        // Sayfa yüklendiğinde focus
        window.addEventListener('load', () => {
            this.numberInput.focus();
        });
    }

    validateInput() {
        const value = this.numberInput.value.trim();
        
        // Boş değer kontrolü
        if (value === '') {
            this.hideInputWarning();
            return true;
        }

        // Sadece rakam ve boşluk kontrolü
        const isValidNumber = /^[\d\s]+$/.test(value);
        
        if (!isValidNumber) {
            this.showInputWarning();
            return false;
        } else {
            this.hideInputWarning();
            // Boşlukları temizle
            const cleanedValue = value.replace(/\s/g, '');
            if (cleanedValue !== value) {
                this.numberInput.value = cleanedValue;
            }
            return true;
        }
    }

    showInputWarning() {
        this.inputWarning.classList.remove('hidden');
        this.inputWarning.classList.add('animate-pulse');
    }

    hideInputWarning() {
        this.inputWarning.classList.add('hidden');
        this.inputWarning.classList.remove('animate-pulse');
    }

    toggleCalculateButton() {
        const value = this.numberInput.value.trim();
        const isValid = this.validateInput() && value !== '';
        
        this.calculateBtn.disabled = !isValid || this.isRateLimited();
        
        if (this.calculateBtn.disabled) {
            this.calculateBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            this.calculateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    calculate() {
        // Rate limiting kontrolü
        if (this.isRateLimited()) {
            this.showRateLimitWarning();
            return;
        }

        const inputValue = this.numberInput.value.trim();
        
        if (!this.validateInput() || inputValue === '') {
            return;
        }

        // Security checks
        if (inputValue.length > 20) {
            this.showError('Number too large. You can enter a maximum of 20-digit numbers.');
            return;
        }

        // Rate limiting kayıt
        this.recordCalculation();

        const number = BigInt(inputValue);
        const divisor = BigInt(19);
        
        try {
            const quotient = number / divisor;
            const remainder = number % divisor;
            
            this.showResult(number, quotient, remainder);
            
        } catch (error) {
            this.showError('An error occurred during calculation.');
        }
    }

    showResult(number, quotient, remainder) {
        // Önceki sonuçları gizle
        this.successResult.classList.add('hidden');
        this.errorResult.classList.add('hidden');
        
        if (remainder === BigInt(0)) {
            // 19'a tam bölünebilir
            this.showSuccessResult(number, quotient);
        } else {
            // 19'a tam bölünemiyor
            this.showErrorResult(number, quotient, remainder);
        }
        
        // Sonuç alanını göster
        this.resultArea.classList.remove('hidden');
        this.resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showSuccessResult(number, quotient) {
        this.successFormula.textContent = `${number.toString()} = 19 × ${quotient.toString()}`;
        
        // Kart stilini ayarla
        this.resultCard.className = 'p-6 rounded-lg border-2 transition-all duration-500 transform border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20 scale-105';
        
        // Başarılı sonucu göster
        this.successResult.classList.remove('hidden');
        
        // Animasyon efekti
        setTimeout(() => {
            this.successResult.classList.add('animate-bounce');
            setTimeout(() => {
                this.successResult.classList.remove('animate-bounce');
            }, 1000);
        }, 100);
    }

    showErrorResult(number, quotient, remainder) {
        this.errorFormula.textContent = `${number.toString()} = 19 × ${quotient.toString()} + ${remainder.toString()}`;
        this.errorRemainder.textContent = `Remainder: ${remainder.toString()}`;
        
        // Kart stilini ayarla
        this.resultCard.className = 'p-6 rounded-lg border-2 transition-all duration-500 transform border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20 scale-105';
        
        // Hata sonucunu göster
        this.errorResult.classList.remove('hidden');
        
        // Animasyon efekti
        setTimeout(() => {
            this.errorResult.classList.add('animate-pulse');
            setTimeout(() => {
                this.errorResult.classList.remove('animate-pulse');
            }, 1000);
        }, 100);
    }

    showError(message) {
        // Genel hata gösterimi için
        console.error(message);
        alert(message);
    }

    clear() {
        this.numberInput.value = '';
        this.numberInput.focus();
        this.hideInputWarning();
        this.hideRateLimitWarning();
        this.resultArea.classList.add('hidden');
        this.toggleCalculateButton();
    }

    // Rate Limiting Fonksiyonları
    loadRateLimitData() {
        try {
            const data = localStorage.getItem('calc19_rate_limit');
            return data ? JSON.parse(data) : { calculations: [], blockedUntil: 0 };
        } catch {
            return { calculations: [], blockedUntil: 0 };
        }
    }

    saveRateLimitData() {
        try {
            localStorage.setItem('calc19_rate_limit', JSON.stringify(this.rateLimitData));
        } catch {
            // localStorage kullanılamıyorsa sessizce devam et
        }
    }

    recordCalculation() {
        const now = Date.now();
        this.rateLimitData.calculations.push(now);
        
        // Eski kayıtları temizle (time window dışındakiler)
        this.rateLimitData.calculations = this.rateLimitData.calculations.filter(
            time => now - time < this.timeWindow
        );
        
        // Limit aşılırsa blok uygula
        if (this.rateLimitData.calculations.length > this.maxCalculations) {
            this.rateLimitData.blockedUntil = now + this.blockDuration;
            this.showRateLimitWarning();
        }
        
        this.saveRateLimitData();
        this.toggleCalculateButton();
    }

    isRateLimited() {
        const now = Date.now();
        
        // Blok süresi kontrol
        if (this.rateLimitData.blockedUntil > now) {
            return true;
        } else if (this.rateLimitData.blockedUntil > 0) {
            // Blok süresi bitti, temizle
            this.rateLimitData.blockedUntil = 0;
            this.hideRateLimitWarning();
            this.saveRateLimitData();
        }
        
        // Calculation limit kontrol
        this.rateLimitData.calculations = this.rateLimitData.calculations.filter(
            time => now - time < this.timeWindow
        );
        
        return this.rateLimitData.calculations.length >= this.maxCalculations;
    }

    showRateLimitWarning() {
        this.rateLimitWarning.classList.remove('hidden');
        this.startCountdown();
    }

    hideRateLimitWarning() {
        this.rateLimitWarning.classList.add('hidden');
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
    }

    startCountdown() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
        
        const updateCountdown = () => {
            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((this.rateLimitData.blockedUntil - now) / 1000));
            
            if (remaining > 0) {
                this.rateLimitCountdown.textContent = remaining;
            } else {
                this.hideRateLimitWarning();
                this.toggleCalculateButton();
            }
        };
        
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }
}

// Örnek sayıları ayarlama fonksiyonu (global)
function setExample(number) {
    if (window.calc19) {
        window.calc19.numberInput.value = number;
        window.calc19.validateInput();
        window.calc19.toggleCalculateButton();
        window.calc19.numberInput.focus();
    }
}

// Sayfa yüklendiğinde hesap makinesini başlat
document.addEventListener('DOMContentLoaded', () => {
    window.calc19 = new Calculator19();
});
