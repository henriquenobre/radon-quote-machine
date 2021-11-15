import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"



function App() {
  const [quote, setQuote] = useState("If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.")
  const [author, setAuthor] = useState("Sheryl Sandberg")
  const [quoteArray, setQuoteArray] = useState(null)
  const [randomColor, setRandomColor] = useState('#282c34')

  const fetchQuotes = async (url) =>{
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuoteArray(parsedJSON.quotes)
  }

  useEffect(() =>{
    fetchQuotes(quoteDB)
  },[quoteDB])

  const changeQuoteAll = () => {
    let random = Math.floor(quoteArray.length * Math.random())
    setQuote(quoteArray[random].quote)
    setAuthor(quoteArray[random].author)
    setRandomColor(COLORS_ARRAY[random])
  }



  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:randomColor, color:randomColor}}>
        <div id="quote-box">
        <p id="text" style={{color:randomColor}}>
        <FontAwesomeIcon icon={faQuoteLeft}/>"{quote}"
        </p>
        <p id="author" style={{color:randomColor}}>- {author}</p>
        <a id="tweet-quote" style={{backgroundColor:randomColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>
        <button id="new-quote" style={{backgroundColor:randomColor}} onClick={() => changeQuoteAll()}>New Quote</button>
       
        </div>
      </header>
    </div>
  );
}

export default App;
