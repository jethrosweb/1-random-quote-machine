import React from "react"
import "./App.scss"

const quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

export default function App() {
    const [quote, setQuote] = React.useState("A house divided against itself cannot stand.")

    const [author, setAuthor] = React.useState("Abraham Lincoln")

    const [randomNumber, setRandomNumber] = React.useState(0)

    const [quotesArray, setQuotesArray] = React.useState(null)

    const fetchQuotes = async (url) => {
        const response = await fetch(url)
        const parsedJSON = await response.json()
        setQuotesArray(parsedJSON.quotes)
        console.log(parsedJSON)
    }

    React.useEffect(() => {
        fetchQuotes(quotesUrl)
    }, [quotesUrl])

    const generateRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length)
        setRandomNumber(randomIndex)
        setQuote(quotesArray[randomIndex].quote)
        setAuthor(quotesArray[randomIndex].author)
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Random Number: {randomNumber}</h1>
                <p>"{quote}"</p>
                <p>- {author}</p>
                <button onClick={generateRandomQuote}>New Quote</button>
            </header>
        </div>
    )
}