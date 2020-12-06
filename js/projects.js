import {buildGrid, hideGrid} from './grid.js';
import {myProject, myProjects} from './main.js';
import {createButton, readLocalStorage, writeLocalStorage} from './utilities.js';

// export class Projects
// {
//     constructor()
//     {
//       this.project = [];
//     }
// }

export class Project
{
    constructor(name, length, width, gridL, gridW, container2)
    {
        this.projectName = name;
        this.length = length;
        this.width = width;
        this.gridL = gridL;
        this.gridW = gridW;
        this.container2 = container2;
        this.sections = [];
        this.materialCosts = {};
    }
};

export class Section
{
  constructor(gridID, material)
  {
      this.gridID = gridID,
      this.material = material
  }
}

const container3Div = document.getElementById('container3');
const scrollContentRight = document.getElementById('scrollContentRight');
const title = document.getElementById('projectCostsTitle');

export function renderProjectsArea(empty=null)
{
  if(empty==="empty")
  {
    let area = document.getElementById('section');
    area.innerHTML = '';
    area = document.getElementById('coverage');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
    area = document.getElementById('costs');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
    area = document.getElementById('totalCosts');
    area.innerHTML = '';
    area.style.borderLeft = 'none';
  }
  else
  {
    title.innerHTML = 'Project Costs';
    scrollContentRight.style.borderBottom = '2px solid black';
    container3Div.style.borderRight = '2px solid black';
    let area = document.getElementById('section');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('coverage');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('costs');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('totalCosts');
    area.innerHTML='';
    area.style.borderLeft = '1px solid black';
  }
}
export function openProject()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Open Project';
  const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');
  let dropDownList = null;
  let selectProject = null;

  if(myProjects.length === 0)
  {
    alert("No saved Projects");
    renderProjectsArea();
    return;
  }
  else
  {
    dropDownList = `<div style="white-space:nowrap" class="openCloseProject">
      <p class="projectSelect">Select a project</p>
        <form><select id='selectDropDown' class="projectList" name="projectList">`;

    for(let i=0; i<myProjects.length; i++)
    {
      selectProject = myProjects[i].projectName;
      dropDownList+= `<option value=${i}>${myProjects[i].projectName}</option>`;
    }
    dropDownList+=`</select><button id='selectProjectBtn' class='openProjectBtn'>Open</button>
    <button id='cancelProjectBtn' class='openProjectBtn'>Cancel</button></form></div>`;
  }

// "<div style=\"white-space:nowrap\" class=\"openCloseProject\">\n      <p class=\"projectSelect\">Select a project</p>\n        <select class=\"projectList\" name=\"projectList\"><option value=0>Night Project</option></select><button id='openProjectBtn' class='openProjectBtn'>Open</button></div>"

  openCloseProjectLeftID.innerHTML = dropDownList;
  //create event listener for 'Open' and 'Cancel' button
  let openBtnID = document.getElementById('selectProjectBtn');
  const sb = document.getElementById('selectDropDown');
  openBtnID.addEventListener('click', openProjectConfirm);
  openBtnID = document.getElementById('cancelProjectBtn');
  openBtnID.addEventListener('click', cancelProjectConfirm);
}

function cancelProjectConfirm(e)
{
  e.preventDefault();
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
}

function openProjectConfirm(e)
{
  e.preventDefault();
  const sb = document.getElementById('selectDropDown');
  alert('Selected: ' + sb.selectedIndex);
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
}

export function newProject()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Create New Project';

  const openCloseProjectLeftID = document.getElementById('openCloseProjectLeft');
  const openCloseProjectRightID = document.getElementById('openCloseProjectRight');


    openCloseProjectLeftID.innerHTML =
     `<div style="white-space:nowrap" class="newProject"><form>
      <label for='projectName' class="newProjectText">Project Name: </label><input type='text' class="projectNameInput" id='myProjectName' tabindex=1><br><br>
      <label for='lotLength' class="newProjectText">Tot Length(H) (ft): </label><input type='text' id='lotLength' class="lotDim"tabindex=2><br><br>
      <label for='lotWidth' class="newProjectText">Tot Width(V) (ft): </label><input type='text' id='lotWidth' class="lotDim"tabindex=3><br><br>
      <button id='submitProjectBtn' class='submitProjectBtn'>Create</button>
      <button id='cancelProjectBtn' class='submitProjectBtn'>Cancel</button>
      </form></div>`

    openCloseProjectRightID.innerHTML =
      `<div style="white-space:nowrap" class="newProject"><label for="gridUnitLen" class="newProjectText">Each Grid Square(H) (ft): </label><input type='text' id='gridL' class='lotDim' tabindex=4><br><br>
      <label for="gridUnitWidth" class="newProjectText">Each Grid Square(V) (ft): &nbsp</label><input type='text' id='gridW' class='lotDim' tabindex=5>
      </div></form>`;

      let btn = document.getElementById('submitProjectBtn')
      btn.addEventListener('click', submitProject);
      btn = document.getElementById('cancelProjectBtn')
      btn.addEventListener('click', cancelProject);

      //Give input name focus
      document.getElementById('myProjectName').focus();
}

