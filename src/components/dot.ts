const boxComponent = () => {
  const qm_box = document.createElement('div');
  qm_box.classList.add('qm_box');
  qm_box.innerHTML = `<div class="left_text"> <span>Translate</span> </div> <div class="bubble"> <span class="bubble-outer-dot"> <span class="bubble-inner-dot"></span> </span> </div>`;
  return qm_box;
}

export {boxComponent};

