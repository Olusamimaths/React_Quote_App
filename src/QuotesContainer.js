import React, { Component } from 'react';
import axios from 'axios';

class QuotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: [
            ],
            isLoading: true,
            hasError: false
        }
        this.handleGet = this.handleGet.bind(this)
    }

    handleGet(){
        this.setState({
            isLoading: true
        })
        axios.get("https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en")
        .then((response) => {
            console.log(response)
            this.setState({
                quote: response.data,
                isLoading: false
            })
        })
        .catch((error) => {
            this.setState({
                 isLoading: false,
                 hasError: true
            })
        })
    }


    componentDidMount(){
        this.handleGet()
    }   

    render(){
        if(this.state.isLoading){
            return(
                     <p class="loader"></p>
            )
        } else {
            return(
                <div className="container">
                    <p className="credit">Made with <span className="red">&#9829;</span> by Olusola</p>
                    <h2 >Quotes...</h2>
                    {this.state.hasError && <p>An error occured.</p>}
                     <p><span>Author:</span> {this.state.quote.quoteAuthor || 'Anonymous'}  </p>
                     <p><span>Quote:</span> {this.state.quote.quoteText || 'No quote'}</p>
                     <button onClick={this.handleGet}>GET NEW</button>
                </div>
            )
        }
       
    }

}

export default QuotesContainer;