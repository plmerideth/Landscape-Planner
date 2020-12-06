import {buildGrid, hideGrid, topsoilSelect, lawnSelect, weedBlockSelect, rockSelect, custom1Select, custom2Select, clearCheckBoxes} from './grid.js';
import {Project, Section, renderProjectsArea, openProject, newProject, saveProject, delProject} from './projects.js';
import {renderMaterialsArea, renderMaterialCosts} from './materials.js';
import {readLocalStorage, writeLocalStorage} from './utilities.js';
//Declare and export global myProject which holds current data for current project
export const myProject = new Project(null, 0, 0, 0, 0, 'container2');

//Read in any existing projects
export let myProjects = [];
export let myMaterialCosts =
  {
    topsoilCost: '',
    lawnCost: '',
    weedBlockCost: '',
    rockCost: '',
    custom1Cost: '',
    custom2Cost: ''
  };
export let selectedMaterials =
{
  topsoilColor: '',
  lawnColor: '',
  weedBlockColor: '',
  rockColor: '',
  custom1Color: '',
  custom2Color: ''
};

myProjects = JSON.parse(readLocalStorage('projects'));
if(myProjects === null)
{
  myProjects = [];
}
else
{
  // myTestCosts = myProjects.materialCosts;
}

//Set event listeners for material checkboxes
const topsoilCBID = document.getElementById('topsoilCB');
topsoilCBID.addEventListener('click', topsoilSelect);
const lawnCBID = document.getElementById('lawnCB');
lawnCBID.addEventListener('click', lawnSelect);
const weedBlockCBID = document.getElementById('weedBlockCB');
weedBlockCBID.addEventListener('click', weedBlockSelect);
const rockCBID = document.getElementById('rockCB');
rockCBID.addEventListener('click', rockSelect);
const custom1CBID = document.getElementById('custom1CB');
custom1CBID.addEventListener('click', custom1Select);
const custom2CBID = document.getElementById('custom2CB');
custom2CBID.addEventListener('click', custom2Select);

//Set event listener for hidegrid checkbox
const checkboxID = document.getElementById('checkboxID');
checkboxID.addEventListener('click', hideGrid);
//Add section and project button event listeners
let btn = document.getElementById('openProjectBtn');
btn.addEventListener('click', openProject);
btn = document.getElementById('newProjectBtn');
btn.addEventListener('click', newProject);
btn = document.getElementById('saveProjectBtn');
btn.addEventListener('click', saveProject);
btn = document.getElementById('delProjectBtn');
btn.addEventListener('click', delProject);

// const gridID = document.getElementById('container2');
// let myCols = 5;
// let myRows = 5;
// gridID.style.gridTemplateColumns = `repeat(${myCols}, 1fr)`;
// gridID.style.gridTemplateRows = `auto repeat(${myRows}, 1fr)`;
//
// buildGrid(myRows, myCols);

// myVar = 10;
// gridID.style.gridTemplateColumns = `repeat(${myVar}, 1fr)`;
// gridID.innerHTML = '';
// buildGrid(10, myVar);
/* Test */



/* testing creating and saving projects into myProjects */
// let name = 'name';
// let width = '12';
// let grid = '11, 12, 13';
//
// for(let i=0; i<4; i++)
// {
//     myProjects.sections[myProjects.sections.length] = new Section(name, width, grid);
//     name += i;
//     width+=i;
//     grid+=i;
// }
//
// myProjects.sections.forEach(function(value, index, array)
// {
//   console.log('This name = ' + value.name);
//   console.log('This width = ' + value.width);
//   console.log('This grid = ' + value.grid);
// });

/* End testing myProjects */
buildGrid(0, 0);
renderMaterialsArea();
renderProjectsArea();
clearCheckBoxes();
renderMaterialCosts('values');