function cancelProject()
{
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
}

function submitProject()
{
  let validData = true;
  let errorMessage = '';
  const myProjectName = document.getElementById('myProjectName').value;
  const length = document.getElementById('lotLength').value;
  const width = document.getElementById('lotWidth').value;
  const gridL = document.getElementById('gridL').value;
  const gridW = document.getElementById('gridW').value;

  if(myProjectName==='' || myProjectName===null)
  {
    validData = false;
    errorMessage = 'Invalid or missing project name.';
  }
  else if(parseInt(length)<=0 || parseInt(length)>500 || parseInt(width)<=0 || parseInt(width)>500)
  {
    validData = false;
    errorMessage = 'The lot length or width dimensions are out of range.  Must be between 1-500 feet.';
  }
  else if(parseInt(gridL)<=0 || parseInt(gridL)>=parseInt(length) || parseInt(gridW)<=0 || parseInt(gridW)>=parseInt(width))
  {
    validData = false;
    errorMessage = 'One or both box dimensions are invalid.  Must be between 1 and length or width';
  }

  if(!validData)
  {
    alert(errorMessage)
    return;
  }

  const gridID = document.getElementById('container2');

  let myCols=0, myRows=0;
  if(length%gridL===0)
  {
    myCols = parseInt(length/gridL);
  }
  else
  {
    myCols = parseInt(length/gridL)+1;
  }
  if(width%gridW===0)
  {
    myRows = parseInt(width/gridW);
  }
  else
  {
    myRows = parseInt(width/gridW)+1;
  }

  //Setup grid-template-columns and rows
  gridID.style.gridTemplateColumns = `repeat(${myCols}, 1fr)`;
  gridID.style.gridTemplateRows = `auto repeat(${myRows}, 1fr)`;

  //Write values to myProject
  myProject.projectName = myProjectName;
  myProject.length = length;
  myProject.width = width;
  myProject.gridL = gridL;
  myProject.gridW = gridW;
  //Create temporary sections in grid for testing.
  for(let i=0; i<10; i++)
  {
    let ID = '2' + i;
    myProject.sections[myProject.sections.length] = new Section(ID, "L");
  }

  // myProject.projectName = "Test Project 2";
  // myProject.sections = [];
  // for(let i=0; i<10; i++)
  // {
  //   let ID = '3' + i;
  //   myProject.sections[myProject.sections.length] = new Section(ID, "L");
  // }

  // const myProjects2 = new Projects(null, 0, 0, 0, 'container2');

// const myProjects = new Projects(null, 0, 0, 0, 0, 'container2');
//     myProjects.sections[myProjects.sections.length] = new Section(name, width, grid);


  buildGrid(myRows, myCols);
  // const myProjects = new Projects(myProjectName, length, width, gridL, gridW, 'container2');
  renderOpenCloseProjectArea('empty');
  renderProjectsArea();
}

function renderOpenCloseProjectArea(empty=null)
{
  if(empty==='empty')
  {
    document.getElementById('openCloseProjectLeft').innerHTML='';
    document.getElementById('openCloseProjectRight').innerHTML='';
  }
}

export function saveProject()
{
  if(myProject.projectName===null)
  {
    alert('No active project to save');
    return;
  }

  renderProjectsArea('empty');
  title.innerHTML = 'Save Project';

  //Save current project to projects
  myProjects[myProjects.length] = myProject;
  //Write out saved project to localStorage
  writeLocalStorage("projects", myProjects);

  alert(`${myProject.projectName} has been saved`);
  renderProjectsArea();
}

export function delProject()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Delete Project';
  alert('Delete Project');
  renderProjectsArea();
}
