
export function ConcatenarString(measure:string,ingredient:string){
  if(measure && ingredient){
    return measure + " " + ingredient;
  }
  return '';
}

export function FormatedInstructions(instructions:string){
  const instructionsFormated = instructions.replace(/\r\n/g, "")

  const arrInstructions = instructionsFormated.trim().split(/\s*\.\s*/)

  const arrFiltred = arrInstructions.filter((text)=> text.length > 1)
  
  return arrFiltred
}