

const generateButton =  document.getElementById('generate-palette-btn')
// const copyButton  =  document.getElementById('copy-btn')
const colorPalette = document.getElementById('color-palette')


// window.onload = (()=>displayColors())
// colorPalette.addEventListener('click' , copyColor)
// generateButton.addEventListener('click', displayColors)


//     function generateFiveColors() {
//         const colors = new Set();
//         while (colors.size < 5) {
//           const randomColor =
//             "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
//           colors.add(randomColor);
//         }
//         return Array.from(colors);
//       }
      

//       function displayColors (){
//         colorPalette.innerHTML = ''
//           createColorsCards()
//       }


//       function createColorsCards(){
//             const colors  =  generateFiveColors()
//             colors.forEach(color=>{
//             //create-card
//             const card =  document.createElement('div')
//             card.classList.add('color-card')
//             //create-color
//             const colorElement =  document.createElement('div')
//             colorElement.classList.add('color')
//             colorElement.dataset.color =  color
//             colorElement.style.backgroundColor =  color
//             //create color-info and it's children
//             const colorInfo =  document.createElement('div')
//             const colorText =  document.createElement('span')
//             const copyBtn =  document.createElement('span')
//             colorInfo.classList.add('color-info')
//             colorText.textContent  =color.toUpperCase()
//             copyBtn.dataset.color= color
//             copyBtn.textContent= 'C'
//             copyBtn.classList.add('copy-btn')
//             colorPalette.appendChild(card)
//             card.appendChild(colorElement)
//             card.appendChild(colorInfo)
//             colorInfo.appendChild(colorText)
//             colorInfo.appendChild(copyBtn)
//      }) }



     

//   async function copyColor(e){
//       if(!e.target.classList.contains('color')&& !e.target.classList.contains('copy-btn')) return ;
       
//     try {
//         await navigator.clipboard.writeText(e.target.dataset.color);
//         changeCopyBtnIcon(e)
//         // alert(`Copied ${e.target.dataset.color} to clipboard!`);
//       } catch (err) {
//         console.error("Failed to copy:", err);
//       }

//     }



//     function changeCopyBtnIcon(e){
//        const copyBtn =  colorPalette.querySelectorAll(`[data-color="${e.target.dataset.color}"]`)[1]
//        copyBtn.textContent='✔'
//        console.log(copyBtn);
//        setTimeout(()=>{copyBtn.textContent='C'},2000)
//     }







/* ================================
   Initialize App
================================ */

window.addEventListener('DOMContentLoaded', displayColors);

generateButton.addEventListener('click', displayColors);
colorPalette.addEventListener('click', copyColor);


/* ================================
   Generate 5 Unique Colors
================================ */

function generateFiveColors() {
  const colors = new Set();

  while (colors.size < 5) {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    colors.add(randomColor);
  }

  return Array.from(colors);
}


/* ================================
   Display Colors
================================ */

function displayColors() {
  const fragment = document.createDocumentFragment();
  const colors = generateFiveColors();

  colors.forEach(color => {
    const card = document.createElement('div');
    card.classList.add('color-card');

    const colorElement = document.createElement('div');
    colorElement.classList.add('color');
    colorElement.dataset.color = color;
    colorElement.style.backgroundColor = color;

    const colorInfo = document.createElement('div');
    colorInfo.classList.add('color-info');

    const colorText = document.createElement('span');
    colorText.textContent = color.toUpperCase();

    const copyBtn = document.createElement('i');
    copyBtn.classList.add('copy-btn', 'far', 'fa-copy');
    copyBtn.title='copy to clipboard'
    copyBtn.dataset.color = color;
    // copyBtn.innerHTML = '<i class=""></i>';

    colorInfo.append(colorText, copyBtn);
    card.append(colorElement, colorInfo);
    fragment.appendChild(card);
  });

  colorPalette.innerHTML = '';
  colorPalette.appendChild(fragment);
}


/* ================================
   Copy Color (Event Delegation)
================================ */

async function copyColor(e) {
  const target = e.target.closest('.color, .copy-btn');
  if (!target) return;

  try {
    await navigator.clipboard.writeText(target.dataset.color);
    changeCopyBtnIcon(target);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}


/* ================================
   Change Copy Button Icon
================================ */

function changeCopyBtnIcon(target) {
  const card = target.closest('.color-card');   
  const copyBtn = card.querySelector('.copy-btn');
 

  copyBtn.classList.remove('far' , 'fa-copy')
  copyBtn.classList.add('fas' , 'fa-check')

  setTimeout(() => {
    copyBtn.textContent=''
    copyBtn.classList.add('far' , 'fa-copy') ;
    copyBtn.classList.remove('fas' , 'fa-check')
  }, 2000);
}
