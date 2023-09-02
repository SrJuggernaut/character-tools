import Error from '@/routes/Error'
import Home from '@/routes/Home'
import { type FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CharacterEditorPage from './routes/CharacterEditor'
import CharacterLibrary from './routes/CharacterLibrary'

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  { path: '/character-editor', element: <CharacterEditorPage /> },
  { path: '/character-library', element: <CharacterLibrary /> }
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
