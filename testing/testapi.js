import http from "k6/http"
import { check , sleep } from "k6"

export const options = {
    vus: 1,
    duration:'1s',
}

const BASE_URL = 'http://localhost:8000/test'

function debug(res,name,expected) {
    if(res.status !== expected){
        console.log(`X ${name} FAILED`)
        console.log(`status: ${res.status}`)
        console.log(`Body: ${res.body}`)
        return false
    } else {
        console.log(`${name} OK`)
        return true
    }
}

export default function(){

    let allPassed = true

    //Get
    let res1 = http.get(`${BASE_URL}/get`)
    let c1 = check(res1,{'GET status 200':(r)=>debug(r, 'GET', 200) })
    if(!c1) allPassed = false

    //Post
    let payload = JSON.stringify({
        name:"tester_jaison",
        role:"dev"
    })
    let params = {headers :{ 'Content-Type' : 'application/json' }}
    let res2 = http.post(`${BASE_URL}/post`,payload,params)
    let c2 = check(res2,{'POST status 201': (r)=>debug(r, 'POST', 201) })
    if (!c2) allPassed = false

    //Put
    let res3 = http.put(`${BASE_URL}/put`,payload,params)
    let c3 = check(res3,{'PUT satus 200': (r)=>debug(r, 'PUT', 200) })
    if (!c3) allPassed = false

    //Patch
    let res4 = http.request("PATCH", `${BASE_URL}/patch`, payload, params)
    let c4 = check(res4,{ 'PATCH status 200' : (r)=>debug(r, 'PATCH', 200) })
    if (!c4) allPassed = false

    //Delete
    let res5 = http.del(`${BASE_URL}/delete`)
    let c5 = check(res5,{'DELETE status 200': (r)=>debug(r, 'DELETE', 200)})
    if (!c5) allPassed = false

    sleep(1)
}

export function handleSummary(data) {
    const fails = data.metrics.checks.fails || 0
    if(fails===0) {
        console.log("All Requests executed successfully !!")
    } else {
        console.error("Some Request(s) Failed to Execute")
    }
    return{}
}