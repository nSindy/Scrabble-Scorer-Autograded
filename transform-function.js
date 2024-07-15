const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
  };

  function transform(oldPointStructure) {
    let newObject = {};
    for (let item in oldPointStructure) {
        for (let i = 0; i < oldPointStructure[item].length; i++) {
            newObject[oldPointStructure[item][i].toLowerCase()]:Number(item);
        }
    }
    return newObject;
}

let newObject = transform(oldPointStructure);
console.log(newObject);
