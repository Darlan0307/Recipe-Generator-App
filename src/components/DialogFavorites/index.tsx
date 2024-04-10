import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

import { buttonVariants } from "@/components/ui/button"
import { useRecipe } from "@/context/RecipeProviderContext"

const DialogFavorites = () => {

  const {
    favoritesRecipes,
    selectFavoriteRecipe
  } = useRecipe()

  return (
    <Dialog>
      <DialogTrigger className={`bg-lightBlue text-white ${buttonVariants({ variant: "outline", })}`} >Favorites</DialogTrigger>
      <DialogContent className="w-[90%] max-w-[350px] rounded-2xl ">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Favorites</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 max-h-[60vh] overflow-y-auto">
          {favoritesRecipes.length > 0 ? (
            favoritesRecipes.map((recipe) => (
              <DialogClose key={recipe.idMeal} className="flex items-center gap-3 w-full cursor-pointer transition-all" onClick={()=>selectFavoriteRecipe(recipe)}>
                <img className="w-14" src={recipe.strMealThumb} alt={recipe.strMeal} />
                <p className="font-bold">{recipe.strMeal}</p>
              </DialogClose>
            ))
          ):(
            <h3 className="text-center text-xl">no favorites</h3>
          )}
        </div>
        
        <DialogClose className={`${buttonVariants({ variant: "outline", })} bg-lightBlue text-white text-xl rounded-lg py-4 w-[150px] mx-auto `}>Close</DialogClose>
      </DialogContent>
    </Dialog>

  )
}

export default DialogFavorites