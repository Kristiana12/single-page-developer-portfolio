gsap.registerPlugin(ScrollTrigger);

// Detect if there is javascript on the page
document.documentElement.className = document.documentElement.className.replace(
  'no-js',
  'js'
);

//Form Validation
const form = document.getElementById('contact-form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea');

const displayError = (input) => {
  const targetMessage = input.nextElementSibling;
  const targetIcon = targetMessage.nextElementSibling;
  gsap.to([targetMessage, targetIcon], {
    opacity: 1,
    display: 'block',
    duration: 0.3,
  });
};

const isEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const validateForm = () => {
  let formValid = true;
  if (nameInput.value === '' || nameInput.value.length < 2) {
    displayError(nameInput);
    formValid = false;
  }
  if (emailInput.value === '' || !isEmail(emailInput.value)) {
    displayError(emailInput);
    formValid = false;
  }
  if (messageInput.value === '' || messageInput.value.length < 5) {
    displayError(messageInput);
    formValid = false;
  }
  if (formValid) {
    const afterSubmitAnimation = gsap.timeline();
    afterSubmitAnimation
      .to(form, { opacity: 0, display: 'none' })
      .fromTo(
        '.message-successfull',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, display: 'block', duration: 0.6 }
      )
      .from('#success', {
        opacity: 0,
        y: 50,
        rotateY: 360,
        duration: 0.7,
      });
  }
};

// Assign Line Breaks Depending on the screen width
function lineBreak() {
  const title = document.querySelector('h1');
  if (window.innerWidth > 714 && window.innerWidth < 950) {
    title.innerHTML = ` Nice to <br> meet you! I'm  
    <div class="underlined">
      Adam<span class="line"></span>
      Keyes.<span class="line"></span>
    </div> `;
  } else {
    title.innerHTML = ` Nice to meet you! <br> I'm  
    <div class="underlined">
    Adam<span class="line"></span> Keyes.<span class="line"></span>
    </div>`;
  }
}

window.addEventListener('load', () => {
  lineBreak();
});

window.addEventListener('resize', lineBreak);

const init = () => {
  // Show content after page was loaded
  gsap.set('.nav-primary, .header__content, .header__img, .skills', {
    autoAlpha: 1,
  });

  // GSAP Header Animation
  const tl = gsap.timeline({ defaults: { opacity: 0, ease: 'back' } });

  tl.from('.header__content h1', { x: 120, duration: 1 })
    .from(
      '.header__content p',
      {
        x: -120,
        duration: 1,
      },
      '<'
    )
    .from('.header__content .btn-primary', { y: 50 }, '-=0.2')
    .from('.nav-primary li', { scale: 0, stagger: 0.1 }, '-=0.2')
    .to(
      '.line',
      { opacity: 1, width: '100%', ease: 'power3.out', duration: 1 },
      '-=0.2'
    )
    .from('.header__img', { duration: 1 }, '<');

  // hide Form error Messages
  gsap.set('.error-message, .error-sign', { opacity: 0 });
};

//Animations
const blendIn = (elements) => {
  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        end: 'bottom 25%',
      },
      opacity: 0,
      y: 20,
      ease: 'power1.out',
    });
  });
};

const scaleIn = (titles) => {
  titles.forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 95%',
      },
      scale: 0,
      transformOrigin: '0 50%',
      ease: 'back',
    });
  });
};

const popIn = (elements) => {
  elements.forEach((para) =>
    gsap.from(para, {
      scrollTrigger: { trigger: para, start: 'top 97%' },
      opacity: 0,
      y: 20,
      ease: 'back',
    })
  );
};

const slideIn = (elements, offset) => {
  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
      },
      opacity: 0,
      x: offset,
      ease: 'back(0.5)',
    });
  });
};

const fadeInForm = () => {
  gsap.from(form, {
    scrollTrigger: {
      trigger: form,
      start: 'top 90%',
    },
    opacity: 0,
    duration: 0.2,
  });
};

window.addEventListener('load', () => {
  const horizontalLines = document.querySelectorAll('hr');
  const skillsTitles = document.querySelectorAll('.skills__card--title');
  const skillsParas = document.querySelectorAll('.skills__card--para');
  const animateFromLeftEL = document.querySelectorAll('.slide-in-left');
  const animateFromRightEL = document.querySelectorAll('.slide-in-right');
  const imagesCard = document.querySelectorAll('.projects__card--img');

  gsap.set('hr', { autoAlpha: 1 });

  init();
  blendIn(horizontalLines);
  scaleIn(skillsTitles);
  popIn(skillsParas);
  slideIn(animateFromLeftEL, '-200px');
  slideIn(animateFromRightEL, '200px');
  fadeInForm();

  imagesCard.forEach((img) => {
    img.addEventListener('mouseenter', function () {
      const tl = gsap.timeline({ defaults: { opacity: 1, duration: 0.4 } });
      tl.to(img.querySelector('.overlay'), {}).to(
        img.querySelector('.touch'),
        {},
        '-=0.1',
        {}
      );
    });
  });

  imagesCard.forEach((img) => {
    img.addEventListener('mouseleave', function () {
      const tl = gsap.timeline({ defaults: { opacity: 0, duration: 0.4 } });
      tl.to(img.querySelector('.overlay'), {}).to(
        img.querySelector('.touch'),
        {}
      );
    });
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();

  console.log(validateForm);
});
