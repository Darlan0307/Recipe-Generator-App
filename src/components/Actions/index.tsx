import { Button } from "@/components/ui/button"
import { HiOutlineRefresh } from "react-icons/hi";
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { useRecipe } from "@/context/RecipeProviderContext";
import DialogFavorites from "../DialogFavorites";

const Actions = () => {

  const {
    fetchData,
    dataRecipe,
    addFavorites,
    backRecipe,
    setBackRecipe,
    backDataRecipe
  } = useRecipe()

  return (
    <section className="flex items-center justify-between pt-8 px-4 sm:justify-evenly ">
      <div className="flex gap-2 sm:gap-5">
        {backRecipe.length > 0 && <Button className="bg-lightBlue text-white"  variant="outline" size="default" onClick={backDataRecipe}>Back</Button>}
        <DialogFavorites/>
      </div>
      <div className="flex gap-2 sm:gap-5">
      <Button variant="ghost" size="icon" onClick={()=>{
        setBackRecipe([...backRecipe,dataRecipe])
        fetchData()
      }}><HiOutlineRefresh size={30}/></Button>
      <Button className="" variant="ghost" size="icon" onClick={()=>addFavorites(dataRecipe)}>

        {dataRecipe.isFavorite ? <FaHeart size={30}/> :<FaRegHeart size={30}/>}
        
      </Button>
      </div>
    </section>
  )
}

export default Actions