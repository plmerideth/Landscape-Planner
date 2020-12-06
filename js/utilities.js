export function readLocalStorage(key)
{
  return localStorage.getItem(key);
}

export function writeLocalStorage(key, value)
{
    localStorage.setItem(key, JSON.stringify(value));
}

export function createButton(text, className, newId)
{
  const btn = document.createElement('BUTTON');
  btn.innerHTML = text;
  btn.className = className;
  btn.id = newId;
  return btn;
}

export function removeMoney(myString)
{
  if(myString.includes('$'))
  {
    let retString='';
    retString = myString.replace('$', '');
    return retString;
  }
  return myString;
}
