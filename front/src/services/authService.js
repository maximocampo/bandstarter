const baseURL = 'http://localhost:3000/';

export function uploadFile(file,id,whatfile){
  console.log(file);
  return fetch(baseURL + 'api/profile/'+ id + '/' + whatfile,{
    method:'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(file)
  })
    .then(res=>{
      if(!res.ok) return Promise.reject(res);
      return res.json();
    })
    .then(user=>{
      localStorage.setItem('user', JSON.stringify(user));
      return user
    });
}

export function logout(){
  return fetch(baseURL + 'logout')
    .then(res=>{
      if(!res.ok) return Promise.reject(res);
      return res.json();
    })
    .then(()=>{
      localStorage.removeItem('user');
    });
}

export function signup(userData){
  return fetch(baseURL + 'signup', {
    method:'post',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(res=>{
      if(!res.ok) return Promise.reject(res);
      return res.json();
    })
    .then(user=>{
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

export function login(userData){
  return fetch(baseURL + 'login', {
    method:'post',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData),
    credentials: 'include'
  })
    .then(res=>{
      if(!res.ok) return Promise.reject(res);
      return res.json();
    })
    .then(user=>{
      localStorage.setItem('user', JSON.stringify(user))
      return user;
    });
}