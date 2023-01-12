document.documentElement.className = document.documentElement.className.replace(
  'no-js',
  'js'
);

function lineBreak() {
  const title = document.querySelector('h1');
  if (window.innerWidth > 714 && window.innerWidth < 950) {
    title.innerHTML = ` Nice to <br> meet you! I'm <span class="underlined"
          ><span class="line"></span> Adam Keyes.</span
        >`;
  } else {
    title.innerHTML = ` Nice to meet you! <br> I'm <span class="underlined"
          ><span class="line"></span> Adam Keyes.</span
        >`;
  }
}

window.addEventListener('load', () => {
  lineBreak();
});

window.addEventListener('resize', lineBreak);
