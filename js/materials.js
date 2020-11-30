

const container3Div = document.getElementById('container3');
const scrollContentLeft = document.getElementById('scrollContentLeft');
const unitCost = document.getElementById('unitCost');
const quantity = document.getElementById('quantity');
const delivery = document.getElementById('delivery');
const materialButtons = document.getElementById('materialButtons');
const title = document.getElementById('materialsTitle');

export default function renderMaterialsArea(empty = null)
{
  if(empty==="empty")
  {
    let material = document.getElementById('material');
    material.innerHTML = '';
    unitCost.innerHTML = '';
    unitCost.style.borderLeft = 'none';
    quantity.innerHTML = '';
    quantity.style.borderLeft = 'none';
    delivery.innerHTML = '';
    delivery.style.borderLeft = 'none';
    materialButtons.innerHTML = '';
  }
  else
  {
    let btn=null;

    title.innerHTML = 'Materials';
    scrollContentLeft.style.borderBottom = '2px solid black';
    container3Div.style.borderLeft = '2px solid black';
    let area = document.getElementById('unitCost');
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('quantity');
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('delivery');
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('materialButtons');
    area.style.borderRight = '1px solid black';

    //Add Materials buttons
    const materialButtonsDiv = document.getElementById('materialButtons');
    btn = createButton('Add Material', 'addMaterialBtn', 'addMaterialBtn');
    materialButtonsDiv.appendChild(btn);
    btn = createButton('Del Material', 'delMaterialBtn', 'delMaterialBtn');
    materialButtonsDiv.appendChild(btn);
    btn = createButton('Edit Material', 'editMaterialBtn', 'editMaterialBtn');
    materialButtonsDiv.appendChild(btn);
    //Create event listeners for buttons
    btn = document.getElementById('addMaterialBtn');
    btn.addEventListener('click', addMaterial);
    btn = document.getElementById('delMaterialBtn');
    btn.addEventListener('click', delMaterial);
    btn = document.getElementById('editMaterialBtn');
    btn.addEventListener('click', editMaterial);
  }
}

function createButton(text, className, newId)
{
  const btn = document.createElement('BUTTON');
  btn.innerHTML = text;
  btn.className = className;
  btn.id = newId;
  return btn;
}

function addMaterial()
{
  renderMaterialsArea('empty');
  title.innerHTML = 'Add New Material';
  alert('Add New Material');
  renderMaterialsArea();
}
function delMaterial()
{
  renderMaterialsArea('empty');
  title.innerHTML = 'Delete Material';
  alert('Delete Material');
  renderMaterialsArea();
}
function editMaterial()
{
  renderMaterialsArea('empty');
  title.innerHTML = 'Edit Material';
  alert('Edit Material');
  renderMaterialsArea();
}
