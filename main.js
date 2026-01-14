document.addEventListener("DOMContentLoaded", function() {
 const lines = [
   "金・銀・木・石など、ありふれた素材を職人たちの繊細な手仕事によって「生きるアート」へと昇華させる、10の伝統工芸です。",
   "仏像、宮殿、そして日常の道具にまで息づくその美しさは、ミャンマーの心と文化を映し出しています。",
   "さあ、ミャンマーの手仕事の世界へ、一緒に旅しましょう！"
 ];
 const target = document.getElementById("type-area");
 let lineIndex = 0;
 let charIndex = 0;
 let typingSpeed = 50; // တစ်လုံးစီ ပေါ်မယ့်မြန်နှုန်း (ms)
 let lineDelay = 800;  // စာကြောင်းပြောင်းချိန် (ms)
 function typeLine() {
   if (lineIndex < lines.length) {
     if (charIndex < lines[lineIndex].length) {
       target.textContent += lines[lineIndex].charAt(charIndex);
       charIndex++;
       setTimeout(typeLine, typingSpeed);
     } else {
       // စာကြောင်းပြီးပြီဆိုရင် နောက်ကြောင်းသို့
       target.textContent += "\n";
       lineIndex++;
       charIndex = 0;
       setTimeout(typeLine, lineDelay);
     }
   } 
 }
 typeLine();
});


// EmailJS init
(function () {
  emailjs.init("c_feF_stZTkUYBuDP"); // your public key
})();

const openBox = document.getElementById("openBox");
const commentForm = document.getElementById("commentForm");
const overlay = document.getElementById("overlay");
const closeBox = document.getElementById("closeBox");
const sendBtn = document.getElementById("sendBtn");

// open comment box
openBox.addEventListener("click", () => {
  commentForm.style.display = "block";
  overlay.style.display = "block";
  openBox.style.display = "none";
});

// close comment box
closeBox.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

function closeForm() {
  commentForm.style.display = "none";
  overlay.style.display = "none";
  openBox.style.display = "flex";
}

// send email
sendBtn.addEventListener("click", () => {
  const msg = document.getElementById("message").value;

  if (!msg.trim()) {
    alert("Please write a message");
    return;
  }

  emailjs.send("service_j556i6k", "template_s526grf", {
    message: msg
  })
  .then(() => {
    alert("Message sent successfully!");
    document.getElementById("message").value = "";
    closeForm();
  })
  .catch(err => {
    alert("Failed to send message");
    console.error(err);
  });
});



