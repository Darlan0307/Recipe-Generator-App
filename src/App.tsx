import AppRecipe from "./components/AppRecipe"
import { RecipeProvider } from "./context/RecipeProviderContext"

function App() {
  return (
    <RecipeProvider>
      <AppRecipe/>
    </RecipeProvider>
  )
}

export default App
