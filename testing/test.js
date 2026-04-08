import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 100,
    duration: '1s'
}

export default function () {
    const url = 'http://localhost:8000/auth/register'
    const payload = JSON.stringify({
        name: `TestUser_${Math.floor(Math.random()*100000)}`,
        user_id: `user_${Math.floor(Math.random()*100000)}`,
        password:'Test'
    })
    const params = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    let res = http.post(url,payload,params)
    check(res,{'Status is 200':(r)=>r.status === 200})
}