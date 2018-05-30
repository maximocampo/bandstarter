import React, {Component} from 'react';
import { UserCard } from './search/UserCard'
import * as auth from "../services/authService";
import {IndexNav} from './IndexNav'
import '../stylesheets/search.css'
import Modal from '@material-ui/core/Modal';

class Search extends Component {
  state = {
    modal:false,
    selectedValue:'',
    logged:false,
    instrumentQuery:{
      guitar:false,
      bass:false,
      drums:false,
      voice:false,
      keys:false
    },
    query:'',
    searchResults:[],
    displayUsers:[]
  };

  openModal = () => {
    this.setState({modal:!this.state.modal})
  };

  updateDisplay = users => {
    this.setState({displayUsers:users});
  };

  instrumentQueryChange = e => {
    const target = e.target.name;
    const instrumentQuery = this.state.instrumentQuery;
    instrumentQuery[target] = !this.state.instrumentQuery[target];
    this.setState({instrumentQuery});

    let allFalse = true;
    for (let i in instrumentQuery) {
      if (instrumentQuery[i] === true) {
        allFalse = false;
        break;
      }
    }

    if (allFalse) {
      auth.searchQuery({query: ''})
        .then(searchResults => {
          this.setState({searchResults});
          this.setState(searchResults);
          return this.updateDisplay(this.state.searchResults)
        })
        .catch(e => console.log(e));
    } else {
      for (let i in this.state.instrumentQuery) {
        if(this.state.instrumentQuery[i]){
          return auth.searchQuery(i)
            .then(searchResults => {
              this.setState({searchResults});
              return this.updateDisplay(this.state.searchResults)
            })
            .catch(e => console.log(e));
        }
        }
      }
    };


  inputChange = e => {
    const searchedUsers = this.state.searchResults.filter(user=>user.name.toLowerCase().includes(e.target.value));
    this.setState({displayUsers:searchedUsers});
  };

  componentWillMount(){
    auth.searchQuery({query:this.state.query})
      .then(displayUsers=>{
        return this.setState({displayUsers});
      })
      .catch(e=>console.log(e));
  }

  render() {
    return (
      <div>
        <div className='background__container'>
          <img className='background__img' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/drums.png?alt=media&token=76f92e33-c286-41da-a431-0655904f1b7b"/>
        </div>
            <IndexNav
              place='search'
            />
        <nav className='search__nav'>
          <section style={{display:'flex',width:'100%',justifyContent:'center'}}>
            <div className='nav__check'>
              <input type="checkbox" name='guitar' onChange={this.instrumentQueryChange}/>
              <h4>Guitar</h4>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='bass' onChange={this.instrumentQueryChange}/>
              <h4>Bass</h4>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='drums' onChange={this.instrumentQueryChange}/>
              <h4>Drums</h4>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='voice' onChange={this.instrumentQueryChange}/>
              <h4>Voice</h4>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='keys' onChange={this.instrumentQueryChange}/>
              <h4>Keys</h4>
            </div>
          </section>
            <button onClick={this.openModal}>FILTER</button>
            <Modal
              open={this.state.modal}
              onClose={this.openModal}
            >
                <div style={{position:'absolute',top:'400px'}}>
                  <h1>hola</h1>
                </div>
            </Modal>
        </nav>
        <div>
          <div className='all-cards'>
            {this.state.displayUsers.map((result,i)=><UserCard key={i} user={result}/>)}
          </div>
        </div>
      </div>
    );
  }
};

export default Search;