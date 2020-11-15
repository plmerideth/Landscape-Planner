
const checkboxID = document.getElementById('checkboxID');
checkboxID.addEventListener('click', hideGrid);

function hideGrid()
{
  const gridID = document.getElementById('container2');
  gridID.classList.toggle('gridHide');
}

buildGrid(10,10);

function buildGrid(rows, cols)
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
        gridDiv.addEventListener('click', selectGridDiv);
        gridDiv.currColor="";
        divID="g";
        divClass="grid";
    }
  }
}

function selectGridDiv(e)
{

  this.innerHTML = `<p class="gridCoord">${this.id}</p>`;
  if(e.currentTarget.currColor==="green")
  {
    this.style.background='';
    e.currentTarget.currColor='';
    this.innerHTML = this.innerHTML = `<p class="centerText">${this.id}</p>`;;
  }else
  {
    this.style.background = 'green';
    e.currentTarget.currColor = 'green';
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

    gridDiv.innerHTML = `<p class="centerText">${divID}</p>`;
    return gridDiv;
}
