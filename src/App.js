import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Search} from '@material-ui/icons';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const[loading, showLoading] = useState(false)

  async function getMemes(){
    showLoading(true)
    setMemes([])
    const key = 'ZwJZrSXXlsqnZZhBNhfKOWRMn9OhjGF8' //Api key!
    let url = 'https://api.giphy.com/v1/gifs/search?' //base url 
    url += 'api_key=' + key //tack on the api key to the url
    url += '&q=' + text //tack on the search words to the url
    url += '&limit=100' 
    const resp = await fetch(url) //fetch is a built in function for the browser 
    const body = await resp.json() //get the body out of the response 
    console.log(body.data)
    setMemes(body.data) 
    setText('')
    showLoading(false)
  } 

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined" color='secondary' autoFocus='true'
            label="Search for memes" 
            value={text}
            onChange={e=> setText(e.target.value)}
            className='text-field'
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}
          />
          <Button variant="contained" color="secondary"
          onClick={getMemes}> {/*never put parentheses at the end of the function unless theres a fat arrow before it*/}
            <Search/>
          </Button>
        </div>
      </header>

      <div className="meme-wrapper">
        <div className='loading-wrap'>{loading && <CircularProgress color='secondary' className='loading-circle'/>}</div>
        {memes.map((meme, i)=> <Meme key={i} {...meme} />)} {/*...meme means all of the memes in that array */}
      </div>

    </div>
  );
}

function Meme({images, title}){
  const url = images.fixed_height.url
  return (
    <div className="meme" onClick={()=>window.open(url, '_blank')}>
      <img src={images.fixed_height.url} alt="memes"/>
      <div className="meme-title">{title}</div>
    </div>)
} 

export default App;
