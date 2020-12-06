import {createButton, removeMoney} from './utilities.js';
import {myProjects, myProject, myMaterialCosts} from './main.js';

const container3Div = document.getElementById('container3');
const scrollContentLeft = document.getElementById('scrollContentLeft');
const unitCost = document.getElementById('unitCost');
const quantity = document.getElementById('quantity');
const delivery = document.getElementById('delivery');
const materialButtons = document.getElementById('materialButtons');
const title = document.getElementById('materialsTitle');

function updateCosts()
{
  // renderMaterialsArea('empty');
  title.innerHTML = 'Update Costs';
  //Hide update costs button
  document.getElementById('updateCostsBtn').classList.add('gridHide');
  //Show Comfirm and cancel update buttons
  document.getElementById('confirmUpdateBtn').classList.remove('gridHide');
  document.getElementById('cancelUpdateBtn').classList.remove('gridHide');

  renderMaterialCosts('input');
  // renderMaterialsArea();
}


function confirmUpdate()
{
  let validData = true;
  if(removeMoney(document.getElementById('topsoilCost').value)<0)
  {validData=false;}
  else
  {
    myMaterialCosts.topsoilCost = removeMoney(document.getElementById('topsoilCost').value);
  }
  if(removeMoney(document.getElementById('lawnCost').value)<0)
  {validData=false;}
  else
  {
    myMaterialCosts.lawnCost = removeMoney(document.getElementById('lawnCost').value);
  }
  if(removeMoney(document.getElementById('weedBlockCost').value)<0)
  {validData=false;}
  else
  {
    myMaterialCosts.weedBlockCost = removeMoney(document.getElementById('weedBlockCost').value);
  }
  if(removeMoney(document.getElementById('rockCost').value)<0)
  {validData=false;}
  else
  {
    myMaterialCosts.rockCost = removeMoney(document.getElementById('rockCost').value);
  }
  if(removeMoney(document.getElementById('custom1Cost').value)<0)
  {validData=false;}
  else
  {
    myMaterialCosts.custom1Cost = removeMoney(document.getElementById('custom1Cost').value);
  }

  if(removeMoney(document.getElementById('custom2Cost').value)<0)
  {validData=false;}
  myMaterialCosts.custom2Cost = removeMoney(document.getElementById('custom2Cost').value);

  if(validData)
  {
    //Update myProject with new values
    myProject.materialCosts.topsoilCost = removeMoney(document.getElementById('topsoilCost').value);
    myProject.materialCosts.lawnCost = removeMoney(document.getElementById('lawnCost').value);
    myProject.materialCosts.weedBlockCost = removeMoney(document.getElementById('weedBlockCost').value);
    myProject.materialCosts.rockCost = removeMoney(document.getElementById('rockCost').value);
    myProject.materialCosts.custom1Cost = removeMoney(document.getElementById('custom1Cost').value);
    myProject.materialCosts.custom2Cost = removeMoney(document.getElementById('custom2Cost').value);
    renderMaterialCosts('values');
    title.innerHTML = 'Materials';
    return;
  }

  alert('All costs must be positive numbers.  Please try again.');
  document.getElementById('topsoilCost').focus();
}

export function renderMaterialCosts(category)
{
  const unitCostID = document.getElementById('unitCost');
  //Clear contents
  unitCostID.innerHTML = '';
  let unitCostString = '';

  if(category === 'values')
  {
    //Show update costs button
    document.getElementById('updateCostsBtn').classList.remove('gridHide');
    //Hide update and cancel update buttons
    document.getElementById('confirmUpdateBtn').classList.add('gridHide');
    document.getElementById('cancelUpdateBtn').classList.add('gridHide');

    unitCostString =
      `<p>$${myMaterialCosts.topsoilCost}</p>
      <p>$${myMaterialCosts.lawnCost}</p>
      <p>$${myMaterialCosts.weedBlockCost}</p>
      <p>$${myMaterialCosts.rockCost}</p>
      <p>$${myMaterialCosts.custom1Cost}</p>
      <p>$${myMaterialCosts.custom2Cost}</p>`;
      unitCostID.innerHTML = unitCostString;
  }
  else if(category === 'input')
  {
    //Hide update costs button
    document.getElementById('updateCostsBtn').classList.add('gridHide');
    //Show update and cancel update buttons
    document.getElementById('confirmUpdateBtn').classList.remove('gridHide');
    document.getElementById('cancelUpdateBtn').classList.remove('gridHide');

    unitCostString =
    `<input style="margin-top: 10px" type='number' step=".01" min="0" class="unitCostInput" id='topsoilCost' tabindex=1 value=${myMaterialCosts.topsoilCost}>
    <input type='number' step=".01" min="0" class="unitCostInput" id='lawnCost' tabindex=2 value=${myMaterialCosts.lawnCost}>
    <input type='number' step=".01" min="0" class="unitCostInput" id='weedBlockCost' tabindex=3 value=${myMaterialCosts.weedBlockCost}>
    <input type='number' step=".01" min="0" class="unitCostInput" id='rockCost' tabindex=4 value=${myMaterialCosts.rockCost}>
    <input type='number' step=".01" min="0" class="unitCostInput" id='custom1Cost' tabindex=5 value=${myMaterialCosts.custom1Cost}>
    <input style="margin-bottom: 10px" type='number' step=".01" min="0" class="unitCostInput" id='custom2Cost' tabindex=6 value=${myMaterialCosts.custom2Cost}>`;
    unitCostID.innerHTML = unitCostString;
    document.getElementById('topsoilCost').focus();
  }


}

function cancelUpdate()
{
  renderMaterialCosts('values');
  title.innerHTML = 'Materials';
}

export function renderMaterialsArea(empty = null)
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
    btn = createButton('Update Costs', 'updateCostsBtn', 'updateCostsBtn');
    materialButtonsDiv.appendChild(btn);
    btn = createButton('Update', 'confirmUpdateBtn', 'confirmUpdateBtn');
    materialButtonsDiv.appendChild(btn);
    btn = createButton('Cancel', 'cancelUpdateBtn', 'cancelUpdateBtn');
    materialButtonsDiv.appendChild(btn);
    //Create event listeners for buttons
    btn = document.getElementById('updateCostsBtn');
    btn.addEventListener('click', updateCosts);
    btn = document.getElementById('confirmUpdateBtn');
    btn.addEventListener('click', confirmUpdate);
    btn = document.getElementById('cancelUpdateBtn');
    btn.addEventListener('click', cancelUpdate);
  }
}
