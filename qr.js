async function generateQR() {
    let voterId = document.getElementById("voter-id").value;
    let name = document.getElementById("voter-name").value;

    let response = await fetch("http://127.0.0.1:5000/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: voterId, name: name })
    });

    let data = await response.json();
    if (data.qr_code) {
        document.getElementById("qr-code").src = `data:image/png;base64,${data.qr_code}`;
        document.getElementById("qr-code").style.display = "block";
    }
}

// QR Scanner
function startScanner() {
    const scanner = new Html5Qrcode("video");
    scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, 
        (decodedText) => {
            document.getElementById("scanned-data").innerText = "Scanned: " + decodedText;
            scanner.stop();

            let voterId = decodedText.split("|")[0];
            validateQR(voterId);
        },
        (error) => { console.error(error); }
    );
}

// Validate QR and Get OTP
async function validateQR(voterId) {
    let response = await fetch("http://127.0.0.1:5000/validate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: voterId })
    });

    let data = await response.json();
    if (data.otp) {
        alert("Voter Verified! OTP Sent.");
        document.getElementById("otp-section").style.display = "block";
    } else {
        alert("Invalid Voter ID");
    }
}

// Verify OTP (Simple Check)
function verifyOTP() {
    let enteredOtp = document.getElementById("otp").value;
    if (enteredOtp.length === 6) {
        alert("✅ OTP Verified! Access Granted.");
    } else {
        alert("❌ Invalid OTP");
    }
}

// Start Scanner on Load
window.onload = startScanner;
