// ===============================
// MAIN PORTFOLIO SCRIPT
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // Education Section
  // ========================
  const canadaMain = document.getElementById('canada-main');
  const secondaryMain = document.getElementById('secondary-main');
  const expandedContainer = document.getElementById('expanded-container');
  const backButtonContainer = document.getElementById('back-button-container');
  const backButton = document.getElementById('back-button');
  const overlay = document.getElementById('image-overlay');
  const overlayImg = document.getElementById('overlay-img');
  const overlayClose = document.getElementById('overlay-close');

  const educationData = {
    canada: [
      { type: 'image', src: 'Images/DIPLOMA.jpg', caption: 'Diploma Certificate' },
      { type: 'image', src: 'Images/Ceremony.png', caption: 'Graduation Ceremony' },
      { type: 'text', title: 'Diploma in Computer Science', content: `
        <ul>
          <li><strong>Sheridan College, Canada</strong> (2023–2024)</li>
          <li>GPA: 3.2 / 4.0 | Ontario, Canada</li>
          <li>Focus: Python, Data Processing, AI Foundations, Web Development</li>
        </ul>` }
    ],
    secondary: [
      { type: 'image', src: 'Images/10th_pass.png', caption: 'Matriculation Certificate' },
      { type: 'image', src: 'Images/12th_Pass.jpeg', caption: 'Class 12th Marksheet' },
      { type: 'text', title: 'Academic Foundation (India)', content: `
        <ul>
          <li><strong>Matriculation (10th Grade)</strong></li>
          <li>St. Paul's Convent School, Dasuya, Punjab</li>
          <li>ICSE | 2020 | 90%</li>
          <li><strong>Class 12th (Senior Secondary)</strong></li>
          <li>DAV Public School, Dasuya, Punjab</li>
          <li>CBSE | 2022 | 80%</li>
        </ul>` }
    ]
  };

  function generateCards(data) {
    expandedContainer.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('education-card');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', item.type === 'image' ? item.caption : item.title);

      if (item.type === 'image') {
        card.classList.add('image-card');
        card.style.backgroundImage = `url('${item.src}')`;
      } else {
        card.classList.add('text-card');
        card.innerHTML = `<div class="details-panel"><h3>${item.title}</h3>${item.content}</div>`;
      }
      expandedContainer.appendChild(card);
    });

    document.querySelectorAll('.education-card.image-card').forEach(card => {
      card.addEventListener('click', () => {
        overlayImg.src = card.style.backgroundImage.slice(5, -2);
        overlay.classList.add('active');
      });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') card.click(); });
    });
  }

  canadaMain?.addEventListener('click', () => {
    generateCards(educationData.canada);
    expandedContainer.style.display = 'flex';
    backButtonContainer.style.display = 'block';
    document.querySelector('.main-cards-container').style.display = 'none';
  });

  secondaryMain?.addEventListener('click', () => {
    generateCards(educationData.secondary);
    expandedContainer.style.display = 'flex';
    backButtonContainer.style.display = 'block';
    document.querySelector('.main-cards-container').style.display = 'none';
  });

  backButton?.addEventListener('click', () => {
    expandedContainer.style.display = 'none';
    backButtonContainer.style.display = 'none';
    document.querySelector('.main-cards-container').style.display = 'flex';
  });

  overlayClose?.addEventListener('click', () => {
    overlay.classList.remove('active');
    overlayImg.src = '';
  });

  // ========================
  // Timeline Section
  // ========================
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const timelineDetails = document.getElementById('timeline-details');
  const timelineTitle = document.getElementById('timeline-title');
  const timelineDescription = document.getElementById('timeline-description');

  timelinePoints.forEach(point => {
    point.setAttribute('tabindex', '0');
    point.addEventListener('click', () => {
      const year = point.getAttribute('data-year');
      const title = point.getAttribute('data-title');
      const description = point.getAttribute('data-description');

      timelineTitle.textContent = `${title} (${year})`;
      const ul = document.createElement('ul');
      description.split('||').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        ul.appendChild(li);
      });

      timelineDescription.innerHTML = '';
      timelineDescription.appendChild(ul);
      timelineDetails.style.display = 'block';

      timelinePoints.forEach(p => p.classList.remove('active'));
      point.classList.add('active');
    });

    point.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') point.click(); });
  });

  // ========================
  // Contact Form
  // ========================
  const myEmail = 'freecoding100@gmail.com';
  const myWhatsApp = '917009349232';

  function sendEmail() {
    const userName = document.getElementById('emailName')?.value.trim();
    const userMessage = document.getElementById('emailMessage')?.value.trim();
    if (!userName || !userMessage) return alert('Please enter both your name and message.');
    const subject = encodeURIComponent('Message from Portfolio Contact Form');
    const body = encodeURIComponent(`Name: ${userName}\n\nMessage:\n${userMessage}`);
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  }

  function sendWhatsApp() {
    const userName = document.getElementById('whatsappName')?.value.trim();
    const userMessage = document.getElementById('whatsappMessage')?.value.trim();
    if (!userName || !userMessage) return alert('Please enter both your name and message.');
    const message = encodeURIComponent(`Name: ${userName}\n\nMessage:\n${userMessage}`);
    window.open(`https://wa.me/${myWhatsApp}?text=${message}`, '_blank');
  }

  document.querySelector('.glass-button')?.addEventListener('click', sendEmail);
  document.querySelector('.whatsapp-btn')?.addEventListener('click', sendWhatsApp);

  // ========================
  // Sidebar Toggle
  // ========================
  document.querySelector('.sidebar-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('show-nav');
  });

  // ========================
  // Scroll Progress Bar
  // ========================
  const progress = document.querySelector('.progress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = `${(scrollTop / scrollHeight) * 100}%`;
  });

  // ========================
  // Swiper Carousel
  // ========================
  new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: { rotate: 40, stretch: 30, depth: 200, modifier: 1.2, slideShadows: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: { delay: 2000, disableOnInteraction: true }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".sidebar-toggle"); // matches HTML
  const sidebar = document.querySelector(".sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
});

