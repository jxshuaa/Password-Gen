
async function updatePassword() {
    const type = document.getElementById('passwordType').value;
    const complexity = document.getElementById('complexity').value;
    const specialChars = document.getElementById('specialChars').checked;

    const response = await fetch(`/generate-password?type=${type}&complexity=${complexity}&specialChars=${specialChars}`);
    const data = await response.json();

    document.getElementById('passwordDisplay').innerText = data.password;
}

document.getElementById('generateBtn').addEventListener('click', updatePassword);
document.getElementById('passwordType').addEventListener('change', updatePassword);
document.getElementById('complexity').addEventListener('input', updatePassword);
document.getElementById('specialChars').addEventListener('change', updatePassword);

document.getElementById('copyBtn').addEventListener('click', () => {
    const password = document.getElementById('passwordDisplay').innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
});
