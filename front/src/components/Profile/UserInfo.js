import React,{ Component } from 'react';
import Chip from '@material-ui/core/Chip';
import blueGrey from '@material-ui/core/colors/blueGrey';
import ChipInput from 'material-ui-chip-input'

class UserInfo extends Component{

  render(){
    const user = this.props.user;
    const handleDelete = this.props.handleDelete;
    const handleAdd = this.props.handleAdd
    return(
      <div className='info'>
        <img src={user.profilePic} alt="Profile Picture" style={{width:'100%',padding:'0'}}/>
          <div style={{padding:'20px'}}>
            <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INSTRUMENTS</h3>
            {user.instruments ?
              <div>
                <ChipInput
                  value={user.instruments}
                  onAdd={(instrument) => handleAdd(instrument,'instruments')}
                  onDelete={(instrument)=>handleDelete(instrument,'instruments')}
                />
              </div>
              :
              <p>Add instruments!</p>
            }

            <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>GENRES</h3>
            {user.genres ?
              <div>
                <ChipInput
                  value={user.genres}
                  onAdd={(genre) => handleAdd(genre,'genres')}
                  onDelete={(genre)=>handleDelete(genre,'genres')}
                />
              </div>
                  :
              <p>Add genres!</p>
                  }

                <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INFLUENCES</h3>
                  {user.influences ?
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