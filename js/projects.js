
export class Projects
{
    constructor(name, sectionControl, container2)
    {
        this.projectName = name;
        this.sectionControl = sectionControl;
        this.container2 = container2;
        this.sections = [];
    }
};

export class Section
{
  constructor(name, width, grid)
  {
      this.name = name,
      this.width = width,
      this.grid = grid
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
    let area = document.getElementById('coverage');
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('costs');
    area.style.borderLeft = '1px solid black';
    area = document.getElementById('totalCosts');
    area.style.borderLeft = '1px solid black';
  }
}
export function newSection()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Add New Section';
  alert('Create New Section');
  renderProjectsArea();
}
export function delSection()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Delete Section';
  alert('Delete Section');
  renderProjectsArea();
}
export function editSection()
{
  renderProjectsArea('empty');
  title.innerHTML = 'Edit Section';
  alert('Edit Section');
  renderProjectsArea();
}

function createButton(text, className, newId)
{
  const btn = document.createElement('BUTTON');
  btn.innerHTML = text;
  btn.className = className;
  btn.id = newId;
  return btn;
}
