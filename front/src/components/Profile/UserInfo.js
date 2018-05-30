import React,{ Component } from 'react';
import Chip from '@material-ui/core/Chip';
import blueGrey from '@material-ui/core/colors/blueGrey';
import ChipInput from 'material-ui-chip-input'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class UserInfo extends Component{

  render(){
    const user = this.props.user;
    const handleDelete = this.props.handleDelete;
    const handleAdd = this.props.handleAdd;

    return(
      <div className='info'>
        <img src={user.profilePic} alt="Profile Picture" style={{width:'100%',padding:'0'}}/>
          <div style={{padding:'20px'}}>
            <h3 style={{fontSize:'10px',textAlign:'left'}}>INSTRUMENTS</h3>
            {this.props.other ?
              user.instruments ?
                <div>
                  {user.instruments.map(instrument=>{
                    return (
                      <div style={styles.wrapper}>
                        <div style={{display:'flex',alignItems:'center',margin:'6px',padding:'7px 12px 7px 12px',backgroundColor:'lightgray',borderRadius:'15px'}}>
                          <span style={{fontSize:'12px'}}>{instrument}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                :
                <p>No instruments</p>
              :
              user.instruments ?
                <div>
                  <ChipInput
                    chip={{height:'10px'}}
                    value={user.instruments}
                    onAdd={(instrument) => handleAdd(instrument,'instruments')}
                    onDelete={(instrument)=>handleDelete(instrument,'instruments')}
                  />
                </div>
                :
                <p>Add instruments!</p>
            }

            <h3 style={{fontSize:'10px',textAlign:'left'}}>GENRES</h3>
            {this.props.other ?
              user.genres ?
                <div>
                  {user.genres.map(genre=>{
                    return (
                      <div style={styles.wrapper}>
                        <div style={{display:'flex',alignItems:'center',margin:'6px',padding:'7px 12px 7px 12px',backgroundColor:'lightgray',borderRadius:'15px'}}>
                          <span style={{fontSize:'12px'}}>{genre}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                :
                <p>No genres</p>
            :
              user.genres ?
                <div>
                  <ChipInput
                    chip={{height:'10px'}}
                    value={user.genres}
                    onAdd={(genre) => handleAdd(genre,'genres')}
                    onDelete={(genre)=>handleDelete(genre,'genres')}
                  />
                </div>
                :
                <p>Add genres!</p>
            }


                <h3 style={{fontSize:'10px',textAlign:'left'}}>INFLUENCES</h3>
            {this.props.other ?
              user.influences ?
                <div>
                  {user.influences.map(influence=>{
                    return (
                      <div style={styles.wrapper}>
                        <div style={{display:'flex',alignItems:'center',margin:'6px',padding:'7px 12px 7px 12px',backgroundColor:'lightgray',borderRadius:'15px'}}>
                          <span style={{fontSize:'12px'}}>{influence}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                :
                <p>No influences</p>
              :
                user.influences ?
                  <div>
                    <ChipInput
                      value={user.influences}
                      onAdd={(influence) => handleAdd(influence,'influences')}
                      onDelete={(influence)=>handleDelete(influence,'influences')}
                    />
                  </div>
                  :
                  <p>Add influences!</p>
            }
                </div>
                </div>
              )
              }
          }


export default UserInfo;