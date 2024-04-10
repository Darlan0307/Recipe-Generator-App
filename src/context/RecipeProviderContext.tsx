import { TypeRecipe } from "@/@types/TypeRecipe";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

type ContextValue = {
  dataRecipe: TypeRecipe,
  backRecipe:TypeRecipe[] | [],
  favoritesRecipes:TypeRecipe[],
  fetchData:()=>Promise<void>,
  addFavorites:(data:TypeRecipe)=>void,
  setBackRecipe:(data:TypeRecipe[] | []) => void,
  backDataRecipe:()=>void,
  selectFavoriteRecipe:(data:TypeRecipe)=>void
}

export const RecipeContext = createContext({} as ContextValue)

type ProviderProps = {
  children: React.ReactNode
}

export const RecipeProvider = ({children}:ProviderProps) => {

  const [dataRecipe,setDataRecipe] = useState<TypeRecipe>({})
  const [favoritesRecipes,setFavoritesRecipes] = useState<TypeRecipe[]>(JSON.parse(localStorage.getItem('FavoritesRecipes') || "") || [])
  const [backRecipe,setBackRecipe] = useState<TypeRecipe[] | []>([])

  const fetchData = async() => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')

      setDataRecipe(response.data.meals[0])
      
    } catch (error) {
      console.log(error);
    }
  }

  const addFavorites = (data:TypeRecipe) => {

    if(data.isFavorite){
      const newFavorites = favoritesRecipes.filter((recipe)=> recipe.idMeal != data.idMeal)

      setFavoritesRecipes(newFavorites)
      data["isFavorite"] = false
      return;
    }

    data["isFavorite"] = true
    setFavoritesRecipes([...favoritesRecipes,data])
  }

  const backDataRecipe = () => {
    setDataRecipe(backRecipe[backRecipe.length - 1])
    backRecipe.pop()
  }

  const selectFavoriteRecipe = (data:TypeRecipe) => {
    setDataRecipe(data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    localStorage.setItem("FavoritesRecipes",JSON.stringify(favoritesRecipes))
  },[favoritesRecipes])

  const value = {
    dataRecipe,
    fetchData,
    favoritesRecipes,
    addFavorites,
    backRecipe,
    setBackRecipe,
    backDataRecipe,
    selectFavoriteRecipe
  }

  return(
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipe = () => {
  return useContext(RecipeContext)
}
