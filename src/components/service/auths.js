import API_URL from "./config";

const auth={
    sign_up:(data)=>API_URL.post("/auth/register",data)
}

export  default auth