import { useRecipe } from "@/context/RecipeProviderContext"
import { ConcatenarString, FormatedInstructions } from "@/utils/FormatedStrings"
import Actions from "../Actions"
import { useMediaQuery } from 'react-responsive'

const CurrentRecipe = () => {

  const smallScreen = useMediaQuery({ query: '(max-width:1024px)'})

  const {
    dataRecipe
  } = useRecipe()

  const ArrInstructions = FormatedInstructions(dataRecipe?.strInstructions || '')

  const ingredientMeasures = [
    { measure: dataRecipe?.strMeasure1, ingredient: dataRecipe?.strIngredient1 },
    { measure: dataRecipe?.strMeasure2, ingredient: dataRecipe?.strIngredient2 },
    { measure: dataRecipe?.strMeasure3, ingredient: dataRecipe?.strIngredient3 },
    { measure: dataRecipe?.strMeasure4, ingredient: dataRecipe?.strIngredient4 },
    { measure: dataRecipe?.strMeasure5, ingredient: dataRecipe?.strIngredient5 },
    { measure: dataRecipe?.strMeasure6, ingredient: dataRecipe?.strIngredient6 },
    { measure: dataRecipe?.strMeasure7, ingredient: dataRecipe?.strIngredient7 },
    { measure: dataRecipe?.strMeasure8, ingredient: dataRecipe?.strIngredient8 },
    { measure: dataRecipe?.strMeasure9, ingredient: dataRecipe?.strIngredient9 },
    { measure: dataRecipe?.strMeasure10, ingredient: dataRecipe?.strIngredient10 },
  ]

  if(!dataRecipe)return <h1>Carregando...</h1>

  return (
    <section className="flex flex-col gap-10 lg:flex-row  lg:gap-0 lg:rounded-3xl overflow-hidden">

      {smallScreen && <Actions/>}

      <img className=" w-full max-w-[400px] mx-auto" src={dataRecipe?.strMealThumb || ''} alt={dataRecipe?.strMeal || ''} />
      
      <div className="lg:max-w-[50vw] bg-white lg:py-7 lg:px-5">
        <div className="px-6 mb-7">
          <h2 className="text-3xl mb-3 font-bold">{dataRecipe?.strMeal || ''}</h2>
          <ul className="list-disc list-inside flex flex-col gap-3 md:grid md:grid-cols-2">
            {ingredientMeasures.map(({ measure, ingredient }, index) => (
              (measure && ingredient) && (
                <li key={index}>{ConcatenarString(measure || '', ingredient || '')}</li>
              )
            ))}
          </ul>
        </div>

        <div className="px-6">
          <h2 className="text-3xl mb-3 font-bold">Directions</h2>
          <ol className="list-decimal list-inside flex flex-col gap-3  md:grid md:max-h-[200px] md:overflow-y-auto ">
          {ArrInstructions.length > 0 && (
            ArrInstructions.map((instructions,index)=>(
              <li key={index}>{instructions}</li>
            ))
          )}
          </ol>
        </div>

        {!smallScreen && <Actions/>}
      </div>
        
        
    </section>
  )
}

export default CurrentRecipe