import React from 'react'

import { post } from 'axios';



class DateAdd extends React.Component {



    constructor(props) {

        super(props);

        this.state = {

            date: '',

            numOfVisiters:''

        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleValueChange = this.handleValueChange.bind(this)

        this.addDate = this.addDate.bind(this)

    }



    handleFormSubmit(e) {

        e.preventDefault()

        this.addCustomer()

        .then((response) => {

            console.log(response.data);

        })

    }


    handleValueChange(e) {

        let nextState = {};

        nextState[e.target.name] = e.target.value;

        this.setState(nextState);

    }



    addDate(){

        const url = '/api/visiters';

        const formData = new FormData();

        formData.append('date', this.state.date)

        formData.append('numOfVisiters', this.state.numOfVisiters)

        const config = {

            headers: {

                'content-type': 'multipart/form-data'

            }

        }

        return post(url, formData, config)

    }



    render() {

        return (

            <form onSubmit={this.handleFormSubmit}>

                <h1> 날짜 추가 </h1>

                날짜: <input type="text" name="date" value={this.state.date} onChange={this.handleValueChange} /><br/>

                방문자 수: <input type="text" name="numOfVisiters" value={this.state.numOfVisiters} onChange={this.handleValueChange} /><br/>

                <button type="submit">추가하기</button>

            </form>

        )

    }

}



export default DateAdd
