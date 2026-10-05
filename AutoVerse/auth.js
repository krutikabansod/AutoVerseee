const DEFAULT={name:"Admin",username:"admin",email:"admin@autoverse.com",password:"admin123",role:"ADMIN"};
function users(){return JSON.parse(localStorage.getItem("av_users")||"[]")}
function saveUsers(x){localStorage.setItem("av_users",JSON.stringify(x))}
if(!users().length)saveUsers([DEFAULT]);
function logged(){return localStorage.getItem("av_logged")==="1"}
function guard(){if(!logged()&&!location.pathname.endsWith("login.html")&&!location.pathname.endsWith("register.html"))location.href="login.html"}
function logout(){localStorage.removeItem("av_logged");location.href="login.html"}
guard();
const lf=document.getElementById("loginForm");
if(lf)lf.onsubmit=e=>{e.preventDefault();let u=loginUser.value.trim().toLowerCase(),p=loginPass.value;let x=users().find(a=>(a.username.toLowerCase()===u||a.email.toLowerCase()===u)&&a.password===p);if(!x){loginError.textContent="Invalid username/email or password.";return}localStorage.setItem("av_logged","1");localStorage.setItem("av_current",JSON.stringify(x));location.href="admin-dashboard.html"};
const rf=document.getElementById("registerForm");
if(rf)rf.onsubmit=e=>{e.preventDefault();let list=users(),x={name:regName.value.trim(),username:regUser.value.trim(),email:regEmail.value.trim(),password:regPass.value,role:"ADMIN"};if(regPass.value!==regConfirm.value){regError.textContent="Passwords do not match.";return}if(list.some(a=>a.username.toLowerCase()===x.username.toLowerCase())){regError.textContent="Username already exists.";return}list.push(x);saveUsers(list);localStorage.setItem("av_logged","1");localStorage.setItem("av_current",JSON.stringify(x));location.href="admin-dashboard.html"};