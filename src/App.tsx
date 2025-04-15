import './App.css'
import NewsSnippet from './componenets/newsSnippet/NewsSnippet'
import { data } from './data/data'

function App() {

    return (
        <>
            <NewsSnippet data={data} />
        </>
    )
}

export default App
