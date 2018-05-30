import React, {Component} from 'react';
import { UserCard } from './search/UserCard'
import * as auth from "../services/authService";
import {IndexNav} from './IndexNav'
import '../stylesheets/search.css'
import Modal from '@material-ui/core/Modal';
import ChipInput from 'material-ui-chip-input';

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

  handleAdd = (data,key) => {

  };

  handleDelete = (data,key) => {
    const user = this.state.user;
    const filtered = {};
    filtered[key] = user[key].filter(value => {
      return value !== data
    });
    auth.editData(filtered,this.state.user._id)
      .then(user=>this.setState({user}))
      .catch(e=>console.log(e));
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
    const query = e.target.value;
    this.filterResults(e.target.name,query);
    console.log(this.state.displayUsers)
  };

  filterResults = (key,query) => {
    const users = this.state.searchResults;
    let searchedUsers;
    if(key === 'location' || key === 'influences') {
      searchedUsers = users.filter(user => {
        return user[key].toLowerCase().includes(query)
      });
    }
    if(key === 'ageMin') {
      searchedUsers = users.filter(user => {
        return Number(user['age']) > Number(query)
      });
    }
    if(key === 'ageMax') {
      searchedUsers = users.filter(user => {
        return Number(user['age']) < Number(query)
      });
    }
    this.setState({displayUsers:searchedUsers});
  };

  logout = e => {
    auth.logout()
      .then(() => {
        this.props.history.push('/');
      })
      .catch(e => console.log(e));
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
              logout={this.logout}
            />
        <nav className='search__nav'>
          <section style={{display:'flex',justifyContent:'center'}}>
            <div className='nav__check'>
              <input type="checkbox" name='guitar' id='guitar' onChange={this.instrumentQueryChange}/>
              <label style={{padding:'80px 0 0 0',width:'100%',textAlign:'center'}} for="guitar">Guitar</label>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='bass' id='bass' onChange={this.instrumentQueryChange}/>
              <label style={{padding:'80px 0 0 0',width:'100%',textAlign:'center'}} for="bass">Bass</label>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='drums' id='drums' onChange={this.instrumentQueryChange}/>
              <label style={{padding:'80px 0 0 0',width:'100%',textAlign:'center'}} htmlFor="drums">Drums</label>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='voice' id='voice' onChange={this.instrumentQueryChange}/>
              <label style={{padding:'80px 0 0 0',width:'100%',textAlign:'center'}} htmlFor="voice">Voice</label>
            </div>
            <div className='nav__check'>
              <input type="checkbox" name='keys' id='keys' onChange={this.instrumentQueryChange}/>
              <label style={{padding:'80px 0 0 0',width:'100%',textAlign:'center'}} htmlFor="keys">Keys</label>
            </div>
          </section>
            <button style={{margin:'20px',padding:'15px 30px 30px 30px'}} onClick={this.openModal}>FILTER</button>
            <Modal
              open={this.state.modal}
              onClose={this.openModal}
            >
                <div className='filter__modal'>
                  <form className='filter__form' onChange={this.inputChange}>
                  <div style={{padding:'3%'}}>
                    <h3 className='form__h3'>location</h3>
                    <input type="text" name='location' style={{margin:'0',height:'30px',width:'250px'}}/>
                    <h3 className='form__h3'>age</h3>
                    <input type="number" name='ageMin' style={{margin:'0',height:'30px',width:'30px'}} onChange={this.inputChange}/>
                    <h3 style={{fontSize:'28px',display:'inline', margin:'25px 20px 0 20px',paddingTop:'15px'}}>to</h3>
                    <input type="number" name='ageMax' style={{margin:'0',height:'30px',width:'30px'}} />
                  </div>
                  <div style={{width:'45%',padding:'3%'}}>
                    <h3 className='form__h3'>influences</h3>
                    <ChipInput/>
                  </div>
                  </form>
                  <button onClick={this.openModal}>SEARCH</button>
                </div>
            </Modal>
        </nav>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          <div className='all-cards'>
            {this.state.displayUsers.map((result,i)=><UserCard key={i} user={result}/>)}
          </div>
        </div>
      </div>
    );
  }
};

export default Search;