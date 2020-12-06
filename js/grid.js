import {myProject, selectedMaterials} from './main.js';

let topsoilColor = 'brown';
let lawnColor = 'green';
let weedBlockColor = 'black';
let rockColor = 'red';
let custom1Color = 'blue';
let custom2Color = 'yellow';


export function clearCheckBoxes()
{
    document.getElementById('topsoilCB').checked = false;
    document.getElementById('lawnCB').checked = false;
    document.getElementById('weedBlockCB').checked = false;
    document.getElementById('rockCB').checked = false;
    document.getElementById('custom1CB').checked = false;
    document.getElementById('custom2CB').checked = false;
    topsoilSelect();
    lawnSelect();
    weedBlockSelect();
    rockSelect();
    custom1Select();
    custom2Select();
}

export function topsoilSelect()
{
  const checkboxID = document.getElementById('topsoilCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.topsoilColor = topsoilColor;
    document.getElementById('topsoilLabel').style.background = topsoilColor;
    document.getElementById('topsoilLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.topsoilColor = '';
    document.getElementById('topsoilLabel').style.background = '';
    document.getElementById('topsoilLabel').style.color = 'black';
  }
}

export function lawnSelect()
{
  const checkboxID = document.getElementById('lawnCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.lawnColor = lawnColor;
    document.getElementById('lawnLabel').style.background = lawnColor;
    document.getElementById('lawnLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.lawnColor = '';
    document.getElementById('lawnLabel').style.background = '';
    document.getElementById('lawnLabel').style.color = 'black';
  }
}

export function weedBlockSelect()
{
  const checkboxID = document.getElementById('weedBlockCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.weedBlockColor = weedBlockColor;
    document.getElementById('weedBlockLabel').style.background = weedBlockColor;
    document.getElementById('weedBlockLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.weedBlockColor = '';
    document.getElementById('weedBlockLabel').style.background = '';
    document.getElementById('weedBlockLabel').style.color = 'black';
  }
}

export function rockSelect()
{
  const checkboxID = document.getElementById('rockCB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.rockColor = rockColor;
    document.getElementById('rockLabel').style.background = rockColor;
    document.getElementById('rockLabel').style.color = 'white';
  }
  else
  {
    selectedMaterials.rockColor = '';
    document.getElementById('rockLabel').style.background = '';
    document.getElementById('rockLabel').style.color = 'black';
  }
}

export function custom1Select()
{
  const checkboxID = document.getElementById('custom1CB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.custom1Color = custom1Color;
    document.getElementById('custom1Label').style.background = custom1Color;
    document.getElementById('custom1Label').style.color = 'white';
  }
  else
  {
    selectedMaterials.custom1Color = '';
    document.getElementById('custom1Label').style.background = '';
    document.getElementById('custom1Label').style.color = 'black';
  }
}

export function custom2Select()
{
  const checkboxID = document.getElementById('custom2CB');
  if(checkboxID.checked===true)
  {
    selectedMaterials.custom2Color = custom2Color;
    document.getElementById('custom2Label').style.background = custom2Color;
    document.getElementById('custom2Label').style.color = 'black';
  }
  else
  {
    selectedMaterials.custom2Color = '';
    document.getElementById('custom2Label').style.background = '';
    document.getElementById('custom2Label').style.color = 'black';
  }
}

export function buildGrid(rows, cols)
{
  const gridHeader = document.getElementById('gridHeader');
  const container2ID = document.getElementById('container2');
  //Clear any existing grid
  container2ID.innerHTML='';

  //add grid title
  gridHeader.innerHTML =
  `<div class="grid2TitleDiv"><h1 class="grid2Title">Landscape Grid</h1></div>
    <h2 class="lotLength">Total Lot Length (Horz): ${myProject.length} ft</h2>
    <h2 class="lotWidth">Total Lot Width (Vert): ${myProject.width} ft</h2>
    <h2 class="gridL">Each Box (Horz): ${myProject.gridL} ft</h2>
    <h2 class="gridW">Each Box (Vert): ${myProject.gridW} ft</h2>
    `;

  // const gridTitleID = document.getElementById('gridTitle');
  // gridTitleID.style.gridColumn = `1/${cols+1}`;

  let divID="g", divClass="grid";

  for(let row=1; row<=rows; row++)
  {
    for(let col=1; col<=cols; col++)
    {
        divID += row + "-" + col;
        divClass += row;
        container2ID.appendChild(renderGridDiv(divID, divClass, row, rows, col, cols));
        //Add unique eventListener for every grid div element
        const gridDiv = document.getElementById(divID);
        gridDiv.addEventListener('click', colorGridDiv);
        gridDiv.currColor="";
        divID="g"; //Reset for next loop
        divClass="grid"; //Reset for next loop
    }
  }
}

export function hideGrid()
{
  const container2ID = document.getElementById('container2');
  const gridHeaderID = document.getElementById('gridHeader');
  const checkboxID = document.getElementById('checkboxID');
  if(checkboxID.checked===true)
  {
      container2ID.classList.add('gridHide');
      gridHeaderID.classList.add('gridHide');
  }
  else
  {
    container2ID.classList.remove('gridHide');
    gridHeaderID.classList.remove('gridHide');
  }
}


function colorGridDiv(e)
{
  const gridBox = this.id.substring(1);

  //Count how many materials are currently selected and put in order in an array
  let materialCount=0;
  let selectedMaterialsArray = [];
  for(let p of Object.values(selectedMaterials))
  {
    if(p!='')
    {
      selectedMaterialsArray[materialCount] = p;
      materialCount++;
    }
  }

  if(e.currentTarget.currColor==="lawn")
  {
    //Delete inserted rule
    let mySheet = document.styleSheets[0];
    mySheet.deleteRule(0);

    let gridDivDiv = null;
    for(let i=1; i<=materialCount; i++)
    {
        gridDivDiv = document.getElementById(this.id.substring(1)+i);
        gridDivDiv.remove();
    }

    this.style.background='';
    e.currentTarget.currColor='';
    // this.innerHTML = this.innerHTML = `<p>${gridBox}</p>`;;
  }else
  {

    this.style.gridTemplateRows = `repeat(${materialCount}, 1fr)`;

    //Build and append divs into selected grid to display material colors
    if(materialCount>0)
    {
      //Create class to add to gridDivDiv to set height % of Div
      let mySheet = document.styleSheets[0];
      const heightVar = parseInt(1/materialCount*100);
      let setHeight = heightVar.toString();
      setHeight += "%";
      mySheet.insertRule(`.divDiv{min-height: ${setHeight}}`, 0);

      let gridDivDiv = null;
      for(let i=1; i<=materialCount; i++)
      {
          gridDivDiv = document.createElement('div');
          this.appendChild(gridDivDiv);
          gridDivDiv.classList.add('divDiv');
          gridDivDiv.id = this.id.substring(1)+i;
          gridDivDiv.gridRow = i;
          gridDivDiv.style.background = selectedMaterialsArray[i-1];
      }
      e.currentTarget.currColor = 'lawn';
    }

    // const gridDivDiv1 = document.createElement("div");
    // this.appendChild(gridDivDiv1);
    // gridDivDiv1.classList.add('divDiv');
    // gridDivDiv1.id = this.id.substring(1)+'1';
    // gridDivDiv1.gridRow = '1';
    // // gridDivDiv1.innerHTML = '1';
    // gridDivDiv1.style.background = 'red';
    //
    // const gridDivDiv2 = document.createElement("div");
    // this.appendChild(gridDivDiv2);
    // gridDivDiv2.classList.add('divDiv');
    // gridDivDiv2.id = this.id.substring(1)+'2';
    // gridDivDiv2.gridRow = '2';
    // // gridDivDiv2.innerHTML = '2';
    // gridDivDiv2.style.background = 'blue';
    //
    // const gridDivDiv3 = document.createElement("div");
    // this.appendChild(gridDivDiv3);
    // gridDivDiv3.classList.add('divDiv');
    // gridDivDiv3.id = this.id.substring(1)+'3';
    // gridDivDiv3.gridRow = '3';
    // // gridDivDiv3.innerHTML = '3';
    // gridDivDiv3.style.background = 'yellow';

    // this.style.gridTemplateRows = `auto repeat(${myRows}, 1fr)`;


    // this.style.background = 'url(lawn-1.jpg)';
    // this.style.backgroundSize = '50% 50%';
    // this.style.backgroundRepeat = 'no-repeat';
    // this.style.background = 'url(rocks-1.jpg)';
    // this.style.backgroundSize = '50% 50%';
    // this.style.backgroundRepeat = 'no-repeat';
  }
}

function renderGridDiv(divID, divClass, row, rows, col, cols)
{
    //Create class and insert into styles.css
    let mySheet = document.styleSheets[0];
    mySheet.insertRule(`.${divClass}{grid-row: ${row+1}`, row );

    const gridDiv = document.createElement("div");

    const bottomRow = 'g' + rows.toString();
    const rightCol = cols.toString();
    const topRightCol = 'g1-' + cols.toString();
    const bottomLeft = 'g' + rows.toString() + '-1';
    const bottomRight = 'g' + rows.toString() + '-' + cols.toString();

    gridDiv.id=divID;
    gridDiv.classList.add('grid', divClass);
    const testString = divID.substring(0,3);
    const dashIndex = divID.indexOf('-');

    if(divID.substring(0,dashIndex)===bottomRow)
    {
      gridDiv.classList.add('gridBottom');
    }
    if(divID.substring(dashIndex+1)===rightCol)
    {
      gridDiv.classList.add('gridRight');
    }
    if(divID.substring(0,5)==="g1-1")
    {
      gridDiv.classList.add('gridTopLeft');
    }
    if(divID.substring(0)===topRightCol)
    {
      gridDiv.classList.add('gridTopRight');
    }
    if(divID.substring(0)===bottomLeft)
    {
      gridDiv.classList.add('gridBottomLeft');
    }
    if(divID.substring(0)===bottomRight)
    {
      gridDiv.classList.add('gridBottomRight');
    }
    if(row%5 === 0)
    {
      gridDiv.classList.add('horizontalTickMark');
    }
    if(col%5 === 0)
    {
      gridDiv.classList.add('verticalTickMark');
    }

    const gridBox = divID.substring(1);
    gridDiv.innerHTML = '';
    // gridDiv.innerHTML = `<p>${gridBox}</p>`;
    return gridDiv;
}
