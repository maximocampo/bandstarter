import React, {Component} from 'react';
import { UserCard } from './search/UserCard'
import * as auth from "../services/authService";
import '../stylesheets/search.css'

class Search extends Component {
  state = {
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

  instrumentQueryChange = e => {
    auth.searchQuery({query:''})
      .then(searchResults => {
        return this.setState({searchResults});
      })
      .catch(e => console.log(e));
    const target = e.target.name
    const instrumentQuery = this.state.instrumentQuery;
    instrumentQuery[target] = !this.state.instrumentQuery[target];
    this.setState({instrumentQuery});
    var i;
    for(i in this.state.instrumentQuery) {
      if (this.state.instrumentQuery[i]) {
        return auth.searchQuery(i)
          .then(searchResults => {
            this.setState({searchResults});
            return this.setState({displayUsers:searchResults})
          })
          .catch(e => console.log(e));
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
        <nav style={{display:'flex',justifyContent:'center'}}>
          <section style={{display:'flex',justifyContent:'center'}}>
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
          <section>
            <input type="text" onChange={this.inputChange}/>
          </section>
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