// import renderProjectsArea from './projects.js';

export function buildGrid(rows, cols)
{
  const container2ID = document.getElementById('container2');
  let divID="g", divClass="grid";

  for(let row=1; row<=rows; row++)
  {
    for(let col=1; col<=cols; col++)
    {
        divID += row + "-" + col;
        divClass += row;
        container2ID.appendChild(renderGridDiv(divID, divClass));
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
  container2ID.classList.toggle('gridHide');
}


function colorGridDiv(e)
{

  this.innerHTML = `<p class="gridCoord">${this.id}</p>`;
  if(e.currentTarget.currColor==="lawn")
  {
    this.style.background='';
    e.currentTarget.currColor='';
    this.innerHTML = this.innerHTML = `<p>${this.id}</p>`;;
  }else
  {
    this.style.background = 'url(lawn-1.jpg)';
    e.currentTarget.currColor = 'lawn';
  }
}

function renderGridDiv(divID, divClass)
{
    const gridDiv = document.createElement("div");

    gridDiv.id=divID;
    gridDiv.classList.add('grid', divClass);
    const testString = divID.substring(0,3);
    if(divID.substring(0,3)==="g10")
    {
      gridDiv.classList.add('gridBottom');
    }
    if(divID.slice(-2)==="10")
    {
      gridDiv.classList.add('gridRight');
    }
    if(divID.substring(0,5)==="g1-1")
    {
      gridDiv.classList.add('gridTopLeft');
    }
    if(divID.substring(0,5)==="g1-10")
    {
      gridDiv.classList.add('gridTopRight');
    }
    if(divID.substring(0,6)==="g10-1")
    {
      gridDiv.classList.add('gridBottomLeft');
    }
    if(divID.substring(0,6)==="g10-10")
    {
      gridDiv.classList.add('gridBottomRight');
    }

    gridDiv.innerHTML = `<p>${divID}</p>`;
    return gridDiv;
}
