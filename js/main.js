import {Projects, Section, renderProjectsArea, newSection, delSection, editSection} from './projects.js';
import renderMaterialsArea from './materials.js';
import {buildGrid, hideGrid} from './grid.js';

const myProjects = new Projects('firstProject', '#sectionControl', '#container2');
const checkboxID = document.getElementById('checkboxID');
checkboxID.addEventListener('click', hideGrid);
//Add section and project button event listeners
let btn = document.getElementById('newSectionBtn');
btn.addEventListener('click', newSection);
btn = document.getElementById('delSectionBtn');
btn.addEventListener('click', delSection);
btn = document.getElementById('editSectionBtn');
btn.addEventListener('click', editSection);

buildGrid(10,10);

/* testing creating and saving projects into myProjects */
let name = 'name';
let width = '12';
let grid = '11, 12, 13';

for(let i=0; i<4; i++)
{
    myProjects.sections[myProjects.sections.length] = new Section(name, width, grid);
    name += i;
    width+=i;
    grid+=i;
}

myProjects.sections.forEach(function(value, index, array)
{
  console.log('This name = ' + value.name);
  console.log('This width = ' + value.width);
  console.log('This grid = ' + value.grid);
});

/* End testing myProjects */

renderMaterialsArea();
renderProjectsArea();
