// sliders 

// DOM
const container = document.getElementById('sliders-container');

// Fetch JSON and generate sliders
async function loadSliders() {
    try {
        const response = await fetch('sliders.json');
        if (!response.ok) throw new Error('sliders.json မတွေ့ပါ');

        const sections = await response.json();

        sections.forEach((section, index) => {
            // === 1. Title ===
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.textContent = section.title || 'No Title';
            container.appendChild(title);

            // === 2. Image Slider ===
            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-wrapper';

            const carousel = document.createElement('div');
            carousel.className = 'carousel';
            carousel.id = `carousel-${index}`;

            // Images

            section.images.forEach(src => {
                const card = document.createElement('div');
                card.className = 'card';

                const img = document.createElement('img');
                img.src = src;
                img.alt = section.title || 'Image';
                img.loading = 'lazy';
                img.onerror = () => { img.src = 'https://via.placeholder.com/300x400?text=No+Image'; };

                img.addEventListener("click", () => {
                    openModal(src);
                }
                );

                card.appendChild(img);
                carousel.appendChild(card);
            });




            // Arrows
            const prevBtn = document.createElement('button');
            prevBtn.className = 'nav-arrow prev-arrow';
            prevBtn.innerHTML = '←';
            prevBtn.onclick = () => scrollCarousel(carousel, -1);

            const nextBtn = document.createElement('button');
            nextBtn.className = 'nav-arrow next-arrow';
            nextBtn.innerHTML = '→';
            nextBtn.onclick = () => scrollCarousel(carousel, 1);

            // Append slider
            wrapper.appendChild(carousel);
            wrapper.appendChild(prevBtn);
            wrapper.appendChild(nextBtn);
            container.appendChild(wrapper);

            // Scroll listener
            carousel.addEventListener('scroll', () => updateArrows(carousel, prevBtn, nextBtn));

            // === 3. Description (အသစ်ထည့်ထားတယ်) ===
            if (section.description && section.description.trim() !== '') {
                const desc = document.createElement('p');
                desc.className = 'section-description';
                // \n ကို <br> အဖြစ် ပြောင်း
                desc.innerHTML = section.description.replace(/\n/g, '<br>');
                container.appendChild(desc);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
      <div style="text-align:center; padding:40px; color:red; font-family:Arial;">
        <h3>ဒေတာ ဖတ်မရပါဘူး</h3>
        <p><strong>အကြောင်းရင်း:</strong> ${error.message}</p>
        <p><code>data.json</code> ဖိုင်ကို စစ်ပါ။ UTF-8 နဲ့ သိမ်းထားပါ။</p>
      </div>
    `;
    }
}


// Scroll function
function scrollCarousel(carousel, direction) {
    const cardWidth = 304; // 280 + 12*2
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// Update arrow opacity
function updateArrows(carousel, prevBtn, nextBtn) {
    const atStart = carousel.scrollLeft <= 0;
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 20;
    prevBtn.style.opacity = atStart ? '0.3' : '1';
    nextBtn.style.opacity = atEnd ? '0.3' : '1';
}

// Start
loadSliders();

// ===== Modal Zoom Functions =====
function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = src;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});

