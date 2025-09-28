# Big Number 19 Calculator

🔢 Production-tested JavaScript calculator for checking divisibility of extremely large numbers by 19.

## ⭐ Features
- ✅ Handles numbers up to 20 digits (configurable)
- ✅ BigInt-based calculations for precision
- ✅ Rate limiting for performance protection
- ✅ Input validation & sanitization
- ✅ Real-time result display
- ✅ Cross-browser compatibility

## 🌐 Live Applications

This calculator powers the mathematical analysis tools at [19code.org](https://19code.org):

**English Version:**
- 🏠 [Quran's Mathematical Code](https://19code.org/en/) - Main platform
- 🔢 [19 Calculator Tool](https://19code.org/en/calculator.html) - Live demo

**Turkish Version:**
- 🏠 [Kuran'ın Matematiksel Kodu](https://19code.org/tr/) - Ana platform
- 🔢 [19 Hesap Makinesi](https://19code.org/tr/hesap-makinesi.html) - Canlı demo

## 🚀 Quick Start

```javascript
// Basic usage
const calculator = new Calculator19();
calculator.numberInput.value = "123456789";
calculator.calculate();

// With custom configuration
const calculator = new Calculator19({
    maxDigits: 30,        // Increase digit limit
    maxCalculations: 100, // More calculations allowed
    timeWindow: 5 * 60 * 1000 // 5 minutes
});
```

## 📦 Installation

1. Include the JavaScript file:
```html
<script src="src/calculator19.js"></script>
```

2. Add the required HTML elements:
```html
<input type="text" id="numberInput" placeholder="Enter a large number">
<button id="calculateBtn">Calculate</button>
<div id="resultArea"></div>
```

3. Initialize:
```javascript
const calc = new Calculator19();
```

## 🔧 Configuration

The calculator includes configurable security and performance settings:

```javascript
class Calculator19 {
    constructor(options = {}) {
        this.maxCalculations = options.maxCalculations || 50;
        this.timeWindow = options.timeWindow || 10 * 60 * 1000; // 10 minutes
        this.blockDuration = options.blockDuration || 30 * 1000; // 30 seconds
        // ... other settings
    }
}
```

## 📊 Why BigInt?

Traditional JavaScript numbers lose precision beyond 15-16 digits. This calculator uses BigInt for:
- ✅ Exact calculations for numbers with 20+ digits
- ✅ Perfect modulo operations
- ✅ No floating-point errors

## 🎯 Use Cases

- **Mathematical Research**: Large number divisibility analysis
- **Educational Tools**: Demonstration of modular arithmetic
- **Cryptography**: Prime number testing components
- **Academic Projects**: Statistical analysis of numerical patterns

## 🛡️ Security Features

- Rate limiting prevents DoS attacks
- Input validation blocks malicious data
- Client-side processing (no server exposure)
- Configurable limits for different environments

## 🤝 Contributing

Pull requests are welcome! This code is production-tested and stable.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use in your projects!

## 🔗 Related Projects

- [19code.org](https://19code.org) - Mathematical analysis platform
- More mathematical tools and research available on the main platform

---

⭐ **Star this repository if you find it helpful!**

**Repository:** [big-number-19-calculator](https://github.com/19code-org/big-number-19-calculator)