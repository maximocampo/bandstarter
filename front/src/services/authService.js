const baseURL = 'http://localhost:3000/';

export function editData(data,id){
  return fetch(baseURL + 'api/profile/' + id + '/edit',{
    method:'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res=>res.json())
    .then(reply=>reply);
}

export function sendReply(body){
  return fetch(baseURL + 'api/reply/new',{
    method:'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res=>res.json())
    .then(reply=>reply);
}

export function ignoreRequest(id){
  console.log(id)
  return fetch(baseURL + 'api/request/ignore/' + id)
    .then(res=>res.json())
    .then(user=>user);
}

export function findUser(id){
  return fetch(baseURL + 'api/user/' + id)
    .then(res=>res.json())
    .then(user=>user);
}

export function sendRequest(id,body){
  return fetch(baseURL + 'api/request/' + id,{
    method:'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res=>res.json())
    .then(user=>user);
}

export function searchQuery(query){
  return fetch(baseURL + 'api/search/user/'+query)
    .then(res=>res.json())
    .then(users=>users);
}

export function getUser(id){
  return fetch(baseURL + 'api/profile/' + id)
    .then(res=>res.json())
    .then(user=>user);
}

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
    body: JSON.stringify(userData),
    credentials : 'same-origin'
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
    credentials: 'same-origin'
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