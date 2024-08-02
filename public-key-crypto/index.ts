import * as nacl from "tweetnacl";
import { decodeUTF8, encodeUTF8 } from "tweetnacl-util";

const keypair = nacl.sign.keyPair();

const form = document.getElementById("encrypt-form") as HTMLFormElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const messageInput = document.getElementById("message") as HTMLInputElement;
    const message = messageInput?.value || "";

    const messageBytes = decodeUTF8(message);

    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

    const isValid = nacl.sign.detached.verify(messageBytes, signature, keypair.publicKey);

    resultDiv.innerHTML = `
        <p>Message: ${message}</p>
        <p>Signature: ${Array.from(signature).map(b => b.toString(16).padStart(2, '0')).join('')}</p>
        <p>Verification: ${isValid ? "Valid" : "Invalid"}</p>
    `;
});
