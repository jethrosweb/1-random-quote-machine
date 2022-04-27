import React from "react"
import "./App.scss"
import Colors from "./Colors"


const quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

export default function App() {
    const [pageColor, setPageColor] = React.useState("#F48FB1")

    const [quote, setQuote] = React.useState("A house divided against itself cannot stand.")

    const [author, setAuthor] = React.useState("Abraham Lincoln")

    const [randomNumber, setRandomNumber] = React.useState(0)

    const [quotesArray, setQuotesArray] = React.useState(null)

    const fetchQuotes = async (url) => {
        const response = await fetch(url)
        const parsedJSON = await response.json()
        setQuotesArray(parsedJSON.quotes)
    }

    React.useEffect(() => {
        fetchQuotes(quotesUrl)
    }, [quotesUrl])

    const generateRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length)
        setRandomNumber(randomIndex)
        setQuote(quotesArray[randomIndex].quote)
        setAuthor(quotesArray[randomIndex].author)
        setPageColor(Colors[randomIndex])
    }

    return (
        <div className="App">
            <main className="App-main" style={{backgroundColor: pageColor, color: pageColor}}>
                <div id="quote-box">
                    <p id="text">
                        <span><i class="fa-solid fa-quote-left"></i> </span>
                        {quote}
                    </p>
                    <p id="author">- {author}</p>
                    <div className="buttons">
                        <a 
                            id="tweet-quote" 
                            href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} 
                            style={{backgroundColor: pageColor}} 
                            target="_blank">
                                <i class="fa-brands fa-twitter"></i>
                        </a>
                        <button id="new-quote" onClick={generateRandomQuote} style={{backgroundColor: pageColor}}>New Quote</button>
                    </div>
                </div>
            </main>
        </div>
    )
}